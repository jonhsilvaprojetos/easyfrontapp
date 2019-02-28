const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var date = new Date();
var testDays = 5;
var setdaysToTest = date.setDate(date.getDate() + testDays);
var daysToTest = date.toLocaleDateString('pt-BR');

const Usuario = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    loja: {
        type: String
    },
    token: {
        type: String,
        required: true,
        default: "EFA" + Date.now()
    },
    periodo: {
        type: Date,
        default: daysToTest
    },
    eAdmin: {
        type:Number,
        default: 0
    },
    status: {
        type: Number,
        default: 2
    }
})

mongoose.model("usuarios", Usuario);