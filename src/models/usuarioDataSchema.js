const mongoose = require('mongoose');

const usuarioDataSchema = new mongoose.Schema ({
    email: String,
    password: String,
    primeiroNome: String,
    sobrenome: String,
    campus: Number,
    areaAtuacao: Number,
    telefone: Number
});

module.exports = mongoose.model('usuario', usuarioDataSchema);