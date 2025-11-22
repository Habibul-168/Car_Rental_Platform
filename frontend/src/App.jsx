import { useState, useEffect } from 'react'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SearchSection from './components/SearchSection'
import CarSegments from './components/CarSegments'
import Features from './components/Features'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import NotificationToast from './components/NotificationToast'
import HelpCenter from './components/HelpCenter'

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedCar, setSelectedCar] = useState(null)
  const [searchFilters, setSearchFilters] = useState({})
  const [helpModal, setHelpModal] = useState({ isOpen: false, type: 'help' })

  const handleBookCar = (car) => {
    setSelectedCar(car)
    setIsBookingOpen(true)
  }

  const handleSearch = (filters) => {
    setSearchFilters(filters)
  }

  useEffect(() => {
    const handleOpenHelp = () => setHelpModal({ isOpen: true, type: 'help' })
    const handleOpenTerms = () => setHelpModal({ isOpen: true, type: 'terms' })
    const handleOpenPrivacy = () => setHelpModal({ isOpen: true, type: 'privacy' })

    window.addEventListener('openHelp', handleOpenHelp)
    window.addEventListener('openTerms', handleOpenTerms)
    window.addEventListener('openPrivacy', handleOpenPrivacy)

    return () => {
      window.removeEventListener('openHelp', handleOpenHelp)
      window.removeEventListener('openTerms', handleOpenTerms)
      window.removeEventListener('openPrivacy', handleOpenPrivacy)
    }
  }, [])

  return (
    <AuthProvider>
      <div className="min-h-screen bg-dark">
        <Navbar />
        <Hero />
        <SearchSection onSearch={handleSearch} />
        <CarSegments onBookCar={handleBookCar} searchFilters={searchFilters} />
        <Features />
        <ContactSection />
        <Footer />
        
        {isBookingOpen && (
          <BookingModal 
            car={selectedCar}
            onClose={() => setIsBookingOpen(false)}
          />
        )}
        <NotificationToast />
        
        {helpModal.isOpen && (
          <HelpCenter 
            isOpen={helpModal.isOpen}
            type={helpModal.type}
            onClose={() => setHelpModal({ isOpen: false, type: 'help' })}
          />
        )}
      </div>
    </AuthProvider>
  )
}

export default App