const auth = require('express').Router();
const { signUp, signIn } = require('../controllers/auth');
const { signinValidation, signupValidation } = require('../middlewares/validation');

auth.post('/signin', signinValidation, signIn);
auth.post('/signup', signupValidation, signUp);

module.exports = auth;
