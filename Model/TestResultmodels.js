const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Patient',
  },
  testName: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  testDate: {
    type: Date,
    default: Date.now,
  },
  labName: {
    type: String,
  },
  labAddress: {
    type: String,
  },
  labPhone: {
    type: String,
  },
  doctorName: {
    type: String,
  },
  comments: {
    type: String,
  },
});

const TestResult = mongoose.model('TestResult', testResultSchema);

module.exports = TestResult;
