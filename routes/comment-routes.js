const express =require('express')
const { handle404 } = require('../lib/custom-errors')
const Comment = require('../models/comment')
const router = express.Router()

router.get('/comments', (req, res, next) => {
    Comment.find()
        .then(comments => {
            return comments.map(comment => comment)
        })
        .then(comments => {
            res.status(200).json({ comments: comments })
        })
        .catch(next)
})

router.get('/comments/:id', (req, res, next) => {
    Comment.findById(req.params.id)
        .then(handle404)
        .then(comment => {
            res.status(200).json({ comment: comment })
        })
        .catch(next)
})

router.post('/comments', (req, res, next) => {
    Comment.create(req.body.comment)
        .then(comment => {
            res.status(201).json({ comment: comment })
        })
        .catch(next)
})

router.patch('/comments/:id', (req, res, next) => {
    Comment.findById(req.params.id)
        .then(handle404)
        .then(comment => {
            return comment.updateOne(req.body.comment)
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

router.delete('/comments/:id', (req, res, next) => {
    Comment.findById(req.params.id)
        .then(handle404)
        .then(comment => {
            return comment.deleteOne()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router