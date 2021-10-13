const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


/*express*/
const app = express();
app.use(express.json());


/*cors*/
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Header', 'Content-Type, Origin, X-Requested-With, Accept, Authorization');
    
    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    }

    app.use(cors());
    next();
});


app.listen(process.env.PORT || 3000, () => {
    console.log("conectado");
});


/*configuração das rotas*/
app.get('/', (req, res) => {
    res.send("conectado");
})


app.post('/cadastrar', (req, res) => {
    /*mysql*/
    const connection = mysql.createConnection({
        host : "",
        user : "",
        password : "",
        database : ""
    });

    connection.connect();
    

    connection.query(`SELECT id FROM curriculos where cpf = "${req.body.cpf}"`, function(error, results){
        if(error){
            console.log(error);
        }else{
            if(results.length >= 1){
                res.send("0");
                
    
            }else{
                connection.query(`INSERT INTO curriculos (nome, profissão, data_de_nascimento, endereco, telefone_fixo, telefone_celular, email, identidade, cpf, estado_civil, sexo, possui_veiculo, possui_habilitacao) 
                VALUES("${req.body.nome}", "${req.body.profissao}", "${req.body.data_de_nascimento}", 
                "${req.body.endereco}", "${req.body.telefone_fixo}", "${req.body.telefone_celular}", 
                "${req.body.email}", "${req.body.identidade}", "${req.body.cpf}", "${req.body.estado_civil}", 
                "${req.body.sexo}", "${req.body.possui_veiculo}", "${req.body.possui_habilitacao}")`
                , function(error, results){
                    if(error){
                       
                    }
                })
    
                res.send("1");
                
            }
        }
        
        connection.end();
    
    })
})




