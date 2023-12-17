const Billing = require('../Model/Billingmodels');

// View all bills for a specific patient
exports.viewBills = async (req, res) => {
  try {
    const patientId = req.params.patientId;

    const bills = await Billing.find({ patientId }).sort({ date: -1 });

    if (bills.length === 0) {
      return res.status(404).json({ message: 'No bills found for the specified patient.' });
    }

    res.status(200).json(bills);
  } catch (error) {
    console.error('Error retrieving bills:', error);
    res.status(500).json({ message: error.message });
  }
};

// View outstanding bills for a specific patient
exports.viewOutstandingBills = async (req, res) => {
  try {
    const patientId = req.params.patientId;

    const outstandingBills = await Billing.find({ patientId, isPaid: false }).sort({ date: -1 });

    if (outstandingBills.length === 0) {
      return res.status(404).json({ message: 'No outstanding bills found for the specified patient.' });
    }

    res.status(200).json(outstandingBills);
  } catch (error) {
    console.error('Error retrieving outstanding bills:', error);
    res.status(500).json({ message: error.message });
  }
};

// View paid bills for a specific patient
exports.viewPaidBills = async (req, res) => {
  try {
    const patientId = req.params.patientId;

    const paidBills = await Billing.find({ patientId, isPaid: true }).sort({ date: -1 });

    if (paidBills.length === 0) {
      return res.status(404).json({ message: 'No paid bills found for the specified patient.' });
    }

    res.status(200).json(paidBills);
  } catch (error) {
    console.error('Error retrieving paid bills:', error);
    res.status(500).json({ message: error.message });
  }
};
