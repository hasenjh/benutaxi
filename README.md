# BenuTaxi Driver Application

Professional ride-sharing driver app with real-time Google Maps integration, live location tracking, and dynamic fare pricing.

## Features

✅ **Real-time Google Maps Integration**
- Live driver location tracking
- Passenger location visibility during rides
- Route polyline between pickup and dropoff
- Interactive map with zoom and expand controls

✅ **Ride Management**
- Incoming ride notifications with passenger info
- Accept/Reject ride requests
- Ride status tracking (accepted → in-progress → completed)
- Live timer and distance counter during rides

✅ **Stop Ride & Price Breakdown**
- "Stop Ride" button to end active ride
- Complete fare breakdown:
  - Base fare
  - Distance charges
  - Time charges
  - Surge pricing (if applicable)
- Modal display with detailed payment info

✅ **Passenger Rating & Tips**
- 5-star rating system
- Tip selection ($0, $2, $5)
- Optional feedback/comments
- Automatic earnings update

✅ **Professional UI/UX**
- Minimal, professional animations (150-600ms)
- Clean typography and spacing
- Smooth transitions
- Mobile-responsive design
- Dark/Light color scheme support

✅ **Mock API & State Management**
- Zustand for state management
- Mock API service (ready for real backend)
- Simulated live location updates
- Simulated passenger location tracking

## Tech Stack

- **React 18** - UI framework
- **Framer Motion** - Animations & transitions
- **Zustand** - State management
- **Google Maps API** - Maps integration
- **@googlemaps/js-api-loader** - Async API loading

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Google Maps API Key (Already Configured)
```
API Key: AIzaSyBH1BsI1sTcurgqYRHBZF5cY8M3W24Pt00
```
The API key is already configured in `src/constants/config.js`

### 3. Start Development Server
```bash
npm start
```
The app will open at `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── GoogleMap.jsx           # Map component with real-time markers
│   ├── RideCard.jsx            # Ride request card
│   ├── ActiveRideScreen.jsx    # Live ride display
│   └── PriceBreakdownModal.jsx # Fare & rating modal
├── screens/
│   └── HomeScreen.jsx          # Main app screen
├── services/
│   └── api.js                  # API service with mock data
├── stores/
│   └── index.js                # Zustand store
├── utils/
│   ├── priceCalculator.js      # Fare calculation
│   └── googleMapsUtils.js      # Map utilities
├── constants/
│   └── config.js               # Configuration & API key
├── App.jsx                     # Main app component
└── index.js                    # Entry point
```

## Key Features Explained

### Live Location Tracking
- Driver location updates every 2 seconds during active ride
- Passenger location fetched from API
- Smooth location interpolation for realistic movement
- Real-time distance calculation

### Fare Calculation
```
Total = (BaseFare + DistanceFare + TimeFare) × SurgeMultiplier

- Base Fare: $3.00
- Distance: $1.50 per km
- Time: $0.35 per minute
- Surge Levels: normal (1.0x), medium (1.25x), high (1.5x), peak (2.0x)
```

### Ride Flow
1. Driver goes ONLINE
2. Receives incoming ride request (RideCard)
3. ACCEPT or DECLINE ride
4. Heads to pickup location (simulated 3-second delay)
5. Ride goes IN PROGRESS (live tracking starts)
6. Driver clicks "STOP RIDE" button
7. Price breakdown modal appears
8. Driver rates passenger and adds tip
9. Ride marked as COMPLETED
10. Ready for next ride

### Mock API Configuration
```javascript
// In src/constants/config.js
export const API_CONFIG = {
  mockMode: true  // Set to false when backend is ready
};
```

Switch to real backend by setting `mockMode: false` and providing your backend URL.

## API Endpoints (When Backend Ready)

```
POST /api/rides/incoming          # Get incoming ride
POST /api/rides/{id}/accept       # Accept ride
POST /api/rides/{id}/reject       # Reject ride
POST /api/rides/{id}/complete     # Complete ride
POST /api/driver/location         # Update location
GET  /api/rides/{id}/passenger-location  # Get passenger location
POST /api/rides/{id}/rating       # Submit rating
POST /api/rides/{id}/payment      # Process payment
```

## Animations & Transitions

All animations follow professional/minimal design:
- **Fast**: 150ms - Quick UI feedback
- **Normal**: 250ms - Standard transitions
- **Slow**: 400ms - Important state changes
- **Slower**: 600ms - Modal open/close

## Styling

Professional color scheme:
- **Primary**: #2a5298 (Dark Blue)
- **Secondary**: #4CAF50 (Green)
- **Danger**: #FF5252 (Red)
- **Warning**: #FFA500 (Orange)

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- [ ] Real Google Directions API integration
- [ ] WebSocket for real-time updates
- [ ] Push notifications
- [ ] Offline mode with caching
- [ ] Multiple language support
- [ ] Dark mode toggle
- [ ] Analytics dashboard
- [ ] Route history & statistics

## Support

For issues or feature requests, please create an issue in the repository.

## License

MIT License - Feel free to use this project commercially
