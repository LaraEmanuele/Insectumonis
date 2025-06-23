const express = require('express');
const routes = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (require, file, cb){
        cb(null, './upload/sibbr');
    },
    filename: function (require, file, cb){
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        cb(null, `${timestamp}-${file.originalname}`);
    }
});

const upload = multer({storage: storage});

const SibbrController = require ('../controllers/SibbrController');

const sc = new SibbrController;

// Criar um novo registro de coleção
routes.post('/sibbr', upload.single('colecaoImagem'), sc.create);

// Buscar todas as coleções
routes.get('/sibbr', sc.read);

// Buscar todas as coleções com mesmo nome
routes.get('/sibbr/:nome', sc.readByName);

/*
// Buscar uma coleção específica por ID
routes.get('/sibbr/:id', sc.readById);
*/

// Atualizar uma coleção por ID
routes.put('/sibbr/:id', sc.update);

//Realiza o autoComplete no site do SiBBr
//routes.get('/sibbr/:id', sc.autoComplete);




module.exports = routes;