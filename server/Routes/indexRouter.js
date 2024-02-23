const express = require('express');
const router = express.Router();
const indexController = require('../Controllers/indexController');

router.get('/', indexController.index);

router.get('/get-posts', indexController.getPosts);

module.exports = router;
