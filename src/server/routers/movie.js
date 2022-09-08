const express = require('express');
const {
    getAllMovies,
    createMovie
} = require('../controllers/movie');

const router = express.Router();

router.get('/:id', getAllMovies);
router.post('/', createMovie);

module.exports = router;