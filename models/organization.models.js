const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true,
    
  },

  onboarded :{
    type : Boolean,
    default : false,
  }
}, {
  timestamps: true
});

// Create the Organization model
const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
