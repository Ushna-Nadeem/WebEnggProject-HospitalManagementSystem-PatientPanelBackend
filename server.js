const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const patientRoutes = require('./Route/Patientroutes');

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
app.use(express.json());

// CORS middleware
app.use(cors());

// Routes
app.use('/patients', patientRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
