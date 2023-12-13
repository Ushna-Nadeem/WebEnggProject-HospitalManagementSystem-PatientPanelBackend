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

exports.getPatientProfile = async (req, res) => {
  try {
    // Use req.patientId to fetch the patient profile
    const patient = await Patient.findById(req.patientId).select('-password');

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updatePatientProfile = async (req, res) => {
  try {
    const {
      fullName,
      age,
      weight,
      height,
      gender,
      phoneNumber,
      address,
    } = req.body;

    const updatedPatient = await Patient.findByIdAndUpdate(
      req.patientId, // req.patientId to identify the patient
      {
        fullName,
        age,
        weight,
        height,
        gender,
        phoneNumber,
        address,
      },
      { new: true, select: '-password' }
    );

    if (!updatedPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json(updatedPatient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getPatientMedicalHistory = async (req, res) => {
  try {
    const patient = await Patient.findById(req.patientId).select('medicalHistory');

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json(patient.medicalHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updatePatientMedicalHistory = async (req, res) => {
  try {
    const { allergies, medications, conditions, bloodtype } = req.body;

    const updatedPatient = await Patient.findByIdAndUpdate(
      req.patientId,
      {
        'medicalHistory.allergies': allergies,
        'medicalHistory.medications': medications,
        'medicalHistory.conditions': conditions,
        'medicalHistory.bloodtype': bloodtype,
      },
      { new: true, select: 'medicalHistory' }
    );

    if (!updatedPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json(updatedPatient.medicalHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deletePatientProfile = async (req, res) => {
  try {
    // Check if the provided confirmation matches
    const { confirmation } = req.body;

    if (confirmation !== 'CONFIRM_DELETE') {
      return res.status(400).json({ error: 'Invalid confirmation' });
    }

    // Find the patient by ID and remove them from the database
    const deletedPatient = await Patient.findByIdAndDelete(req.patientId);

    if (!deletedPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json({ message: 'Patient profile deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
