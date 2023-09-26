const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize; // Import your Sequelize instance

const Season = sequelize.define('Season',
{
    idShow: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Show', 
            key: 'idShow',
        },
    },
    idSeason: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,

    },
    seasonNumber: 
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    episodes : {
        type: DataTypes.INTEGER, 
        allowFalse: false,
    },

},
{
    timestamps: false,
    freezeTableName: true
});

module.exports = Season;