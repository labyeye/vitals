const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import User model
const User = require('../models/User');

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vitals_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email);
      process.exit(0);
    }

    // Create admin user
    const adminData = {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@vitals.com',
      password: 'admin123456',
      role: 'admin',
      phone: '+1234567890',
      address: {
        street: '123 Admin Street',
        city: 'Admin City',
        state: 'AS',
        zipCode: '12345',
        country: 'USA'
      },
      isActive: true,
      isEmailVerified: true
    };

    const admin = await User.create(adminData);

    console.log('Admin user created successfully!');
    console.log('Email:', admin.email);
    console.log('Password: admin123456');
    console.log('Please change the password after first login.');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

// Run the script
createAdminUser(); 