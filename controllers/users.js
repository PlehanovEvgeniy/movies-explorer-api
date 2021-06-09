const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new Error('Такого пользователя не существует');
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Некорректный Id');
      }
      throw new NotFoundError(err.message);
    })
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    throw new BadRequestError('Введенные данные о пользователе некорректны');
  }

  User.findByIdAndUpdate(req.user._id, { name }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      throw new Error('invalidUserId');
    })
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new BadRequestError('Введенные данные некорректны');
      }
      throw new NotFoundError(err.message);
    })
    .catch(next);
};
