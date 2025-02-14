import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const LiveTracking = () => {
  const [userLocation, setUserLocation] = useState(null);
  const mapContainer = useRef(null); // Reference to hold the map container
  const map = useRef(null); // Reference to hold the map instance
  const marker = useRef(null); // Reference to hold the marker instance

  useEffect(() => {
    mapboxgl.accessToken = `${import.meta.env.VITE_MAPBOX_API_KEY}`; 

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 0],
      zoom: 13,
    });

    map.current.addControl(new mapboxgl.NavigationControl());

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Update the user location state
          setUserLocation({ lat: latitude, lng: longitude });

          // Update the map center to the user's new location
          map.current.flyTo({
            center: [longitude, latitude],
            zoom: 13,
          });

          // If the marker is not already created, create it
          if (!marker.current) {
            marker.current = new mapboxgl.Marker()
              .setLngLat([longitude, latitude])
              .addTo(map.current);
          } else {
            // Update marker's position
            marker.current.setLngLat([longitude, latitude]);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 20000,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    return () => {
      if (map.current) map.current.remove(); // 
    };
  }, []);

  return (
    <div>
      <div ref={mapContainer} style={{ width: "100%", height: "500px" }} />
    </div>
  );
};

export default LiveTracking;
