const express = require('express');
const routes = express.Router();

const UsuarioController = require ('../controllers/UsuarioController');

const uc = new UsuarioController;

routes.post('/login', uc.create);

routes.get('/login', uc.read);

routes.post('/login/usuario', uc.validacaoLogin);

module.exports = routes;