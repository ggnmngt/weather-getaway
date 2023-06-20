const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { dbUsername, dbPassword } = require('./config');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*',
})); // TODO: update to only allow allowed origins

// Routes
const citiesRouter = require('./routes/cities');
app.use('/api/cities', citiesRouter);

// MongoDB Atlas connection string
const connectionString = 'mongodb+srv://'+ dbUsername + ':' + dbPassword + '@cluster0.h9n0idu.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose
  .connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');

    // Start the server
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });