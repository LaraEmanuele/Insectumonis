const { request, response } = require('express');
const usuario = require('../models/usuarioDataSchema');

class UsuarioController{

    async read(request, response){
        const  usuarioAll =  await usuario.find();

        return response.json(usuarioAll);
    }

    async create(request, response){
        console.log(request.body);
        const {email, password, primeiroNome, sobrenome, campus, areaAtuacao} = request.body;

        // Verifica se todos os campos foram fornecidos
        if (!email || !password || !primeiroNome || !sobrenome || !campus || !areaAtuacao) {
            return response.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        const usuarioCreate = await usuario.create({
            email, 
            password, 
            primeiroNome, 
            sobrenome, 
            campus, 
            areaAtuacao
        });
        
        return response.json(usuarioCreate);
    }

    async validacaoLogin (request, response){
        const { email, password } = request.body;

        // Verifica se os campos foram fornecidos
        if (!email || !password) {
            return response.status(400).json({ error: 'Nome e senha são obrigatórios.' });
        }

        // Recebe a lista de usuários do site
        //const usuarios =  JSON.parse(this.read());
        const  usuarios =  await usuario.find();

        // Busca o usuário no "banco de dados"
        const usuarioEncontrado = usuarios.find(user => user.email === email);

        // Verifica se o usuário existe
        if (!usuarioEncontrado) {
            return response.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Verifica se a senha está correta
        if (usuarioEncontrado.password !== password) {
            return response.status(401).json({ error: 'Senha incorreta.' });
        }

        // Se tudo estiver certo, retorna o "token"
        const token = 'token_exemplo_12345'; // Simulação de geração de token
        return response.status(200).json({
            message: 'Login realizado com sucesso.',
            data: { nome: usuarioEncontrado.nome, token }
        });

    }

}

module.exports = UsuarioController;