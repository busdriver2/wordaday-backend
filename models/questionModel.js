const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true 
    },
    correctAnswer: {
        type: Number,
        required: true 
    },
    difficultyLevel: {
        type: Number,
        required: true 
    }
})

module.exports = mongoose.model('Question', questionSchema)