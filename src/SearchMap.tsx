import React, { useEffect, useState } from 'react';
import { LatLngExpression } from 'leaflet';

import './SearchMap.css';

import Map from './Map';
import Search from './Search';

import useBreweries from './hooks/useBreweries';

const defaultCenter = [41.289715, -86.627954] as LatLngExpression;
const defaultZoom = 13;

//TODO: types for breweries & brewery

function SearchMap() {

  const [search, setSearch] = useState(undefined as string | undefined);
  const { breweries, isLoading: breweriesLoading } = useBreweries(search);

  const [center, setCenter] = useState(defaultCenter);

  const [clickedBreweryId, setClickedBreweryId] = useState(undefined as string | undefined);

  const breweryClicked = (brewery: any) => {
    if (brewery.latitude && brewery.longitude) {
      setClickedBreweryId(brewery.id);
      setCenter([brewery.latitude, brewery.longitude]);
    } else {
      alert("No lat / long found. Will work on future update.");
    }
  }

  return (
    <div className="search-map">
      <Map breweries={breweries} defaultCenter={defaultCenter} defaultZoom={defaultZoom} center={center} clickedBreweryId={clickedBreweryId}/>
      <Search breweries={breweries} onBreweryClicked={breweryClicked}/>
    </div>
  );

}

export default SearchMap;