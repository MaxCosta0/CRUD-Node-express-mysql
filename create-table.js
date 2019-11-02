const mysql = require('mysql');

//Conectando o bando de dados
const connection = mysql.createConnection({
    hots: 'XXX',
    port: XXX,
    user: 'XXX',
    password: 'XXX',
    database: 'XXX'
});

//Verifica se a conexao foi estabelecida
connection.connect(function(err){
    if(err){
        return console.log(err);
    }else{
        console.log('Conectado');
        createTable(connection);
    }
});

//Cria uma tabela no banco de dados
function createTable(conn){
    const sql = "CREATE TABLE IF NOT EXISTS clientes (\n"+
                "ID int NOT NULL AUTO_INCREMENT, \n"+
                "Nome varchar(30) NOT NULL, \n"+
                "CPF char(11) NOT NULL, \n"+
                "PRIMARY KEY (ID)\n"+
                ");";

    conn.query(sql, function(err, results, field){
        if(err){
            return console.log(err);
        }
        console.log('Tabela criada');
        addValues(connection);
    });
}

//Adiciona valores à tabela criada
function addValues(conn){
    const sql = 'INSERT INTO clientes(Nome, CPF) VALUES ?';
    const values = [
        ['Barba Branca', '12345678901'],
        ['Escanor', '13452673215'],
        ['Yoriichi', '93748201938'],
        ['Vegeta', '92817493372'],
        ['Roy Mustang', '27482048372']
    ];
    conn.query(sql, [values], function(err, results, fields){
        if(err){
            return console.log(err);
        }
        console.log('Registros adicionados');
        conn.end(); //fecha a conexao
    });
}