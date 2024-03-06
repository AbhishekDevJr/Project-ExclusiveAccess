const express = require('express');
const router = express.Router();
const postController = require('../Controllers/postController');

router.post('/add', postController.posts);
router.post('/edit', postController.edit);

module.exports = router;