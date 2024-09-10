const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET, { expiresIn: '3d' })
}

const getUser = async (req, res) => {
    
    try { 
        const userEmail = req.params.email
        
        const user = await User.findOne({email: userEmail})
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
}

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)


        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.signup(email, password)

        // create a token
        const token = createToken(user._id)


        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// purchase pack for user
const purchasePack = async (req, res) => {
    try {
        const user_id = req.user._id
        const user = await User.findById(user_id)
        const coins = await user.purchaseWordPack(req.params.packId)
        res.status(200).json({ coins })
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}


const givePoints = async (req, res) => {
    
    try {
        const email = req.body.email
        
        const user = await User.findOne({email: email})
        if (!user) {
            res.status(400)
        }
        const points = parseInt(req.params.points, 10)
        user.points = user.points + points
        await user.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { signupUser, loginUser, purchasePack, getUser , givePoints}