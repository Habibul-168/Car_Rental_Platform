import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import carRoutes from './routes/cars.js'
import bookingRoutes from './routes/bookings.js'
import authRoutes from './routes/auth.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}))
app.use(express.json())

// Routes
app.use('/api/cars', carRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Car Rental Platform API' })
})

// Seed endpoint for production
app.get('/api/seed', async (req, res) => {
  try {
    const Car = (await import('./models/Car.js')).default
    
    // Clear existing cars
    await Car.deleteMany({})
    
    // Seed data (shortened for endpoint)
    const seedCars = [
      { name: 'BMW 7 Series', price: 12000, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop', features: ['Luxury Interior', 'GPS', 'Bluetooth', 'Leather Seats'], segment: 'premium', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '12 km/l' } },
      { name: 'Toyota Camry', price: 5000, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=250&fit=crop', features: ['Fuel Efficient', 'Reliable', 'Comfortable', 'Safety Features'], segment: 'normal', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '16 km/l' } }
    ]
    
    await Car.insertMany(seedCars)
    res.json({ message: 'Database seeded successfully', count: seedCars.length })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Auto-seed function
const autoSeed = async () => {
  try {
    const Car = (await import('./models/Car.js')).default
    const count = await Car.countDocuments()
    
    if (count === 0) {
      console.log('No cars found, seeding database...')
      const seedCars = [
        { name: 'BMW 7 Series', price: 12000, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop', features: ['Luxury Interior', 'GPS', 'Bluetooth', 'Leather Seats'], segment: 'premium', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '12 km/l' } },
        { name: 'Toyota Camry', price: 5000, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=250&fit=crop', features: ['Fuel Efficient', 'Reliable', 'Comfortable', 'Safety Features'], segment: 'normal', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '16 km/l' } }
      ]
      await Car.insertMany(seedCars)
      console.log('Database seeded successfully')
    }
  } catch (error) {
    console.error('Seeding error:', error)
  }
}

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB')
    await autoSeed()
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
  })