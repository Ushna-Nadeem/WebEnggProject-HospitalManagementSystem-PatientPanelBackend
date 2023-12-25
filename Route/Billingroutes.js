const express = require('express');
const router = express.Router();
const billingController = require('../Controller/Billingcontrollers');

// View all bills for a specific patient
router.get('/:patientId', billingController.viewBills);

// View outstanding bills for a specific patient
router.get('/outstanding/:patientId', billingController.viewOutstandingBills);

// View paid bills for a specific patient
router.get('/paid/:patientId', billingController.viewPaidBills);

// Pay outstanding bills for a specific patient using Card
router.put('/payment/card/:patientId', billingController.payBillsWithCard);

// Pay outstanding bills for a specific patient using Stripe
router.put('/payment/stripe/:patientId', billingController.payBillsWithStripe);

module.exports = router;
