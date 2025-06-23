const mongoose = require('mongoose');

const usuarioDataSchema = new mongoose.Schema ({
    email: String,
    password: String,
    nomeCompleto: String,
    campus: String,
    areaAtuacao: String,
    telefone: Number,
    emailConfirmado: {type: Boolean, default: false}
});

module.exports = mongoose.model('usuario', usuarioDataSchema);