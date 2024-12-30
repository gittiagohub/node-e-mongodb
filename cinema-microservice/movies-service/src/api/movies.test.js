const { test, expect, beforeAll ,afterAll} = require('@jest/globals')
const server = require('../server/server')
const request = require('supertest')
const movies = require('./movies')
const repositoryMock = require('../repository/__mocks__/repository')
// const { JsonWebTokenError, verify } = require('jsonwebtoken')
const { token } = require('morgan')

const adminToken = '1';
const guestToken = '2';

jest.mock('../node_modules/jsonwebtoken', () => {
    return {
        verify: (token) => {
            if (token === adminToken) return { userId: 1, profileId: 1 }
            else if (token === guestToken) return { userId: 2, profileId: 2};
            else throw new Error('Invalid token!');
        }
    }
})

let app = null

beforeAll(async () => {
    process.env.PORT = 3002
    app = await server.start(movies, repositoryMock)
})

afterAll(async () => {
    server.stop()
})



test('GET /movies 200 ok', async () => {
    const response = await (await request(app).get('/movies').set('authorization', `Bearer ${adminToken}`))

    expect(response.status).toEqual(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toBeTruthy()
})

test('GET /movies 401 UNAUTHORIZED', async () => {
    const response = await (await request(app).get('/movies'))//.set('authorization',`Bearer ${adminToken}`)

    expect(response.status).toEqual(401)
})

test('GET /movies 401 UNAUTHORIZED TOKEN ERROR', async () => {
    const response = await (await request(app).get('/movies')).set('authorization',`Bearer 3`)

    expect(response.status).toEqual(401)
})

test('GET /movies/:id 200 ok', async () => {
    const testMovieId = '1';
    const response = await request(app).get(`/movies/${testMovieId}`).set('authorization', `Bearer ${adminToken}`)

    expect(response.status).toEqual(200)
    expect(response.body._id).toEqual(testMovieId)
})

test('GET /movies/:id 401 UNAUTHORIZED', async () => {
    const testMovieId = '1';
    const response = await request(app).get(`/movies/${testMovieId}`)//.set('authorization',`Bearer ${adminToken}`)

    expect(response.status).toEqual(401)
})

test('GET /movies/premieres 200 ok', async () => {
    const response = await request(app).get('/movies/premieres').set('authorization', `Bearer ${adminToken}`)

    expect(response.status).toEqual(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toBeTruthy()
})


test('GET /movies/premieres 401 UNATHORIZED', async () => {
    const response = await request(app).get('/movies/premieres')//.set('authorization',`Bearer ${adminToken}`)

    expect(response.status).toEqual(401)


})




test('GET /movies/:id 404 notfound', async () => {
    const testMovieId = '-1';
    const response = await request(app).get(`/movies/${testMovieId}`).set('authorization', `Bearer ${adminToken}`)

    expect(response.status).toEqual(404)
    // expect(response.body._id).toEqual(testMovieId)
})


// test('Health check', async () => {
//     process.env.PORT = 3001
//     const app = await server.start(apiMock)
//     const response = await request(app).get('/health')
//     expect(response).toBeTruthy()
//     expect(response.status).toEqual(200)
// })

// test('Server stop', async () => {
//     const IsStoped = await server.stop()
//     expect(IsStoped).toBeTruthy()
// })

test('POST /movies/ 201 OK', async () => {
    const movie = {
        titulo: 'teste movie',
        sinopse: 'movie summary',
        duracao: 120,
        dataLancamento: new Date(),
        imagem: 'https://.gif',
        categoria: ['aventure']
    }
    const response = await request(app)
        .post('/movies/')
        .set('Content-Type', 'application/json')  
        .set('authorization', `Bearer ${adminToken}`)
        .send(movie)

    expect(response.status).toEqual(201)
    expect(response.body).toBeTruthy()
    // expect(response.body._id).toEqual(testMovieId)
})

test('POST /movies/ 401 UNATHORIZED', async () => {
    const movie = {
        titulo: 'teste movie',
        sinopse: 'movie summary',
        duracao: 120,
        dataLancamento: new Date(),
        imagem: 'https://.gif',
        categoria: ['aventure']
    }
    const response = await request(app)
        .post('/movies')
        .set('Content-Type', 'application/json')
        //.set('authorization',`Bearer ${adminToken}`)
        .send(movie)

    expect(response.status).toEqual(401)
    // expect(response.body).toBeTruthy()
    // expect(response.body._id).toEqual(testMovieId)
})
test('POST /movies/ 403 FORBIDDEN', async () => {
    const movie = {
        titulo: 'teste movie',
        sinopse: 'movie summary',
        duracao: 120,
        dataLancamento: new Date(),
        imagem: 'https://.gif',
        categoria: ['aventure']
    }
    const response = await request(app)
        .post('/movies')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${guestToken}`)
        .send(movie)
    
    expect(response.status).toEqual(403)

    // expect(response.body._id).toEqual(testMovieId)
})
test('POST /movies/ 422 UNPROCESSABLE ENTITY', async () => {
    const movie = {
      abcd:'teste'
    }
    const response = await request(app)
        .post('/movies')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${adminToken}`)
        .send(movie)

    expect(response.status).toEqual(422)
    expect(response.body).toBeTruthy()
    // expect(response.body._id).toEqual(testMovieId)
})

test('POST /movies/ 422 UNPROCESSABLE ENTITY EMPTY PAY LOAD', async () => {
    const movie = {}
    const response = await request(app)
        .post('/movies')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${adminToken}`)
        .send(movie)

    expect(response.status).toEqual(422)
    expect(response.body).toBeTruthy()
    // expect(response.body._id).toEqual(testMovieId)
})

test('delete /movies/ 204 no content', async () => {

    const response = await request(app)
        .delete('/movies/1')
        .set('authorization', `Bearer ${adminToken}`)


    expect(response.status).toEqual(204)
    expect(response).toBeTruthy()
    // expect(response.body._id).toEqual(testMovieId)
})

test('delete /movies/ 401 UNATHORIZED', async () => {

    const response = await request(app)
        .delete('/movies/1')
    //.set('authorization',`Bearer ${adminToken}`)


    expect(response.status).toEqual(401)
    // expect(resaponse).toBeTruthy()
    // expect(response.body._id).toEqual(testMovieId)
})

test('delete /movies/ 403 no content', async () => {

    const response = await request(app)
        .delete('/movies/1')
        .set('authorization', `Bearer ${guestToken}`)


    expect(response.status).toEqual(403)

    // expect(response.body._id).toEqual(testMovieId)
})