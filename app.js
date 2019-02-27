const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');


// Configurações

    // Sessão
    app.use(session({
        secret: "easyfrontapp",
        resave: true,
        saveUninitialized: true
    }))
    app.use(flash())

    // Bodyparse
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())


    // Handlebars Configurando engine
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')


    // Configurando diretorio estático
    app.use(express.static(path.join(__dirname,"public")))

    // Rotas

    // Rota default
    app.get('/', (req, res) => {
        res.render('home');
    });

    app.post('/user', (req, res)=>{

            res.render('user', {email: req.body.email, senha: req.body.senha, created_time: new Date().toLocaleDateString('pt-BR'), classBody: 'pagina-usuario'});
           

    });

    app.get('/login', (req, res)=>{
        res.render('formulario');
    });

    // Rota admin

    // Iniciando servidor
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log('Servidor Rodando!')
    })