const mongoose = require("mongoose")

const Schema = mongoose.Schema

const commentSchema = new Schema({
    Thoughts: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

module.exports = commentSchema