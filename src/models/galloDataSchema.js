const mongoose = require('mongoose');

const galloDataSchema = new mongoose.Schema({
    nomeColecao: String,
    superclasse: String,
    classe: String,
    ordem: String,
    subOrdem: String,
    superFamilia: String,
    familia: String,
    subFamilia: String,
    tribo: String,
    genero: String,
    subGenero: String,
    especie: String,
    subEspecie: String,
    individuoImagem: String,
});

module.exports = mongoose.model('gallo', galloDataSchema);