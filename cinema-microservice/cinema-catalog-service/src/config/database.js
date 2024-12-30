const MongoClient = require("mongodb").MongoClient 
let client = null

async function connect(){
   
    if (!client) 
    client = new MongoClient(process.env.MONGO_CONNECTION)

    await client.connect();
    return client.db(process.env.DATA_BASE)
}

async function disconnect(){
    if (!client) return true;

    await client.close();
    client = null;

    return true;
}

module.exports ={connect,disconnect}