const express = require('express');
const router = express.Router();
const appointmentController = require('../Controller/Appointmentcontrollers');

// Book an appointment
router.post('/book', appointmentController.bookAppointment);

// View appointments
router.get('/view/:patientId', appointmentController.viewAppointments);

// Cancel an appointment
router.put('/cancel/:appointmentId', appointmentController.cancelAppointment);

module.exports = router;
