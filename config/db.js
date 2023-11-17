// Import the required PostgreSQL Pool module
const { Pool } = require('pg');

// Load environment variables from the .env file
require('dotenv').config();

// Define the database configuration using environment variables
const dbConfig = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT
};

// Create a new connection pool using the defined configuration
const connection = new Pool(dbConfig);

// Attempt to connect to the database
connection.connect((err) => {
    if (err) {
        // Log an error message if there's an issue connecting to the database
        console.error('Error connecting to the database:', err.stack);
    } else {
        // Log a message if the database connection is successful
        console.log('Connected to Database');
    }
});

// Export the connection pool for use in other parts of the application
module.exports = { connection };
