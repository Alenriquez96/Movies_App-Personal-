const movieAPI = require('../controllers/moviesAPIController');
const routes = require('express').Router();
const protectedRoutes = require("../middlewares/verifiedToken");
const checkAdmin = require("../middlewares/checkAdmin");


// TODO: Faltaría el middleware para comprobar si está logueado y el rol


routes.get("/dashboard", protectedRoutes, movieAPI.dashboard)
routes.get('/search', protectedRoutes, movieAPI.searchFilms);
routes.get('/search/:title?', protectedRoutes, movieAPI.getFilms);
routes.get('/movie/:id&:title', protectedRoutes, movieAPI.showFilm);
routes.post('/search', protectedRoutes, movieAPI.inputFilms);
routes.post('/savemovie', protectedRoutes, movieAPI.addFavMovie);
routes.get("/movies", protectedRoutes, movieAPI.myMovies);

//CRUD DEL ADMIN
routes.get('/movies', protectedRoutes, movieAPI.myMovies);
routes.get("/createMovie", protectedRoutes, checkAdmin, movieAPI.createMovieView);
routes.post('/createMovie', protectedRoutes, checkAdmin, movieAPI.createMovie);
routes.get("/editMovie", protectedRoutes, checkAdmin, movieAPI.updateMovieView)
routes.put("/editMovie", protectedRoutes, checkAdmin, movieAPI.updateMovie);
routes.post("/removeMovie", protectedRoutes, checkAdmin, movieAPI.deleteMovie);



module.exports = routes;