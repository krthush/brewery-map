import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";

import L from "leaflet";

interface Props {
  center: LatLngExpression;
  zoom: number
  breweries: any[];
  clickedBreweryId?: string; 
};

interface BreweryMarker {
  id: string;
  marker: L.Marker
}

let firstLoad = true;

const MapController = (props: Props) => {

  const [breweryIds, setBreweryIds] = useState([] as number[]);
  const [breweryMarkers, setBreweryMarkers] = useState([] as BreweryMarker[]);

  const map = useMap();

  useEffect(()=> {
    map.setView(props.center, props.zoom);
  },[props.center]);

  useEffect(()=> {
    if (props.breweries) {
      props.breweries.forEach((brewery, index) => {
        // Check if pin hasn't been added before & for now only add ones with lat/long
        if(!breweryIds.includes(brewery.id) && brewery.latitude && brewery.longitude) {
          setBreweryIds(prevState => [...prevState, brewery.id]);
          const marker = L.marker([brewery.latitude, brewery.longitude]);
          let popContent = `<p><b>${brewery.name}</b></p>`;
          if (brewery.country) popContent += `<hr><p>${brewery.street}<br>${brewery.city}<br>${brewery.state}<br>${brewery.country}<br>${brewery.postal_code}<br></p>`
          if (brewery.website_url) popContent += `<hr><a href=${brewery.website_url}>${brewery.website_url}</a>`;
          if (brewery.phone) popContent += `<br><i>Phone: ${brewery.phone}</i>`;
          marker.addTo(map).bindPopup(popContent);
          // Add to breweryMarkers so that can be used easily by Search Result component
          const breweryMarker = {
            id: brewery.id as string,
            marker: marker
          }
          setBreweryMarkers(breweryMarkers => [...breweryMarkers, breweryMarker]);
          // If first load open pin
          if (firstLoad && index === 0) {
            firstLoad = false;
            marker.openPopup();
          }
        }
      });
    }
  },[props.breweries]);

  useEffect(()=> {
    if (props.clickedBreweryId) {
      breweryMarkers.forEach((breweryMarker)=> {
        if (breweryMarker.id == props.clickedBreweryId) {
          breweryMarker.marker.openPopup();
        }
      });
    }
  },[props.clickedBreweryId]);

  return null
};

export default MapController;