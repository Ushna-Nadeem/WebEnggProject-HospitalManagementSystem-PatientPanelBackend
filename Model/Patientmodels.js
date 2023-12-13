const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const patientSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String },
  age: { type: String },
  weight: { type: String },
  height: { type: String },
  gender: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
  medicalHistory: {
    allergies: { type: String },
    medications: { type: String },
    conditions: { type: String },
    bloodtype: { type: String },
  },
});

// Hash the password before saving to the database
patientSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
