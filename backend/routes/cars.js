import express from 'express'
import {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar
} from '../controllers/carController.js'

const router = express.Router()

// GET /api/cars - Get all cars
router.get('/', getAllCars)

// GET /api/cars/:id - Get car by ID
router.get('/:id', getCarById)

// POST /api/cars - Create new car
router.post('/', createCar)

// PUT /api/cars/:id - Update car
router.put('/:id', updateCar)

// DELETE /api/cars/:id - Delete car
router.delete('/:id', deleteCar)

export default router