const token = process.env.TOKEN_TMDB;
const apikey = process.env.APIKEY_TMDB;
const URLTMDB = 'https://api.themoviedb.org/3';

const headerWithToken = {
  accept: 'application/json',
  Authorization: 'Bearer'+token  
};

const getOptions = {
    method: 'GET',
    headers: {
        accept: headerWithToken,
          }
    };

module.exports = {getOptions, apikey, URLTMDB};