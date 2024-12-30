const {test,expect, beforeAll} = require('@jest/globals')
const repository = require ('./repository')

const { ObjectId } = require('mongodb');

let cityId = null;
let cinemaId = null
let movieId = null

beforeAll(async()=>{
    const cities = await repository.getAllCities();
	cityId = cities[cities.length - 1]._id;
    
	const cinemas = await repository.getCinemasByCityId(cityId);

	cinemaId = cinemas[0]._id;

	movieId = cinemas[0].salas[0].sessoes[0].idFilme;
})

test('getAllCities',async()=>{
    const cities = await repository.getAllCities()
  
    expect(Array.isArray(cities)).toBeTruthy()
    expect(cities.length).toBeTruthy()
    expect(cities[0].cidade).toBeTruthy()
    expect(cities[0].uf).toBeTruthy()
    expect(cities[1].pais).toBeTruthy()
    expect(!cities[1].cinemas).toBeTruthy()
})

test('getCinemasByCityId',async()=>{

    const cinemas = await repository.getCinemasByCityId(cityId);
  
    expect(cinemas).toBeTruthy()
    expect(Array.isArray(cinemas)).toBeTruthy()
    expect(cinemas.length).toBeTruthy()    
})

test('getMoviesByCinemaId',async()=>{
    const movies = await repository.getMoviesByCinemaId(cinemaId);
    
	expect(Array.isArray(movies)).toBeTruthy();
	expect(movies.length).toBeTruthy();
})

test('getMoviesByCityId',async()=>{
    const movies = await repository.getMoviesByCityId(cityId);
    
	expect(Array.isArray(movies)).toBeTruthy();
	expect(movies.length).toBeTruthy();
    // const movies = await repository.getMoviesByCinemaId('635d42a248fee07e6d6bda92');
})


test('getMovieSessionByCityId',async()=>{

    const movieSessions = await repository.getMovieSessionByCityId(movieId,cityId);
	expect(Array.isArray(movieSessions)).toBeTruthy();
	expect(movieSessions.length).toBeTruthy();
    
})

test('getMovieSessionsByCinemaId',async()=>{

    const movieSessions = await repository.getMovieSessionsByCinemaId(movieId,cinemaId);
  
	expect(Array.isArray(movieSessions)).toBeTruthy();
	expect(movieSessions.length).toBeTruthy();
})
