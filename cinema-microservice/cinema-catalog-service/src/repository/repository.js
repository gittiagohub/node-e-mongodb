const { ObjectId } = require('mongodb');
const database = require('../config/database')


async function getAllCities() {
    const db = await database.connect();

    //quando passo "1 quer dizer as colunas que eu quero, "0"as colunas que eu não quero"
    return db.collection('cinemaCatalog').find({})
        .project({ cidade: 1, uf: 1, pais: 1 })
        .toArray();
}

async function getCinemasByCityId(cityId) {
    const objCityId = new ObjectId(cityId)

    const db = await database.connect();

    // exemplo de como usar project/projection  com findOne  
    const city = await db.collection('cinemaCatalog')
        .findOne({ _id: objCityId }, { projection: { cinemas: 1 } })
    return city.cinemas;
}

async function getMoviesByCinemaId(cinemaId) {
    const objCinemaId = new ObjectId(cinemaId)
    const db = await database.connect();


    const group = await db.collection('cinemaCatalog').aggregate([
        { $match: { "cinemas._id": objCinemaId } },
        { $unwind: "$cinemas" },
        { $unwind: "$cinemas.salas" },
        { $unwind: "$cinemas.salas.sessoes" },
        { $group: { _id: { titulo: "$cinemas.salas.sessoes.filme", _id: "$cinemas.salas.sessoes.idFilme" } } },
    ]).toArray()

    return group.map((item) => item._id)
}


async function getMoviesByCityId(cityId) {
    const objcityId = new ObjectId(cityId)
    const db = await database.connect();


    const group = await db.collection('cinemaCatalog').aggregate([
        { $match: { "_id": objcityId } },
        { $unwind: "$cinemas" },
        { $unwind: "$cinemas.salas" },
        { $unwind: "$cinemas.salas.sessoes" },
        { $group: { _id: { titulo: "$cinemas.salas.sessoes.filme", _id: "$cinemas.salas.sessoes.idFilme" } } },
    ]).toArray()

    return group.map((item) => item._id)
}

async function getMovieSessionByCityId(movieId, cinemaId) {
    const objCinemaId = new ObjectId(cinemaId)
    const objmovieId = new ObjectId(movieId)
    const db = await database.connect();

    const group = await db.collection('cinemaCatalog').aggregate([
        
        { $unwind: "$cinemas" },
        { $match: { 'cinemas._id': objCinemaId } },
        { $unwind: "$cinemas.salas" },
        { $unwind: "$cinemas.salas.sessoes" },
        { $match: { "cinemas.salas.sessoes.idFilme": objmovieId } },
        {
            $group: {
                _id: {
                    titulo: "$cinemas.salas.sessoes.filme",
                    _id: "$cinemas.salas.sessoes.idFilme",
                    cinema: "$cinemas.nome",
                    idCinema: "$cinemas._id",
                    sala: "$cinemas.salas.nome",
                    sessao: "$cinemas.salas.sessoes"
                }
            }
        },
    ]).toArray()

    return group.map(item => item._id)


}

async function getMovieSessionsByCinemaId(movieId,cinemaId) {
    const objCinemaId = new ObjectId(cinemaId)
    const objmovieId = new ObjectId(movieId)
    
    const db = await database.connect()
    return db.collection('cinemaCatalog').aggregate([
        { $match: { 'cinemas._id': objCinemaId } },
        { $unwind: "$cinemas" },
        { $unwind: "$cinemas.salas" },
        { $unwind: "$cinemas.salas.sessoes" },
        { $match: { 'cinemas.salas.sessoes.idFilme': objmovieId } },
        // { $unwind: "$cinemas.salas.sessoes.assentos" },
        {
            $group: {
                _id: {
                    data: "$cinemas.salas.sessoes.data",
                    _idFilme: "$cinemas.salas.sessoes.idFilme",
                    filme: "$cinemas.salas.sessoes.filme",
                    valor: "$cinemas.salas.sessoes.valor",
                    // assentos: "$cinemas.salas.sessoes.assentos",
                    // numero: "$cinemas.salas.sessoes.assentos.numero",
                    // disponivel: "$cinemas.salas.sessoes.assentos.disponivel",
                }
            }
        },

    ]).toArray()
}



module.exports = { getAllCities, getCinemasByCityId, getMoviesByCinemaId, getMoviesByCityId, getMovieSessionByCityId, getMovieSessionsByCinemaId }