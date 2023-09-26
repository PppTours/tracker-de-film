const { Model , DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize; // Import your Sequelize instance
const Film = require('./film');
const Person = require('./person');


const Review = sequelize.define('Review',{

    idReview: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    rating: {
        type: DataTypes.DOUBLE,
        defaultValue:0.0,
        
    },
    reviewDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW

    },
    notes:{
        type: DataTypes.STRING,
        allowNull: true,
    }
},{
    timestamps: false,
    freezeTableName: true
});


Review.belongsTo(Film,{foreignKey: 'idFilm', as: 'film',});
Review.belongsTo(Person,{foreignKey: 'idPerson', as: 'person',});



module.exports = Review;