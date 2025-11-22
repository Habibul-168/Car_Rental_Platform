import { motion } from 'framer-motion'
import { useState } from 'react'
import LocationAutocomplete from './LocationAutocomplete'

const SearchSection = ({ onSearch }) => {
  const [searchData, setSearchData] = useState({
    location: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
    carType: 'any'
  })

  const handleInputChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchData)
    }
    // Scroll to cars section
    document.getElementById('cars')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-16 bg-dark-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Find Your Perfect Ride</h2>
          <p className="text-xl text-gray-300">Search and book cars by date, time, and preferences</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSearch}
          className="bg-dark-accent rounded-2xl shadow-xl shadow-primary/10 p-8 border border-accent/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
              <LocationAutocomplete
                name="location"
                value={searchData.location}
                onChange={handleInputChange}
                placeholder="Enter pickup location"
                className="w-full px-4 py-3 bg-dark-secondary border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Pickup Date</label>
              <input
                type="date"
                name="pickupDate"
                value={searchData.pickupDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-dark-secondary border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Pickup Time</label>
              <input
                type="time"
                name="pickupTime"
                value={searchData.pickupTime}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-dark-secondary border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Return Date</label>
              <input
                type="date"
                name="returnDate"
                value={searchData.returnDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-dark-secondary border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Return Time</label>
              <input
                type="time"
                name="returnTime"
                value={searchData.returnTime}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-dark-secondary border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Car Type</label>
              <select
                name="carType"
                value={searchData.carType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-dark-secondary border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white"
              >
                <option value="any">Any Type</option>
                <option value="economy">Economy</option>
                <option value="compact">Compact</option>
                <option value="midsize">Midsize</option>
                <option value="luxury">Luxury</option>
                <option value="suv">SUV</option>
              </select>
            </div>
          </div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="btn-primary text-lg px-12 py-3"
            >
              Search Cars
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}

export default SearchSection