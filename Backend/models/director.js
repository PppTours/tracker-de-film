const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize; // Import your Sequelize instance


const Director = sequelize.define('Director',{

    idDirector: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    photoURL:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    }
},{

    timestamps: false,
    freezeTableName: true
   
});




module.exports = Director;