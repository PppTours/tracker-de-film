const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();


//Middlewares
const   logRequests   = require('./middlewares/logger');
const   verifyToken   = require('./middlewares/jwt_auth');
const {addApiKeyToRequest} = require('./middlewares/tmdb_ware');



//Import routes
const personRoutes = require('./routes/person_routes');
const filmRoutes = require('./routes/film_routes');
const genreRoutes = require('./routes/genre_routes');
const imageRoutes = require('./routes/image_routes');





app.use(express.json());
//app.use(verifyToken);
app.use(logRequests);
app.use(bodyParser.json()); 
///Lets application/x-www-form-urlencoded content be readable
app.use(bodyParser.urlencoded({ extended: true }));// Use body-parser for JSON requests
app.use(cors());
//Use route
app.use('/person',personRoutes)
app.use('/film',filmRoutes);
app.use('/genre',genreRoutes);
app.use('/image',imageRoutes);


// Start the server
const port = process.env.PORT || 3006;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});