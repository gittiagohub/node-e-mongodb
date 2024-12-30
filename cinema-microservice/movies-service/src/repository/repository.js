const { ObjectId } = require('mongodb');
const database = require('../config/database')


async function getAllMovies(){
    const db = await database.connect();

    return db.collection('movies').find().toArray();
}

async function getMovieById(id){
    const db = await database.connect();

    return db.collection('movies').findOne({_id : new ObjectId(id)})
}

async function getMoviePremieres(){
    // data atual
    const monthAgo =  new Date();

    // setar um mês atras
    monthAgo.setMonth(-1)

    const db = await database.connect();

    // return db.collection('movies').find({datalancamento :{gte : monthAgo}}).toArray();
     return db.collection('movies').find().toArray();
}

async function addMovie(movie){
    console.log('movie' ,movie)
    const db = await database.connect();

    const result = await db.collection('movies').insertOne(movie);
    console.log('result' ,result)
    movie._id = result.insertedId

    return movie;
}


async function deleteMovie(movieId){
    const db = await database.connect();
    const result = await db.collection('movies').deleteOne({_id : new ObjectId(movieId) });
    return result;
}
module.exports ={getAllMovies,getMovieById,getMoviePremieres,addMovie,deleteMovie}