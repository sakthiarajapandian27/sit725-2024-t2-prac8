const {Walker} = require('../Models/signupModelWalker')

const createNewWalkerRegistration = async (req, res) => {
  const {
    firstName,
    lastName,
    phone,
    email,
    idProof,
    document_number, 
    certification,
    otherCertification,
    address,
    suburb,
    postalCode,
    service,
    password,
  } = req.body;

  // Ensure all required fields are present
  if (
    !firstName ||
    !lastName ||
    !phone ||
    !email || // Add this validation check
    !address ||
    !suburb ||
    !postalCode ||
    !service ||
    !password
  ) {
    return res.status(400).json({ error: 'All fields are required' });
  }


  // Create a new walker registration instance
  const newWalkerRegistration = new Walker({
    firstName,
    lastName,
    phone,
    email,
    idProof,
    document_number, 
    certification,
    otherCertification,
    address,
    suburb,
    postalCode,
    services: Array.isArray(service) ? service : [service], // Ensure service is always an array
    password,
  });

  try {
    await newWalkerRegistration.save();
    res.status(201).json(newWalkerRegistration);
  } catch (error) {
    console.error('Error saving registration:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to save registration' });
  }
};

module.exports = {
  createNewWalkerRegistration,
};
