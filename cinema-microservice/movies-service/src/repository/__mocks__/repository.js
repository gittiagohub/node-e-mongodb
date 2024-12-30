const movies =
    [{
        "_id": "605e57238ed0562b5da2f87d",
        "Titutlo": "Os vingadores",
        "sinopse": "teste",
        "duracao": 149,
        "datalancamento": new Date("2022-10-25T00:00:00Z"),
        "imagem": "semimagem.com",
        "categorias": ["Ação,Aventura"]
    },
    {
        "_id": "605e57238ed0562b5da2f87d",
        "Titutlo": "Os vingadores",
        "sinopse": "teste",
        "duracao": 149,
        "datalancamento": new Date("2022-10-25T00:00:00Z"),
        "imagem": "semimagem.com",
        "categorias": ["Ação,Aventura"]
    }
    ]

async function getAllMovies() {
    return movies
}

async function getMovieById(id) {
    if (id == -1) return null;

    movies[0]._id = id
    return movies[0]
}

async function getMoviePremieres() {
    movies[0].datalancamento = new Date
    return [movies[0]]
}

async function addMovie(movie){
    return movies[0]
}

async function deleteMovie(movieId){
    if(!movieId){
        throw new Error('Não foi possivel excluir este filme')
    }
    return true
}


module.exports = { getAllMovies, getMovieById, getMoviePremieres,addMovie,deleteMovie }