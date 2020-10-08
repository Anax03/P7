const express = require('express');
const router = express.Router();
const postControlleur = require('../controlleurs/post');
const multer = require('../middleware/multer');
const auth = require('../middleware/auth');

///// Routes
router.post('/createPost', auth, multer, postControlleur.createPost);
router.get('/', auth, postControlleur.getPosts);
router.put('/updatePost', auth, multer, postControlleur.updatePost);
router.delete('/deletePost/:id', postControlleur.deletePost);

module.exports = router;
