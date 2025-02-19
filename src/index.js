const express = require ('express');
const app = express();
const routesGallo = require('./routes/galloRoutes');
const routesUsuario = require('./routes/usuarioRoutes');
const routesSibbr = require('./routes/sibbrRoutes');
const bodyParser = require('body-parser');
require('./config/dbConfig');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(routesUsuario);
app.use(routesSibbr);
app.use(routesGallo);



app.listen(3333);