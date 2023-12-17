const TestResult = require('../Model/TestResultmodels');

// View test results for a specific patient
exports.viewTestResults = async (req, res) => {
  try {
    const patientId = req.params.patientId;

    const testResults = await TestResult.find({ patientId }).sort({ testDate: -1 });

    if (testResults.length === 0) {
      return res.status(404).json({ message: 'No test results found for the specified patient.' });
    }

    res.status(200).json(testResults);
  } catch (error) {
    console.error('Error retrieving test results:', error);
    res.status(500).json({ message: error.message });
  }
};

// View a specific test result by ID
exports.viewTestResultById = async (req, res) => {
    try {
      const testResultId = req.params.testResultId;
  
      const testResult = await TestResult.findById(testResultId);
  
      if (!testResult) {
        return res.status(404).json({ message: 'Test result not found.' });
      }
  
      res.status(200).json(testResult);
    } catch (error) {
      console.error('Error retrieving test result by ID:', error);
      res.status(500).json({ message: error.message });
    }
  };
  