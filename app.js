const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');


const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())  // Parses JSON request bodies
  .use((req, res, next) => {
    // Sets various headers to handle CORS and content type
    res.setHeader('Access-Control-Allow-Origin', 'https://cs341-node-fs2024.onrender.com');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'origin, X-Requested-with, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();  // Passes control to the next middleware
  })
  .use('/', require('./routes'));  // Routes for handling different endpoints


mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

//reminder: use node app.js to verify if it's running