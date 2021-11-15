import { LatLngExpression } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './Map.css';

const position = [51.505, -0.09] as LatLngExpression;

function Map() {
  return (
    <div>
      <MapContainer center={position} zoom={13} className="map-container">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;