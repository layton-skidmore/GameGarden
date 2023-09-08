const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  storyRating: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
  },
  gameplayRating: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
  },
  graphicsRating: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
  },
  audioRating: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
  },
});

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
  reviews: [reviewSchema], 
});

module.exports = mongoose.model('Game', gameSchema);
