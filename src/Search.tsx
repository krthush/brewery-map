import React from 'react';

import './Search.css';
import search from './search.svg';

interface Props {
  breweries: any[];
  onBreweryClicked: (brewery: any) => void;
};

function Search(props: Props) {
  return (
    <div className="search">
      <div className="search-bar">
        <input className="search-input" type="email" name="email" id="email" placeholder="Search Breweries..."/>
        <button className="search-button" type="button"><img src={search} alt="search" className="search-button-icon"/></button>
      </div>
      <div className="search-results">
        {props.breweries && props.breweries.map((brewery) =>
          <button key={brewery.id} className="search-result" type="button" onClick={() => props.onBreweryClicked(brewery)}>{brewery.name}</button>
        )}
      </div>
    </div>
  );
}

export default Search;