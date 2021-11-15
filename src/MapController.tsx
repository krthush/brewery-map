import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";

import L from "leaflet";

interface Props {
  center: LatLngExpression;
  zoom: number
  breweries: any[];
};

const MapController = (props: Props) => {

  const [breweryIds, setBreweryIds] = useState([] as any[]);

  const map = useMap();

  useEffect(()=> {
    map.setView(props.center, props.zoom);
  },[props.center]);

  useEffect(()=> {
    console.log(props.breweries);
    if (props.breweries) {
      props.breweries.forEach((brewery) => {
        if(!breweryIds.includes(brewery.id) && brewery.latitude && brewery.longitude) {
          breweryIds.push(brewery.id);
          const marker = L.marker([brewery.latitude, brewery.longitude]);
          let popContent = `<p><b>${brewery.name}</b></p>`;
          if (brewery.country) popContent += `<hr><p>${brewery.street}<br>${brewery.city}<br>${brewery.state}<br>${brewery.country}<br>${brewery.postal_code}<br></p>`
          if (brewery.website_url) popContent += `<hr><a href=${brewery.website_url}>${brewery.website_url}</a>`;
          if (brewery.phone) popContent += `<i>${brewery.phone}</i>`;
          marker.addTo(map).bindPopup(popContent);
        }
      });
    }
  },[props.breweries]);

  return null
};

export default MapController;