const validateToken = require('../midllewares/authController')
module.exports = (app, repository) => {
    app.get('/cities/:cinemaId/movies/:movieId', validateToken,async (req, res, next) => {
        const movies = await repository.getMovieSessionByCityId(req.params.movieId, req.params.cinemaId)

        if (!movies) return res.sendStatus(404)

        res.json(movies);
    })

    app.get('/cities/:cityId/movies/:movieId', validateToken,async (req, res, next) => {
        const sessions = await repository.getMovieSessionByCityId(req.params.movieId, req.params.cityId)

        if (!sessions) return res.sendStatus(404)

        res.json(sessions);
    })

    app.get('/cities/:cityId/movies', validateToken,async (req, res, next) => {
        const movies = await repository.getMoviesByCityId(req.params.cityId)

        if (!movies) return res.sendStatus(404)

        res.json(movies);
    })

    app.get('/cities/:cityId/cinemas', validateToken,async (req, res, next) => {
        const cinemas = await repository.getCinemasByCityId(req.params.cityId)

        if (!cinemas) return res.sendStatus(404)

        res.json(cinemas);
    })

    app.get('/cities/:cinemaId/movies', validateToken,async (req, res, next) => {
        const movies = await repository.getMoviesByCinemaId(req.params.cinemaId)

        if (!movies) return res.sendStatus(404)

        res.json(movies);
    })

    app.get('/cities',validateToken, async (req, res, next) => {
        const cities = await repository.getAllCities();
        if (!cities || !cities.length) return res.sendStatus(404)

        res.json(cities);
    })

    app.get('/cinemas/:cinemaId/movies/:movieId', validateToken,async (req, res, next) => {

        const sessions = await repository.getMovieSessionByCityId(req.params.movieId, req.params.cinemaId);

        if (!sessions) return res.sendStatus(404); //! Not Found

        res.json(sessions);
    });
    app.get('/cinemas/:cinemaId/movies',validateToken, async (req, res, next) => {
        const movies = await repository.getMoviesByCinemaId(req.params.cinemaId);

        if (!movies) return res.sendStatus(404); //! Not Found

        res.json(movies);
    });

}