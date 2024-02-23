const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const mySchemas = {}; // Declare mySchemas here

// Define the user schema for user, driver, and admin
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }, // Add role field with default value 'user'
    entryDate: { type: Date, default: Date.now }
});

// Define the complaint schema
const complaintSchema = new Schema({
    complaintId: { type: Number, required: true, unique: true },
    binPhoto: { type: String, required: true }, // Store the file path or URL
    location: { type: String, required: true },
    userName: { type: String, required: true },
    userPhone: { type: String, required: true },
    binAddress: { type: String, required: true },
    status: { type: String, default: 'New' }, // Initial status
    assignedDriver: { type: String } // Add assigned driver field
});

// Create the Complaint model
const Complaint = mongoose.model('Complaint', complaintSchema);
mySchemas.Complaint = Complaint;

// Create the User model
const User = mongoose.model('User', userSchema);

const contactSchema = new Schema({
    name: { type: String },  // New field for name
    email: { type: String, required: true },
    phone: { type: String },  // New field for phone
    address: { type: String },  // New field for address
    website: { type: String, required: true },
    message: { type: String, required: true },
    entryDate: { type: Date, default: Date.now }
});



// Define bin region schema
const binRegionSchema = new mongoose.Schema({
    regionCode: {
      type: String,
      required: true,
      unique: true
    },
    regionName: {
      type: String,
      required: true
    },
    regionDriver: {
      type: String,
      required: true
    },
    driverPhone: {
      type: String,
      required: true
    },
    regionStatus: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active'
    }
  });


  const BinRegion = mongoose.model('BinRegion', binRegionSchema);
  mySchemas.BinRegion = BinRegion;

try {
    // Attempt to create the Users model
    const Users = mongoose.model('Users', userSchema, 'Users');
    mySchemas.Users = Users;
} catch (error) {
    // Handle any error that occurred during Users model creation
    console.error('Error creating Users model:', error);
}

try {
    // Attempt to create the Contact model
    const Contact = mongoose.model('Contact', contactSchema, 'contact_form');
    mySchemas.Contact = Contact;
} catch (error) {
    // Handle any error that occurred during Contact model creation
    console.error('Error creating Contact model:', error);
}

module.exports = mySchemas;
