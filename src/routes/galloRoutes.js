const express = require('express');
const galloController = require('../controllers/GalloController.js');

const router = express.Router();

// Criar um novo registro de inseto
router.post('/gallo', galloController.create);

// Buscar todos os registros da coleção Gallo
router.get('/gallo', galloController.read);

// Buscar um inseto específico por ID
router.get('/gallo/:id', galloController.readById);

// Atualizar um inseto por ID
router.put('/gallo/:id', galloController.update);

module.exports = router;