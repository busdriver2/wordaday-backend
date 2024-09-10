const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    coins: {
        type: Number,
        default: 1000,
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: "Beginner"
    },
    packs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WordPack'
    }],
    points: {
        type: Number,
        default: 0
    }
})


// static signup method
userSchema.statics.signup = async function(email, password) {

    // validation
    if (!email || !password) {
        throw Error('All field smust be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }


    const exists = await this.findOne({ email }) 

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash})

    return user
}

// static login method
userSchema.statics.login = async function(email, password) {

    if (!email || !password) {
        throw Error('All field smust be filled')
    }

    const user = await this.findOne({ email }) 

    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

userSchema.methods.purchaseWordPack = async function(packId, free = false) {
    const WordPack = mongoose.model('WordPack');
    const UserWordBank = mongoose.model('UserWordBank');
    
    
    const wordPack = await WordPack.findById(packId).populate('words')
    if (!wordPack) {
        throw new Error('Word pack not found')
    }

    if (this.coins < wordPack.price) {
        throw new Error('not enough coins')
    }

    if (!free) {
        console.log("Purchasing pack")
        this.coins -= wordPack.price
    } else {
        console.log("Giving free pack")
    }
    

    const wordBankEntries = wordPack.words.map(word => ({
        userId: this._id,
        wordId: word._id,
        status: 'unknown'
    }))

    await this.packs.push(packId)
    await UserWordBank.insertMany(wordBankEntries)
    await this.save()

    return this.coins
}

module.exports = mongoose.model('User', userSchema)