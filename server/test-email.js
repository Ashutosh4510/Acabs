// Test email configuration
require('dotenv').config();
const nodemailer = require('nodemailer');

const testEmail = async () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself for testing
      subject: 'Acabs Email Test',
      text: 'Email configuration is working!'
    });
    
    console.log('✅ Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('❌ Email failed:', error.message);
  }
};

testEmail();