// Import the required PostgreSQL Pool module
const { Pool } = require("pg");

// Load environment variables from the .env file
require("dotenv").config({
  path: "./config/config.env",
});

// Define the database configuration using environment variables
const dbConfig = {
  // user: process.env.USER,
  // host: process.env.HOST,
  // database: process.env.DATABASE,
  // password: process.env.PASSWORD,
  // port: process.env.DB_PORT
  user: "user123",
  host: "db",
  password: "password123",
  database: "db123",
  port: 5432,
};

// Create a new connection pool using the defined configuration
const pool = new Pool(dbConfig);

// Attempt to connect to the database
// pool.connect((err) => {
//   if (err) {
//     // Log an error message if there's an issue connecting to the database
//     console.error("Error connecting to the database:", err.stack);
//   } else {
//     // Log a message if the database connection is successful
//     console.log("Connected to Database");
//   }
// });

// Export the connection pool for use in other parts of the application
module.exports = pool;
