const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res) => {
    res.send('Pagina administracao')
})

router.get('/apps', (req, res) => {
    res.send('Lista os apps')
})

module.exports = router