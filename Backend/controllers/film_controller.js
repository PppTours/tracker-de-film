const jwt = require('jsonwebtoken');
const db = require('../models');
const fetch = require('node-fetch');
const Person = require('../models');
const Film = require('../models');

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
        // Trim the string to remove leading and trailing spaces
        const trimmedString = input.trim();
        // Replace spaces with "%20"
        const replacedString = trimmedString.replace(/\s+/g, "%20");
        // Resolve the promise with the result
        resolve(replacedString);
      } catch (error) {
        // Reject the promise if an error occurs
        reject(error);
      }
    });
  }
  
function addKeyToUrl(url,key)
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
  res.status(500).json({ error: err.message });

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
  const tokenUrl = addKeyToUrl(searchMovieURL, apikey);

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

