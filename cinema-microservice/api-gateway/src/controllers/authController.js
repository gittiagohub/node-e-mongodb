const { func } = require('joi');
const jwt = require('jsonwebtoken')
const repository = require('../repository/repository')
const schema = require('../schema/login')

async function doLogin(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await repository.getUser(email, password)
        const token = jwt.sign({ userId: user._id, profileId: user.profileId },
            process.env.SECRET,
            { expiresIn: parseInt(process.env.EXPIRES) });

        res.json({ token });
    } catch (error) {
        res.sendStatus(401)
    }
}

async function doLogout(req, res, next) {
    const { userId } = res.locals;

    let token = req.headers['authorization'];
    token = token.replace('Bearer ', '')

    await repository.blackListToken(token)
    res.sendStatus(200)
}

async function validateLoginSchema(req, res, next) {
    const { error } = await schema.validate(req.body);

    if (error) {
        const { details } = error;
        return res.status(422).json(details.map(d => d.message));
    }
    next()
}

async function validateBlackList(req, res, next) {
    let token = req.headers['authorization'];
    if (!token) return next()

    token = token.replace('Bearer ', '')

    const isBlackListed = await repository.checkBlacklist(token)

    if (isBlackListed)
        return res.sendStatus(401)
    else next();
}

async function validateToken(req, res, next) {
    let token = req.headers['authorization'];

    if (!token) res.sendStatus(401)

    token = token.replace('Bearer ', '')

    try {
        // caso não consiga validar ele retorna uma exection

        const { userId, profileId } = jwt.verify(token, process.env.SECRET)

        res.locals.userId = userId;
        res.locals.profileId = profileId;
        next()
    } catch (error) {
        res.sendStatus(401)
    }
}

module.exports = { doLogin, doLogout, validateToken, validateBlackList,validateLoginSchema }