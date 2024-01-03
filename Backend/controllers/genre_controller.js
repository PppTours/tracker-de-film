const jwt = require('jsonwebtoken');
const db = require('../models');
const fetch = require('node-fetch');
const {Person, Film ,Genre} = require('../models');

const token = process.env.TOKEN_TMDB;
const apikey = process.env.APIKEY_TMDB;
const URLTMDB = 'https://api.themoviedb.org/3';

const headerWithToken = {
  accept: 'application/json',
  Authorization: 'Bearer'+token  
};

function addKeyToUrl(url)
{

  let urlWithToken = `${url}?&api_key=${token}`;
  return urlWithToken;
}

exports.addGenres = async (req, res) => {
    const genres = req.body.genres;

    let addedGenre = []; 
    let alreadyPresentGenre = [];

    try {
        for (const genre of genres) {
            const [idGenre, genreName] = JSON.parse(genre);
            const existingGenre = await Genre.findByPk(idGenre);

            if (existingGenre) {
                alreadyPresentGenre.push(existingGenre);
            } else {
                const genreToAdd = {
                    idGenre: idGenre,
                    name: genreName, 
                };

                const createdGenre = await Genre.create(genreToAdd);
                addedGenre.push(createdGenre);
            }
        }
        return res.status(200).json({ AddedGenre: addedGenre, alreadyPresentGenre: alreadyPresentGenre });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const fetchAndSaveGenres = async (url) => {
    const urlWithKey = addKeyToUrl(url);
    const options = {
        method: 'GET',
        headers: headerWithToken,
    };

    try {
        const response = await fetch(urlWithKey, options);
        const json = await response.json();

        const genres = json.genres;

        for (const genre of genres) {
            const idGenre = genre.id;
            const genreName = genre.name;

            const existingGenre = await Genre.findByPk(idGenre);

            if (!existingGenre) {
                const genre_to_create = {
                    idGenre: idGenre,
                    name: genreName,
                };

                await Genre.create(genre_to_create);
            }
        }

        return { success: true, message: "Genres have been correctly added to the database" };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

exports.setGenresFromTMDB = async (req, res) => {
    try {
        const movieUrl = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
        const tvUrl = 'https://api.themoviedb.org/3/genre/tv/list?language=en';

        const movieResult = await fetchAndSaveGenres(movieUrl);
        const tvResult = await fetchAndSaveGenres(tvUrl);

        if (movieResult.success && tvResult.success) {
            return res.status(200).json({ message: "Genres have been correctly added to the database" });
        } else {
            return res.status(500).json({ error: "An error occurred while fetching and saving genres" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getGenreName = async (req,res) => {

    try {

        const genreId = req.params.id; 
        if(!genreId)
        {
            return res.status(400).json({error: "There id of the genre is absent"});
        }

        Genre.findByPk(genreId).then(genre => {
            if(!genre)
            {
                return res.status(400).json({error: "There is not associated genre to the id"});
            }
            
            return res.status(200).json({genre: genre})

        })

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
    
    
}

exports.getAllGenre = async (req, res) => {
    try {
        
        const genres =  await Genre.findAll();
        if(!genres)
        {
            return res.status(400).json({error: "No genre in the database"});
        }
    } catch (error) {
        return res.status(500).json({ error: error.message }); 
    }
}