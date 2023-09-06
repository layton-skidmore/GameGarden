const Game = require('../../models/game');

module.exports = {
  createReview,
};

async function createReview(req, res) {
    try {
      const { id, text, score } = req.body;
  
      
      const game = await Game.findById(id);
  
      if (!game) {
        return res.status(404).json({ error: 'Game not found' });
      }
  
   
      const newReview = {
        user: req.user._id, 
        text,
        score,
      };
  
      
      game.reviews.push(newReview);
  
      
      await game.save();

      console.log(newReview);
  
      res.status(201).json(newReview);
    } catch (error) {
      console.error('Error creating review:', error);
      res.status(500).json({ error: 'An error occurred while creating the review' });
    }
  }



  