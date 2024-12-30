const database = require('../config/database')

const bcrypt = require('bcryptjs')

async function getUser(email, password) {
    const db = await database.connect()
    const user = await db.collection('users')
        .findOne({ email })


    if (!user) throw new Error('Wrong user and/or password!')

    const isValid = bcrypt.compareSync(password, user.password)
    if (!isValid) throw new Error('Wrong user and/or password!')

    return user;
}

async function blackListToken(token) {
    const db = await database.connect()
    return await db.collection('blacklist')
        .insertOne({ _id: token, data : new Date() })
}

async function checkBlacklist(token) {
    const db = await database.connect()
    const qtde = await db.collection('blacklist')
        .countDocuments({ _id: token })

    return qtde > 0
}

module.exports = { getUser, blackListToken, checkBlacklist }