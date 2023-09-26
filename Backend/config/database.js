const { Sequelize } = require('sequelize');

exports.sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
});

// Function to test the database connection
console.log('Connecting to database...');
exports.sequelize.options.logging = false;
exports.sequelize
.authenticate()
.then(() => {
    console.log('Database connection has been established successfully.');
})
.catch((err) => {
    console.error('Unable to connect to the database:', err);
});
