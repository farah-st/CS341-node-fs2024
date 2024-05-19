const express = require('express');
const cors = require('cors');
const mongodb = require('./db/connect'); // Adjust the path if needed
const contactsRoutes = require('./routes/contacts'); // Adjust the path if needed
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Assuming swagger.json is in the root directory

const app = express();

// Use CORS middleware
app.use(cors({
  origin: 'https://cse341-contacts-frontend.netlify.app'
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Use contacts routes
app.use('/contacts', contactsRoutes);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

// Connect to the database and start the server
const PORT = process.env.PORT || 8080;
mongodb.initDb((err) => {
  if (err) {
    console.error('Failed to connect to the database', err);
  } else {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
});

module.exports = app;

