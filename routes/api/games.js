const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../../config/ensureLoggedIn'); 
const gamesCtrl = require('../../controllers/api/games'); 
// Define routes for games API
router.post('/', ensureLoggedIn, gamesCtrl.create);
router.get('/', ensureLoggedIn, gamesCtrl.index);
router.delete('/:gameId', ensureLoggedIn, gamesCtrl.delete);

module.exports = router;