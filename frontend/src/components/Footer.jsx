import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-primary mb-4">RentDrive</h3>
            <p className="text-gray-300 mb-4">
              Your trusted partner for premium car rentals with professional driver services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">📘</a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">🐦</a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">📷</a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">💼</a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#cars" className="hover:text-primary transition-colors cursor-pointer">Car Rental</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors cursor-pointer">Driver Service</a></li>
              <li><button onClick={() => {document.getElementById('cars')?.scrollIntoView({behavior: 'smooth'}); setTimeout(() => document.querySelector('[data-segment="premium"]')?.click(), 500)}} className="hover:text-primary transition-colors cursor-pointer text-left">Premium Cars</button></li>
              <li><a href="#contact" className="hover:text-primary transition-colors cursor-pointer">Airport Transfer</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><button onClick={() => window.dispatchEvent(new CustomEvent('openHelp'))} className="hover:text-primary transition-colors cursor-pointer text-left">Help Center</button></li>
              <li><button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-primary transition-colors cursor-pointer text-left">Contact Us</button></li>
              <li><button onClick={() => window.dispatchEvent(new CustomEvent('openTerms'))} className="hover:text-primary transition-colors cursor-pointer text-left">Terms of Service</button></li>
              <li><button onClick={() => window.dispatchEvent(new CustomEvent('openPrivacy'))} className="hover:text-primary transition-colors cursor-pointer text-left">Privacy Policy</button></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <p>📞 (+91) 9835897523</p>
              <p>✉️ rental@rentdrive.com</p>
              <p>📍 kolkata, West Bengal 700014</p>
              <p>🕒 24/7 Customer Support</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300"
        >
          <p>&copy; 2024 RentDrive. All rights reserved. Built with React, Tailwind CSS, and Three.js</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer