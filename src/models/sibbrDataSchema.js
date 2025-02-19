const mongoose = require('mongoose');
const usuario = require ("./usuarioDataSchema");

const sibbrDataSchema = new mongoose.Schema ({
    //idUsuario: {type: mongoose.Schema.Types.ObjectId, required: true, ref: usuario._id },
    nomeInstituicao: { type: String, required: true },
    nomeColecao: { type: String, required: true },
    acronimo: { type: String, required: false },
    siteColecao: { type: String, required: false },
    telefone: { type: String, required: false }, // Alterado para String para suportar diferentes formatos
    tamanhoAcervo: { type: Number, required: true },
    emailColecao: { type: String, required: false },
    tamanhoAcervoDigt: { type: Number, required: false },
    nomeCurador: { type: String, required: false },
    genero: { type: String, required: false }, // Alterado para String para possibilitar "Masculino", "Feminino", etc.
    contatoCurador: { type: String, required: false }, // Alterado para String (aceita números com formatos variados)
    outrosContatos: { type: String, required: false },
    descricaoColecao: { type: String, required: false },
    coberturaTaxonomiva: { type: Number, required: false },
    inicioColeta: { type: Date, required: false },
    fimColeta: { type: Date, required: false },
    localizacao: { type: String, required: false },
    subcolecoes: { type: Number, required: false }
});

module.exports = mongoose.model('sibbr', sibbrDataSchema);