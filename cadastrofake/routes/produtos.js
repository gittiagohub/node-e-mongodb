const { Router } = require("express");

const route = Router();
if (!global.produtos) global.produtos = []

route.get('/', (req, res, next) => {
    
    res.render('produto', { title: 'Listagem de produtos', produtos: global.produtos  })
    
})

module.exports = route