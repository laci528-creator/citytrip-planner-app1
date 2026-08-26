import { formatDistance } from "../utils/formatters";
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup 
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export default function CityMap({ latitude, longitude, cityName, country, attractions }) {
  const position = [latitude, longitude];

const attrArray = Array.isArray(attractions?.data)
  ? attractions.data.filter(
      (attraction) =>
        Number.isFinite(attraction.latitude) &&
        Number.isFinite(attraction.longitude)
    )
  : [];

  return (
    <div className="map-panel">
      <MapContainer
        key={`${latitude}-${longitude}`}
        center={position}
        zoom={12}
        scrollWheelZoom={false}
        className="city-map"
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

        {attrArray?.map((attraction) => (
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

