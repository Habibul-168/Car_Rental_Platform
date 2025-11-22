import Car from '../models/Car.js'

// Get all cars
export const getAllCars = async (req, res) => {
  try {
    const { segment, search } = req.query
    let query = {}
    
    if (segment) {
      query.segment = segment
    }
    
    if (search) {
      query.name = { $regex: search, $options: 'i' }
    }
    
    const cars = await Car.find(query)
    res.json(cars)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get car by ID
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    if (!car) {
      return res.status(404).json({ message: 'Car not found' })
    }
    res.json(car)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Create new car (admin only)
export const createCar = async (req, res) => {
  try {
    const car = new Car(req.body)
    const savedCar = await car.save()
    res.status(201).json(savedCar)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Update car
export const updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!car) {
      return res.status(404).json({ message: 'Car not found' })
    }
    res.json(car)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Delete car
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id)
    if (!car) {
      return res.status(404).json({ message: 'Car not found' })
    }
    res.json({ message: 'Car deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}