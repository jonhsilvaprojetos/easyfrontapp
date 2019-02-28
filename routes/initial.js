const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require("../models/Usuario");
const Usuario = mongoose.model("usuarios");

router.get('/', (req, res) => {
    res.render('home', {title: 'Home', classBody: 'pagina-home'});
});

router.get('/register', (req, res) => {
    res.render('register', {title: 'Cadastro', classBody: 'pagina-register'})
})

router.post('/register/new', (req, res) => {

    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido"})
    }

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "Email Inválido"})
    }

    if(erros.length > 0){
        res.render("/register", {erros: erros})
    }else{

    var newUser = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    }

    new Usuario(newUser).save()
        .then(() => {
            req.flash("success_msg", "Cadastro realizado com sucesso.")
            res.redirect("/login")
        })
        .catch((err) => {
            req.flash("error_msg", "Houve um erro ao se cadastrar.")
            res.redirect("/register");
        })
    }
})

module.exports = router