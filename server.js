// Configurando o servidor
const express = require("express")
const server = express()

// Configurar servidor para apresentar arquivos extras/estáticos
server.use(express.static('public'))

// Habilitar body do formulário
server.use(express.urlencoded({ extended: true }))

// Configurar a conexão com o banco de dados
const Pool = require('pg').Pool
const db = new Pool({
    Host: 'localhost',
    Database: 'doe',
    Username: 'postgres',
    Password: 'developer07',
    Port: 5432
})

// Configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true,
})

// Lista de doares: Vet ou Array
/*
const donors = [
    {
        name: "Lenon",
        blood: "AB+"
    },
    {
        name: "Pedro",
        blood: "O-"
    },
    {
        name: "João",
        blood: "B+"
    },
    {
        name: "Maria",
        blood: "A-"
    },
]
*/


// Configuar a apresentação da página

server.get("/", function(req, res){
    
    db.query("SELECT * FROM donors", function(err, result){

        if (err) return res.send("Erro de banco de dados")
        const donors = result.rows
        return res.render("index.html", {donors})
    })
})


server.post("/", function (req, res) {

    // Método para pegar dados do formulário
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    if (name == "" || email == "" || blood == "") {
        return res.send("Todos os campos são obrigatórios.")
    }

    // Coloca valores dentro do banco de dados
    const query = `
        INSERT INTO donors ("name", "email", "blood")
        VALUES ($1, $2, $3)`
    // Coloca valores dentro do Array
    const values = [name, email, blood]
    /*
    donors.push({
         name: name,
         blood: blood,
    })
    */

    //Redireciona para a página inicial
    db.query(query, values, function (err) {
        //Fluxo de erro
        if (err) return res.send("erro no banco de dados.")

        //Fluxo ideal
        return res.redirect("/")
    })
    
})

// Ligar servidor e permitir o acesso na porta 300
server.listen(3000, function () {
    console.log("Iniciei o servidor")
})

















/* Conceito de função e implementção de funcionalidades
// logica de fazer um cafe
const cor = "branco"
const tamanaho = 2.5
function verificaSeOCopoEstaSujo(sujo){
    // lógica para ver se o copo está sujo
    return `O copo ${sujo}`
}
const copo = {
    cor,
    tamanaho,
    verificaSeOCopoEstaSujo
}
console.log(copo.verificaSeOCopoEstaSujo("está sujo"))
console.log(copo.verificaSeOCopoEstaSujo("não está sujo"))
console.log(copo.verificaSeOCopoEstaSujo("está sujo"))
console.log(copo.verificaSeOCopoEstaSujo("não está sujo"))
console.log(copo.verificaSeOCopoEstaSujo("está sujo"))
console.log(copo.verificaSeOCopoEstaSujo("não está sujo"))
*/
