const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  // User preferences for theme and notifications
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'dark'
    },
    fontSize: {
      type: String,
      enum: ['small', 'normal', 'large', 'xlarge'],
      default: 'normal'
    },
    highContrast: {
      type: Boolean,
      default: false
    },
    notifications: {
      rideStatus: {
        type: Boolean,
        default: true
      },
      promotions: {
        type: Boolean,
        default: true
      },
      driverArrival: {
        type: Boolean,
        default: true
      },
      general: {
        type: Boolean,
        default: true
      }
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
