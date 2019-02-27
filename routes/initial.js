const express = require('express');
const router = express.Router();
const mercadopago = require('mercadopago');
mercadopago.configure({
    client_id: '6288694891199633',
    client_secret: 'clu1HafanjoFR1BfhIwfINeVElQBfgbB'
});

router.get('/', (req, res) => {
    res.render('home', {title: 'home', classBody: 'pagina-home'});
});

/*router.post('/produto', (req, res) =>{
    var preference = {
        items: [
          item = {
            id: '',
            title: req.body.nome,
            quantity: 1,
            currency_id: 'BRL',
            unit_price: parseFloat(req.body.preco)
          }
        ],
        payer: {
            email: req.body.email
          }
      };

      mercadopago.preferences.create(preference)
      .then(function (preference) {
          console.log(preference)
        res.render('produto', {nome: req.body.nome, preco: req.body.preco, linkcompra: preference.response.init_point})
      }).catch(function (error) {
        res.render('formpag');
      });
})

router.get('/viewpag', (req, res) => {
    //var pagid = '182319548-da020527-4435-48ef-8be5-f09be8056b0b'
    var filters = {
        "id": null,
        "site_id": null,
        "external_reference": null
    };

    mercadopago.getPreference (pagid).then((retorno)=>{
        console.log(retorno);
    });

mercadopago.searchPayment()
    .then((data) => {
            res.setHeader('Content-Type', 'application/json')
            res.json(data);
        })
        .catch((err) => {
            console.log (err);
        })
})*/

module.exports = router