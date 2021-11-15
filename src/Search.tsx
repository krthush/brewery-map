import React from 'react';

import './Search.css';
import search from './search.svg';

function Search() {
  return (
    <div className="search">
      <div className="search-bar">
        <input className="search-input" type="email" name="email" id="email" placeholder="Search Breweries..."/>
        <button className="search-button" type="button"><img src={search} alt="search" className="search-button-icon"/></button>
      </div>
      <div className="search-results">
        <button className="search-result" type="button">London</button>
        <button className="search-result" type="button">Paris</button>
        <button className="search-result" type="button">Berlin</button>
      </div>
    </div>
  );
}

export default Search;