const jwt = require('jsonwebtoken')



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

module.exports = validateToken;