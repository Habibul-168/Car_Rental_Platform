import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import LoginModal from './LoginModal'
import UserBookings from './UserBookings'
import UserProfile from './UserProfile'
import HelpCenter from './HelpCenter'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isBookingsOpen, setIsBookingsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()

  useEffect(() => {
    const handleOpenHelp = () => setIsHelpOpen(true)
    window.addEventListener('openHelp', handleOpenHelp)
    return () => window.removeEventListener('openHelp', handleOpenHelp)
  }, [])

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-dark-secondary shadow-lg shadow-blue-dark/20 fixed w-full top-0 z-50 border-b border-dark-accent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-primary cursor-default"
            >
              RentDrive
            </motion.div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            <button onClick={() => document.getElementById('home')?.scrollIntoView({behavior: 'smooth'})} className="text-gray-300 hover:text-accent transition-colors relative group">
              Home
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button onClick={() => document.getElementById('cars')?.scrollIntoView({behavior: 'smooth'})} className="text-gray-300 hover:text-accent transition-colors relative group">
              Cars
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})} className="text-gray-300 hover:text-accent transition-colors relative group">
              Features
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})} className="text-gray-300 hover:text-accent transition-colors relative group">
              Contact
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </button>
            {isAuthenticated && (
              <button 
                onClick={() => setIsBookingsOpen(true)}
                className="text-gray-300 hover:text-accent transition-colors relative group"
              >
                My Bookings
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </button>
            )}
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsProfileOpen(true)}
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <span className="text-white font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="btn-secondary"
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLoginOpen(true)}
                className="btn-primary cursor-pointer"
              >
                Sign In
              </motion.button>
            )}
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-dark-secondary border-t border-dark-accent"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button onClick={() => {document.getElementById('home')?.scrollIntoView({behavior: 'smooth'}); setIsOpen(false)}} className="block px-3 py-2 text-gray-300 hover:text-accent w-full text-left">Home</button>
            <button onClick={() => {document.getElementById('cars')?.scrollIntoView({behavior: 'smooth'}); setIsOpen(false)}} className="block px-3 py-2 text-gray-300 hover:text-accent w-full text-left">Cars</button>
            <button onClick={() => {document.getElementById('features')?.scrollIntoView({behavior: 'smooth'}); setIsOpen(false)}} className="block px-3 py-2 text-gray-300 hover:text-accent w-full text-left">Features</button>
            <button onClick={() => {document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'}); setIsOpen(false)}} className="block px-3 py-2 text-gray-300 hover:text-accent w-full text-left">Contact</button>
            {isAuthenticated && (
              <button 
                onClick={() => setIsBookingsOpen(true)}
                className="block px-3 py-2 text-gray-300 hover:text-accent w-full text-left"
              >
                My Bookings
              </button>
            )}
            {isAuthenticated ? (
              <div className="px-3 py-2 flex items-center gap-3">
                <button 
                  onClick={() => setIsProfileOpen(true)}
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <span className="text-white font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </button>
                <button 
                  onClick={logout}
                  className="btn-secondary flex-1"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="btn-primary w-full mt-2"
              >
                Sign In
              </button>
            )}
          </div>
        </motion.div>
      )}
      
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
      
      <UserBookings 
        isOpen={isBookingsOpen} 
        onClose={() => setIsBookingsOpen(false)} 
      />
      
      <UserProfile 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />
      
      <HelpCenter 
        isOpen={isHelpOpen} 
        onClose={() => setIsHelpOpen(false)} 
      />
    </motion.nav>
  )
}

export default Navbar