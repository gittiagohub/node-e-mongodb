const { test, expect, beforeAll } = require('@jest/globals')
const server = require('./server')
const request = require('supertest')

// emulando uma função
const apiMock = jest.fn((app,repository)=> {
    app.get('/error', (req,res,next)=>{
        throw new Error('Mock error')
    })
})

test('Server start', async () => {
    const app = await server.start(apiMock)
    expect(app).toBeTruthy()
})

test('Health check', async () => {
    process.env.PORT = 3001
    const app = await server.start(apiMock)
    const response = await request(app).get('/health')
    expect(response).toBeTruthy()
    expect(response.status).toEqual(200)
})

test('error check', async () => {
    process.env.PORT = 3002
    const app = await server.start(apiMock)
    const response = await request(app).get('/error')
    expect(response).toBeTruthy()
    expect(response.status).toEqual(500)
})

test('Server stop', async () => {
    const IsStoped = await server.stop()
    expect(IsStoped).toBeTruthy()
})
