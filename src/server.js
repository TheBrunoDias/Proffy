//SERVER
const express = require('express')
const server = express()

const { pageLanding, pageStudy, pageGiveClasses, saveClasses } = require('./pages')

//configurar nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server
    //receber os dados do req.body para esconder do query
    .use(express.urlencoded({extended: true}))
    //configurar arquivos estátitos (css,script, imagens)
    .use(express.static("public"))
    //rotas de aplicação
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses)
    .post("/save-classes",saveClasses)
    //inicar o servidor
    .listen(5500, () => console.log("Server on na URL: http://localhost:5500"))

