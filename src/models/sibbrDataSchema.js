const mongoose = require('mongoose');

const sibbrDataSchema = new mongoose.Schema ({
    nomeInstituicao: String,
    nomeColecao: String,
    nomeInstiruicao: String,
    acronimo: String,
    siteColecao: String,
    telefone: Number,
    tamanhoAcervo: Number,
    emailColecao: String,
    tamanhoAcervoDigt: Number,
    nomeCurador: String,
    genero: Number,
    contatoCurador: Number,
    outrosContatos: String,
    descricaoColecao: String,
    coberturaTaxonomiva: Number,
    inicioColeta: Date,
    fimColeta: Date,
    localizacao: String,
    subcolecoes: Number,

});

module.exports = mongoose.model('sibbr', sibbrDataSchema);