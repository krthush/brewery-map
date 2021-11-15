import { LatLngExpression } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import './Map.css';

import MapController from './MapController';

interface Props {
  defaultZoom: number;
  defaultCenter: LatLngExpression
  center: LatLngExpression;
  breweries: any[];
};

const Map = (props: Props) => {
  return (
    <div className="map">
      <MapContainer center={props.defaultCenter} zoom={props.defaultZoom} className="map-container">
        <MapController breweries={props.breweries} center={props.center} zoom={props.defaultZoom}/>
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/krthush/ckw0k00ne04jv16qxocrdtkcr/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
          attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>"
        />
      </MapContainer>
    </div>
  );
}

export default Map;