const fetch = require('node-fetch');
const {Image} = require('../models');
const {getOptions, apikey,URLTMDB} = require('./tmdb_controller');


const imageUrlTMDB = 'https://image.tmdb.org/t/p/w500/';
const movieURL = `${URLTMDB}/movie/`;
const tvShowURL = `${URLTMDB}/tv/`;
const minimumRating = 5;

function addKeyToURL(url,key)
{

  let urlWithKey = `${url}?&api_key=${key}`;
  return urlWithKey;
}
exports.getImagesForMovieTMDB = async (req, res) => 
{
    getImagesFromTMBD(req,res,'Movie');
}

exports.getImageForTvShowTMDB = async(req,res) => 
{
    getImagesFromTMBD(req,res,'TvShow');
}

async function getImagesFromTMBD (req,res,media) {
    try {
        const idMovie = req.params.idFilm;

        if (!idMovie) {
            return res.status(400).json({ error: 'idMovie absent from the URL' });
        }

        let url;
        if(media == 'Movie')
        {
            url = `${movieURL}/${idMovie}/images`;
        }else
        {
            url = `${tvShowURL}/${idMovie}/images`;
        }
        
        const urlWithToken = addKeyToURL(url, apikey);
        console.log(urlWithToken);

        const response = await fetch(urlWithToken, getOptions);
        const json = await response.json();

        let jsonFilteredImages;
        jsonFilteredImages = json['backdrops'].filter((image) => image.vote_count > minimumRating);

        while (!jsonFilteredImages) {
            jsonFilteredImages = json['backdrops'].filter((image) => image.vote_count > minimumRating - 1);
        }

        const jsonOrdered = jsonFilteredImages.sort((a, k) => a.vote_average - k.vote_average);
        const imageFilePath = jsonOrdered.map((image) => image.file_path);

        if (!imageFilePath || imageFilePath.length === 0) {
            return res.status(400).json({ error: 'Movie doesn\'t have an appropriate image' });
        }

        let createdImages = [];
        let alreadyExistingImages = [];

        for (const filePath of imageFilePath) {
            const imageToCreate = {
                image_url: filePath,
                idFilm: idMovie,
            };

            const existingImage = await Image.findByPk(filePath);

            if (!existingImage) {
                const createdImage = await Image.create(imageToCreate);
                createdImages.push(createdImage);
            } else {
                alreadyExistingImages.push(existingImage);
            }
        }

        return res.status(200).json({ imageCreated: createdImages, imageAlreadyCreated: alreadyExistingImages });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'An error occurred while processing images' });
    }
};

exports.getImagesForFilm = (req,res) =>
{
    try {
        const idFilm = req.params.idFilm;
        if(!idFilm)
        {
            return res.status(400).json({error: "Film isn't selected"});
        }

        Film.findByPk(idFilm).then((film)=> 
        {
            if(!film)
            {
                return res.status(400).json({error: "Film doesn't exist"});
            }else
            {
                ///Recupérer images
            }


        })
        
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'An error occurred with the server' }); 
    }
    

    
}