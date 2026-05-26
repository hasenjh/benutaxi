import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { GOOGLE_MAPS_API_KEY, DEFAULT_LOCATIONS, THEME } from '../constants/config';

const GoogleMap = ({
  pickupLocation,
  dropoffLocation,
  driverLocation,
  passengerLocation,
  showRoute = false,
  showLiveTracking = false,
  onLocationSelect = null,
  selectMode = null
}) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef({});
  const polylineRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: GOOGLE_MAPS_API_KEY,
          version: 'weekly',
          libraries: ['places', 'directions']
        });

        const google = await loader.load();

        if (!mapRef.current) return;

        const map = new google.maps.Map(mapRef.current, {
          center: driverLocation || DEFAULT_LOCATIONS.defaultCenter,
          zoom: 14,
          styles: [
            {
              featureType: 'all',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#616161' }]
            },
            {
              featureType: 'administrative',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#e0e0e0' }]
            }
          ],
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false
        });

        mapInstance.current = map;

        if (selectMode) {
          map.addListener('click', (event) => {
            const location = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng()
            };
            if (onLocationSelect) {
              onLocationSelect(location, selectMode);
            }
          });
        }

        addMarkers(map, google);
        if (showRoute && pickupLocation && dropoffLocation) {
          addPolyline(map, google);
        }

        setIsLoaded(true);
      } catch (err) {
        console.error('Error loading Google Maps:', err);
        setError('Failed to load Google Maps');
      }
    };

    initMap();
  }, []);

  useEffect(() => {
    if (mapInstance.current && isLoaded) {
      addMarkers(mapInstance.current, window.google);
      if (showRoute && pickupLocation && dropoffLocation) {
        addPolyline(mapInstance.current, window.google);
      }
    }
  }, [pickupLocation, dropoffLocation, driverLocation, passengerLocation, showRoute, isLoaded]);

  const addMarkers = (map, google) => {
    Object.values(markersRef.current).forEach(marker => marker.setMap(null));
    markersRef.current = {};

    if (driverLocation) {
      const driverMarker = new google.maps.Marker({
        position: driverLocation,
        map: map,
        title: 'Your Location',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: THEME.primary,
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 3
        },
        zIndex: 100
      });
      markersRef.current.driver = driverMarker;
    }

    if (showLiveTracking && passengerLocation) {
      const passengerMarker = new google.maps.Marker({
        position: passengerLocation,
        map: map,
        title: 'Passenger Location',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: THEME.warning,
          fillOpacity: 0.9,
          strokeColor: '#ffffff',
          strokeWeight: 2
        },
        zIndex: 90
      });
      markersRef.current.passenger = passengerMarker;
    }

    if (pickupLocation) {
      const pickupMarker = new google.maps.Marker({
        position: pickupLocation,
        map: map,
        title: 'Pickup Location',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 11,
          fillColor: THEME.secondary,
          fillOpacity: 0.9,
          strokeColor: '#ffffff',
          strokeWeight: 2
        },
        zIndex: 80
      });
      markersRef.current.pickup = pickupMarker;
    }

    if (dropoffLocation) {
      const dropoffMarker = new google.maps.Marker({
        position: dropoffLocation,
        map: map,
        title: 'Dropoff Location',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 11,
          fillColor: THEME.danger,
          fillOpacity: 0.9,
          strokeColor: '#ffffff',
          strokeWeight: 2
        },
        zIndex: 80
      });
      markersRef.current.dropoff = dropoffMarker;
    }

    if (Object.keys(markersRef.current).length > 0) {
      const bounds = new google.maps.LatLngBounds();
      Object.values(markersRef.current).forEach(marker => {
        bounds.extend(marker.getPosition());
      });
      map.fitBounds(bounds, { padding: 80 });
    }
  };

  const addPolyline = (map, google) => {
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
    }

    const polyline = new google.maps.Polyline({
      path: [pickupLocation, dropoffLocation],
      geodesic: true,
      strokeColor: THEME.primary,
      strokeOpacity: 0.6,
      strokeWeight: 3,
      map: map
    });

    polylineRef.current = polyline;
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5'
      }}
    >
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '100%'
        }}
      />

      {!isLoaded && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0,0,0,0.85)',
            color: 'white',
            padding: '16px 24px',
            borderRadius: '8px',
            fontSize: '14px'
          }}
        >
          Loading Map...
        </div>
      )}

      {error && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: THEME.danger,
            color: 'white',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '12px'
          }}
        >
          {error}
        </div>
      )}

      {selectMode && (
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            backgroundColor: THEME.primary,
            color: 'white',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '12px'
          }}
        >
          Click map to select {selectMode}
        </div>
      )}
    </div>
  );
};

export default GoogleMap;
