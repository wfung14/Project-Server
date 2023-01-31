const express =require('express')
const { handle404 } = require('../lib/custom-errors')
const Movie = require('../models/movie')
const router = express.Router()

router.get('/movies', (req, res, next) => {
    Movie.find()
        .then(movies => {
            return movies.map(movie => movie)
        })
        .then(movies => {
            res.status(200).json({ movies: movies })
        })
        .catch(next)
})

router.get('/movies/:id', (req, res, next) => {
    Movie.findById(req.params.id)
        .then(handle404)
        .then(movie => {
            res.status(200).json({ movie: movie })
        })
        .catch(next)
})

router.post('/movies', (req, res, next) => {
    Movie.create(req.body.movie)
        .then(movie => {
            res.status(201).json({ movie: movie })
        })
        .catch(next)
})

router.patch('/movies/:id', (req, res, next) => {
    Movie.findById(req.params.id)
        .then(handle404)
        .then(movie => {
            return movie.updateOne(req.body.movie)
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

router.delete('/movies/:id', (req, res, next) => {
    Movie.findById(req.params.id)
        .then(handle404)
        .then(movie => {
            return movie.deleteOne()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router