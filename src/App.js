import React, { useState, useEffect } from 'react';
import Globe from 'react-globe.gl';
import GlobeInterface from './components/GlobeInterface';
import Itinerary from './components/Itinerary';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Globe Trotters</h1>
        {/* Add navigation elements */}
      </header>
      <div className="content">
        <GlobeInterface />
        <Itinerary />
      </div>
    </div>
  );
}

export default App;
