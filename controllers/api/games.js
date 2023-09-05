const Game = require('../../models/game.js');

module.exports = {
    create,
    index,
    delete: deleteGame
};

async function create(req, res) {
    try {
        console.log('Creating a new game...');
        req.body.user = req.user._id; 
        const games = await Game.create(req.body);
        res.json(games);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function index(req, res) {
    try {
        req.body.user = req.user._id; 
        const game = await Game.find({ user: req.user._id });
        res.json(game);
    } catch (err) {
        res.status(400).json(err);
    }
}

