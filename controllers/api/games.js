const Game = require('../../models/game.js');

module.exports = {
    create,
    index,
    delete: deleteGame,
    getGameById,
    update
};

async function create(req, res) {
    try {
      const { name, gameStudio, esrbRating } = req.body;
      
      const user = req.user;
  
      const newGame = new Game({
        name,
        gameStudio,
        esrbRating,
        user: user._id, 
      });
  
      await newGame.save();
      res.status(201).json(newGame);
    } catch (error) {
      console.error('Error creating game:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  }

async function index(req, res) {
    try {
        req.body.user = req.user._id; 
        req.body.userName = req.user.name;
        const game = await Game.find({ user: req.user._id });
        res.json(game);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function deleteGame(req, res) {
    try {
      const gameId = req.params.id;
  
      const gameToDelete = Game.findById(gameId);
      if (!gameToDelete) {
        return res.status(404).json({ message: "File not found" });
      }
      await gameToDelete.remove();
      res.status(200).json({ message: "File deleted successfully" });
    } catch (error) {
      console.error("Error deleting file:", error);
      return res.status(500).json({ message: "An error occurred" });
    }
  }

  async function getGameById(req, res) {
    try {
        const gameId = req.params.id;
        const game = await Game.findById(gameId);
        
        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }

        res.status(200).json(game);
    } catch (error) {
        console.error("Error fetching game by ID:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
}

async function update(req, res) {
  try {
    // Get the game ID from the request parameters
    const gameId = req.params.id;

    // Get the updated game data from the request body
    const updatedGameData = req.body;

    // Find the game by its ID
    const game = await Game.findById(gameId);

    // If the game is not found, return a 404 error
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    // Update the game properties with the new data (if provided)
    game.name = updatedGameData.name;
    game.gameStudio = updatedGameData.gameStudio;
    // Save the updated game data
    await game.save();

    // Send a success response with the updated game data
    res.status(200).json(game);
  } catch (error) {
    // Handle errors and send a 500 internal server error response
    res.status(500).json({ error: 'An error occurred while updating the game' });
  }
}