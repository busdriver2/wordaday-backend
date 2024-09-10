const express = require('express')
const {getQuestions, submitTest} = require('../controllers/questionController')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

// require auth for all word routes
router.use(requireAuth)


router.get("/questions", getQuestions)


router.post("/submit/:email", submitTest)




module.exports = router