import React from 'react';

import './Search.css';
import search from './search.svg';

interface Props {
  breweries: any[];
  onBreweryClicked: (brewery: any) => void;
  onScrollEnd: () => void;
  loading: boolean
};

function Search(props: Props) {

  const handleScroll = (e: any) => {
    const bottom = Math.abs(e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight)) <= 1;
    if (bottom) {
      props.onScrollEnd();
    }
  }

  const searchClicked = () => {
    alert("Not working ATM. Will be added in future update.");
  }

  return (
    <div className="search">
      <div className="search-bar">
        <input className="search-input" type="email" name="email" id="email" placeholder="Search Breweries..."/>
        <button className="search-button" type="button"><img src={search} alt="search" className="search-button-icon" onClick={searchClicked}/></button>
      </div>
      <div className="search-results" onScroll={(e) => handleScroll(e)}>
        {props.breweries && props.breweries.map((brewery) =>
          <button key={brewery.id} className="search-result" type="button" onClick={() => props.onBreweryClicked(brewery)}>{brewery.name}</button>
        )}
      </div>
      {props.loading &&
        <div className="loading-ring-container">
          <span className="loading-ring"></span>
        </div>
      }
    </div>
  );
}

export default Search;