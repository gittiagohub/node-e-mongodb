var express = require('express');
var router = express.Router();



router.get('/', function (req, res, next) {
    res.render('carro', {
        title: 'Listagem de carros',
    
        carros: global.carros || []
    
    });
});


module.exports = router;
