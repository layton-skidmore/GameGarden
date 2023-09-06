const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../../config/ensureLoggedIn');
const reviewsCtrl = require('../../controllers/api/reviews');


router.post('/new', ensureLoggedIn, reviewsCtrl.createReview);


module.exports = router;