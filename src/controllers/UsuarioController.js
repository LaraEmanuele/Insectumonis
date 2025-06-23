const { request, response } = require('express');
const path = require('path');
const dotenv = require('dotenv');
const usuario = require('../models/usuarioDataSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


class usuarioController {
    /**
     * Retorna todos os usuários cadastrados no banco de dados.
     */
    async read(req, res) {
        try {
            const usuarios = await usuario.find();
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
            const usuario = await usuario.findById(id);

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
                nomeCompleto,
                campus,
                areaAtuacao,
                telefone
            } = req.body;

            // Caminho correto para o .env.db
            const envPath = path.resolve('../Insectumonis/config/.env.mail');
            dotenv.config({ path: envPath });

            const mailUser = process.env.MAIL_USER;
            const mailPassword = process.env.MAIL_PASSWORD;


            // Validação de campos obrigatórios
            if (!email || !password || !nomeCompleto || !telefone || !campus || !areaAtuacao) {
                return res.status(300).json({ error: "Todos os campos são obrigatórios." });
            }

            // Verifica se o usuário já existe
            const usuarioExistente = await usuario.findOne({ email });
            if (usuarioExistente) {
                return res.status(400).json({ error: "Email já cadastrado." });
            }

            // Criptografa a senha antes de salvar
            bcrypt.hash(password, 10, async (errBcrypt, hash) => {
                if (errBcrypt) {
                    return res.status(500).json({ error: errBcrypt });
                }

                try {
                    const novoUsuario = await usuario.create({
                        email,
                        password: hash, // Aqui salva o HASH da senha!
                        nomeCompleto,
                        campus,
                        areaAtuacao,
                        telefone,
                        emailConfirmado: false,

                    });

                    // Gerar token de confirmação
                    const token = jwt.sign({ email: novoUsuario.email }, "seuSegredoJWT", { expiresIn: '1d' });

                    // Configurar transportador de email (exemplo Gmail, cuidado com segurança/2FA em produção)
                    const transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                            user: mailUser,
                            pass: mailPassword
                        }
                    });

                    const linkConfirmacao = `http://localhost:3333/usuario/confirmar-email/${token}`;

                    // Configurar o objeto mailOptions
                    const mailOptions = {
                        from: mailUser,
                        to: novoUsuario.email,
                        subject: 'Confirmação de email',
                        html: `
                                <h3>Bem-vindo!</h3>
                                <p>Confirme seu email clicando no link abaixo:</p>
                                <a href="${linkConfirmacao}">${linkConfirmacao}</a>
                              `

                    };

                    //Enviar o email
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log('Erro: ' + error);
                        } else {
                            console.log('Email enviado: ' + info.response);
                        }
                    });

                    return res.status(201).json({ mensagem: "Cadastro realizado! Verifique seu email para confirmar." });

                    return res.status(201).json(novoUsuario);
                } catch (error) {
                    console.error(error);
                    return res.status(500).json({ error: "Erro ao cadastrar usuário." });
                }
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro no servidor", details: error.message });
        }
    }

    /**
      *Confima o email por meio do token
    */
    async verifyEmail (req, res){
        const { token } = req.params;

        try {
            const decoded = jwt.verify(token, 'seuSegredoJWT');
            const email = decoded.email;

            // Agora você pode buscar o usuário pelo email e confirmar o cadastro
            await usuario.findOneAndUpdate({ email }, { emailConfirmado: true })
            .then(() => res.send('✅ Email confirmado com sucesso!'))
            .catch(() => res.status(500).send('❌ Erro ao confirmar email.'));
            
        } catch (error) {
            res.status(400).send('❗ Token inválido ou expirado.');
        }
    }


    /**
     * Valida credenciais de login e retorna um token JWT.
     */
    async validationLogin(req, res) {
        try {
            const { email, password } = req.body;

            

            // Validação de entrada
            if (!email || !password) {
                return res.status(400).json({ error: "Email e senha são obrigatórios." });
            }

            // Busca usuário no banco de dados
            const usuarioEncontrado = await usuario.findOne({ email });

            if (!usuarioEncontrado) {
            return res.status(404).json({ error: "Usuário não encontrado." });
            }

            // Verifica a senha
            const senhaValida = await bcrypt.compare(password, usuarioEncontrado.password);
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

            const usuarioAtualizado = await usuario.findByIdAndUpdate(id, updateData, { new: true });

            if (!usuarioAtualizado) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }

            return res.status(200).json({ mensagem: "Usuário atualizado com sucesso!", usuarioAtualizado });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao atualizar usuário.", details: error.message });
        }
    }

}

module.exports = usuarioController;