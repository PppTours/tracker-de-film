const express = require('express');
const router = express.Router();

const filmController = require('../controllers/film_controller');
const  verifyToken  = require('../middlewares/jwt_auth');
const { addApiKeyToRequest } = require('../middlewares/tmdb_ware');



router.get('/search/eng',verifyToken,filmController.searchMovieEnglish);
router.get('/search/fr',verifyToken,filmController.searchMovieFrench);
router.get('/info/:idMovie',verifyToken,filmController.getMovieInfo);


module.exports = router;

//'https://api.themoviedb.org/3/movie/577922?&api_key=f44a28fe09725d50c80a5e0b493bc1f8';