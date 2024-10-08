require('dotenv').config()

const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const wordRoutes = require('./routes/words.js')
const userRoutes = require('./routes/user.js')
const packRoutes = require('./routes/packs.js')
const questionRoutes = require('./routes/questions.js')

//Creates express application
const app = express()  

// middleware
app.use(express.json())

app.use(cors({
    origin: 'http://3.142.47.202:5173',  // Replace with your frontend's URL
  }));

app.use((req, res, next)=> {
    console.log(req.path, req.method)
    next()
})



// routes
app.use('/api/words', wordRoutes)
app.use('/api/user', userRoutes)
app.use('/api/packs', packRoutes)
app.use('/api/test', questionRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

// connect to DB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // listen for requests
    app.listen(process.env.PORT || 5555, () => {
        console.log('Connected to DB & Listening on port 4000')
    })
})
.catch((error) => {
    console.log(error)
})


