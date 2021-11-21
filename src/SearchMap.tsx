import { useEffect, useState } from 'react';
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
  const [city, setCity] = useState(undefined as string | undefined);
  const { breweries: loadedBreweries, isLoading: breweriesLoading } = useBreweries(page, city);
  const [breweries, setBreweries] = useState([] as any[]);
  const [breweryIds, setBreweryIds] = useState([] as number[]);

  // TODO: setup search input, bubble up from Search component
  const [search, setSearch] = useState(undefined as string | undefined);

  const [center, setCenter] = useState(defaultCenter);
  const [clickedBreweryId, setClickedBreweryId] = useState(undefined as string | undefined);

  // Transfer over loadedBreweries to breweries state containing all breweries
  const [loading, setLoading] = useState(false);
  useEffect(()=> {
    if (loadedBreweries) {
      loadedBreweries.forEach((brewery) => {
        if(!breweryIds.includes(brewery.id)) {
          setBreweryIds(prevState => [...prevState, brewery.id]);
          setBreweries(prevState => [...prevState, brewery]);
        }
      });
      setLoading(false);
    }
    console.log(breweries);
  },[loadedBreweries]);
  useEffect(()=> {
    if (breweriesLoading) {
      setLoading(true);
    }
  },[breweriesLoading]);


  const breweryClicked = (brewery: any) => {
    if (brewery.latitude && brewery.longitude) {
      setClickedBreweryId(brewery.id);
      setCenter([brewery.latitude, brewery.longitude]);
    } else {
      alert("No lat / long found. Will work on future update.");
    }
  }

  const scrollLoadBreweries = () => {
    setCity(undefined);
    if (!loading) {
      setLoading(true);
      if (page) {
        setPage(page + 1);
      } else {
        setPage(1);
      }
    }
  };

  const zoomLoadBreweries = (bounds: L.LatLngBounds) => {
    breweries.forEach((brewery) => {
      if (brewery.latitude && brewery.longitude) {
        if ((bounds.getWest() < brewery.longitude && brewery.longitude < bounds.getEast()) && (bounds.getSouth() < brewery.latitude && brewery.latitude < bounds.getNorth())) {
          if (brewery.city) setCity(brewery.city);
        }
      }
    });
  }

  return (
    <div className="search-map">
      <Map breweries={breweries} defaultCenter={defaultCenter} defaultZoom={defaultZoom} center={center} clickedBreweryId={clickedBreweryId} zoomOut={zoomLoadBreweries}/>
      <Search breweries={breweries} onBreweryClicked={breweryClicked} onScrollEnd={scrollLoadBreweries} loading={loading}/>
    </div>
  );

}

export default SearchMap;