const jwt = require('jsonwebtoken');
const { validate } = require('../schemas/movieSchema');
const schema = require('../schemas/movieSchema');

const ADMIN_PROFILE = 1

function validateMovie(req, res, next) {
    //abortEarly faz validar todos os campos de uma vez
    // if(!req.body) return res.status(422)
    
    const { error } = schema.validate(req.body, {abortEarly: false })
    if (error)
        return res.status(422).json(error.details.map(d => d.message))

    next();
}



async function validateToken(req,res,next){
    let token = req.headers['authorization'];

    if(!token) res.sendStatus(401)

    token = token.replace('Bearer ','')

    try {
        // caso não consiga validar ele retorna uma exection

        const {userId,profileId} = jwt.verify(token,process.env.SECRET)

        res.locals.userId = userId;
        res.locals.profileId = profileId;
        next()
    } catch (error) {
        res.sendStatus(401)
    }
}

function validateAdmin(req,res,next){
    const {profileId ,userId} = res.locals;

     if(profileId == ADMIN_PROFILE){
        next();
     }else res.sendStatus(403) 
}



module.exports = { validateMovie,validateToken,validateAdmin }