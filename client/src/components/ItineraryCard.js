import React from 'react';

const ItineraryCard = ({ destination, accommodation, activities }) => {
  return (
    <div className="itinerary-card">
      <h3>{destination}</h3>
      <p>Accommodation: {accommodation}</p>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItineraryCard;

