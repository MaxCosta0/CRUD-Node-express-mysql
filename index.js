const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const routes = require('./routes/routes');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(routes);

app.listen(port, function(err){
    if(!err){
        console.log(`API Funcionando corretamente na porta ${port}.`);
    }
    else{
        console.log(`Não foi possivel obter conexão com a porta ${port}.`);
    }
});