const { ObjectId } = require('mongodb');

const cinemaCatalog = [
	{
		cidade: 'Gravataí',
		uf: 'RS',
		cinemas: [],
	},
	{
		cidade: 'Porto Alegre',
		uf: 'RS',
		pais: 'BR',
		cinemas: [
			{
				_id: new ObjectId('61a5286bf8943f587e1e01df'),
				nome: 'Cinemark Bourbon Ipiranga',
				salas: [
					{
						nome: 1,
						sessoes: [
							{
								data: new Date('2022-10-29T09:00:00Z'),
								idFilme: new ObjectId('6354785e6d6519c3f6f195cd'),
								filme: 'Os vingadores',
								valor: 25.0,
								assentos: [
									{
										numero: 1,
										disponivel: true,
									},
									{
										numero: 2,
										disponivel: false,
									},
								],
							},
							{
								data: new Date('2022-10-29T11:00:00Z'),
								idFilme: new ObjectId('6354788b6d6519c3f6f195ce'),
								filme: 'Os testes',
								valor: 25.0,
								assentos: [
									{
										numero: 1,
										disponivel: true,
									},
									{
										numero: 2,
										disponivel: true,
									},
								],
							},
							{
								data: new Date('2022-10-29T13:00:00Z'),
								idFilme: new ObjectId('635478e56d6519c3f6f195cf'),
								filme: 'Os teste22222s',
								valor: 20.0,
								assentos: [
									{
										numero: 1,
										disponivel: true,
									},
									{
										numero: 2,
										disponivel: false,
									},
									{
										numero: 2,
										disponivel: true,
									},
								],
							},
						],
					},
					{
						nome: 2,
						sessoes: [
							{
								data: new Date('2022-10-29T09:00:00Z'),
								idFilme: new ObjectId('6354785e6d6519c3f6f195cd'),
								filme: 'Os vingadores',
								valor: 25.0,
								assentos: [
									{
										numero: 1,
										disponivel: true,
									},
									{
										numero: 2,
										disponivel: false,
									},
								],
							},
							{
								data: new Date('2022-10-29T11:00:00Z'),
								idFilme: new ObjectId('6354788b6d6519c3f6f195ce'),
								filme: 'Os testes',
								valor: 25.0,
								assentos: [
									{
										numero: 1,
										disponivel: true,
									},
									{
										numero: 2,
										disponivel: true,
									},
								],
							},
							{
								data: new Date('2022-10-29T13:00:00Z'),
								idFilme: new ObjectId('635478e56d6519c3f6f195cf'),
								filme: 'Os teste22222s',
								valor: 20.0,
								assentos: [
									{
										numero: 1,
										disponivel: true,
									},
									{
										numero: 2,
										disponivel: false,
									},
									{
										numero: 2,
										disponivel: true,
									},
								],
							},
						],
					},
				],
			},
			{
				_id: new ObjectId(),
				nome: 'GNC Lindóia',
				salas: [
					{
						nome: 100,
						sessoes: [
							{
								data: new Date('2022-10-29T19:00:00Z'),
								idFilme: new ObjectId('6354785e6d6519c3f6f195cd'),
								filme: 'Os vingadores',
								valor: 25.0,
								assentos: [
									{
										numero: 1,
										disponivel: true,
									},
									{
										numero: 2,
										disponivel: false,
									},
								],
							},
							{
								data: new Date('2022-10-29T11:00:00Z'),
								idFilme: new ObjectId('6354788b6d6519c3f6f195ce'),
								filme: 'Os testes',
								valor: 25.0,
								assentos: [
									{
										numero: 1,
										disponivel: true,
									},
									{
										numero: 2,
										disponivel: true,
									},
								],
							},
							{
								data: new Date('2022-10-29T13:00:00Z'),
								idFilme: new ObjectId('635478e56d6519c3f6f195cf'),
								filme: 'Os teste22222s',
								valor: 20.0,
								assentos: [
									{
										numero: 1,
										disponivel: true,
									},
									{
										numero: 2,
										disponivel: false,
									},
									{
										numero: 2,
										disponivel: true,
									},
								],
							},
						],
					},
				],
			},
		],
	},
];


function getAllCities() {

	return cinemaCatalog.map(catalog => {
		return {
			_id: ObjectId(),
			pais: catalog.pais,
			uf: catalog.uf,
			cidade: catalog.cidade
		}
	})

}

function getCinemasByCityId(cityId) {
	if (!cityId) return []
	return cinemaCatalog[cinemaCatalog.length - 1].cinemas
}

function getMoviesByCinemaId(cinemaId) {
	if (!cinemaId) return []
	return getCinemasByCityId().map(cinema => {
		return {
			titulo: cinema.salas[0].sessoes[0].filme,
			_id: cinema.salas[0].sessoes[0].idFilme
		}
	})
}


function getMoviesByCityId(cityId) {
	return getMoviesByCinemaId(cityId)
}

function getMovieSessionByCityId(movieId, cityId) {
	if (!movieId || !cityId) return []
	return getCinemasByCityId().map(cinema => {
		return {
			titulo: cinema.salas[0].sessoes[0].filme,
			_id: cinema.salas[0].sessoes[0].idFilme,
			cinema: cinema.nome,
			idCinema: cinema._id,
			sala: cinema.salas[0].nome,
			sessao: cinema.salas[0].sessoes[0]
		}
	})
}

function getMovieSessionsByCinemaId(movieId, cinemaId) {
	return getMovieSessionByCityId(movieId,cinemaId)
}




module.exports = { getAllCities, getCinemasByCityId, getMoviesByCinemaId, getMoviesByCityId, getMovieSessionByCityId, getMovieSessionsByCinemaId }