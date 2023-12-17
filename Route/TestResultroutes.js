const express = require('express');
const router = express.Router();
const testResultController = require('../Controller/TestResultcontrollers');

// View test results for a specific patient
router.get('/viewTestResults/:patientId', testResultController.viewTestResults);

// View a specific test result
router.get('/:testResultId', testResultController.viewTestResultById);

module.exports = router;
