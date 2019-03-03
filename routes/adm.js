const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { eAdmin } = require("../helpers/eAdmin");

router.get('/', eAdmin, (req, res) => {
    res.send('Pagina administracao')
})

router.get('/apps', eAdmin, (req, res) => {
    res.send('Lista os apps')
})

router.get('/apps/comprejunto', eAdmin, (req, res)=>{
    res.render('comprejunto', {cssCompreJunto: 'styleCompreJunto.css', jsCompreJunto: 'indexCompreJunto.js', classBody: 'app-compre-junto'});
});

router.post('/apps/comprejunto', (req, res) => {
    res.json(JSON.parse(req.body.allProds));
})

module.exports = router