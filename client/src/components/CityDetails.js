import React from 'react';

const CityDetails = ({ city }) => {
  return (
    <div className="city-details">
      <h2>{city.properties.name}</h2>
      <p>Population: {city.properties.population}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default CityDetails;
