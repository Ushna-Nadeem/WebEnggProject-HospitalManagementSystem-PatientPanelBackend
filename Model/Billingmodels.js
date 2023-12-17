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
    enum: ['Online', 'Card'],
    default: null,
  },
  paymentDate: {
    type: Date,
    default: null,
  },
  onlinePaymentInfo: {
    paymentMethod: {
      type: String,
      enum: ['CreditCard', 'Other'],
    },
    cardNumber: String,
    expirationDate: String,
    cvv: String,
    cardHolderName: String,
    billingAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
    },
  },
  cardPaymentInfo: {
    cardNumber: String,
    expirationDate: String,
    cvv: String,
    cardHolderName: String,
    billingAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
    },
  },
});

const Billing = mongoose.model('Billing', billingSchema);

module.exports = Billing;
