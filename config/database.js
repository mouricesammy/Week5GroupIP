require('dotenv').config()
const mongoose = require('mongoose');

const Schema = mongoose.Schema

// Connect to the database using the connection string
mongoose.connect(process.env.MONGO_URL);

const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database connected');
});

module.exports = database
module.exports = Schema