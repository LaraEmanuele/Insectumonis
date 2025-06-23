const express = require('express');
const galloController = require('../controllers/GalloController.js');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (require, file, cb){
        cb(null, './upload/gallo');
    },
    filename: function (require, file, cb){
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        cb(null, `${timestamp}-${file.originalname}`);
    }
});

const upload = multer({storage: storage});

const router = express.Router();

// Criar um novo registro de inseto
router.post('/gallo', upload.single('individuoImagem'), galloController.create);


// Buscar todos os registros da coleção Gallo
router.get('/gallo', galloController.read);


// Buscar todos os registros da coleção Gallo com mesmo nome
router.get('/gallo/:nome', galloController.readByName);

// Buscar um inseto específico por ID
router.get('/gallo/:id', galloController.readById);

// Atualizar um inseto por ID
router.put('/gallo/:id', galloController.update);

module.exports = router;