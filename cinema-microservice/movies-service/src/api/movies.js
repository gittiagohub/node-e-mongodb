const validationMiddleware = require('../middlewares/validationMiddlewares')
const logger = require('../config/logger')

module.exports = (app, repository) => {
    app.get('/movies/premieres', validationMiddleware.validateToken, async (req, res, next) => {
        const movies = await repository.getMoviePremieres();
        if (!movies || !movies.length) return res.sendStatus(404)

        res.json(movies);
    })

    app.get('/movies/:id', validationMiddleware.validateToken, async (req, res, next) => {
        const movie = await repository.getMovieById(req.params.id)

        if (!movie) return res.sendStatus(404)

        res.json(movie);
    })

    app.get('/movies', validationMiddleware.validateToken, async (req, res, next) => {
        const movies = await repository.getAllMovies();
        if (!movies || !movies.length) return res.sendStatus(404)

        res.json(movies);

    })

    app.post('/movies',
       validationMiddleware.validateToken,
       validationMiddleware.validateAdmin,
       validationMiddleware.validateMovie,
        async (req, res, next) => {
              let { titulo,
                sinopse,
                duracao,
                dataLancamento,
                imagem,
                categoria } = req.body
          
            duracao = parseInt(duracao);
            dataLancamento = new Date(dataLancamento);


            const movies = await repository.addMovie({
                titulo,
                sinopse,
                duracao,
                dataLancamento,
                imagem,
                categoria
            });


            if (!movies) return res.sendStatus(404)
            logger.info(`User ${res.locals.userId} added the movie ${movies._id} at ${new Date()}`)
            res.status(201).json(movies);
        })

    app.delete('/movies/:id',
        validationMiddleware.validateToken,
        validationMiddleware.validateAdmin,
        async (req, res, next) => {
            const id = req.params.id;
            const result = await repository.deleteMovie(id)

            logger.info(`User ${res.locals.userId} deleted the movie ${id} at ${new Date()}`)

            res.status(204).json(result)
        })


}