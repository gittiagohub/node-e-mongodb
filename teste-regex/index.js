
const Joi = require("joi");

const schema = Joi.object({
    username : Joi.string()
    .pattern(/tiago/ig)// a string deve conter a palavra "tiago", i=incessitivo, g = global verificar todas em todas as linhas
    .pattern(/tiago./ig)// deve conter "tiago" mais qualquer outro caracter
    .pattern(/^tiago/ig)//^ deve começar com "tiago" 
    .pattern(/tiago$/ig)//^ deve acabar com "tiago" 
    .pattern(/tiago?/ig)//^ deve acabar com "tiag" o último caractere se torna opcional
    .pattern(/tiag*/ig)//^ o último caractere se torna opcional, pode "tiag" e tiaggggg, o último caractere pode repetir varias vezes
    .pattern(/[tiag]/ig)//^ aceita se possuir somente as letras "t","i","a","g" e "o"
    .pattern(/[tiag.]/ig)//^ se o ponto esta dentro de uma lista ele perde o funçao de ser um coringa
    .pattern(/(tiago|susi)/ig)//^ () delimita as regra, pode ser "tiago" ou "susi"
    .pattern(/([1-9]|susi)/ig)//^ () numeros entre 1 e 9 e o nome "susi"
    .pattern(/([1-9]|susi)(tiago)/ig)//^ deve combinar outros grupos tbm
    .pattern(/[abc]{2,4}/ig) // deve ter de 2 a 4 caracteres da lista abc
    .pattern(/[abc]{4}/ig) // deve ter de 2 a 4 caracteres da lista abc
    .pattern(/[abc]{3}/ig)// deve conter exatos tres juntos da mesma lista
    .required()
})