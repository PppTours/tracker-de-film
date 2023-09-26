const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize; // Import your Sequelize instance
const Film = require('./film');

const TvShow = sequelize.define('Show', 
{

}, 
{
    timestamps: false,
    freezeTableName: true
});

TvShow.belongsTo(Film, {foreignKey:'idTvShow'});


module.exports = TvShow;