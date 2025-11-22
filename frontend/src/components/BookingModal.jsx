import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { bookingAPI } from '../services/api'
import LocationAutocomplete from './LocationAutocomplete'
import { toast } from './NotificationToast'

const BookingModal = ({ car, onClose }) => {
  const { user, isAuthenticated } = useAuth()
  const [bookingData, setBookingData] = useState({
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
    needDriver: false,
    driverHours: 1,
    location: '',
    customerName: user?.name || '',
    customerEmail: user?.email || '',
    customerPhone: ''
  })

  const driverCostPerHour = 2000
  const totalDriverCost = bookingData.needDriver ? bookingData.driverHours * driverCostPerHour : 0
  const carCost = car.price
  const totalCost = carCost + totalDriverCost

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setBookingData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const simulateStripePayment = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 80% success rate for demo
        const success = Math.random() > 0.2
        resolve(success)
      }, 2000)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      toast.error('Please login to make a booking')
      return
    }
    
    try {
      // Show processing payment
      toast.info('Processing payment...')
      
      // Simulate Stripe payment
      const paymentSuccess = await simulateStripePayment()
      
      if (!paymentSuccess) {
        toast.error('Payment failed. Please check your card details and try again.')
        return
      }
      
      // If payment successful, create booking
      const bookingPayload = {
        carId: car._id,
        userId: user._id || user.id,
        ...bookingData
      }
      
      const response = await bookingAPI.createBooking(bookingPayload)
      toast.success('Car booked successfully! Payment confirmed.')
      onClose()
    } catch (error) {
      console.error('Error creating booking:', error)
      toast.error('Booking failed. Please try again.')
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-dark-accent rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-accent/20 mx-4 sm:mx-0"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Book {car.name}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-200 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Car Details */}
              <div className="bg-dark-secondary rounded-lg p-4 border border-accent/20">
                <div className="flex items-center gap-4">
                  <img 
                    src={car.image} 
                    alt={car.name}
                    className="w-20 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-white">{car.name}</h3>
                    <p className="text-primary font-semibold">${car.price}/day</p>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="customerName"
                    value={bookingData.customerName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dark border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={bookingData.customerEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dark border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={bookingData.customerPhone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dark border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Pickup Location</label>
                  <LocationAutocomplete
                    name="location"
                    value={bookingData.location}
                    onChange={handleInputChange}
                    placeholder="Enter pickup location"
                    className="w-full px-4 py-3 bg-dark border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white"
                  />
                </div>
              </div>

              {/* Booking Dates and Times */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Pickup Date</label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={bookingData.pickupDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dark border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Pickup Time</label>
                  <input
                    type="time"
                    name="pickupTime"
                    value={bookingData.pickupTime}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dark border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Return Date</label>
                  <input
                    type="date"
                    name="returnDate"
                    value={bookingData.returnDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dark border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Return Time</label>
                  <input
                    type="time"
                    name="returnTime"
                    value={bookingData.returnTime}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dark border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white"
                  />
                </div>
              </div>

              {/* Driver Option */}
              <div className="border border-accent/30 rounded-lg p-4 bg-dark-secondary">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    name="needDriver"
                    checked={bookingData.needDriver}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-300">
                    I need a professional driver (+$2000/hour)
                  </label>
                </div>

                {bookingData.needDriver && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      How many hours do you need the driver?
                    </label>
                    <input
                      type="number"
                      name="driverHours"
                      value={bookingData.driverHours}
                      onChange={handleInputChange}
                      min="1"
                      max="24"
                      className="w-full px-4 py-3 bg-dark border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white"
                    />
                  </div>
                )}
              </div>

              {/* Cost Summary */}
              <div className="bg-dark-secondary rounded-lg p-4 border border-accent/20">
                <h3 className="font-bold text-lg mb-3 text-white">Cost Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Car Rental (per day)</span>
                    <span>${carCost}</span>
                  </div>
                  {bookingData.needDriver && (
                    <div className="flex justify-between">
                      <span>Driver Service ({bookingData.driverHours} hours)</span>
                      <span>${totalDriverCost}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">${totalCost}</span>
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="bg-dark-secondary rounded-lg p-4 border border-accent/20">
                <h3 className="font-bold text-lg mb-3 text-white">Payment Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      className="w-full px-4 py-3 bg-dark border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 bg-dark border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">CVC</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 bg-dark border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">🔒 Your payment is secured by Stripe</p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default BookingModal