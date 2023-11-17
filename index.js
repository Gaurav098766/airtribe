const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 3002;

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});