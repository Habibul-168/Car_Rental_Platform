import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  pickupDate: {
    type: Date,
    required: true
  },
  pickupTime: {
    type: String,
    required: true
  },
  returnDate: {
    type: Date,
    required: true
  },
  returnTime: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  needDriver: {
    type: Boolean,
    default: false
  },
  driverHours: {
    type: Number,
    default: 0
  },
  totalCost: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
})

export default mongoose.model('Booking', bookingSchema)