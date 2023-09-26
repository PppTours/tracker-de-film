const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize; // Import your Sequelize instance
const Director = require('./director');

const Film = sequelize.define('Film', {

    idFilm: {
        type: DataTypes.STRING,
        primaryKey:true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false

    },
    releaseDate: {
        type: DataTypes.DATE,
        allowNull: true,


    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },

},

{
    timestamps: false,
    freezeTableName: true
});



Film.belongsTo(Director,{foreignKey: 'idDirector', as: 'director',});


module.exports = Film ;