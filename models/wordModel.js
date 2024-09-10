const mongoose = require('mongoose')

const Schema = mongoose.Schema

const wordSchema = new Schema({
    id : {
        type: Number,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    definition : {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Word', wordSchema)


