const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../../config/ensureLoggedIn'); 
const gamesCtrl = require('../../controllers/api/games'); 


router.post('/', ensureLoggedIn, gamesCtrl.create);
router.get('/', ensureLoggedIn, gamesCtrl.index);
router.get('/:id', ensureLoggedIn, gamesCtrl.getGameById);
router.put('/:id', ensureLoggedIn, gamesCtrl.update);
router.delete('/:id', ensureLoggedIn, gamesCtrl.delete);

module.exports = router;