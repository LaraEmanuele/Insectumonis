const { request, response } = require('express');
const usuario = require('../models/usuarioDataSchema');

class UsuarioController {
    /**
     * Retorna todos os usuários cadastrados no banco de dados.
     */
    async read(req, res) {
        try {
            const usuarios = await Usuario.find();
            return res.status(200).json(usuarios);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar usuários.", details: error.message });
        }
    }

    /**
     * Retorna um único usuário pelo ID.
     */
    async readById(req, res) {
        try {
            const { id } = req.params;
            const usuario = await Usuario.findById(id);

            if (!usuario) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }

            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar usuário.", details: error.message });
        }
    }

    /**
     * Cria um novo usuário (Aluno ou Professor).
     */
    async create(req, res) {
        try {
            console.log(req.body);
            const { 
                email, 
                password, 
                primeiroNome, 
                sobrenome, 
                campus, 
                areaAtuacao, 
                tipo, 
                matricula, 
                areaEspecializacao 
            } = req.body;

            // Validação de campos obrigatórios
            if (!email || !password || !primeiroNome || !sobrenome || !campus || !areaAtuacao || !tipo) {
                return res.status(400).json({ error: "Todos os campos são obrigatórios." });
            }

            // Verifica se o usuário já existe
            const usuarioExistente = await Usuario.findOne({ email });
            if (usuarioExistente) {
                return res.status(400).json({ error: "Email já cadastrado." });
            }

            // Criptografa a senha antes de salvar
            const senhaHash = await bcrypt.hash(password, 10);

            let usuario;
            if (tipo === "aluno") {
                if (!matricula) return res.status(400).json({ error: "Matrícula é obrigatória para alunos." });

                usuario = new Aluno({
                    email,
                    password: senhaHash,
                    primeiroNome,
                    sobrenome,
                    campus: Number(campus),
                    areaAtuacao: Number(areaAtuacao),
                    tipo,
                    matricula: Number(matricula),
                });

            } else if (tipo === "professor") {
                if (!areaEspecializacao) return res.status(400).json({ error: "Área de especialização é obrigatória para professores." });

                usuario = new Professor({
                    email,
                    password: senhaHash,
                    primeiroNome,
                    sobrenome,
                    campus: Number(campus),
                    areaAtuacao: Number(areaAtuacao),
                    tipo,
                    areaEspecializacao,
                });

            } else {
                return res.status(400).json({ error: "Tipo de usuário inválido." });
            }

            await usuario.save();
            return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });

        } catch (error) {
            return res.status(500).json({ error: "Erro no servidor", details: error.message });
        }
    }

    /**
     * Valida credenciais de login e retorna um token JWT.
     */
    async validacaoLogin(req, res) {
        try {
            const { email, password } = req.body;

            // Validação de entrada
            if (!email || !password) {
                return res.status(400).json({ error: "Email e senha são obrigatórios." });
            }

            // Busca usuário no banco de dados
            const usuario = await Usuario.findOne({ email });

            if (!usuario) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }

            // Verifica a senha
            const senhaValida = await bcrypt.compare(password, usuario.password);
            if (!senhaValida) {
                return res.status(401).json({ error: "Senha incorreta." });
            }

            // Gera um token JWT
            const token = jwt.sign({ id: usuario._id, tipo: usuario.tipo }, "secreto", { expiresIn: "1h" });

            return res.status(200).json({
                mensagem: "Login realizado com sucesso.",
                token,
                tipo: usuario.tipo
            });

        } catch (error) {
            return res.status(500).json({ error: "Erro no servidor", details: error.message });
        }
    }

    /**
     * Atualiza um usuário existente.
     */
    async update(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const usuarioAtualizado = await Usuario.findByIdAndUpdate(id, updateData, { new: true });

            if (!usuarioAtualizado) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }

            return res.status(200).json({ mensagem: "Usuário atualizado com sucesso!", usuarioAtualizado });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao atualizar usuário.", details: error.message });
        }
    }

}

module.exports = UsuarioController;