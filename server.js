// command center
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const db = require('./config/db')
const PORT = 8000

const commentRoutes = require('./routes/comment-routes')

const movieRoutes = require('./routes/movie-routes')
const requestLogger = require('./lib/request-logger')
const movieSeed = require('./lib/movie-seed')


mongoose.set('strictQuery', true)


mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// starting an express app
const app = express()

app.use(cors({ origin: `http://127.0.0.1:5500` }))


// sending json 
// need to be able to accept json
app.use(express.json())

app.use(requestLogger)

// server needs to know about this router!!!
app.use(movieRoutes)
app.use(commentRoutes)
app.use('/seed', movieSeed)

app.listen(PORT, () => {
    console.log('listening on ' + PORT)
})

module.exports = app