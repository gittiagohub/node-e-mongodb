var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {

    res.render('teste', { title: 'node is super cool ', numero: 10 });
})

module.exports = router;
