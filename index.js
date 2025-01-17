require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

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

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(PORT ,()=> {
    console.log(`Server is running on port ${PORT}`)
});


//update

router.patch('/:id', async function (req, res) {
  try {
      const id = req.params.id;

      const data = req.body;

      const updatedData = await employeeData.findByIdAndUpdate(id, data);
      res.status(200).json(updatedData);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

//delete

router.delete('/:id', async function (req, res) {
  try {
      const id = req.params.id;
      const deletedData = await employeeData.findByIdAndDelete(id);
      res.status(200).json(deletedData);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});



module.exports = router;