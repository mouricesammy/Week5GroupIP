require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


// Define the connection string
const connectionString = process.env.MONGO_URL;
const PORT = process.env.PORT;

// Connect to the database using the connection string
mongoose.connect(connectionString);

const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database connected');
});


const app = express();

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(PORT ,()=> {
    console.log(`Server is running on port ${PORT}`)
});