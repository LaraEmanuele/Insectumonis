const express = require ('express');
const app = express();
const routesUsuario = require('./routes/usuarioRoutes');
const bodyParser = require('body-parser');
require('./config/dbConfig');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(routesUsuario);



app.listen(3333);