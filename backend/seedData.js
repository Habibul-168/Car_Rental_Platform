import mongoose from 'mongoose'
import Car from './models/Car.js'
import dotenv from 'dotenv'

dotenv.config()

const seedCars = [
  // Premium Cars
  {
    name: 'BMW 7 Series',
    price: 5000,
    image: 'https://carindia.in/wp-content/uploads/2022/04/P90458164_The_new_BMW_i7_xDrive60._European_model_shown-copy-800x503.jpg',
    features: ['Luxury Interior', 'GPS', 'Bluetooth', 'Leather Seats'],
    segment: 'premium',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '12 km/l'
    }
  },
  {
    name: 'Mercedes S-Class',
    price: 4800,
    image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/48067/s-class-exterior-right-front-three-quarter-10.png?isig=0&q=80',
    features: ['Premium Sound', 'Leather Seats', 'Sunroof', 'Climate Control'],
    segment: 'premium',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '11 km/l'
    }
  },
  {
    name: 'Audi A8',
    price: 4100,
    image: 'https://imgd.aeplcdn.com/1920x1080/n/cw/ec/124141/a8-l-exterior-right-front-three-quarter-4.jpeg?isig=0&q=80&q=80',
    features: ['Massage Seats', 'WiFi', 'Premium Audio', 'Navigation'],
    segment: 'premium',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '13 km/l'
    }
  },
  {
    name: 'Tesla Model S',
    price: 3800,
    image: 'https://imgd.aeplcdn.com/1920x1080/n/cw/ec/93821/model-s-exterior-front-view.jpeg?q=80&q=80',
    features: ['Electric', 'Autopilot', 'Premium Interior', 'Supercharging'],
    segment: 'premium',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Electric',
      mileage: '400 km range'
    }
  },
  {
    name: 'Porsche Panamera',
    price: 6000,
    image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/165641/panamera-exterior-right-front-three-quarter.jpeg?isig=0&q=80',
    features: ['Sport Mode', 'Premium Audio', 'Leather Interior', 'Performance'],
    segment: 'premium',
    specifications: {
      seats: 4,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '10 km/l'
    }
  },
  {
    name: 'Jaguar XF',
    price: 3550,
    image: 'https://imgd.aeplcdn.com/1920x1080/n/cw/ec/19826/xf-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80&q=80',
    features: ['Luxury Design', 'Premium Sound', 'Navigation', 'Comfort Seats'],
    segment: 'premium',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '12 km/l'
    }
  },
  {
    name: 'Lexus ES',
    price: 4300,
    image: 'https://imgd.aeplcdn.com/272x153/n/cw/ec/35351/es-exterior-right-front-three-quarter-3.png?isig=0&q=80',
    features: ['Hybrid Option', 'Quiet Cabin', 'Safety+', 'Premium Interior'],
    segment: 'premium',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Hybrid',
      mileage: '18 km/l'
    }
  },
  {
    name: 'Cadillac CT5',
    price: 3100,
    image: 'https://www.automoblog.com/wp-content/uploads/2019/04/2020-Cadillac-CT5-PremiumLuxury-010.jpg',
    features: ['Sport Suspension', 'Bose Audio', 'Wireless Charging', 'Luxury'],
    segment: 'premium',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '11 km/l'
    }
  },
  // Normal Cars
  {
    name: 'Toyota Camry',
    price: 2200,
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Toyota/Camry/11344/1733916451269/front-left-side-47.jpg?imwidth=420&impolicy=resize',
    features: ['Fuel Efficient', 'Reliable', 'Comfortable', 'Safety Features'],
    segment: 'normal',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '16 km/l'
    }
  },
  {
    name: 'Honda Venue',
    price: 2150,
    image: 'https://imgd.aeplcdn.com/1280x720/cw/ec/39450/Hyundai-Venue-Exterior-154413.jpg?wm=0',
    features: ['Spacious', 'Safety Features', 'Good Mileage', 'Bluetooth'],
    segment: 'normal',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '15 km/l'
    }
  },
  {
    name: 'Swift Dzire',
    price: 2600,
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Dzire/11387/1758802554630/front-left-side-47.jpg?tr=w-320',
    features: ['Modern Tech', 'Comfortable', 'Efficient', 'GPS'],
    segment: 'normal',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '17 km/l'
    }
  },
  {
    name: 'Kia Sonet',
    price: 1850,
    image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/174423/sonet-exterior-right-front-three-quarter-12.png?isig=0&q=80',
    features: ['Warranty', 'Tech Features', 'Reliable', 'Comfortable'],
    segment: 'normal',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '16 km/l'
    }
  },
  {
    name: 'Volkswagen Jetta',
    price: 2150,
    image: 'https://imgd-ct.aeplcdn.com/664x415/ec/99/E8/17725/img/m/Volkswagen-Jetta-Left-Front-Three-Quarter-47862_ol.jpg?v=201711021421&q=80',
    features: ['German Engineering', 'Safety Features', 'Fuel Efficient', 'Spacious'],
    segment: 'normal',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '15 km/l'
    }
  },
  {
    name: 'Swift',
    price: 1600,
    image: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/176737/maruti-suzuki-swift-right-front-three-quarter0.jpeg?isig=0&wm=1&q=80',
    features: ['Sporty Design', 'Premium Feel', 'Good Handling', 'Tech Features'],
    segment: 'normal',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '14 km/l'
    }
  },
  {
    name: 'Subaru Legacy',
    price: 1950,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQULn9H0lmYLMqkfkMJjvFHUH8KDRBANzJUOA&s',
    features: ['All-Wheel Drive', 'Safety Awards', 'Reliable', 'Spacious'],
    segment: 'normal',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '15 km/l'
    }
  },
  {
    name: 'Kia Optima',
    price: 2210,
    image: 'https://imgd.aeplcdn.com/600x337/cw/ec/35141/Kia-Optima-in-India-130886.jpg?wm=1&q=75',
    features: ['Long Warranty', 'Value for Money', 'Tech Features', 'Comfortable'],
    segment: 'normal',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '16 km/l'
    }
  }
]

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')
    
    // Clear existing cars
    await Car.deleteMany({})
    console.log('Cleared existing cars')
    
    // Insert seed data
    await Car.insertMany(seedCars)
    console.log('Seed data inserted successfully')
    
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()