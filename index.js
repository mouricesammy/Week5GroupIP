require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;

const app = express();
app.use(express.json());


app.use("/", require('./routes/employees'))
app.get('/', async (req, res, next) => {
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Employees | API</title>
    </head>
    <body>
      <h1>Employee services api</h1>
      <hr/>
      <div>
      <h2>Lets test it</h2>
      <div>
      <span>Get Employees: </span><a target="_blank" href="https://employee-service-api.onrender.com/employees">Get Employees</a>
      </div>
      </div>
    </body>
  </html>
`;
  res.send(html)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});