const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize;
const  Film  = require('./film');
const Genre  = require('./genre');


const FilmGenre = sequelize.define('MovieGenre', {

    idFilm:  {
        type: DataTypes.INTEGER,
        primaryKey:true,

    },
    idGenre:  {
        type: DataTypes.INTEGER,
        primaryKey:true,

    }
}, 
{
    timestamps: false,
    freezeTableName: true
})

Film.belongsToMany(Genre, {through:'FilmGenre' ,foreignKey: 'idFilm', otherKey: 'idGenre', as: 'genres'});
Genre.belongsToMany(Film, {through:'FilmGenre', foreignKey: 'idGenre', otherKey: 'idFilm', as: 'films'});

module.exports = FilmGenre ;