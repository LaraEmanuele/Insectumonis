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
     * Retorna um único registro por nome.
    */
    async readByName(request, response) {
    try {
      const termoDeBusca = request.params.nome;

      if (!termoDeBusca) {
        return response.status(400).json({ message: "O termo de busca na URL é obrigatório." });
      }

      const termoDeBuscaLower = termoDeBusca.toLowerCase();

      const colecoesFiltradas = await sibbr.find({
        // Usamos uma expressão regular para buscar o termo em qualquer parte do nomeColecao
        // 'i' no final torna a busca case-insensitive
        nomeColecao: { $regex: termoDeBuscaLower, $options: 'i' }
      });

      if (colecoesFiltradas.length > 0) {
        return response.status(200).json(colecoesFiltradas);
      } else {
        return response.status(404).json({ message: `Nenhuma coleção encontrada com o termo '${termoDeBusca}'.` });
      }
    } catch (error) {
      console.error("Erro no readByName:", error);
      return response.status(500).json({ error: "Erro interno do servidor ao buscar o registro", details: error.message });
    }
  }


    /**
     * Cria um novo registro de coleção no banco de dados.
     */
    async create(request, response) {
        try {
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

            // Verificação da imagem enviada pelo multer
            const imagem = request.file;
            let caminhoImagem = null;

            if (imagem) {
                caminhoImagem = `/upload/sibbr/${imagem.filename}`;  // ou imagem.path se quiser caminho completo
            }

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
                subcolecoes,
                colecaoImagem: caminhoImagem
            });

            return response.status(201).json(novaColecao);

        } catch (error) {
            console.error("--- DEBUG: ERRO CAPTURADO NO CATCH ---", error);
            return response.status(500).json({ error: "Erro ao criar a coleção.", details: error.message });
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

    async autoComplete (request, response) {
        try{
            // Launch the browser and open a new blank page
            const browser = await puppeteer.launch({
                headless: false
            });
            const page = await browser.newPage();

            // Navigate the page to a URL.
            await page.goto('https://sibbr.gov.br/forms/colecoes.php');

            // Set screen size.
            await page.setViewport({width: 1080, height: 1024});

            await page.focus('input[name="instituicao"]');
        }catch{
            console.error("--- DEBUG: ERRO CAPTURADO NO CATCH ---", error);
            return response.status(500).json({ error: "Erro ao criar a coleção.", details: error.message });
        }
         
    }

}

module.exports = SibbrController;