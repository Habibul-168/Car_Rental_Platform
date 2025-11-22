import { motion } from 'framer-motion'
import { useState } from 'react'

const HelpCenter = ({ isOpen, onClose, type = 'help' }) => {
  const [activeTab, setActiveTab] = useState('faq')

  const getTitle = () => {
    switch(type) {
      case 'terms': return 'Terms of Service'
      case 'privacy': return 'Privacy Policy'
      default: return 'Help Center'
    }
  }

  const renderContent = () => {
    if (type === 'terms') {
      return (
        <div className="space-y-6 max-h-96 overflow-y-auto">
          <div className="bg-dark-secondary rounded-lg p-6 border border-accent/20">
            <h3 className="text-white font-semibold mb-4">Terms of Service</h3>
            <div className="space-y-4 text-gray-300">
              <p><strong>Effective Date:</strong> January 1, 2024</p>
              <p><strong>1. Acceptance of Terms:</strong> By using RentDrive services, you agree to these terms and conditions.</p>
              <p><strong>2. Eligibility:</strong> You must be at least 21 years old with a valid driver's license for 2+ years.</p>
              <p><strong>3. Vehicle Usage:</strong> Vehicles must be returned in the same condition. No smoking, pets, or illegal activities.</p>
              <p><strong>4. Payment:</strong> Full payment required at booking. Additional charges may apply for damages or late returns.</p>
              <p><strong>5. Cancellation:</strong> Free cancellation up to 24 hours before pickup. Late cancellations subject to fees.</p>
              <p><strong>6. Insurance:</strong> Basic coverage included. Additional insurance options available at booking.</p>
              <p><strong>7. Driver Service:</strong> Professional drivers available at $25/hour with 4-hour minimum booking.</p>
              <p><strong>Contact:</strong> For questions, email legal@rentdrive.com or call +91 800 1435 866</p>
            </div>
          </div>
        </div>
      )
    }
    
    if (type === 'privacy') {
      return (
        <div className="space-y-6 max-h-96 overflow-y-auto">
          <div className="bg-dark-secondary rounded-lg p-6 border border-accent/20">
            <h3 className="text-white font-semibold mb-4">Privacy Policy</h3>
            <div className="space-y-4 text-gray-300">
              <p><strong>Effective Date:</strong> January 1, 2024</p>
              <p><strong>1. Information We Collect:</strong> Personal details, driver's license, payment information, and booking history.</p>
              <p><strong>2. How We Use Information:</strong> To process bookings, verify identity, process payments, and improve services.</p>
              <p><strong>3. Information Sharing:</strong> We do not sell personal data. Information shared only with service providers and as required by law.</p>
              <p><strong>4. Data Security:</strong> We use industry-standard encryption and security measures to protect your information.</p>
              <p><strong>5. Data Retention:</strong> Personal data retained for 7 years or as required by law.</p>
              <p><strong>6. Your Rights:</strong> You can access, update, or delete your personal information by contacting us.</p>
              <p><strong>7. Cookies:</strong> We use cookies to enhance user experience and analyze website usage.</p>
              <p><strong>8. Contact:</strong> For privacy concerns, email privacy@rentdrive.com or call +91 800 1435 866</p>
            </div>
          </div>
        </div>
      )
    }
    
    // Default help content
    return (
      <>
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'faq' ? 'bg-primary text-white' : 'bg-dark-secondary text-gray-300'}`}
          >
            FAQ
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'support' ? 'bg-primary text-white' : 'bg-dark-secondary text-gray-300'}`}
          >
            Support
          </button>
        </div>

        {activeTab === 'faq' && (
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-dark-secondary rounded-lg p-4 border border-accent/20">
                <h3 className="text-white font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'support' && (
          <div className="space-y-6">
            <div className="bg-dark-secondary rounded-lg p-6 border border-accent/20">
              <h3 className="text-white font-semibold mb-4">24/7 Customer Support</h3>
              <div className="space-y-3">
                <p className="text-gray-300"><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p className="text-gray-300"><strong>Email:</strong> support@rentdrive.com</p>
                <p className="text-gray-300"><strong>Live Chat:</strong> Available on our website</p>
                <p className="text-gray-300"><strong>Emergency:</strong> +1 (555) 911-HELP</p>
              </div>
            </div>
            <div className="bg-dark-secondary rounded-lg p-6 border border-accent/20">
              <h3 className="text-white font-semibold mb-4">Response Times</h3>
              <div className="space-y-2">
                <p className="text-gray-300">• Phone Support: Immediate</p>
                <p className="text-gray-300">• Email Support: Within 2 hours</p>
                <p className="text-gray-300">• Emergency Assistance: 24/7</p>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  const faqs = [
    {
      question: "How do I book a car?",
      answer: "Simply browse our car selection, choose your preferred vehicle, select dates and times, and complete the booking form with your details."
    },
    {
      question: "Can I hire a professional driver?",
      answer: "Yes! We offer professional drivers at $25/hour. You can add this service during the booking process."
    },
    {
      question: "What documents do I need?",
      answer: "You'll need a valid driver's license, government-issued ID, and a credit card for security deposit."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel up to 24 hours before your pickup time for a full refund."
    },
    {
      question: "Are there age restrictions?",
      answer: "Drivers must be at least 21 years old with a valid license for 2+ years."
    }
  ]

  if (!isOpen) return null

  return (
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
        className="bg-dark-accent rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-accent/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">{getTitle()}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-200 text-2xl">×</button>
          </div>

          {renderContent()}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default HelpCenter