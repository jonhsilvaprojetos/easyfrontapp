var obj = [
    {nome: 'victor', idade: 15},
    {nome: 'jonh', idade: 20},
    {nome: 'wagner', idade: 20},
    {nome: 'felipe', idade: 15},
    {nome: 'rafael', idade: 17},
    {nome: 'julio', idade: 20},
    {nome: 'fefranco', idade: 19},
    {nome: 'brunor', idade: 20},
    {nome: 'jaycutler', idade: 15},
    {nome: 'ronniecoleman', idade: 17},
    {nome: 'borther', idade: 20},
    {nome: 'grande', idade: 19}
]
const filterIdade = function(idade, limite){
  
    if(idade == 'all'){
        var nomes = obj.filter(item=>{ return item});
    }else{
        var nomes = obj.filter(item=>{
            if(item.idade == idade) return item;
        });
    }

    if(limite == 'all'){
        var nomeLimites = nomes.slice(0, obj.length + 1).filter(item=> { 
            return item
        });
    }else{
        var nomeLimites = nomes.slice(0, limite).filter(item=> { 
            return item
        });
    }
    return nomeLimites;

}

module.exports = filterIdade;