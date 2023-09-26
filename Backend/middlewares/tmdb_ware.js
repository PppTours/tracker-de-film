const token = process.env.TOKEN_TMDB;
const apikey = process.env.APIKEY_TMDB;

function addApiKeyToRequest(req, res, next) {

    if(!(token||apikey))
    {
        return res.status(401).json({ message: 'Access denied. No token and/or API KEY provided.' });
    }

    req.headers['accept'] = 'application/json';
    req.headers['Authorization'] = `Bearer ${apikey}`;
  next();
}

module.exports = {
  addApiKeyToRequest,
};