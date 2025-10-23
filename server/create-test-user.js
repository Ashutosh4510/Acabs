require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const createTestUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cabBooking');
    console.log('Connected to MongoDB');

    // Check if test user exists
    const existingUser = await User.findOne({ email: 'test@acabs.com' });
    if (existingUser) {
      console.log('✅ Test user already exists:');
      console.log('Email: test@acabs.com');
      console.log('Password: test123');
      return;
    }

    // Create test user
    const hashedPassword = await bcrypt.hash('test123', 10);
    
    const testUser = new User({
      name: 'Test User',
      email: 'test@acabs.com',
      phone: '1234567890',
      password: hashedPassword,
      isVerified: true
    });

    await testUser.save();
    
    console.log('✅ Test user created successfully!');
    console.log('Email: test@acabs.com');
    console.log('Password: test123');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

createTestUser();