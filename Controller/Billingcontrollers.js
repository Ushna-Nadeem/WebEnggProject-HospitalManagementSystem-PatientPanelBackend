const Billing = require('../Model/Billingmodels');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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

// Pay outstanding bills for a specific patient using Card
exports.payBillsWithCard = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const billIds = req.body.billIds;

    // Retrieve outstanding bills for the specified billIds and patient
    const outstandingBills = await Billing.find({ _id: { $in: billIds }, patientId, isPaid: false });

    if (outstandingBills.length === 0) {
      return res.status(404).json({ message: 'No outstanding bills found for the specified patient and billIds.' });
    }

    // Calculate total outstanding amount
    const totalAmount = outstandingBills.reduce((sum, bill) => sum + bill.amount, 0);

    // Update bills as paid and set payment information
    await Billing.updateMany(
      { _id: { $in: billIds }, patientId, isPaid: false },
      {
        $set: {
          isPaid: true,
          paymentType: 'Card',
          cardPaymentInfo: {
            paymentDate: new Date(),
            cardLast4: req.body.cardLast4,
            cardBrand: req.body.cardBrand,
            cardExpiryMonth: req.body.cardExpiryMonth,
            cardExpiryYear: req.body.cardExpiryYear,
          },
        },
      }
    );

    res.status(200).json({ message: 'Bills paid successfully!', totalAmount, paymentType: 'Card' });
  } catch (error) {
    console.error('Error paying bills with Card:', error);
    res.status(500).json({ message: error.message });
  }
};

// Pay outstanding bills for a specific patient using Stripe
exports.payBillsWithStripe = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const billIds = req.body.billIds;

    // Retrieve outstanding bills for the specified billIds and patient
    const outstandingBills = await Billing.find({ _id: { $in: billIds }, patientId, isPaid: false });

    if (outstandingBills.length === 0) {
      return res.status(404).json({ message: 'No outstanding bills found for the specified patient and billIds.' });
    }

    // Calculate total outstanding amount
    const totalAmount = outstandingBills.reduce((sum, bill) => sum + bill.amount, 0);

    // Create a PaymentIntent using the Stripe API
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // Stripe requires the amount in cents
      currency: 'usd',
    });

    // Update bills as paid and set payment information
    await Billing.updateMany(
      { _id: { $in: billIds }, patientId, isPaid: false },
      {
        $set: {
          isPaid: true,
          paymentType: 'Stripe',
          stripePaymentInfo: {
            paymentIntentId: paymentIntent.id,
            paymentDate: new Date(),
          },
        },
      }
    );

    res.status(200).json({ message: 'Bills paid successfully!', totalAmount, clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error paying bills with Stripe:', error);
    res.status(500).json({ message: error.message });
  }
};
