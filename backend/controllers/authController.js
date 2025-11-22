import User from '../models/User.js'
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }
    
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' })
    }
    
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ name, email, password: hashedPassword })
    await user.save()
    
    res.status(201).json({ 
      message: 'User registered successfully',
      user: { _id: user._id, id: user._id, name: user.name, email: user.email }
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ message: 'Registration failed. Please try again.' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    
    res.json({ 
      message: 'Login successful',
      user: { _id: user._id, id: user._id, name: user.name, email: user.email }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}