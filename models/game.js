const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    gameStudio: {
      type: String,
      required: true,
    },
    esrbRating: {
      type: String,
      required: true,
      enum: ['E', 'T', 'M'], 
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  });
  
  module.exports = mongoose.model('Game', gameSchema);