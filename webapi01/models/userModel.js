const { v4 } = require('uuid')
const fs = require('fs');
const path = require('path');
const FILE_PATH = path.join(__dirname,"../","data", "users.json")



function findUsers() {

    if (!fs.existsSync(FILE_PATH)) return []
    const rawData = fs.readFileSync(FILE_PATH)

    return JSON.parse(rawData)

    // try {
    //     return require('./users.json')
    // } catch (error) {
    //     return [];
    // }

}
function findUser(id) {
    return findUsers().find(item => item.id === id);
}
function inserUser(user) {
    const users = findUsers()
    user.id = v4();
    users.push(user)
    fs.writeFileSync(FILE_PATH, JSON.stringify(users))
    return user
}
function updateUser(id, user, overWrite = true) {
    const users = findUsers()
    const index = users.findIndex(item => item.id == id)

    if (index == -1) {
        return ['not found']
    }
    if (overWrite) {
        users[index] = user;
    } else {
        for (let key in user) {
            users[index][key] = user[key]
        }
    }





    // users.forEach((item, index, array) => {
    //     if (item.id == id) {
    //         user.id = id
    //         array[index] = user;
    //         return array[index]
    //     }
    // });
    fs.writeFileSync(FILE_PATH, JSON.stringify(users))
    return users[index]

}

function deleteUser(id) {
    const users = findUsers()
    users.forEach((item, index, array) => {
        if (item.id == id) {
            array.splice(index, 1)
        }
    });
    fs.writeFileSync(FILE_PATH, JSON.stringify(users))

    return users
}


module.exports = { findUsers, findUser, inserUser, updateUser, deleteUser }