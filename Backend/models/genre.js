const { Model , DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize; // Import your Sequelize instance


const Genre = sequelize.define('Genre',{

    idGenre: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
},{
    
    timestamps: false,
    freezeTableName: true
    
});

module.exports = Genre;