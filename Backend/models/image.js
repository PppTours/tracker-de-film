const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize; 
const Film = require('./film');

const Image = sequelize.define('Image', {

    image_url: {
        type: DataTypes.STRING,
        primaryKey:true, 
        unique: true,
    }

}, 
{
    timestamps: false,
    freezeTableName: true

})

Image.belongsTo(Film, {foreignKey: 'idFilm',as: 'film'});

module.exports = Image ;