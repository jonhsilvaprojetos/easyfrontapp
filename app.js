const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const admin = require('./routes/adm');
const initial = require('./routes/initial');
const user = require('./routes/usuario');
const AJX = require('./models/Requisicao');
const FilterParams = require('./public/js/indexApp');


// Configurações

    // Criando Session
    app.use(session({
        secret: "cursodenode",
        resave: true,
        saveUninitialized: true
    }))
    app.use(flash())

    // Middleware (Criando variaveis globais momentaneas)
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        next()
    })

    // Bodyparse
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())


    // Handlebars Configurando engine
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')

    // Mongoose
        mongoose.connect("mongodb://localhost/easyfrontapp", {
                useNewUrlParser: true
        }).then(() => console.log("Conectado ao Mongo"))
          .catch((error) => console.log("Erro ao conectar ao mongo: "+error))


    // Configurando diretorio estático
    app.use(express.static(path.join(__dirname,"public")))

    // Rotas
    // rota teste
    app.get('/nomes/idade=:idade/limite=:limite', (req, res)=>{
        var obj = FilterParams(req.params.idade,req.params.limite);
        res.json(obj);
    });

    //rotas Requi
   app.get('/form', (req, res)=>{
        res.render('form');
    });
    app.post('/prods', (req, res)=>{
        AJX(`https://api.awsli.com.br/v1/produto?format=json&chave_api=${req.body.api}&chave_aplicacao=${req.body.aplication}`).then((object)=>{
            res.json(object);
        },(error)=>{
            res.send(error);
        });
    });

    // Rota default
    app.use('/', initial)

    // Rota admin
    app.use('/adm', admin)

    // Rota Usuarios
    app.use('/user', user);

    // Iniciando servidor
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log('Servidor Rodando!')
    })