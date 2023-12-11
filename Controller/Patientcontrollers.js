const Patient = require('../Model/Patientmodels');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

exports.registerPatient = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the patient is already registered
    const existingPatient = await Patient.findOne({ username });

    if (existingPatient) {
      return res.status(400).json({ error: 'Patient with this username already exists' });
    }

    const patient = new Patient({ username, email, password });
    await patient.save();

    res.status(201).json({ message: 'Patient registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.loginPatient = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the patient exists
    const patient = await Patient.findOne({ username });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Check if the provided password is valid
    const isPasswordValid = await bcrypt.compare(password, patient.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate and send a JWT token as a response
    const token = jwt.sign({ patientId: patient._id }, process.env.JWT_SECRET, {
      expiresIn: '24h', // Token expires in 24 hours
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
