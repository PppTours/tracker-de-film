const express = require('express');
const router = express.Router();

const  verifyToken  = require('../middlewares/jwt_auth');
const imageController = require('../controllers/image_controller');

router.get('/search/film/:idFilm',verifyToken,imageController.getImagesForMovieTMDB);
router.get('/search/tv/:idFilm',verifyToken,imageController.getImageForTvShowTMDB);

module.exports = router;