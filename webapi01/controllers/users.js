const db = require('../models/userModel')

function getUsers(req, res, next) {
    res.json(db.findUsers());
  }

  function getUser(req, res, next) {
    const id = req.params.id
  
    res.json(db.findUser(id));
  }

  function postUsers (req, res, next) {
    const user = db.inserUser(req.body)
    res.status(201).json(user)
  }

  function putUser(req, res, next) {
    const user = db.inserUser(req.body)
    res.status(201).json(user)
  }

 function patchUser(req, res, next) {
    const id = req.params.id
    const user = db.updateUser(id, req.body, false)
    res.status(201).json(user)
  
  }

  function deleteUser(req, res, next) {
    const id = req.params.id
    const user = db.deleteUser(id)
    res.status(200).json(user)
  
  }
  module.exports = {
    getUsers,
    getUser,
    postUsers,
    putUser,
    patchUser,
    deleteUser
  }