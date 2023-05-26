import React, { useState } from 'react';
import Globe from 'react-globe.gl';

const About = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  const cities = [
    {
      name: 'New York',
      coordinates: [40.7128, -74.0060],
    },
    {
      name: 'Paris',
      coordinates: [48.8566, 2.3522],
    },
    {
      name: 'Tokyo',
      coordinates: [35.6895, 139.6917],
    },
    // Add more cities as needed
  ];

  const cityInformation = {
    Paris: {
      description: 'Paris is the capital and most populous city of France. It is known for its iconic landmarks, such as the Eiffel Tower and Louvre Museum.',
      attractions: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral'],
      // Add more information as needed
    },
  };

  return (
    <div>
      <h1>Welcome to the Travel Planner</h1>
      <Globe
        height={400}
        width={600}
        onCityClick={handleCityClick}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        cityLabel={(city) => city.name}
        cityLabelSize={0.5}
        cityLabelColor={() => 'white'}
        citiesData={cities}
      />
      {selectedCity && (
        <div>
          <h2>{selectedCity.name}</h2>
          <p>{cityInformation[selectedCity.name].description}</p>
          <h3>Attractions</h3>
          <ul>
            {cityInformation[selectedCity.name].attractions.map((attraction) => (
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
