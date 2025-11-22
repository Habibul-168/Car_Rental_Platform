import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { authAPI } from '../services/api'
import PasswordValidator from './PasswordValidator'
import { toast } from './NotificationToast'

const LoginModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const { login } = useAuth()

  const isPasswordValid = (password) => {
    return password.length >= 8 &&
           /[A-Z]/.test(password) &&
           /[a-z]/.test(password) &&
           /\d/.test(password) &&
           /[!@#$%^&*(),.?":{}|<>]/.test(password)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isLogin && !isPasswordValid(formData.password)) {
      return
    }
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      return
    }
    
    try {
      const response = isLogin 
        ? await authAPI.login({ email: formData.email, password: formData.password })
        : await authAPI.register(formData)
      
      if (response.data.user) {
        login(response.data.user)
        onClose()
        setFormData({ name: '', email: '', password: '', confirmPassword: '' })
        if (isLogin) {
          toast.success('Welcome back!')
        } else {
          toast.success('Account created successfully!')
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Authentication failed')
    }
  }

  if (!isOpen) return null

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
          className="bg-dark-accent rounded-2xl max-w-md w-full border border-accent/20"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {isLogin ? 'Sign In' : 'Sign Up'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-200 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className="w-full px-4 py-3 bg-dark-secondary border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-dark-secondary border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-dark-secondary border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white"
                />
                {!isLogin && formData.password && (
                  <PasswordValidator password={formData.password} />
                )}
              </div>
              
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 bg-dark-secondary border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white ${
                      formData.confirmPassword && formData.password !== formData.confirmPassword 
                        ? 'border-red-500' 
                        : 'border-accent/30'
                    }`}
                  />
                  {formData.confirmPassword && (
                    <div className="mt-1 flex items-center gap-2 text-sm">
                      <span className={`text-lg ${
                        formData.password === formData.confirmPassword ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {formData.password === formData.confirmPassword ? '✓' : '✗'}
                      </span>
                      <span className={formData.password === formData.confirmPassword ? 'text-green-400' : 'text-red-400'}>
                        {formData.password === formData.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <button
                type="submit"
                className="w-full btn-primary"
              >
                {isLogin ? 'Sign In' : 'Sign Up'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-accent hover:text-primary transition-colors"
              >
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default LoginModal