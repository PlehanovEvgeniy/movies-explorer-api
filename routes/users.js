const users = require('express').Router();
const { updateUserInfo, getUserInfo } = require('../controllers/users');
const { userInfoValidation } = require('../middlewares/validation');

users.get('/me', getUserInfo);
users.patch('/me', userInfoValidation, updateUserInfo);

module.exports = users;
