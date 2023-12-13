const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticatePatient = (req, res, next) => {
  // Get the token from the request headers
  const tokenHeader = req.header('Authorization');

  if (!tokenHeader) {
    return res.status(401).json({ error: 'Unauthorized - Missing token' });
  }

  // Remove the "Bearer " prefix
  const token = tokenHeader.replace('Bearer ', '');

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded payload to the request for further use
    req.patientId = decoded.patientId; // Access patientId directly

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

module.exports = authenticatePatient;
