const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  licenseNumber: { type: String, required: true, unique: true },
  vehicleType: { type: String, enum: ['economy', 'premium', 'luxury'], required: true },
  vehicleNumber: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  isAvailable: { type: Boolean, default: true },
  rating: { type: Number, default: 5.0 }
}, { timestamps: true });

module.exports = mongoose.model('Driver', driverSchema);