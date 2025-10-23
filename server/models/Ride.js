const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
  pickup: {
    address: { type: String, required: true },
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 }
  },
  destination: {
    address: { type: String, required: true },
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 }
  },
  vehicleType: { type: String, enum: ['economy', 'premium', 'luxury'], required: true },
  status: { type: String, enum: ['requested', 'accepted', 'in-progress', 'completed', 'cancelled'], default: 'requested' },
  fare: { type: Number },
  distance: { type: Number },
  duration: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Ride', rideSchema);