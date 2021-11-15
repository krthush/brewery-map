import React from 'react';
import './App.css';

import Map from './Map';
import Search from './Search';

function App() {
  return (
    <div className="app">
      <main className="main">
        <h1>Welcome to <a href="https://github.com/krthush/brewery-map">Brewery Map!</a></h1>
        <h2>An interactive map for fetching Breweries from the Open Brewery API.</h2>
        <div className="container">
          <Map></Map>
          <Search></Search>
        </div>
      </main>
    </div>
  );
}

export default App;
