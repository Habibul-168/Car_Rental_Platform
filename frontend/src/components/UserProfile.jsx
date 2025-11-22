import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import UserBookings from './UserBookings'

const UserProfile = ({ isOpen, onClose }) => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [showBookings, setShowBookings] = useState(false)
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    dateOfBirth: user?.dateOfBirth || ''
  })

  const handleInputChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    // TODO: Add API call to update user profile
    setIsEditing(false)
  }

  if (!isOpen || !user) return null

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
          className="bg-dark-accent rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-accent/20"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">My Profile</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-200 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-dark-secondary border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white"
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-dark-secondary border border-accent/30 rounded-lg text-white">
                    {user.name}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-dark-secondary border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white"
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-dark-secondary border border-accent/30 rounded-lg text-white">
                    {user.email}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className="w-full px-4 py-3 bg-dark-secondary border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white placeholder-gray-400"
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-dark-secondary border border-accent/30 rounded-lg text-white">
                    {user.phone || 'Not provided'}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={editData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-dark-secondary border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white"
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-dark-secondary border border-accent/30 rounded-lg text-white">
                    {user.dateOfBirth || 'Not provided'}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={editData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                    rows="3"
                    className="w-full px-4 py-3 bg-dark-secondary border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white placeholder-gray-400 resize-none"
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-dark-secondary border border-accent/30 rounded-lg text-white min-h-[80px]">
                    {user.address || 'Not provided'}
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-6">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex-1 btn-primary"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex-1 btn-primary"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={() => setShowBookings(true)}
                      className="flex-1 btn-secondary"
                    >
                      My Bookings
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      <UserBookings 
        isOpen={showBookings}
        onClose={() => setShowBookings(false)}
      />
    </AnimatePresence>
  )
}

export default UserProfile