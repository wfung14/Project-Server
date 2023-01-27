const mongoose = require('mongoose')
const Schema = mongoose.Schema
const commentSchema = require('./comment')

const movieSchema = new Schema (
    {
        title: {
            type: String,
            required: true,
        },
        director: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        genre: {
            type: String,
            required: true
        },
        comments: [commentSchema]
    },
    {
        timestamps: true
    }
)


const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie