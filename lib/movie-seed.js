const express = require('express')

const Movie = require('../models/movie')

const router = express.Router()

const startMovies = [
	{
		name: '2 Fast 2 Furious',
		director: 'John Singleton',
		year: '2003',
        genre: 'Action',
	},
	{
		name: 'Definitely, Maybe',
		director: 'Adam Brooks',
		year: '2008',
        genre: 'Romantic Comedy',
	},
	{
		name: 'Inglourious Basterds',
		director: 'Quentin Tarantino',
		year: '2009',
        genre: 'Action',
	},
]

router.get('/movies', (req, res, next) => {
	Movie.deleteMany({})
        .then(() => {
            Movie.create(startMovies)
                .then((movies) => res.status(200).json({ movies: movies }))
        })
        .catch(next)
})

module.exports = router