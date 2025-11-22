import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

let showToast = null

export const toast = {
  success: (message) => showToast?.({ type: 'success', message }),
  error: (message) => showToast?.({ type: 'error', message }),
  info: (message) => showToast?.({ type: 'info', message })
}

const NotificationToast = () => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    showToast = ({ type, message }) => {
      const id = Date.now()
      setNotifications(prev => [...prev, { id, type, message }])
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id))
      }, 3000)
    }
  }, [])

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className={`px-4 py-3 rounded-lg shadow-lg text-white ${
              notification.type === 'success' ? 'bg-green-600' :
              notification.type === 'error' ? 'bg-red-600' : 'bg-blue-600'
            }`}
          >
            {notification.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default NotificationToast