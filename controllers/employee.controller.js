const employeeData = require('../schemas/employeeSchema')

exports.fetchEmployees = async (req, res, next) => {
  try {
    employeeData.find().then(async data => {
      res.status(200).json({ status: true, statusCode: 200, statusMessage: 'success', data: data })
    }, async err => {
      console.error(err)
    })
  } catch (e) {
    res.status(500).json({ status: false, statusCode: 500, statusMessage: 'Internal server error' })
  }
}

exports.createEmployees = async (req, res, next) => {
  try {
    var item = {
      firstName: req.body.firstName,
      lastName: req.body.last,
      email: req.body.email,
      status: req.body.status,
      employeeNumber: req.body.employeeNumber
    }
    var data = new employeeData(item)
    data.save()
    res.status(200).json({ status: true, statusCode: 200, statusMessage: 'data saved successful.' })
  } catch (e) {
    res.status(500).json({ status: false, statusCode: 500, statusMessage: 'Internal server error' })
  }
}

exports.updateEmployees = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedData = await employeeData.findByIdAndUpdate(id, data);
    res.status(200).json({ status: true, statusCode: 200, statusMessage: 'data has been updated successful', data: updatedData });
  } catch (e) {
    console.error(e)
    res.status(500).json({ status: false, statusCode: 500, statusMessage: 'Internal server error' })
  }
}

exports.deleteEmployees = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedData = await employeeData.findByIdAndDelete(id);
    console.info("data deleted", deletedData)
    if (deletedData === null) {
      res.status(400).json({ status: false, statusCode: 400, statusMessage: 'Request failed, ID entered cannot be deleted.', data: deletedData });
    } else {
      res.status(200).json({ status: true, statusCode: 200, statusMessage: 'data has been deleted successful', data: deletedData });
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({ status: false, statusCode: 500, statusMessage: 'Internal server error' })
  }
}