const { test, expect, beforeAll } = require('@jest/globals')
const repository = require('./repository')

const { ObjectId } = require('mongodb');

let testMovieId = null;

beforeAll(async () => {
    const movies = await repository.getAllMovies();
    testMovieId = movies[0]._id

})

test('getAllMovies', async () => {
    const movies = await repository.getAllMovies()
    expect(Array.isArray(movies)).toBeTruthy()
    expect(movies.length).toBeTruthy()

})


test('getMovieById', async () => {
    const movie = await repository.getMovieById(testMovieId)
    expect(movie).toBeTruthy()
    expect(movie._id).toEqual(testMovieId)
})

test('getMoviePremieres', async () => {
    const monthAgo = new Date()
    monthAgo.setMonth(-1)

    const movies = await repository.getMoviePremieres()
    expect(Array.isArray(movies)).toBeTruthy()

    expect(movies.length).toBeTruthy()
    expect(movies[0].datalancamento.getTime()).toBeGreaterThanOrEqual(monthAgo.getTime())

})

test('AddMovie', async () => {
    const movie = {
        titulo: 'teste movie',
        sinopse: 'movie summary',
        duracao: 120,
        dataLancamento: new Date(),
        imagem: 'image.jpg',
        categorica: ['aventure']
    }

    let result
    try {
        result = await repository.addMovie(movie)
        expect(result).toBeTruthy()
    }
    finally {
        if (result)
            await repository.deleteMovie(result._id)
    }
})


test('deleteMovie', async () => {
    const movie = {
        titulo: 'teste movie',
        sinopse: 'movie summary',
        duracao: 120,
        dataLancamento: new Date(),
        imagem: 'image.jpg',
        categorica: ['aventure']
    }

    const resultMovie = await repository.addMovie(movie)
     
    const result = await repository.deleteMovie(resultMovie._id)
    expect(result).toBeTruthy()
})



