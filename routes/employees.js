const controller = require('../controllers/index')
const express = require('express');
const router = express.Router();

router.get('/employees', controller.employee.fetchEmployees)

router.post('/employees', controller.employee.createEmployees)

router.patch('/employees/:id', controller.employee.updateEmployees)

router.delete('/employees/:id', controller.employee.deleteEmployees)

module.exports = router