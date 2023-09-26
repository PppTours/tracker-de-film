const { Model , DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize; // Import your Sequelize instance

// Define the Person model
const Person = sequelize.define('Person', {
  idPerson: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
},{
    timestamps: false,
    freezeTableName: true
}
);

// Export the Person model
module.exports = Person;