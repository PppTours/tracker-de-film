const jwt = require('jsonwebtoken');
const db = require('../models');
const fetch = require('node-fetch');
const {Person, Movie, TvShow, Film, Director} = require('../models');
const { DATE } = require('sequelize');


const token = process.env.TOKEN_TMDB;
const apikey = process.env.APIKEY_TMDB;
const URLTMDB = 'https://api.themoviedb.org/3';



const headerWithToken = {
  accept: 'application/json',
  Authorization: 'Bearer'+token  
};
/**
 * Modify an input to trim it then replace the spaces with %20 for queries  
 * @param {*} input : The input to modify
 * @returns treated input
 */
function processStringURL(input) {
    return new Promise((resolve, reject) => {
      try {
        const trimmedString = input.trim();
        
        const replacedString = trimmedString.replace(/\s+/g, "%20");
      
        resolve(replacedString);
      } catch (error) {
        
        reject(error);
      }
    });
  }
  
function addKeyToUrl(url)
{

  let urlWithToken = `${url}?&api_key=${token}`;
  return urlWithToken;
}

async function searchMovie(req, res, language)
{

    const query = req.body.query;
    if(!query)
    {
        return res.status(400).json({error : 'Query is empty in the body'});
    }
    const treatedQuery = await processStringURL(query);
    const urlSearch = URLTMDB+'/search/movie?query='+treatedQuery+'&language='+language+'&page=1&api_key='+apikey;

    const options = {
    method: 'GET',
    headers: headerWithToken,
    };

    fetch(urlSearch, options)
  .then(res => res.json())
  .then(json => {console.log(json);

    res.status(200).json(json);})
  .catch(err => {console.error('error:' + err);
  return res.status(500).json({ error: err.message });

});
}

exports.searchMovieEnglish = async (req,res) =>
{
   searchMovie(req,res,'en-US');
}

exports.searchMovieFrench = async(req,res) => 
{
    searchMovie(req,res,'fr');
}

/**
 * Get all the info about a movie
 * @param idFilm
 * @param {*} req 
 * @param {*} res 
 */
exports.getMovieInfo = (req,res) => 
{
  const idMovie = req.params.idMovie;

  const fetch = require('node-fetch');

  const searchMovieURL = `${URLTMDB}/movie/${idMovie.trim()}`;
  const tokenUrl = addKeyToUrl(searchMovieURL);

  const options = {
    method: 'GET',
    headers: headerWithToken,
  };
  
  fetch(tokenUrl, options)
    .then(res => res.json())
    .then(json => {console.log(json);

      const movie = {
        genre : json['data'],
        name : json['title'],
        releaseDate : json['release_date'],
        description : json['overview']

      }
      const image = {
        poster_path : json['poster_path'],
        backdrop_path:  json['backdrop_path'],

      }
     return res.status(200).json({movie: movie, 
    images: image,
    });})
    .catch(err => {console.error('error:' + err);
    return res.status(500).json({ error: err.message })});

}

function isDateValid(dateStr) {
  return !isNaN(new Date(dateStr));
}

exports.saveMovieInDB = async (req,res) =>
{
 
  try {
     const idFilm = req.body.idFilm;
    const name = req.body.name;
    const release_date = req.body.release_date;
    const description = req.body.description;
    if (!idFilm || !name || !release_date || !description ) {
      return res.status(400).json({ error: "Incomplete information in the body" });
    }

    const film =  await Film.findByPk(idFilm);
    if (film)
    {
      return res.status(400).json({error : "The film already exist in the database"}); 
    }

    if(!isDateValid(release_date))
    {
      return res.status(400).json({error : "The date format isn't correct. Make sure it is in the following format : YYYY/MM/DD"})
    }
    const movie_date = new Date(release_date)
    const film_to_create = {
      idFilm : idFilm,
      name : name, 
      release_date : movie_date,
      description : description, 
    };
    await Film.save(film_to_create);
    
    await Movie.save(idFilm);

    return res.status(200).json("idFilm, name, release_date, description");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

exports.readMovieInDB = async (req,res) => 
{
  try {

    const idFilm = req.body.idFilm; 

    if(!idFilm)
    {
      return res.status(400).json({error: "Incomplete field in the body"});
    }
    const film = await Film.findByPk(idFilm);
    if(!film)
    {
      return res.status(404).json({error : "The film id isn't associated with a movie"});
    }

    return res.status(200).json({film : film});
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}