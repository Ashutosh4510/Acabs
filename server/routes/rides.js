const express = require('express');
const Ride = require('../models/Ride');
const Driver = require('../models/Driver');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const router = express.Router();

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Email template for ride confirmation
const getRideConfirmationEmail = (user, ride) => {
  return {
    from: process.env.EMAIL_USER || 'noreply@acabs.com',
    to: user.email,
    subject: `Ride Confirmed - Booking ID #${ride._id.toString().slice(-6)}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
        <div style="background: linear-gradient(135deg, #000 0%, #1a1a1a 100%); color: white; padding: 30px; border-radius: 10px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">🚗 Ride Confirmed!</h1>
          <p style="margin: 10px 0 0; opacity: 0.9;">Your booking has been successfully confirmed</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 10px; margin-top: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-top: 0;">Hello ${user.name}!</h2>
          <p style="color: #666; line-height: 1.6;">Your ride has been successfully booked. Here are your booking details:</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Booking ID:</td>
                <td style="padding: 8px 0; color: #333;">#${ride._id.toString().slice(-6)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">From:</td>
                <td style="padding: 8px 0; color: #333;">${ride.pickup.address}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">To:</td>
                <td style="padding: 8px 0; color: #333;">${ride.destination.address}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Vehicle Type:</td>
                <td style="padding: 8px 0; color: #333; text-transform: capitalize;">${ride.vehicleType}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Estimated Fare:</td>
                <td style="padding: 8px 0; color: #333; font-weight: bold; font-size: 18px;">$${ride.fare}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Estimated Duration:</td>
                <td style="padding: 8px 0; color: #333;">${ride.duration} minutes</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Distance:</td>
                <td style="padding: 8px 0; color: #333;">${ride.distance} km</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Status:</td>
                <td style="padding: 8px 0; color: #FF9800; font-weight: bold; text-transform: capitalize;">${ride.status}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2196F3;">
            <p style="margin: 0; color: #1976D2; font-weight: bold;">📱 What's Next?</p>
            <p style="margin: 5px 0 0; color: #666; font-size: 14px;">We're finding the best driver for you. You'll receive another email once a driver accepts your ride.</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/rides-history" 
               style="background: linear-gradient(135deg, #000 0%, #333 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
              View My Rides
            </a>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
            This is an automated message from Acabs. Please do not reply to this email.<br>
            If you have any questions, contact us at support@acabs.com
          </p>
        </div>
      </div>
    `
  };
};

// Middleware to verify JWT
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Book a ride
router.post('/book', auth, async (req, res) => {
  try {
    const { pickup, destination, vehicleType } = req.body;
    
    // Get user details for email
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const ride = new Ride({
      userId: req.userId,
      pickup,
      destination,
      vehicleType,
      fare: Math.floor(Math.random() * 50) + 10, // Simple fare calculation
      distance: Math.floor(Math.random() * 20) + 1,
      duration: Math.floor(Math.random() * 60) + 10
    });

    await ride.save();
    
    // Send confirmation email (skip if not configured)
    let emailSent = false;
    if (process.env.EMAIL_USER && process.env.EMAIL_USER !== 'your-actual-email@gmail.com') {
      try {
        const emailOptions = getRideConfirmationEmail(user, ride);
        await transporter.sendMail(emailOptions);
        console.log(`Confirmation email sent to ${user.email} for ride ${ride._id}`);
        emailSent = true;
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't fail the ride booking if email fails
      }
    } else {
      console.log('Email not configured - skipping email send');
    }
    
    res.status(201).json({ 
      message: emailSent ? 'Ride booked successfully! Confirmation email sent.' : 'Ride booked successfully!', 
      ride,
      emailSent
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user rides
router.get('/my-rides', auth, async (req, res) => {
  try {
    const rides = await Ride.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(rides);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;