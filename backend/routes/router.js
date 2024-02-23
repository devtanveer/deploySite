const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const schemas = require('../models/schemas');
const multer = require('multer'); // Import multer for handling file uploads
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');


// Set up storage for multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads'); // Store uploaded files in the uploads directory
    },
    filename: function(req, file, cb) {
      cb(null,file.originalname); // Use a unique filename for each uploaded file
    }
  });


// Set up multer instance
const upload = multer({ storage: storage });


router.post('/contact/:a', async (req, res) => {
    const { name, email, phone, address, website, message } = req.body;
    const action = req.params.a;

    switch (action) {
        case "send":
            const contactData = { name, email, phone, address, website, message };
            const newContact = new schemas.Contact(contactData);

            try {
                const saveContact = await newContact.save();
                res.send('Message sent. Thank you.');
            } catch (error) {
                console.error('Error saving contact:', error);
                res.status(500).send('Failed to send message.');
            }
            break;

        default:
            res.status(400).send('Invalid Request');
            break;
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await schemas.Users.find({}).exec();
        if (users.length > 0) {
            res.send(JSON.stringify(users));
        } else {
            res.status(404).send('Users not found.');
        }
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send('Internal Server Error');
    }
});



// Route to count total users
router.get('/users/count', async (req, res) => {
    try {
        // Query the database to retrieve the count of all users
        const usersCount = await schemas.Users.countDocuments();

        // Send the response with the count of all users
        res.status(200).json({ totalUsersCount: usersCount });
    } catch (error) {
        console.error('Error counting total users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to count users by role
router.get('/drivers/count', async (req, res) => {
    try {
        const { role } = req.query;

        // Query the database to retrieve the count of users based on the provided role
        const usersCount = await schemas.Users.countDocuments({ role: "driver" });

        // Send the response with the count of users with the specified role
        res.status(200).json({ totalUsersCount: usersCount });
    } catch (error) {
        console.error('Error counting users by role:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





// POST method for saving users data 
router.post('/users', async (req, res) => {
    const { name, email, phone, address, userId, password, role } = req.body;
  
    try {
      // Check if user with the same email or userId already exists
      const existingUser = await schemas.Users.findOne({ $or: [{ email }, { userId }] });
  
      if (existingUser) {
          return res.status(400).send('User with the same email or userId already exists.');
      }
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new schemas.Users({ name, email, phone, address, userId, password: hashedPassword, role });
      const savedUser = await newUser.save();
  
      res.status(201).json(savedUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  




// POST method for user login
router.post('/login', async (req, res) => {
    const { userId, password } = req.body;

    try {
        // Check if the user exists
        const user = await schemas.Users.findOne({ userId });

        if (!user) {
            console.log('User Not Exist');
            return res.status(401).send('Invalid User');
        }

        // Compare the entered password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.log('Invalid Password');
            return res.status(401).send('Invalid credentials');
        }

        // If credentials are valid, generate a token with user information, including role
        const token = jwt.sign({ userId: user.userId, role: user.role }, 'your-secret-key', { expiresIn: '1h' });

        // Send the token along with user role in the response
        res.json({ token, role: user.role });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
});



// Example route to check user role
router.get('/check-role', (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    try {
        const decodedToken = jwt.verify(token.split(' ')[1], 'your-secret-key');
        const userRole = decodedToken.role;
        res.json({ role: userRole });
    } catch (error) {
        console.error('Error decoding token:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
});


// Route to update user details
router.post('/update-user-details', async (req, res) => {
    const { userId, newDetails } = req.body;

    try {

         // Check if the user exists
        const user = await schemas.Users.findOne({ userId });

        if (!user) {
            console.log('User Not Exist');
            return res.status(401).send('Invalid User');
        }
        


        // Find the user by userId and update the details
        const updatedUser = await schemas.Users.findOneAndUpdate({ userId }, newDetails, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate a new token with updated user information
        const token = jwt.sign({ userId: updatedUser.userId, role: updatedUser.role }, 'your-secret-key', { expiresIn: '1h' });

        res.json({ token, user: updatedUser });
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to change user role
router.post('/change-role', async (req, res) => {
    const { userId, newRole } = req.body;

    try {
        // Find the user by userId and update the role
        const updatedUser = await schemas.Users.findOneAndUpdate({ userId }, { role: newRole }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate a new token with updated user information
        const token = jwt.sign({ userId: updatedUser.userId, role: updatedUser.role }, 'your-secret-key', { expiresIn: '1h' });

        res.json({ token, role: updatedUser.role });
    } catch (error) {
        console.error('Error changing user role:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Change the backend route for fetching users to /all-users
router.get('/all-users', async (req, res) => {
    try {
        const users = await schemas.Users.find({}).exec();
        if (users.length > 0) {
            res.send(JSON.stringify(users));
        } else {
            res.status(404).send('Users not found.');
        }
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send('Internal Server Error');
    }
});



// Route to fetch driver users
router.get('/drivers', async (req, res) => {
    try {
        const drivers = await schemas.Users.find({ role: 'driver' }).exec();
        if (drivers.length > 0) {
            res.json(drivers);
        } else {
            res.status(404).send('No driver users found.');
        }
    } catch (error) {
        console.error('Error retrieving driver users:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Updating User details
// Existing endpoint for updating user details
router.post('/update-User', async (req, res) => {
  const { userId, ...updatedUserData } = req.body;

  try {
    const updatedUser = await schemas.Users.findOneAndUpdate({ userId }, updatedUserData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/update-username', async (req, res) => {
    const { userId, newUsername } = req.body;

    try {
        // Find the user by userId and update the username
        const updatedUser = await schemas.Users.findOneAndUpdate({ userId }, { username: newUsername }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Optionally, generate a new token with updated user information
        const token = jwt.sign({ userId: updatedUser.userId, role: updatedUser.role }, 'your-secret-key', { expiresIn: '1h' });

        res.json({ token, username: updatedUser.username });
    } catch (error) {
        console.error('Error updating username:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





// Delete user endpoint
router.delete('/delete-user/:userId', async (req, res) => {
    const userIdToDelete = req.params.userId;

    console.log('Deleting user with userId:', userIdToDelete);

    try {
        // Find the user by userId and delete it
        const deletedUser = await schemas.Users.findOneAndDelete({ userId: userIdToDelete });

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



  

// Route to fetch all complaints
router.get('/complaints', async (req, res) => {
    try {
        // Fetch all complaints from the database
        const Complaint = schemas.Complaint;

        const complaints = await Complaint.find();

        // Convert binPhoto to base64
        complaints.forEach(complaint => {
            const base64Image = fs.readFileSync(complaint.binPhoto, { encoding: 'base64' });
            complaint.binPhoto = `data:image/jpeg;base64,${base64Image}`;
        });

        res.json(complaints);
    } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({ error: 'Failed to fetch complaints' });
    }
});


// Route to fetch complaints with assigned drivers
router.get('/complaints/assigned', async (req, res) => {
    try {
        // Fetch complaints with assigned drivers from the database
        const Complaint = schemas.Complaint;

        const complaints = await Complaint.find({ assignedDriver: { $ne: null } });

        // Convert binPhoto to base64
        complaints.forEach(complaint => {
            const base64Image = fs.readFileSync(complaint.binPhoto, { encoding: 'base64' });
            complaint.binPhoto = `data:image/jpeg;base64,${base64Image}`;
        });

        res.json(complaints);
    } catch (error) {
        console.error('Error fetching assigned complaints:', error);
        res.status(500).json({ error: 'Failed to fetch assigned complaints' });
    }
});



// Route to count all complaints
router.get('/complaints/count', async (req, res) => {
    try {
        // Fetch all complaints from the database and count them
        const Complaint = schemas.Complaint;
        const count = await Complaint.countDocuments();

        res.json({ count });
    } catch (error) {
        console.error('Error counting complaints:', error);
        res.status(500).json({ error: 'Failed to count complaints' });
    }
});



// Route to count resolved complaints
router.get('/complaints/resolved/count', async (req, res) => {
    try {
        // Fetch count of resolved complaints from the database
        const Complaint = schemas.Complaint;
        const resolvedCount = await Complaint.countDocuments({ status: "Resolved" });
        res.json({ resolvedCount });
    } catch (error) {
        console.error('Error counting resolved complaints:', error);
        res.status(500).json({ error: 'Failed to count resolved complaints' });
    }
});


// Route to count resolved complaints
router.get('/complaints/progress/count', async (req, res) => {
    try {
        // Fetch count of resolved complaints from the database
        const Complaint = schemas.Complaint;
        const resolvedCount = await Complaint.countDocuments({ status: "In Progress" });
        res.json({ resolvedCount });
    } catch (error) {
        console.error('Error counting resolved complaints:', error);
        res.status(500).json({ error: 'Failed to count resolved complaints' });
    }
});



// Route for adding a new complaint
router.post('/addComplaint', upload.single('binPhoto'), async (req, res) => {
    try {
        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No bin photo uploaded' });
        }

        // Extract data from request body
        const { location, userName, userPhone, binAddress } = req.body;
        const binPhoto = req.file.path; // Get the file path of the uploaded bin photo

        // Check if required fields are provided
        if (!location || !userName || !userPhone || !binAddress) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Find the count of existing complaints
        const existingComplaintCount = await schemas.Complaint.countDocuments();

        // Generate a unique complaint ID
        const complaintId = existingComplaintCount + 1;

        // Create a new complaint instance with the unique complaintId
        const newComplaint = new schemas.Complaint({
            complaintId,
            binPhoto,
            location,
            userName,
            userPhone,
            binAddress
        });

        // Save the complaint to the database
        await newComplaint.save();

        // Respond with success message
        res.status(201).json({ message: 'Complaint added successfully' });
    } catch (error) {
        console.error('Error adding complaint:', error);

        // Check if the error is due to validation failure
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }

        // Handle other internal server errors
        res.status(500).json({ error: 'Failed to add complaint. Please try again later.' });
    }
});





// Change Coplaints Status
// Route for updating complaint status
router.post('/update-complaint-status/:complaintId', async (req, res) => {
    try {
      const { complaintId } = req.params;
      const { status } = req.body;
  
      // Find the complaint by its ID and update its status
      const updatedComplaint = await schemas.Complaint.findOneAndUpdate(
        { complaintId },
        { status },
        { new: true }
      );
  
      if (!updatedComplaint) {
        return res.status(404).json({ error: 'Complaint not found' });
      }
  
      res.status(200).json(updatedComplaint);
    } catch (error) {
      console.error('Error updating complaint status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



  // Route to handle assigning a driver to a complaint
router.post('/assign-driver', async (req, res) => {
    try {
      const { complaintId, driver } = req.body;
  
      // Find the complaint by its ID
      const Complaint = schemas.Complaint;
      const complaint = await Complaint.findOne({ complaintId });
  
      if (!complaint) {
        return res.status(404).json({ error: 'Complaint not found' });
      }
  
      // Update the assigned driver field in the complaint document
      complaint.assignedDriver = driver;
  
      // Save the updated complaint document
      await complaint.save();
  
      res.status(200).json({ message: 'Driver assigned successfully' });
    } catch (error) {
      console.error('Error assigning driver:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


// Route for adding a new bin region
router.post('/add-bin-region', async (req, res) => {
    try {
        // Extract data from request body
        const { regionCode, regionName, regionDriver, driverPhone } = req.body;

        // Check if required fields are provided
        if (!regionCode || !regionName || !regionDriver || !driverPhone) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create a new bin region instance
        const newBinRegion = new schemas.BinRegion({
            regionCode,
            regionName,
            regionDriver,
            driverPhone
        });

        // Save the bin region to the database
        await newBinRegion.save();

        // Respond with success message
        res.status(201).json({ message: 'Bin region added successfully' });
    } catch (error) {
        console.error('Error adding bin region:', error);

        // Check if the error is due to validation failure
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }

        // Handle other internal server errors
        res.status(500).json({ error: 'Failed to add bin region. Please try again later.' });
    }
});


// Route to fetch all bin details
router.get('/bins', async (req, res) => {
    try {
        // Query the database to retrieve all bin details
        const Bin = schemas.BinRegion;
        const bins = await Bin.find();

        // Send the response with the retrieved bin details
        res.status(200).json(bins);
    } catch (error) {
        console.error('Error fetching bin details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Route to count total bins
router.get('/bins/count', async (req, res) => {
    try {
        // Query the database to retrieve the count of all bins
        const Bin = schemas.BinRegion;
        const totalBinsCount = await Bin.countDocuments();

        // Send the response with the count of all bins
        res.status(200).json({ totalBinsCount });
    } catch (error) {
        console.error('Error counting total bins:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Route to update region status to Inactive
router.patch('/bins/:regionCode', async (req, res) => {
    try {
      const { regionCode } = req.params;
      const { regionStatus } = req.body;
  
      // Query the database to retrieve all bin details
      const Bin = schemas.BinRegion;
    
      // Update the region status to Inactive
      await Bin.findOneAndUpdate({ regionCode }, { regionStatus });
  
      res.status(200).json({ message: 'Region status updated successfully' });
    } catch (error) {
      console.error('Error updating region status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



  // Route for deleting a region by its regionCode
router.delete('/delete-bin-region/:regionCode', async (req, res) => {
    try {
      const { regionCode } = req.params;
  
      // Query the database to retrieve all bin details
      const Bin = schemas.BinRegion;
    
      // Find the region by its regionCode and delete it
      await Bin.findOneAndDelete({ regionCode });
  
      res.status(200).json({ message: 'Region deleted successfully' });
    } catch (error) {
      console.error('Error deleting region:', error);
      res.status(500).json({ error: 'Failed to delete region. Please try again later.' });
    }
  });
  
module.exports = router;