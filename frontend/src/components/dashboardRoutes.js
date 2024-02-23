const express = require('express');
const router = express.Router();

router.get('/admindashboard', (req, res) => {
  // Access user information from req.user
  const userRole = req.user.role;
  if (userRole !== 'admin') {
    return res.status(403).json({ error: 'Access forbidden' });
  }

  // Implement logic for admin dashboard
  res.send('Welcome to the Admin Dashboard');
});

router.get('/userdashboard', (req, res) => {
  // Access user information from req.user
  const userRole = req.user.role;
  if (userRole !== 'user') {
    return res.status(403).json({ error: 'Access forbidden' });
  }

  // Implement logic for user dashboard
  res.send('Welcome to the User Dashboard');
});

router.get('/driverdashboard', (req, res) => {
  // Access user information from req.user
  const userRole = req.user.role;
  if (userRole !== 'driver') {
    return res.status(403).json({ error: 'Access forbidden' });
  }

  // Implement logic for driver dashboard
  res.send('Welcome to the Driver Dashboard');
});

module.exports = router;
