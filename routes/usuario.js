const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Usuario");
const Usuario = mongoose.model('usuarios');
const bcrypt = require('bcryptjs');

router.get("/register", (req, res) => {
    res.render("user/register", {title: 'Cadastro', classBody: 'pagina-register'})
})

router.get("/list-users/id=:id", (req, res) => {
    if(req.params.id == 'all'){
        Usuario.find().then((usuarios) => {
            res.json(usuarios)
        }).catch((error) => res.json({error: "Nenhum usuario encontrado"}))
    }else{ 
        Usuario.findOne({_id: req.params.id}).then((usuario) => {
            res.json(usuario)
        }).catch((error) => res.json({error: "Nenhum usuario encontrado"}))
    }
})

router.post("/register", (req, res) => {
    // verifica se já existe um e-mail cadastrado
    Usuario.findOne({email: req.body.email})
           .then((usuario) => {
               if(usuario){
                    req.flash("error_msg", "Já existe uma conta com este e-mail")
                    res.redirect("user/register")
               }else{

                    const novoUsuario = new Usuario({
                        nome: req.body.nome,
                        email: req.body.email,
                        senha: req.body.senha
                    })

                    bcrypt.genSalt(10, (erro, salt) => {
                        bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                            if(erro){
                                req.flash("error_msg", "Houve um erro ao cadastrar")
                                res.redirect("/")
                            }else{
                                
                                novoUsuario.senha = hash
                                        novoUsuario.save().then(() => {
                                            req.flash("success_msg", "Usuario cadastrado com sucesso!")
                                            res.redirect("/")
                                        }).catch((error) => {
                                            console.log(error)
                                            req.flash("error_msg", "Houve um erro interno ao cadastrar")
                                            res.redirect("/")
                                        })
        
                            }
                        })
                        
                    })

               }
           }).catch((error) => {
               req.flash("error_msg", "Houve um erro interno")
               res.redirect("/")
           })

})


module.exports = router