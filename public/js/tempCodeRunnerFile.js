var object = [
    {nome: 'victor', idade: 15},
    {nome: 'jonh', idade: 20},
    {nome: 'wagner', idade: 20},
    {nome: 'felipe', idade: 15},
    {nome: 'rafael', idade: 17},
    {nome: 'julio', idade: 20},
    {nome: 'fefranco', idade: 19}
]

var nota = object.filter(item=>{
    if( item.idade == '20'){
        return item;
    }
})
console.log(nota);