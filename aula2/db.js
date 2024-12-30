const { ObjectId } = require('mongodb');


const mongoClient = require('mongodb').MongoClient;

function connectDataBase() {
    if (!global.connection)
        mongoClient.connect(process.env.MONGODB_CONNECTION )
            .then(connection => {
                global.connection = connection.db("aula");
                console.log("Connected!")
            })
            .catch(error => {
                console.log(error)
                global.connection = null
            })
}



// não exporta a conexão pq já esta na variavel global 

function findCustomers() {
    connectDataBase()

    return global.connection.
        collection("clientes").
        find({}).
        toArray();
}

function findCustomer(id) {
    connectDataBase()

    const objectId = new ObjectId(id);

    return global.connection.
        collection("clientes").
        findOne({ _id: objectId })
    // toArray();
}

function insertCustomer(customer) {
    connectDataBase()

    return global.connection.
        collection("clientes").
        insertOne(customer)
    // toArray();
}

function updateCustomer(id, customer) {
    connectDataBase()

    const objectId = new ObjectId(id);
    return global.connection.
        collection("clientes").
        updateOne({ _id: objectId }, { $set: customer })
    // toArray();
}

function deleteCustomer(id) {
    connectDataBase()

    const objectId = new ObjectId(id);
    return global.connection.
        collection("clientes").
        deleteOne({ _id: objectId })
    // toArray();
}

module.exports = { findCustomers, findCustomer, insertCustomer, updateCustomer, deleteCustomer }