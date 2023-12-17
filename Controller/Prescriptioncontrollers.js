const Prescription = require('../Model/Prescriptionmodels');

// View active prescriptions for a patient
exports.viewActivePrescriptions = async (req, res) => {
  try {
    const patientId = req.params.patientId;

    const prescriptions = await Prescription.find({
      patientId,
      isActive: true,
    });

    res.status(200).json(prescriptions);
  } catch (error) {
    console.error('Error retrieving active prescriptions:', error);
    res.status(500).json({ message: error.message });
  }
};

// Request prescription refill for a specific prescription
exports.requestRefill = async (req, res) => {
    try {
      const prescriptionId = req.params.prescriptionId;
      const { pharmacyName, pharmacyAddress, pharmacyPhone } = req.body;
  
      const prescription = await Prescription.findById(prescriptionId);
  
      if (!prescription) {
        return res.status(404).json({ message: 'Prescription not found' });
      }
  
      // Check if refills are remaining
      if (prescription.refillsRemaining === 0) {
        return res.status(400).json({ message: 'No refills remaining for this prescription' });
      }
  
      // Update prescription details
      prescription.isActive = true;
      prescription.refillsRemaining -= 1;
  
      if (pharmacyName) {
        prescription.pharmacyName = pharmacyName;
      }
  
      if (pharmacyAddress) {
        prescription.pharmacyAddress = pharmacyAddress;
      }
  
      if (pharmacyPhone) {
        prescription.pharmacyPhone = pharmacyPhone;
      }
  
      // Save the updated prescription
      const updatedPrescription = await prescription.save();
  
      res.status(200).json(updatedPrescription);
    } catch (error) {
      console.error('Error requesting prescription refill:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };  
