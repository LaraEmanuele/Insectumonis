const mongoose = require('mongoose');
const usuario = require ("./usuarioDataSchema");

const sibbrDataSchema = new mongoose.Schema ({
    //idUsuario: {type: mongoose.Schema.Types.ObjectId, required: true, ref: usuario._id },
    nomeInstituicao: { type: String, required: true }, //Nesse caso, somente membros do IFB
    nomeColecao: { type: String, required: true },
    acronimo: { type: String, required: false },
    siteColecao: { type: String, required: false },
    telefone: { type: Number, required: false },
    tamanhoAcervo: { type: Number, required: true },
    emailColecao: { type: String, required: false },
    tamanhoAcervoDigt: { type: Number, required: false },
    nomeCurador: { type: String, required: false },
    genero: { type: String, required: false }, // 1: Masculino, 2: feminino
    contatoCurador: { type: Number, required: false },
    outrosContatos: { type: Number, required: false },
    descricaoColecao: { type: String, required: false },
    coberturaTaxonomica: { type: Number, required: false },
    inicioColeta: { type: Date, required: false },
    fimColeta: { type: Date, required: false },
    localizacao: { type: String, required: false },
    subcolecoes: { type: Number, required: false }
});

module.exports = mongoose.model('sibbr', sibbrDataSchema);