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

  // Setup for initial query using SWR (uses cached data)
  const [page, setPage] = useState(undefined as number | undefined);
  const { breweries: loadedBreweries } = useBreweries(page);
  const [breweries, setBreweries] = useState([] as any[]);

  // TODO: setup search input, bubble up from Search component
  const [search, setSearch] = useState(undefined as string | undefined);

  const [center, setCenter] = useState(defaultCenter);
  const [clickedBreweryId, setClickedBreweryId] = useState(undefined as string | undefined);

  // Transfer over loadedBreweries to breweries state containing all breweries
  let breweriesFetched = false;
  const [loading, setLoading] = useState(false);
  useEffect(()=> {
    if (loadedBreweries && !breweriesFetched) {
      console.log(breweriesFetched);
      breweriesFetched = true;
      loadedBreweries.forEach((brewery) => {
        setBreweries(prevState => [...prevState, brewery]);
      });
      setLoading(false);
    }
  },[loadedBreweries]);

  const breweryClicked = (brewery: any) => {
    if (brewery.latitude && brewery.longitude) {
      setClickedBreweryId(brewery.id);
      setCenter([brewery.latitude, brewery.longitude]);
    } else {
      alert("No lat / long found. Will work on future update.");
    }
  }

  const loadMoreBreweries = () => {
    if (!loading) {
      setLoading(true);
      breweriesFetched = false;
      if (page) {
        setPage(page + 1);
      } else {
        setPage(1);
      }
    }
  };

  return (
    <div className="search-map">
      <Map breweries={breweries} defaultCenter={defaultCenter} defaultZoom={defaultZoom} center={center} clickedBreweryId={clickedBreweryId}/>
      <Search breweries={breweries} onBreweryClicked={breweryClicked} onScrollEnd={loadMoreBreweries} loading={loading}/>
    </div>
  );

}

export default SearchMap;