const express = require('express')
const {
    createWord,
    getWord,
    getWords,
    deleteWord,
    updateWord,
    getRandomWord,
    updateWordBank,
    fetchWordOfTheDay
} = require('../controllers/wordController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all word routes
router.use(requireAuth)

//GET the word of the day
router.get('/wordOfTheDay', fetchWordOfTheDay)

//GET a random word
router.get('/random', getRandomWord)

//GET a single word
router.get('/:id', getWord)

//GET all words
router.get('/', getWords)

//UPDATE WORD BANK
router.post('/updateWordBank', updateWordBank)

//POST a new word
router.post('/', createWord)

//DELETE a new word
router.delete('/:id', deleteWord)

//UPDATE a new word
router.patch('/:id', updateWord)





module.exports = router