const { Model , DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize; // Import your Sequelize instance
const Film = require('./film');
const Person = require('./person');

const MovieStatus = sequelize.define('Status',{
    idPerson: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Person',
        },
    },
    idFilm: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Film', 
            key: 'idFilm',
        },
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    statusTime:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    viewCount:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
},{
    timestamps: false,
    freezeTableName: true
});

// Establish associations
MovieStatus.belongsTo(Person, {
    foreignKey: 'idPerson',
    onDelete: 'CASCADE', // Delete related Status records if a Person is deleted
    onUpdate: 'CASCADE', // Update related Status records if a Person ID is updated
});

MovieStatus.belongsTo(Film, {
    foreignKey: 'idFilm',
    onDelete: 'CASCADE', // Delete related Status records if a Film is deleted
    onUpdate: 'CASCADE', // Update related Status records if a Film ID is updated
});

// You can also define associations on the Person and Film models, but it's optional
Person.hasMany(MovieStatus, {
    foreignKey: 'idPerson',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Film.hasMany(MovieStatus, {
    foreignKey: 'idFilm',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
module.exports = MovieStatus;