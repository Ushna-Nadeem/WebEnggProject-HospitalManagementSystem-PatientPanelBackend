const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Patient',
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paymentType: {
    type: String,
    enum: ['Online', 'Card', 'Stripe'],
    default: null,
  },
  cardPaymentInfo: {
    paymentDate: Date,        // Payment date for card payments
    cardLast4: String,        // Last 4 digits of the card
    cardBrand: String,        // Card brand (Visa, MasterCard, etc.)
    cardExpiryMonth: Number,  // Card expiration month
    cardExpiryYear: Number,   // Card expiration year
  },
  stripePaymentInfo: {
    paymentDate: Date,        // Payment date for stripe payments
  },
});

const Billing = mongoose.model('Billing', billingSchema);

module.exports = Billing;
