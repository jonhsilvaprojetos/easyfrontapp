const mercadopago = require('mercadopago');
mercadopago.configure({
    client_id: '6288694891199633',
    client_secret: 'clu1HafanjoFR1BfhIwfINeVElQBfgbB'
});

// Create a preference structure
var preference = {
    items: [
      item = {
        id: '',
        title: 'Apps easyfront',
        quantity: 1,
        currency_id: 'BRL',
        unit_price: 99.90
      }
    ],
    payer: {
        email: "jonhs2@outlook.com"
      }
  };
 
 const pagMP =  mercadopago.preferences.create(preference)
    .then(function (preference) {
      console.log(preference.response.init_point)
    }).catch(function (error) {
      console.log(error)
    });

module.exports = pagMP;