import Booking from '../models/Booking.js'
import Car from '../models/Car.js'

// Create new booking
export const createBooking = async (req, res) => {
  try {
    const {
      carId,
      userId,
      customerName,
      customerEmail,
      customerPhone,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      location,
      needDriver,
      driverHours
    } = req.body

    // Get car details for cost calculation
    const car = await Car.findById(carId)
    if (!car) {
      return res.status(404).json({ message: 'Car not found' })
    }

    // Calculate total cost
    const driverCostPerHour = 2000
    const carCost = car.price
    const driverCost = needDriver ? driverHours * driverCostPerHour : 0
    const totalCost = carCost + driverCost

    const booking = new Booking({
      carId,
      userId,
      customerName,
      customerEmail,
      customerPhone,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      location,
      needDriver,
      driverHours,
      totalCost
    })

    const savedBooking = await booking.save()
    await savedBooking.populate('carId')
    
    res.status(201).json(savedBooking)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('carId')
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('carId')
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }
    res.json(booking)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('carId')
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }
    
    res.json(booking)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Delete booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id)
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }
    res.json({ message: 'Booking deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}