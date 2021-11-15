import { LatLngExpression } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import './Map.css';

const position = [51.505, -0.09] as LatLngExpression;

function Map() {
  return (
    <div className="map">
      <MapContainer center={position} zoom={13} className="map-container">
        {/* TODO: Don't reveal MAPBOX token here user */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/krthush/ckw0k00ne04jv16qxocrdtkcr/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
          attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>"
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