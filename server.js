const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const db = require('./config/db')
const PORT = 9000

const commentRoutes = require('./routes/comment-routes')

const movieRoutes = require('./routes/movie-routes')
const requestLogger = require('./lib/request-logger')
const movieSeed = require('./lib/movie-seed')


mongoose.set('strictQuery', true)


mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const app = express()

app.use(cors({ origin: `http://127.0.0.1:5500` }))


app.use(express.json())

app.use(requestLogger)


app.use(movieRoutes)
app.use(commentRoutes)
app.use('/seed', movieSeed)

app.listen(PORT, () => {
    console.log('listening on ' + PORT)
})

module.exports = app