const express = require('express');
const router = express.Router();

const  verifyToken  = require('../middlewares/jwt_auth');


const genreController = require('../controllers/genre_controller');

router.post('/add',verifyToken,genreController.addGenres);
router.get('/set',verifyToken,genreController.setGenresFromTMDB);
router.get('/:id',verifyToken,genreController.getGenreName);

module.exports = router;