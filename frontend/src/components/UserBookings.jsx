import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { bookingAPI } from '../services/api'
import { toast } from './NotificationToast'

const UserBookings = ({ isOpen, onClose }) => {
  const { user, isAuthenticated } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchBookings()
    }
  }, [isOpen, isAuthenticated])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const response = await bookingAPI.getAllBookings()
      const userBookings = response.data.filter(booking => booking.userId === (user._id || user.id))
      setBookings(userBookings)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelBooking = async (bookingId) => {
    try {
      await bookingAPI.deleteBooking(bookingId)
      toast.success('Booking cancelled successfully')
      fetchBookings() // Refresh the list
    } catch (error) {
      console.error('Error cancelling booking:', error)
      toast.error('Failed to cancel booking. Please try again.')
    }
  }

  if (!isOpen) return null

  return (
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
        className="bg-dark-accent rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-accent/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">My Bookings</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="text-white">Loading bookings...</div>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-300 mb-4">No bookings found</div>
              <p className="text-gray-400 text-sm">Your booking history will appear here after you make your first reservation.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking._id} className="bg-dark-secondary rounded-lg p-4 border border-accent/20">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-semibold">Booking #{booking._id.slice(-6)}</h3>
                      <p className="text-gray-300">Car: {booking.carId?.name || 'Car Details'}</p>
                      <p className="text-gray-300">Customer: {booking.customerName}</p>
                      <p className="text-gray-300">Pickup: {booking.pickupDate} at {booking.pickupTime}</p>
                      <p className="text-gray-300">Return: {booking.returnDate} at {booking.returnTime}</p>
                      <p className="text-gray-300">Location: {booking.location}</p>
                      {booking.needDriver && (
                        <p className="text-accent">Driver: {booking.driverHours} hours</p>
                      )}
                      <p className="text-primary font-semibold">Total: ${booking.totalCost}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-primary font-bold text-lg mb-2">
                        Status: {booking.status || 'Confirmed'}
                      </div>
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default UserBookings