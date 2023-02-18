const express = require('express');
const mongoose = require('mongoose');


// Define the connection string
const connectionString = 'mongodb://127.0.0.1:27017/Employees';

// Connect to the database using the connection string
mongoose.connect(connectionString);

const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database connected');
});

const PORT=5000;
const app = express();

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(PORT ,()=> {
    console.log(`Server is running on port ${PORT}`)
});