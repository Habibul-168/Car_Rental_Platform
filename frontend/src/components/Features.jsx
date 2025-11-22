import { motion } from 'framer-motion'

const Features = () => {
  const features = [
    {
      icon: '📅',
      title: 'Flexible Booking',
      description: 'Book cars by specific date and time slots that work for you'
    },
    {
      icon: '🚗',
      title: 'Wide Selection',
      description: 'Choose from premium luxury cars to budget-friendly options'
    },
    {
      icon: '👨‍✈️',
      title: 'Professional Drivers',
      description: 'Need a driver? Get experienced chauffeurs charged per hour'
    },
    {
      icon: '💰',
      title: 'Transparent Pricing',
      description: 'No hidden fees. Clear pricing for cars and driver services'
    },
    {
      icon: '📱',
      title: 'Easy Management',
      description: 'Manage your bookings, payments, and preferences in one place'
    },
    {
      icon: '🔒',
      title: 'Secure & Safe',
      description: 'All vehicles are insured and drivers are background checked'
    }
  ]

  return (
    <section id="features" className="py-16 bg-dark-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Why Choose RentDrive?</h2>
          <p className="text-xl text-gray-300">Experience the best car rental service with premium features</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-dark-accent rounded-xl p-8 text-center hover:shadow-lg hover:shadow-primary/20 transition-all border border-accent/20"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Driver Service Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-4">Don't Know How to Drive?</h3>
          <p className="text-xl mb-6">
            No problem! Get a professional driver with your rental. 
            Our experienced chauffeurs are available at competitive hourly rates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-2xl font-bold">₹180/hour</div>
              <div className="text-sm">Professional Driver</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm">Available Service</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-2xl font-bold">Licensed</div>
              <div className="text-sm">& Insured</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features