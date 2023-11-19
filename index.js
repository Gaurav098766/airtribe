// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const courses = require("./routes/CourseRoute");
const instructor = require("./routes/InstructorRoute");
const comment = require("./routes/CommentRoute");

// Load environment variables from .env file
require("dotenv").config();

// Connect to the database
require("./config/db");
// require("./config/db.seed");s

// Create an instance of the Express application
const app = express();

// Define the port for the server to listen on
const port = process.env.SERVER_PORT;

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// To check server status
app.get("/", (req, res) => {
  res.send("Health Check... Status OK");
});

// Mount Routers
app.use("/api/v1/courses", courses);
app.use("/api/v1/instructor", instructor);
app.use("/api/v1/comment", comment);

// Start the Express server
app.listen(port, () => {
  // Log a message when the server is successfully started
  console.log(`Server is running on port ${port}`);
});
