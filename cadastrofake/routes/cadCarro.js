const { Router } = require('express')

const route = Router()

global.carros = [{ Marca: 'palio', Modelo: 'sedan', Ano: '1991' },
                 { Marca: 'fiat', Modelo: 'sedan', Ano: '1992' },
                 { Marca: 'ferrari', Modelo: 'sedan', Ano: '1993' },
                 { Marca: 'pegout', Modelo: 'sedan', Ano: '1994' }]


route.get('/', (req, res, next) => {
    res.render('cadCarro')
})

route.post('/', (req, res, next) => {
    const  {Marca,Modelo,Ano}  = req.body
    global.carros.push({Marca,Modelo,Ano}) 
    res.redirect('carros')
})


module.exports = route;