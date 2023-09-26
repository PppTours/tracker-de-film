'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/database')[env];
const { sequelize } = require('../config/database');

const db = {};

/** Import models */
const Person = require('./person'); 
const SerieStatus = require('./seriestatus');
const Director = require('./director');
const Review = require('./review');
const Film = require('./film');
const MovieStatus = require('./moviestatus');
const TvShow = require('./moviestatus');
const FilmGenre = require('./filmgenre');
const Genre = require('./genre');
const Season = require('./season');
const Movie= require('./movie');
const Admin = require('./admin');
const Image = require('./image');




/** Reads all files in the current directory (__dirname) and filters out non-JavaScript files and test files.
 * For each valid model file, it requires the file to initialize the model using the Sequelize instance and DataTypes.
 * Adds the initialized model to the db object with the model's name as the key.
*/
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });
/**Iterates through each model in the db object.
 * If a model has an associate method (for defining associations), it calls that method and passes the entire db object to associate models.
 */
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Exports the models that were directly imported and any other models you choose to export from the index.js file.
module.exports = {
  Person,
  SerieStatus,
  Film,
  Director,
  Review,
  MovieStatus, 
  TvShow ,
  FilmGenre,
  Genre ,
  Season,
  Movie,
  Admin,
  Image,

};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
