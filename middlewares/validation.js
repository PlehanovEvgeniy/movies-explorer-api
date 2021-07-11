const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

module.exports.movieIdValidation = celebrate({
  params: Joi
    .object()
    .keys({
      movieId: Joi.string().length(24).hex(),
    }),
});

module.exports.movieValidation = celebrate({
  body: Joi
    .object()
    .keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      owner: Joi.string().length(24),
      image: Joi.string().required()
        .custom((value, helpers) => {
          if (validator.isURL(value, { require_protocol: true, disallow_auth: true })) {
            return value;
          }
          return helpers.message('Неправильный формат ссылки');
        }),
      trailer: Joi.string().required()
        .custom((value, helpers) => {
          if (validator.isURL(value, { require_protocol: true, disallow_auth: true })) {
            return value;
          }
          return helpers.message('Неправильный формат ссылки');
        }),
      thumbnail: Joi.string().required()
        .custom((value, helpers) => {
          if (validator.isURL(value, { require_protocol: true, disallow_auth: true })) {
            return value;
          }
          return helpers.message('Неправильный формат ссылки');
        }),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
});

module.exports.signupValidation = celebrate({
  body: Joi
    .object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
});

module.exports.signinValidation = celebrate({
  body: Joi
    .object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
});

module.exports.userInfoValidation = celebrate({
  body: Joi
    .object()
    .keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email(),
      password: Joi.string(),
    }),
});
