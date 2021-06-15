const routes = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const { signUp, signIn } = require('../controllers/auth');
const { signinValidation, signupValidation } = require('../middlewares/validation');

routes.post('/signin', signinValidation, signIn);
routes.post('/signup', signupValidation, signUp);

routes.use('/users', authMiddleware, usersRouter);
routes.use('/movies', authMiddleware, moviesRouter);

module.exports = routes;
