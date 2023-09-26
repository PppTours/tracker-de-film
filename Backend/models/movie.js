const { Model , DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize; // Import your Sequelize instance
const Film = require('./film');
const Person = require('./person');

const Movie = sequelize.define('Status',{
   
   
},{
    timestamps: false,
    freezeTableName: true
});

Movie.belongsTo(Film, {foreignKey:'idMovie'});
module.exports = Movie;