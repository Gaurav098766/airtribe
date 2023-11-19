// Import the required PostgreSQL Pool module
const { Pool } = require("pg");

// Load environment variables from the .env file
require("dotenv").config();

// Create a new connection pool using the defined configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Export the connection pool for use in other parts of the application
module.exports = pool;
