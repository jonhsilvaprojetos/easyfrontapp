const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res) => {
    res.send('Pagina administracao')
})

router.get('/apps', (req, res) => {
    res.send('Lista os apps')
})

router.get('/apps/comprejunto', (req, res)=>{
    res.render('comprejunto', {cssCompreJunto: 'styleCompreJunto.css', jsCompreJunto: 'indexCompreJunto.js', classBody: 'app-compre-junto'});
});

router.post('/apps/comprejunto/object', (req, res) => {
    res.json(JSON.parse(req.body.allProds));
})

module.exports = router