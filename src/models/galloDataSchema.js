const mongoose = require('mongoose');

const galloDataSchema = new mongoose.Schema({
    superclasse: String,
    classe: String,
    ordem: String,
    superOrdem: String,
    superFamilia: String,
    familia: String,
    subFamilia: String,
    tribo: String,
    genero: String,
    subGenero: String,
    especie: String,
    subEspecie: String
});

module.exports = mongoose.model('gallo', galloDataSchema);