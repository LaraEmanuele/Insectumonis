const mongoose = require('mongoose');

const dbConfig = 'mongodb+srv://laraemanuele:admin@insectumonis.kxsg4.mongodb.net/?retryWrites=true&w=majority&appName=Insectumonis';

const connection = mongoose.connect(dbConfig);

module.exports = connection;
