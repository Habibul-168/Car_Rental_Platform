# Car Rental Platform - RentDrive

A modern car rental platform similar to Uber but with advanced booking features including date/time selection, car type preferences, and professional driver services.

## Features

- **Flexible Booking**: Book cars by specific date and time slots
- **Car Segments**: Choose from Premium and Normal car categories
- **Search & Favorites**: Search for cars and save favorites
- **Driver Service**: Option to hire professional drivers charged per hour ($25/hour)
- **Responsive Design**: Works on all devices
- **3D Animations**: Interactive 3D car models using Three.js
- **Smooth Animations**: Framer Motion powered animations

## Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS for styling
- Framer Motion for animations
- Three.js & React Three Fiber for 3D graphics
- Axios for API calls

### Backend
- Node.js with Express
- MongoDB with Mongoose
- RESTful API architecture
- CORS enabled for cross-origin requests

## Project Structure

```
car-rental-platform/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── ...
│   └── package.json
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone and setup the project**
   ```bash
   cd car-rental-platform
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure Environment**
   - Update `backend/.env` with your MongoDB connection string
   - Default: `mongodb://localhost:27017/car-rental`

5. **Seed Database**
   ```bash
   cd backend
   node seedData.js
   ```

6. **Start Development Servers**
   
   Backend (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```
   
   Frontend (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

7. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## API Endpoints

### Cars
- `GET /api/cars` - Get all cars (with optional segment and search filters)
- `GET /api/cars/:id` - Get car by ID
- `POST /api/cars` - Create new car
- `PUT /api/cars/:id` - Update car
- `DELETE /api/cars/:id` - Delete car

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id/status` - Update booking status
- `DELETE /api/bookings/:id` - Delete booking

## Key Features Explained

### Date & Time Booking
Users can select specific pickup and return dates and times for their rental period.

### Car Segments
- **Premium Segment**: Luxury cars (BMW, Mercedes, Audi, Tesla) - $150-200/day
- **Normal Segment**: Standard cars (Toyota, Honda, Nissan, Hyundai) - $55-65/day

### Driver Service
- Professional drivers available at $25/hour
- Users can specify how many hours they need a driver
- Total cost automatically calculated (car rental + driver service)

### Search & Favorites
- Search cars by name
- Add cars to favorites for quick access
- Filter by car segments

## Development

### Adding New Cars
Use the backend API or directly add to the database:

```javascript
{
  name: "Car Name",
  price: 100,
  image: "🚗",
  features: ["Feature 1", "Feature 2"],
  segment: "premium" | "normal",
  specifications: {
    seats: 5,
    transmission: "Automatic",
    fuelType: "Petrol",
    mileage: "15 km/l"
  }
}
```

### Customizing Styles
- Edit `frontend/tailwind.config.js` for theme customization
- Modify `frontend/src/index.css` for global styles

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.