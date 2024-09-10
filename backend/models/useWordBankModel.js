const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserWordBankSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Links to the User collection
      required: true,
    },
    wordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Word', // Links to the Word collection
      required: true,
    },
    status: {
      type: String,
      enum: ['known', 'unknown', 'learning'], // Tracks user’s knowledge of the word
      required: true,
    },
    difficultyRating: {
      type: Number, // Optionally store a difficulty rating (e.g., 1-5 scale)
    },
    dateLearned: {
      type: Date, // Track when the user learned the word
    },
    wordOfTheDay: {
      type: Boolean, // Indicates if this word is currently the user's word of the day
      default: false,
    },
    wordOfTheDayDate: {
      type: Date, // Stores the date when this word was set as the word of the day
    },
  }, {timestamps: true})
  
  const UserWordBank = mongoose.model('UserWordBank', UserWordBankSchema);
  module.exports = UserWordBank
