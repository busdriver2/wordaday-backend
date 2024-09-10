const Word = require('../models/wordModel')
const UserWordBank = require('../models/useWordBankModel')
const WordPack = require('../models/wordPackModel')
const User = require("../models/userModel")


const getPacks = async (req, res) => {
    const user_id = req.user._id
    const user = await User.findById(user_id).populate('packs'); // populate to get the actual packs data
    const userPackIds = user.packs.map(pack => pack._id.toString())
    
    const packs = await WordPack.find({ }).sort({createdAt: -1})
    const availablePacks = packs.filter(pack => !userPackIds.includes(pack._id.toString()))
    res.status(200).json(availablePacks)
}

const purchasePack = async (req, res) => {
    try {
        const packId = req.params.packId
        const user = await User.findById(req.user._id)
        console.log(packId)
        const coins = await user.purchaseWordPack(packId)
        res.status(200).json(coins)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    

}


const createPack = async (req, res) => {
    try {
        const {name, price, words} = req.body
        const wordPack = new WordPack({name, price, words})
        await wordPack.save()
        res.status(201).json(wordPack)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const addWord = async (req, res) => {
    try {
        const wordPack = await WordPack.findById(req.params.packId)
        if (!wordPack) {
            throw new Error('Word pack not found')
        }
        const { wordId } = req.body
        const word = await Word.findById(wordId)
        if (!word) {
            throw new Error('Word not found')
        }
        wordPack.words.push(word._id)
        await wordPack.save();
        res.status(200).json(wordPack)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const freePackSelection = async (req, res) => {
    const { email, packId } = req.body;
    console.log(email, packId)

    try {
        // Check if the user exists
        const user = await User.findOne({email: email})
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Check if the pack exists
        const pack = await WordPack.findById(packId);
        if (!pack) return res.status(404).json({ error: 'Pack not found' });

        // Check if the user has already selected a pack
        if (user.packs.length > 0) return res.status(400).json({ error: 'Pack already selected' });

        // Add the selected pack to the user's packs array
        //user.packs.push(packId);
        //await user.save();

        const wordBankEntries = await user.purchaseWordPack(packId, true)
        res.status(200).json({ message: 'Pack selected successfully', wordBankEntries });
    } catch (error) {
        res.status(400).json({ error: 'Error selecting pack' });
    }
}

module.exports = {createPack, addWord, getPacks, purchasePack, freePackSelection}