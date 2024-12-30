const { test, expect, beforeAll } = require('@jest/globals')
const server = require('../server/server')
const request = require('supertest')
const cinemaCatalog = require('./cinemaCatalog')
const repositoryMock = require('../repository/__mocks__/repository')

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
    process.env.PORT= 3004
    app = await server.start(cinemaCatalog, repositoryMock)
})

afterAll(async () => {
    server.stop()
})



test('GET /cities 200 ok', async () => {
    const response = await request(app).get('/cities').set('authorization', `Bearer ${adminToken}`)

    expect(response.status).toEqual(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toBeTruthy()
})

test('GET /cities 401', async () => {
    const response = await request(app).get('/cities')

    expect(response.status).toEqual(401)
})
test('GET /cities 401', async () => {
    const response = await request(app).get('/cities').set('authorization', `Bearer 3`)

    expect(response.status).toEqual(401)
})

test('GET /cities/:cityId/movies 200 ok', async () => {
    const testCityId = '1';
    const response = await request(app).get(`/cities/${testCityId}/movies`).set('authorization', `Bearer ${adminToken}`)

    expect(response.status).toEqual(200)
    expect(response.body._id).toEqual(testCityId)
})

test('GET /cities/:cityId/movies 401', async () => {
    const testCityId = '1';
    const response = await request(app).get(`/cities/${testCityId}/movies`)

    expect(response.status).toEqual(401)
})

test('GET /cities/:cityId/movies 404 notfound', async () => {
    const testCityId = '-1';
    const response = await request(app).get(`/cities/${testCityId}/movies`).set('authorization', `Bearer ${adminToken}`)

    expect(response.status).toEqual(404)
    // expect(response.body._id).toEqual(testMovieId)
})

test('GET /cities/:cityId/movies/:movieId 200 ok', async () => {
    const testCityId = '1';
    const testMovieId = '1';
    const response = await request(app).get(`/cities/${testCityId}/movies:${testMovieId}`).set('authorization', `Bearer ${adminToken}`)

    expect(response.status).toEqual(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toBeTruthy()
})
test('GET /cities/:cityId/movies/:movieId 401 ', async () => {
    const testCityId = '1';
    const testMovieId = '1';
    const response = await request(app).get(`/cities/${testCityId}/movies:${testMovieId}`)

    expect(response.status).toEqual(401)
   
})


test('GET /cities/:cityId/movies/:movieId 404 notfound', async () => {
    const testCityId = '-1';
    const testMovieId = '-1';
    const response = await request(app).get(`/cities/${testCityId}/movies:${testMovieId}`).set('authorization', `Bearer ${adminToken}`)

    expect(response.status).toEqual(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toBeTruthy()
})


test('GET /cities/:cityId/cinemas 200 ok', async () => {
    const testCityId = '1';
    const response = await request(app).get(`/cities/${testCityId}/cinemas`).set('authorization', `Bearer ${adminToken}`)

    expect(response.status).toEqual(200)
    expect(response.body._id).toEqual(testMovieId)
})
test('GET /cities/:cityId/cinemas 401 ', async () => {
    const testCityId = '1';
    const response = await request(app).get(`/cities/${testCityId}/cinemas`)

    expect(response.status).toEqual(401)
})

test('GET /cities/:cityId/cinemas 404 notfound', async () => {
    const testCityId = '-1';
    const response = await request(app).get(`/cities/${testCityId}/cinemas`).set('authorization', `Bearer ${adminToken}`)

    expect(response.status).toEqual(404)
    // expect(response.body._id).toEqual(testMovieId)
})

test('GET /cinemas/:cinemasId/movies 200 ok', async () => {
    const testCinemasId = '1';
    const response = await request(app).get(`/cinemas/${testCinemasId}/movies`).set('authorization', `Bearer ${adminToken}`)
    expect(response.status).toEqual(200)
    expect(response.body._id).toEqual(testMovieId)
})

test('GET /cinemas/:cinemasId/movies 401', async () => {
    const testCinemasId = '1';
    const response = await request(app).get(`/cinemas/${testCinemasId}/movies`)
    expect(response.status).toEqual(401)
})

test('GET /cinemas/:cinemasId/movies 404 notfound 2', async () => {
    const testCinemasId = '-1';
    const response = await request(app).get(`/cinemas/${testCinemasId}/movies`).set('authorization', `Bearer ${adminToken}`)
    expect(response.status).toEqual(404)
    // expect(response.body._id).toEqual(testMovieId)
})

test('GET /cinemas/:cinemasId/movies/:movieId 200 ok', async () => {
    const testCinemasId = '1';
    const testMovieId = '1';
    const response = await request(app).get(`/cinemas/${testCinemasId}/movies/${testMovieId}`).set('authorization', `Bearer ${adminToken}`)

    expect(response.status).toEqual(200)
    expect(response.body._id).toEqual(testMovieId)
})

test('GET /cinemas/:cinemasId/movies/:movieId 401 ', async () => {
    const testCinemasId = '1';
    const testMovieId = '1';
    const response = await request(app).get(`/cinemas/${testCinemasId}/movies/${testMovieId}`)

    expect(response.status).toEqual(401)
})

test('GET /cinemas/:cinemasId/movies 404 notfound', async () => {
    const testCinemasId = '-1';
    const testMovieId = '-1';
    const response = await request(app).get(`/cinemas/${testCinemasId}/movies/${testMovieId}`).set('authorization', `Bearer ${adminToken}`)

    expect(response.length).toEqual(0)
    // expect(response.body._id).toEqual(testMovieId)
})


test('Health check', async () => {
    process.env.PORT = 3005
    const app = await server.start(apiMock)
    const response = await request(app).get('/health')
    expect(response).toBeTruthy()
    expect(response.status).toEqual(200)
})

// test('Server stop', async () => {
//     const IsStoped = await server.stop()
//     expect(IsStoped).toBeTruthy()
// })
