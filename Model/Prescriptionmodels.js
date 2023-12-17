const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Patient',
  },
  medicationName: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  prescriptionDate: {
    type: Date,
    default: Date.now,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  refillsRemaining: {
    type: Number,
    default: 0,
  },
  pharmacyName: String,
  pharmacyAddress: String,
  pharmacyPhone: String,
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
