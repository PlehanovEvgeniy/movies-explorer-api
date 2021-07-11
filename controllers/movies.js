const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      throw new BadRequestError(err.message);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((data) => {
      if (data.owner._id.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Чужие фильмы нельзя удалять');
      }
      Movie.findByIdAndRemove(req.params.movieId)
        .then((movie) => res.status(200).send(movie))
        .catch((err) => {
          throw new NotFoundError(err.message);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        throw new NotFoundError(err.message);
      }

      if (err.name === 'CastError') {
        throw new BadRequestError('Введенные данные некорректны');
      }

      next(err);
    })
    .catch(next);
};

module.exports.getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};
