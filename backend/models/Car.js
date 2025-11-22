import mongoose from 'mongoose'

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  features: [{
    type: String
  }],
  segment: {
    type: String,
    enum: ['premium', 'normal'],
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  specifications: {
    seats: Number,
    transmission: String,
    fuelType: String,
    mileage: String
  }
}, {
  timestamps: true
})

export default mongoose.model('Car', carSchema)