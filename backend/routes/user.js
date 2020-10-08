//Importation
const express = require('express');
const router = express.Router();
const userControlleur = require('../controlleurs/user');
const bruteForce = require('../middleware/bruteForce');
const auth = require('../middleware/auth');

//Routes
router.post('/signup', userControlleur.signup);
router.post('/login', bruteForce, userControlleur.login);
router.get('/myprofile', auth, userControlleur.profile);
router.put('/update', auth, userControlleur.updatePassword);
router.delete('/delete', auth, userControlleur.delete);

module.exports = router;
