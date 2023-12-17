const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const patientRoutes = require('./Route/Patientroutes');
const appointmentRoutes = require('./Route/Appointmentroutes');
const prescriptionRoutes = require('./Route/Prescriptionroutes');
const testResultRoutes = require('./Route/TestResultroutes');
const billingRoutes = require('./Route/Billingroutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error(`MongoDB connection error: ${error.message}`);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For handling form submissions

// Routes
app.use('/patients', patientRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/prescriptions', prescriptionRoutes);
app.use('/testresults', testResultRoutes);
app.use('/bills', billingRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
