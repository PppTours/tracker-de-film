const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize; // Import your Sequelize instance
const Person = require('./person');

const Admin = sequelize.define('Admin', {

    idAdmin: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
}, 
{
    timestamps: false,
    freezeTableName: true

});
Admin.belongsTo(Person, {foreignKey:'idAdmin'});


module.exports = Admin;
