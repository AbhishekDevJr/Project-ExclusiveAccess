const express = require('express');
const router = express.Router();
const postController = require('../Controllers/postController');

//Post Routes & Controllers Initialize
router.post('/add', postController.posts);
router.post('/edit', postController.edit);
router.post('/delete', postController.delete);

module.exports = router;