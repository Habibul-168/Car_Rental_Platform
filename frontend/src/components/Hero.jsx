import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const CarCarousel = () => {
  const cars = [
    { name: 'BMW X5', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&h=300&fit=crop' },
    { name: 'Mercedes C-Class', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=300&fit=crop' },
    { name: 'Audi A4', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=300&fit=crop' },
    { name: 'Tesla Model S', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500&h=300&fit=crop' },
    { name: 'Toyota Camry', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500&h=300&fit=crop' },
    { name: 'Honda Civic', image: 'https://images.unsplash.com/photo-1619976215249-95d3db9fa8bc?w=500&h=300&fit=crop' },
    { name: 'Nissan Altima', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&h=300&fit=crop' },
    { name: 'Hyundai Elantra', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&h=300&fit=crop' },
    { name: 'Ford Mustang', image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500&h=300&fit=crop' },
    { name: 'Chevrolet Camaro', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&h=300&fit=crop' },
    { name: 'Porsche Panamera', image: 'https://www.carwale.com/porsche-cars/panamera/' }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cars.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <img
          src={cars[currentIndex].image}
          alt={cars[currentIndex].name}
          className="w-full max-w-md h-64 object-cover rounded-2xl shadow-2xl shadow-primary/30 mb-4"
        />
        <h3 className="text-xl font-semibold text-accent">
          {cars[currentIndex].name}
        </h3>
      </motion.div>
    </div>
  )
}

const Hero = () => {
  return (
    <section id="home" className="pt-16 bg-gradient-to-br from-dark to-dark-secondary min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Rent Your Perfect
              <span className="text-primary block">Drive</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Book premium cars by date and time. Choose from luxury to economy vehicles. 
              Need a driver? We've got you covered with professional chauffeurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('cars')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary text-lg px-8 py-3"
              >
                Book Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('cars')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary text-lg px-8 py-3"
              >
                View Cars
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-96"
          >
            <CarCarousel />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero