import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { carAPI } from '../services/api'

const CarSegments = ({ onBookCar, searchFilters = {} }) => {
  const { isAuthenticated } = useAuth()
  const [activeSegment, setActiveSegment] = useState('premium')
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCars()
  }, [activeSegment, searchTerm, searchFilters])

  const fetchCars = async () => {
    try {
      setLoading(true)
      const params = {
        segment: activeSegment
      }
      if (searchTerm) {
        params.search = searchTerm
      }
      const response = await carAPI.getAllCars(params)
      setCars(response.data)
    } catch (error) {
      console.error('Error fetching cars:', error)
      setCars([])
    } finally {
      setLoading(false)
    }
  }

  const currentCars = cars

  const filteredCars = currentCars

  const toggleFavorite = (carId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(carId)
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  const favoriteCars = currentCars.filter(car => favorites.includes(car._id))

  return (
    <section id="cars" className="py-16 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Choose Your Car</h2>
          <p className="text-lg sm:text-xl text-gray-300">Premium and economy segments available</p>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-6 sm:mb-8 px-4 sm:px-0">
          <input
            type="text"
            placeholder="Search your favorite car..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md mx-auto block px-4 py-3 bg-dark-secondary border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white placeholder-gray-400 text-sm sm:text-base"
          />
        </div>

        {/* Segment Tabs */}
        <div className="flex justify-center mb-6 sm:mb-8 px-4 sm:px-0">
          <div className="bg-dark-accent rounded-lg p-1 shadow-md border border-accent/20 w-full sm:w-auto">
            <button
              onClick={() => setActiveSegment('premium')}
              data-segment="premium"
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-md font-semibold transition-colors text-sm sm:text-base flex-1 sm:flex-none ${
                activeSegment === 'premium'
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:text-accent'
              }`}
            >
              Premium Segment
            </button>
            <button
              onClick={() => setActiveSegment('normal')}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-md font-semibold transition-colors text-sm sm:text-base flex-1 sm:flex-none ${
                activeSegment === 'normal'
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:text-accent'
              }`}
            >
              Economy Segment
            </button>
          </div>
        </div>

        {/* Favorites Section */}
        {favoriteCars.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Your Favorites</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {favoriteCars.map((car) => (
                <CarCard
                  key={`fav-${car.id}`}
                  car={car}
                  isFavorite={true}
                  onToggleFavorite={toggleFavorite}
                  onBook={onBookCar}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Cars Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-2xl">Loading cars...</div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          >
            {filteredCars.map((car, index) => (
              <motion.div
                key={car._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <CarCard
                  car={car}
                  isFavorite={favorites.includes(car._id)}
                  onToggleFavorite={toggleFavorite}
                  onBook={onBookCar}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

const CarCard = ({ car, isFavorite, onToggleFavorite, onBook }) => {
  const { isAuthenticated } = useAuth()
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  
  const handleBookClick = () => {
    if (!isAuthenticated) {
      return
    }
    onBook(car)
  }
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const rotateY = (x / rect.width) * 360
    setRotation({ x: 0, y: rotateY })
  }
  
  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
  }
  
  return (
    <div className="bg-dark-accent rounded-xl shadow-lg shadow-primary/10 overflow-hidden hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300 border border-accent/20 cursor-pointer">
      <div className="relative">
        <img 
          src={car.image} 
          alt={car.name}
          className="w-full h-32 sm:h-40 lg:h-48 object-cover transition-transform duration-300"
          style={{
            transform: `rotateY(${rotation.y}deg)`
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
        <button
          onClick={() => onToggleFavorite(car._id)}
          className={`absolute top-3 right-3 text-2xl ${isFavorite ? 'text-red-500' : 'text-white'} hover:text-red-500 transition-colors bg-black/30 rounded-full p-1`}
        >
          ❤️
        </button>
      </div>
      <div className="p-4 sm:p-6">
        
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{car.name}</h3>
        <p className="text-xl sm:text-2xl font-bold text-primary mb-4">₹{car.price}/day</p>
        
        <div className="mb-4">
          {car.features.map((feature, index) => (
            <span
              key={index}
              className="inline-block bg-dark-secondary text-gray-300 text-xs sm:text-sm px-2 py-1 rounded mr-1 sm:mr-2 mb-2"
            >
              {feature}
            </span>
          ))}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBookClick}
          className="w-full btn-primary"
        >
          Book Now
        </motion.button>
      </div>
    </div>
  )
}

export default CarSegments