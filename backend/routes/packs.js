const express = require('express')
const { createPack, addWord, getPacks, purchasePack, freePackSelection } = require("../controllers/packController")
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()



//
router.post('/select-pack', freePackSelection)

// require auth for all word routes
router.use(requireAuth)


// Buy pack
router.post('/purchase/:packId', purchasePack)


// Create a new word pack
router.post('/create', createPack)


// Get all packs
router.get('/', getPacks)

module.exports = router