require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema

var employeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: String,
  email: String,
  status: String
}, { collection: 'employees' })
var employeeData = mongoose.model('employees', employeeSchema)

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
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/employees', async (req, res, next) => {
  employeeData.find()
    .then(async data => {
      res.status(200).json(data)
    }, async err => {
      console.error(err)
    })
})

app.post('/employees', async (req, res, next) => {
  var item = {
    firstName: req.body.firstName,
    lastName: req.body.last,
    email: req.body.email,
    status: req.body.status
  }
  var data = new employeeData(item)
  data.save()
  res.status(200).json({ message: 'data saved successful.' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});