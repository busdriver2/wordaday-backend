const express = require('express')

// controller functions
const { signupUser, loginUser, purchasePack, getUser, givePoints} = require('../controllers/userController')

const router = express.Router()


// Get user
router.get('/:email', getUser)

//login 
router.post('/login', loginUser)


//signup route
router.post('/signup', signupUser)


//
router.post('/give/:points', givePoints)

//purchase pack route
router.post('/purchase/:packId', purchasePack)





module.exports = router