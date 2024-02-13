const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

router.get('/', userController.user);
router.post('/signup', userController.signup);
router.post('/exclusive', userController.exclusive);
router.post('/signin', userController.signin);

module.exports = router;

