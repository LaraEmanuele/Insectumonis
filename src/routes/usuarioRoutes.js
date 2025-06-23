const express = require('express');
const routes = express.Router();

const UsuarioController = require ('../controllers/UsuarioController');

const uc = new UsuarioController;

// Rota para buscar todos os usuários
routes.get("/usuarios", uc.read);

// Rota para buscar um usuário específico por ID
routes.get("/usuario/:id", uc.readById);

// Rota para cadastrar um novo usuário (Aluno ou Professor)
routes.post("/usuario/cadastro", uc.create);

// Rota para autenticação de login
routes.get("/usuario/confirmar-email/:token", uc.verifyEmail);

// Rota para autenticação de login
routes.post("/usuario/login", uc.validationLogin);

// Rota para atualizar um usuário
routes.put("/usuario/:id", uc.update);

module.exports = routes;