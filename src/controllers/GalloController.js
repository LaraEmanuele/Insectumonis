const { request, response } = require("express");
const Gallo = require("../models/galloDataSchema");

class GalloController {
    /**
     * Retorna todos os registros da coleção Gallo.
    */
    async read(request, response) {
        try {
            const galloAll = await Gallo.find();
            return response.status(200).json(galloAll);
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar dados", details: error.message });
        }
    }

    /**
     * Retorna um único registro por ID.
    */
    async readById(request, response) {
        try {
            const { id } = request.params;
            const gallo = await Gallo.findById(id);

            if (!gallo) {
                return response.status(404).json({ error: "Registro não encontrado." });
            }

            return response.status(200).json(gallo);
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar o registro", details: error.message });
        }
    }

    /**
     * Retorna um único registro por ID.
    */
    async readById(request, response) {
        try {
            const { id } = request.params;
            const gallo = await Gallo.findById(id);

            if (!gallo) {
                return response.status(404).json({ error: "Registro não encontrado." });
            }

            return response.status(200).json(gallo);
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar o registro", details: error.message });
        }
    }

    /**
     * Retorna um único registro por nome.
    */
    async readByName(request, response) {
        try {
            const nomeProcurado = request.query.nome; // Obtém o nome da query string

            if (!nomeProcurado) {
                return response.status(400).json({ message: "O parâmetro 'nome' é obrigatório na query string." });
            }

            // Filtra os elementos onde o nome é igual ao nome procurado (case-insensitive para melhor usabilidade)
            const elementosFiltrados = elementos.filter(elemento =>
                elemento.nome.toLowerCase() === nomeProcurado.toLowerCase()
            );

            // 5. Enviar a resposta
            if (elementosFiltrados.length > 0) {
                response.status(200).json(elementosFiltrados);
            } else {
                response.status(404).json({ message: `Nenhum elemento encontrado com o nome '${nomeProcurado}'.` });
            }
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar o registro", details: error.message });
        }
    }

    /**
     * Cria um novo registro de inseto no banco de dados.
    **/
    async create(request, response) {
        try {
            console.log(request.body);
            const {
                superclasse,
                classe,
                ordem,
                subOrdem,
                superFamilia,
                familia,
                subFamilia,
                tribo,
                genero,
                subGenero,
                especie,
                subEspecie
            } = request.body;

            // Validação dos campos obrigatórios
            if (!superclasse || !classe || !ordem || !especie) {
                return response.status(400).json({ error: "Os campos superclasse, classe, ordem e espécie são obrigatórios." });
            }

            // Criando o registro
            const galloCreate = await Gallo.create({
                superclasse,
                classe,
                ordem,
                subOrdem,
                superFamilia,
                familia,
                subFamilia,
                tribo,
                genero,
                subGenero,
                especie,
                subEspecie
            });

            return response.status(201).json({ mensagem: "Registro criado com sucesso!", data: galloCreate });

        } catch (error) {
            return response.status(500).json({ error: "Erro ao criar registro", details: error.message });
        }
    }

    /**
     * Atualiza um registro por ID.
     */
    async update(request, response) {
        try {
            const { id } = request.params;
            const updateData = request.body;

            const galloUpdated = await Gallo.findByIdAndUpdate(id, updateData, { new: true });

            if (!galloUpdated) {
                return response.status(404).json({ error: "Registro não encontrado." });
            }

            return response.status(200).json({ mensagem: "Registro atualizado com sucesso!", data: galloUpdated });
        } catch (error) {
            return response.status(500).json({ error: "Erro ao atualizar o registro", details: error.message });
        }
    }

}

module.exports = new GalloController();
