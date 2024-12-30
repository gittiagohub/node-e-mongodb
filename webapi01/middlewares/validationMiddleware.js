const userSchema = require('../models/userSchema')
module.exports = (req, res, next) =>{
    console.log('teste')
    if(['POST','PUT'].indexOf(req.method) != -1){
       if((!req.body.nome) || (!req.body.idade)){
          return res.status(422).json({ error: 'name and idade must have to be a value' })
       }
    }
    const { error } = userSchema.validate(req.body)
    if (error)
      return res.status(422).json({ error: error.details })
    else
      next()
  
  }