import { useState } from 'react'
import { indianCities } from '../data/indianCities'

const LocationAutocomplete = ({ value, onChange, placeholder, className, name }) => {
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleInputChange = (e) => {
    const inputValue = e.target.value
    onChange(e)

    if (inputValue.length > 0) {
      const filteredCities = indianCities.filter(city =>
        city.toLowerCase().includes(inputValue.toLowerCase())
      ).slice(0, 5)
      setSuggestions(filteredCities)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (city) => {
    onChange({ target: { name, value: city } })
    setShowSuggestions(false)
  }

  return (
    <div className="relative">
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={className}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full bg-dark-secondary border border-accent/30 rounded-lg mt-1 max-h-40 overflow-y-auto">
          {suggestions.map((city, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(city)}
              className="w-full text-left px-4 py-2 text-white hover:bg-dark-accent transition-colors"
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LocationAutocomplete