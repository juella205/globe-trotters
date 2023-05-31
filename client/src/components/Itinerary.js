import React, { useState } from 'react';

const Itinerary = () => {
  const [selectedCities, setSelectedCities] = useState([]);

  const handleAddCity = (city) => {
    setSelectedCities([...selectedCities, city]);
  };

  const handleRemoveCity = (city) => {
    const updatedCities = selectedCities.filter((c) => c !== city);
    setSelectedCities(updatedCities);
  };

  return (
    <div className="itinerary">
      <h2>Itinerary</h2>
      {selectedCities.length === 0 ? (
        <p>No cities selected.</p>
      ) : (
        <ul>
          {selectedCities.map((city) => (
            <li key={city.properties.name}>
              {city.properties.name}
              <button onClick={() => handleRemoveCity(city)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Itinerary;
