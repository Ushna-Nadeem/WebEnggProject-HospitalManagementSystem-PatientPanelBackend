const express = require('express');
const patientController = require('../Controller/Patientcontrollers');
const router = express.Router();

// Register a new patient
router.post('/register', patientController.registerPatient);

// Login with JWT-based authentication
router.post('/login', patientController.loginPatient);

module.exports = router;
