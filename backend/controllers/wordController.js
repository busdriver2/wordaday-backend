const Word = require('../models/wordModel')
const UserWordBank = require('../models/useWordBankModel')
const mongoose = require('mongoose')

// get all words
const getWords = async (req, res) => {
    const user_id = req.user._id
    const words = await Word.find({ }).sort({createdAt: -1})
    res.status(200).json(words)
}

// get a single word
const getWord = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such word'})
    }

    const word = await Word.findById(id)

    if (!word) {
        return res.status(404).json({error: 'No such word'})
    }

    res.status(200).json(word)
}


// get a random word from the user's wordbank
const getRandomWord = async (req, res) => {
    try {
        
        const user_id = req.user._id
        const WOTD = await UserWordBank.findOne({ userId: user_id, wordOfTheDay: false })
        
        if (!WOTD) {
            return res.status(404).json({error: 'No matching words found'})
        }
        //const wordToUpdate = await Word.findById(randomword[0]._id)
        res.status(200).json(WOTD)

    } catch(error) {
        console.error('Error retreiving random word', error)
        res.status(500).json({error: error.message})
    }
    
}

// helper function
function sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }


// gets the word of the day
const fetchWordOfTheDay = async (req, res) => {
    try {
        const user_id = req.user._id
        const WOTD = await UserWordBank.findOne({ userId: user_id, wordOfTheDay: true })
        if (!WOTD) {
            getRandomWord(req, res)
        } else if(sameDay(new Date(), WOTD.wordOfTheDayDate)) {
            res.status(200).json(WOTD)
        } else {
            WOTD.wordOfTheDay = false
            await WOTD.save()
            getRandomWord(req, res)
        }
    } catch(error) {
        console.error('Error fetching word of the day', error)
        res.status(500).json({ error: error.message })
    }
    
}



// create a new word and wordbank connection
const createWord = async (req, res) => {
    const {id, name, definition} = req.body

    let emptyFields = []

    if(!name) {
        emptyFields.push('title')
    }
    if(!id) {
        emptyFields.push('id')
    }
    if(!definition) {
        emptyFields.push('definition')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // add doc to DB
    try {
        const user_id = req.user._id
        const word =  await Word.create({id, name, definition})
        res.status(200).json(word)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a word
const deleteWord = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such word'})
    }

    const word = await Word.findOneAndDelete({_id: id})
    const wordbank = await UserWordBank.findOneAndDelete({wordId: id})

    if (!word) {
        return res.status(404).json({error: 'No such word'})
    }

    res.status(200).json(word)
}

// update a word
const updateWord = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such word'})
    }

    const word = await Word.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!word) {
        return res.status(404).json({error: 'No such word'})
    }

    res.status(200).json(word)
}


// update word status
const updateWordBank = async (req, res) => {
    const { wordId, userId, action } = req.body;
    try {
        const wordBankEntry = await UserWordBank.findOne({ userId, wordId })

        if (!wordBankEntry) {
            return res.status(400).json({message: 'Word entry not found for this user'})
        }

        if (action === 'thumbsUp') {
            wordBankEntry.status = 'known'
        } else if (action === 'thumbsDown') {   
            wordBankEntry.status = 'learning'
        } else {
            return res.status(400).json({ message: 'Invalid action specified'})
        }

        await wordBankEntry.save()

        res.status(200).json({ 
            message: 'word status updated successfully', 
            updatedEntry: UserWordBank
        })

    } catch(error) {
        console.error('Error updating word status:', error)
        res.status(500).json({message: 'Server error'})
    }
}




module.exports = {
    createWord,
    getWords,
    getWord,
    deleteWord,
    updateWord,
    getRandomWord,
    updateWordBank,
    fetchWordOfTheDay
}