import React, { useState, useEffect } from 'react';
import Globe from 'react-globe.gl';

const GlobeInterface = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // Load data
    fetch('/datasets/ne_110m_populated_places_simple.geojson')
      .then(res => res.json())
      .then(({ features }) => setPlaces(features));
  }, []);

  const handleCityClick = (city) => {
    // Handle city selection
    console.log('Selected city:', city);
  };

  return (
    <div className="globe-interface">
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        labelsData={places}
        labelLat={(d) => d.properties.latitude}
        labelLng={(d) => d.properties.longitude}
        labelText={(d) => d.properties.name}
        labelSize={(d) => Math.sqrt(d.properties.pop_max) * 4e-4}
        labelDotRadius={(d) => Math.sqrt(d.properties.pop_max) * 4e-4}
        labelColor={() => 'rgba(255, 165, 0, 0.75)'}
        labelResolution={2}
        onClickLabel={handleCityClick}
      />
    </div>
  );
};

export default GlobeInterface;
