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
    password: {
        type: String,
        required: true
    },
    loja: {
        type: String
    },
    token: {
        type: String
    },
    periodo: {
        type: Date,
        default: daysToTest
    },
    status: {
        type: Number,
        default: 2
    }
})

mongoose.model("usuarios", Usuario);
module.exports = daysToTest;