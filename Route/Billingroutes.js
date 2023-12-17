const express = require('express');
const router = express.Router();
const billingController = require('../Controller/Billingcontrollers');

// View all bills for a specific patient
router.get('/:patientId', billingController.viewBills);

// View outstanding bills for a specific patient
router.get('/outstanding/:patientId', billingController.viewOutstandingBills);

// View paid bills for a specific patient
router.get('/paid/:patientId', billingController.viewPaidBills);

// Pay outstanding bills for a specific patient
router.put('/payment/:patientId', billingController.payBills);

module.exports = router;
