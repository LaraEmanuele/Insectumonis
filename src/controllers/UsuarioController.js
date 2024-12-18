const { request, response } = require('express');
const usuario = require('../models/usuarioDataSchema');

module.exports = {
    async read(request, response){
        const  usuarioAll = await usuario.find();

        return response.json(usuarioAll);
    },

    async create(request, response){
        console.log(request.body);
        const {email, password, primeiroNome, sobrenome, campus, disciplina} = request.body;
        const usuarioCreate = await usuario.create({
            email, 
            password, 
            primeiroNome, 
            sobrenome, 
            campus, 
            disciplina
        });
        return response.json(usuarioCreate);
    }

}