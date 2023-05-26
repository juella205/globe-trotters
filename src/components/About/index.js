import React, { useState } from 'react';
import Globe from 'react-globe';

const About = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  const cities = [
    {
      id: 'new-york',
      city: 'New York',
      color: 'red',
      coordinates: [40.7128, -74.0060],
    },
    {
      id: 'paris',
      city: 'Paris',
      color: 'green',
      coordinates: [48.8566, 2.3522],
    },
    {
      id: 'tokyo',
      city: 'Tokyo',
      color: 'blue',
      coordinates: [35.6895, 139.6917],
    },
    // Add more cities as needed
  ];

  const cityInformation = {
    'New York': {
      description: 'New York is the most populous city in the United States. It is known for its diverse culture, iconic landmarks, and vibrant city life.',
      attractions: ['Statue of Liberty', 'Central Park', 'Times Square'],
      // Add more information as needed
    },
    'Paris': {
      description: 'Paris is the capital and most populous city of France. It is known for its iconic landmarks, such as the Eiffel Tower and Louvre Museum.',
      attractions: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral'],
      // Add more information as needed
    },
    'Tokyo': {
      description: 'Tokyo is the capital and most populous city of Japan. It is a vibrant metropolis known for its cutting-edge technology, rich history, and cultural attractions.',
      attractions: ['Tokyo Skytree', 'Imperial Palace', 'Shinjuku Gyoen National Garden'],
      // Add more information as needed
    },
  };

  return (
    <div>
      <h1>Welcome to the Travel Planner</h1>
      <Globe
        height="400px"
        globeTexture="//unpkg.com/three-globe/example/img/earth-night.jpg"
        markersData={cities.map((city) => ({
          ...city,
          value: 1,
        }))}
        markersTransitionDuration={2000}
        onClickMarker={handleCityClick}
        markerRadius={0.1}
        markerType="dot"
        markerLabel={(city) => city.city}
        markerColor={(city) => city.color}
      />
      {selectedCity && (
        <div>
          <h2>{selectedCity.city}</h2>
          <p>{cityInformation[selectedCity.city].description}</p>
          <h3>Attractions</h3>
          <ul>
            {cityInformation[selectedCity.city].attractions.map((attraction) => (
              <li key={attraction}>{attraction}</li>
            ))}
          </ul>
          {/* Add more city-specific information */}
        </div>
      )}
    </div>
  );
};

export default About;
