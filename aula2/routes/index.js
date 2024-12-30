var express = require('express');
const { Db } = require('mongodb');
var router = express.Router();

const db = require("../db")


// não carregaria duas vezes a linha abaixo pois a primeira linha deixa o modulo em cash
// const db2   = require("../db")

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const customers = await db.findCustomers();
    res.render('index', { title: 'Express', customers });
  } catch (error) {
    
    res.render("error", { message: "Não foi possível localizar os clientes", error })
  }

});

router.get('/new', async function (req, res, next) {
  // const customers = await db.findCustomers();
  // console.log(customers)
  try {
    res.render('customers', { title: 'Cadastro de Cliente', customer: {} });
  } catch (error) {
    res.render("error", { message: "Não foi possível localizar a página de cadastro de cliente", error })
  }

});

router.post('/new', async function (req, res, next) {
  const { id, nome, idade, cidade, uf } = req.body;

  if (!nome) {
    return res.redirect("/new?error= O campo nome é obrigatório")
  }
  if (!(idade) || !/[0-9]+/.test(idade)) {
    return res.redirect("/new?error= Valor invalido para a idade")
  }
  if (uf == '-1') {
    return res.redirect("/new?error= Selecione um estado")
  }
  try {
    const promise = id ? db.updateCustomer(id, { nome, idade, cidade, uf }) :
      db.insertCustomer({ nome, idade, cidade, uf })
    
    promise
      .then((result => { res.redirect('/') }))
  } catch (error) {
    res.render("error", { message: "Não foi possível salvar o cliente", error })
  } 
  
});

router.get('/edit/:customerId', async function (req, res, next) {

  const id = req.params.customerId

  db.findCustomer(id).
    then(customer => {
    
      res.render('customers', { title: 'Edição de Cliente', customer });
    }).
    catch(error => res.render("error", { message: "Não foi possível encontrar o cliente", error }))


});

router.get('/delete/:customerId', async function (req, res, next) {

  const id = req.params.customerId

  db.deleteCustomer(id).
    then(customer => {
      res.redirect('/');
    }).
    catch(error => res.render("error", { message: "Não foi possível apagar o cliente", error }))
});

module.exports = router;
