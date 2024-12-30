const { Router } = require('express')

const route = Router()


route.get('/', (req, res, next) => {
    res.render('cadProduto')
})

route.post('/', (req, res, next) => {
    const { Nome, Preco } = req.body
    global.produtos.push({ Nome, Preco })
    res.redirect('produtos')
})

module.exports = route