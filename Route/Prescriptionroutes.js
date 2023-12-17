const express = require('express');
const router = express.Router();
const prescriptionController = require('../Controller/Prescriptioncontrollers');

// View active prescriptions for a patient
router.get('/viewActive/:patientId', prescriptionController.viewActivePrescriptions);

// Request prescription refill for a specific prescription
router.put('/requestRefill/:prescriptionId', prescriptionController.requestRefill);

module.exports = router;
