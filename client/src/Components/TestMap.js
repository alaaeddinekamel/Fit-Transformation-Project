import React from 'react'
import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
const TestMap = () => {
    function AddMarker({ onAddMarker }) {
        useMapEvents({
          click(e) {
            onAddMarker(e.latlng);
          },
        });
        return null;
      }
      
      const [markers, setMarkers] = useState([]);
    
      // Fonction pour ajouter un marqueur
      const addMarker = (latlng) => {
        setMarkers([...markers, latlng]);
      };
    
      // Fonction pour supprimer un marqueur
      const removeMarker = (index) => {
        setMarkers(markers.filter((_, i) => i !== index));
      };
    
  return (
    <div>
              <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((position, idx) => (
        <Marker key={idx} position={position} icon={L.icon({ iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png' })}>
          <Popup>
            <div>
              <p>Marker at {position.lat}, {position.lng}</p>
              <button onClick={() => removeMarker(idx)}>Supprimer</button>
            </div>
          </Popup>
        </Marker>
      ))}
      <AddMarker onAddMarker={addMarker} />
    </MapContainer>
    </div>
  )
}

export default TestMap