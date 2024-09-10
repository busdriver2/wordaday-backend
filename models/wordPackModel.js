const mongoose = require('mongoose')

const Schema = mongoose.Schema

const wordPackSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    words: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Word', // Reference to the Word collection
    }],
    price: {
        type: Number,
        required: true, // Price in coins
    },
}, { timestamps: true });

const WordPack = mongoose.model('WordPack', wordPackSchema)
module.exports = WordPack

