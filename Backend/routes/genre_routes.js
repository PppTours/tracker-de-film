const express = require('express');
const router = express.Router();

const genreController = require('../controllers/genre_controller');

router.post('/add',genreController.addGenres);

module.exports = router;