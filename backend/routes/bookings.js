import express from 'express'
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking
} from '../controllers/bookingController.js'

const router = express.Router()

// POST /api/bookings - Create new booking
router.post('/', createBooking)

// GET /api/bookings - Get all bookings
router.get('/', getAllBookings)

// GET /api/bookings/:id - Get booking by ID
router.get('/:id', getBookingById)

// PUT /api/bookings/:id/status - Update booking status
router.put('/:id/status', updateBookingStatus)

// DELETE /api/bookings/:id - Delete booking
router.delete('/:id', deleteBooking)

export default router