const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Caminho correto para o .env.db
const envPath = path.resolve(__dirname, '../config/.env.bd');
dotenv.config({ path: envPath });

// Validação da variável
const dbLink = process.env.DB_LINK;
if (!dbLink) {
  throw new Error('DB_LINK não definido no arquivo .env.db');
}

// Conexão ao MongoDB
mongoose.connect(dbLink);

module.exports = mongoose;
