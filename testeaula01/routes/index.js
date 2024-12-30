var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //nome da view já definido
  res.render('index', { title: 'Expreskks',idade: 31, obj: {} });
});

module.exports = router;
