import React from 'react';
import './App.css';

import SearchMap from './SearchMap';

function App() {
  return (
    <div className="app">
      <main className="main">
        <h1>Welcome to <a href="https://github.com/krthush/brewery-map">Brewery Map!</a></h1>
        <h2>An interactive map for fetching Breweries from the Open Brewery API.</h2>
        <SearchMap/>
      </main>
    </div>
  );
}

export default App;
