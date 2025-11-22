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
    
    // All 16 cars from seedData.js
    const seedCars = [
      // Premium Cars
      { name: 'BMW 7 Series', price: 12000, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop', features: ['Luxury Interior', 'GPS', 'Bluetooth', 'Leather Seats'], segment: 'premium', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '12 km/l' } },
      { name: 'Mercedes S-Class', price: 15000, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=250&fit=crop', features: ['Premium Sound', 'Leather Seats', 'Sunroof', 'Climate Control'], segment: 'premium', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '11 km/l' } },
      { name: 'Audi A8', price: 13000, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop', features: ['Massage Seats', 'WiFi', 'Premium Audio', 'Navigation'], segment: 'premium', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '13 km/l' } },
      { name: 'Tesla Model S', price: 16000, image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=250&fit=crop', features: ['Electric', 'Autopilot', 'Premium Interior', 'Supercharging'], segment: 'premium', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Electric', mileage: '400 km range' } },
      { name: 'Porsche Panamera', price: 18000, image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=250&fit=crop', features: ['Sport Mode', 'Premium Audio', 'Leather Interior', 'Performance'], segment: 'premium', specifications: { seats: 4, transmission: 'Automatic', fuelType: 'Petrol', mileage: '10 km/l' } },
      { name: 'Jaguar XF', price: 14000, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop', features: ['Luxury Design', 'Premium Sound', 'Navigation', 'Comfort Seats'], segment: 'premium', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '12 km/l' } },
      { name: 'Lexus ES', price: 13500, image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=250&fit=crop', features: ['Hybrid Option', 'Quiet Cabin', 'Safety+', 'Premium Interior'], segment: 'premium', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Hybrid', mileage: '18 km/l' } },
      { name: 'Cadillac CT5', price: 14500, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=250&fit=crop', features: ['Sport Suspension', 'Bose Audio', 'Wireless Charging', 'Luxury'], segment: 'premium', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '11 km/l' } },
      // Normal Cars
      { name: 'Toyota Camry', price: 5000, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=250&fit=crop', features: ['Fuel Efficient', 'Reliable', 'Comfortable', 'Safety Features'], segment: 'normal', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '16 km/l' } },
      { name: 'Honda Accord', price: 5500, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop', features: ['Spacious', 'Safety Features', 'Good Mileage', 'Bluetooth'], segment: 'normal', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '15 km/l' } },
      { name: 'Nissan Altima', price: 4500, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop', features: ['Modern Tech', 'Comfortable', 'Efficient', 'GPS'], segment: 'normal', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '17 km/l' } },
      { name: 'Hyundai Sonata', price: 4800, image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=250&fit=crop', features: ['Warranty', 'Tech Features', 'Reliable', 'Comfortable'], segment: 'normal', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '16 km/l' } },
      { name: 'Volkswagen Jetta', price: 5200, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=250&fit=crop', features: ['German Engineering', 'Safety Features', 'Fuel Efficient', 'Spacious'], segment: 'normal', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '15 km/l' } },
      { name: 'Mazda 6', price: 5400, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop', features: ['Sporty Design', 'Premium Feel', 'Good Handling', 'Tech Features'], segment: 'normal', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '14 km/l' } },
      { name: 'Subaru Legacy', price: 4900, image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=250&fit=crop', features: ['All-Wheel Drive', 'Safety Awards', 'Reliable', 'Spacious'], segment: 'normal', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '15 km/l' } },
      { name: 'Kia Optima', price: 4600, image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=250&fit=crop', features: ['Long Warranty', 'Value for Money', 'Tech Features', 'Comfortable'], segment: 'normal', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '16 km/l' } }
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
        // Premium Cars
        { name: 'BMW 7 Series', price: 12000, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop', features: ['Luxury Interior', 'GPS', 'Bluetooth', 'Leather Seats'], segment: 'premium', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '12 km/l' } },
        { name: 'Mercedes S-Class', price: 15000, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=250&fit=crop', features: ['Premium Sound', 'Leather Seats', 'Sunroof', 'Climate Control'], segment: 'premium', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '11 km/l' } },
        { name: 'Audi A8', price: 13000, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop', features: ['Massage Seats', 'WiFi', 'Premium Audio', 'Navigation'], segment: 'premium', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '13 km/l' } },
        { name: 'Tesla Model S', price: 16000, image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=250&fit=crop', features: ['Electric', 'Autopilot', 'Premium Interior', 'Supercharging'], segment: 'premium', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Electric', mileage: '400 km range' } },
        { name: 'Porsche Panamera', price: 18000, image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=250&fit=crop', features: ['Sport Mode', 'Premium Audio', 'Leather Interior', 'Performance'], segment: 'premium', specifications: { seats: 4, transmission: 'Automatic', fuelType: 'Petrol', mileage: '10 km/l' } },
        { name: 'Jaguar XF', price: 14000, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop', features: ['Luxury Design', 'Premium Sound', 'Navigation', 'Comfort Seats'], segment: 'premium', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '12 km/l' } },
        { name: 'Lexus ES', price: 13500, image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=250&fit=crop', features: ['Hybrid Option', 'Quiet Cabin', 'Safety+', 'Premium Interior'], segment: 'premium', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Hybrid', mileage: '18 km/l' } },
        { name: 'Cadillac CT5', price: 14500, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=250&fit=crop', features: ['Sport Suspension', 'Bose Audio', 'Wireless Charging', 'Luxury'], segment: 'premium', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '11 km/l' } },
        // Normal Cars
        { name: 'Toyota Camry', price: 5000, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=250&fit=crop', features: ['Fuel Efficient', 'Reliable', 'Comfortable', 'Safety Features'], segment: 'normal', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '16 km/l' } },
        { name: 'Honda Accord', price: 5500, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop', features: ['Spacious', 'Safety Features', 'Good Mileage', 'Bluetooth'], segment: 'normal', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '15 km/l' } },
        { name: 'Nissan Altima', price: 4500, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop', features: ['Modern Tech', 'Comfortable', 'Efficient', 'GPS'], segment: 'normal', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '17 km/l' } },
        { name: 'Hyundai Sonata', price: 4800, image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=250&fit=crop', features: ['Warranty', 'Tech Features', 'Reliable', 'Comfortable'], segment: 'normal', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '16 km/l' } },
        { name: 'Volkswagen Jetta', price: 5200, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=250&fit=crop', features: ['German Engineering', 'Safety Features', 'Fuel Efficient', 'Spacious'], segment: 'normal', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '15 km/l' } },
        { name: 'Mazda 6', price: 5400, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop', features: ['Sporty Design', 'Premium Feel', 'Good Handling', 'Tech Features'], segment: 'normal', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '14 km/l' } },
        { name: 'Subaru Legacy', price: 4900, image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=250&fit=crop', features: ['All-Wheel Drive', 'Safety Awards', 'Reliable', 'Spacious'], segment: 'normal', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '15 km/l' } },
        { name: 'Kia Optima', price: 4600, image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=250&fit=crop', features: ['Long Warranty', 'Value for Money', 'Tech Features', 'Comfortable'], segment: 'normal', specifications: { seats: 5, transmission: 'Automatic', fuelType: 'Petrol', mileage: '16 km/l' } }
      ]
      await Car.insertMany(seedCars)
      console.log(`Database seeded successfully with ${seedCars.length} cars`)
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