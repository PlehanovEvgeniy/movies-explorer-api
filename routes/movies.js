const movies = require('express').Router();
const { getSavedMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { movieIdValidation, movieValidation } = require('../middlewares/validation');

movies.get('/', getSavedMovies);
movies.post('/', movieValidation, createMovie);
movies.delete('/:movieId', movieIdValidation, deleteMovie);

module.exports = movies;
