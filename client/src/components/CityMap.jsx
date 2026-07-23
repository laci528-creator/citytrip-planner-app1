import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { formatDistance } from "../utils/formatters";


export default function CityMap({ latitude, longitude, cityName, country, attractions }) {
  const position = [latitude, longitude];

  return (
    <div className="map-panel">
      <MapContainer
        key={`${latitude}-${longitude}`}
        center={position}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            {cityName}, {country}
          </Popup>
        </Marker>

        {attractions?.map((attraction) => (
          <Marker
            key={attraction.id}
            position={[attraction.latitude, attraction.longitude]}
          >
            <Popup>
              <strong>{attraction.name}</strong>
              <br />
              Distance: {formatDistance(attraction.distance)}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

