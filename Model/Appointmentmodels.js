const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Patient',
  },
  doctorName: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  preferredDate: {
    type: Date,
    required: true,
  },
  preferredTime: {
    type: String,
    required: true,
  },
  appointmentType: {
    type: String,
    enum: ['Consultation', 'Follow-up'],
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  hasInsurance: {
    type: Boolean,
    default: false,
  },
  emergencyContact: {
    name: {
      type: String,
    },
    number: {
      type: String,
    },
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Cancelled'],
    default: 'Scheduled',
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
