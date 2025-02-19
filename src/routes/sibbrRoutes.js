const express = require('express');
const routes = express.Router();

const SibbrController = require ('../controllers/SibbrController');

const sc = new SibbrController;

// Criar um novo registro de coleção
routes.post('/sibbr', sc.create);

// Buscar todas as coleções
routes.get('/sibbr', sc.read);

// Buscar uma coleção específica por ID
routes.get('/sibbr/:id', sc.readById);

// Atualizar uma coleção por ID
routes.put('/sibbr/:id', sc.update);




module.exports = routes;