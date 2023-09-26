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


exports.addGenres = async (req, res) => {
    const genres = req.body.genres;

    console.log(genres);
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
