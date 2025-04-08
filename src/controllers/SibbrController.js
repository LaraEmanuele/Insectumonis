const { request, response } = require('express');
const sibbr = require('../models/sibbrDataSchema');

class SibbrController {
    /**
     * Retorna todas as coleções cadastradas no banco de dados.
     */
    async read(request, response) {
        try {
            const colecoes = await sibbr.find();
            return response.status(200).json(colecoes);
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar coleções." });
        }
    }

    /**
     * Retorna uma única coleção por ID.
     */
    async readById(request, response) {
        try {
            const { id } = request.params;
            const colecao = await sibbr.findById(id);

            if (!colecao) {
                return response.status(404).json({ error: "Coleção não encontrada." });
            }

            return response.status(200).json(colecao);
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar a coleção.", details: error.message });
        }
    }

    /**
     * Cria um novo registro de coleção no banco de dados.
     */
    async create(request, response) {
        try {
            console.log(request.body);
            const {
                nomeInstituicao,
                nomeColecao,
                acronimo,
                siteColecao,
                telefone,
                tamanhoAcervo,
                emailColecao,
                tamanhoAcervoDigt,
                nomeCurador,
                genero,
                contatoCurador,
                outrosContatos,
                descricaoColecao,
                coberturaTaxonomica,
                inicioColeta,
                fimColeta,
                localizacao,
                subcolecoes
            } = request.body;

            // Validação de campos obrigatórios
            if (!nomeInstituicao || !nomeColecao || !tamanhoAcervo) {
                return response.status(400).json({ error: "Campos obrigatórios não preenchidos." });
            }

            // Criação do novo registro no banco
            const novaColecao = await sibbr.create({
                nomeInstituicao,
                nomeColecao,
                acronimo,
                siteColecao,
                telefone,
                tamanhoAcervo,
                emailColecao,
                tamanhoAcervoDigt,
                nomeCurador,
                genero,
                contatoCurador,
                outrosContatos,
                descricaoColecao,
                coberturaTaxonomica,
                inicioColeta,
                fimColeta,
                localizacao,
                subcolecoes
            });

            return response.status(201).json(novaColecao);

        } catch (error) {
            return response.status(500).json({ error: "Erro ao criar a coleção.", details: error });
        }
    }
    /**
     * Atualiza um registro de coleção por ID.
     */
    async update(request, response) {
        try {
            const { id } = request.params;
            const updateData = request.body;

            const colecaoAtualizada = await sibbr.findByIdAndUpdate(id, updateData, { new: true });

            if (!colecaoAtualizada) {
                return response.status(404).json({ error: "Coleção não encontrada." });
            }

            return response.status(200).json({ mensagem: "Coleção atualizada com sucesso!", data: colecaoAtualizada });
        } catch (error) {
            return response.status(500).json({ error: "Erro ao atualizar a coleção.", details: error.message });
        }
    }

}

module.exports = SibbrController;