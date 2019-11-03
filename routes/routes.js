const express = require('express');
const mysql = require('mysql');
let router = express.Router();

function execSQLQuery(slqQry, res){
    const connection = mysql.createConnection({
        host: 'XXX',
        port: 'XXX',
        user: 'XXX',
        password: 'XXX',
        database: 'XXX'
    });

    connection.query(slqQry, function(err, results, fields){
        if(err){
            res.json(err);
        }else{
            res.json(results);
        }
        connection.end();   //fecha a conexão
        console.log('Executado com sucesso');
    });
}

router.get('/', function(req, res){
    res.send('Funcionando!');
});

router.get('/clientes', function(req, res){
    execSQLQuery('SELECT * FROM clientes', res);
});

router.get('/clientes/:id?', function(req, res){
    let filter = '';
    if(req.params.id){
        filter = ' WHERE ID=' + parseInt(req.params.id);
        execSQLQuery('SELECT * FROM clientes' + filter, res);
    }
});

router.delete('/clientes/:id', function(req, res){
    execSQLQuery('DELETE FROM clientes WHERE ID=' + parseInt(req.params.id), res);
});

router.post('/clientes', function(req, res){
    let nome = req.body.nome;
    let cpf = req.body.cpf;
    execSQLQuery(`INSERT INTO clientes(Nome, CPF) VALUES('${nome}', '${cpf}')`, res)
});

router.patch('/clientes/:id', function(req, res){
    let id = parseInt(req.params.id);
    let nome = req.body.nome.substring(0, 30);
    let cpf = req.body.cpf.substring(0, 11);
    execSQLQuery(`UPDATE clientes SET Nome='${nome}', CPF='${cpf}' WHERE ID=${id}`, res);
});

module.exports = router;