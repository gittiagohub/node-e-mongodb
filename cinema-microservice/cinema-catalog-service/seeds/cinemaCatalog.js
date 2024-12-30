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