import React, { useState, useEffect } from 'react';
import { Box, useBreakpointValue } from '@chakra-ui/react';
import Globe from 'react-globe.gl';
import geodata from '../testData/test.json'
import ItineraryModal from './ItineraryModal';

const GlobeInterface = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itineraries, setItineraries] = useState([]); // Define the itineraries state here

  // useEffect(() => {
  //   // Load data
  //   fetch('../../public/datasets/ne_110m_populated_places_simple.geojson')
  //     .then((res) => res.json())
  //     .then(({ features }) => {
  //       console.log('Fetched places:', features); // Log the fetched places
  //       setPlaces(features);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching places:', error); // Log any fetch errors
  //     });
  // }, []);

  const handleCityClick = (label, event, { lat, lng, altitude }) => {
    setIsModalOpen(true);
    console.log('Selected city:', label.properties.NAME_EN);

    {/* setIsModalOpen(!isModalOpen) */}
    // Modal needs to be passed in to the return statement
    // You also need to pass in the props as well. 
    // onSave={handleSaveItinerary} onClose={() => setIsModalOpen(false)}
    setSelectedCity(label.properties.NAME_EN)
    localStorage.setItem('selectedCity', label.properties.NAME_EN);
  };

  // const handleNewPlan = () => {
  //   setIsModalOpen(true);
  // } 

  const handleSaveItinerary = (itnData) => {
    console.log('Save itinerary:', itnData);
    const updatedItineraries = [...itineraries, itnData];
    setItineraries(updatedItineraries);
    setIsModalOpen(false);
  };

  const globeWidth = useBreakpointValue({ base: '100%', sm: '400px', md: '500px', lg: '800px', xl: '1000px' });

  return (
    <>
    <Box width="100%" height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        labelsData={geodata.features}
        labelLat={(d) => d.properties.LATITUDE}
        labelLng={(d) => d.properties.LONGITUDE}
        labelText={(d) => d.properties.NAME_EN}
        labelSize={0.3}
        labelDotRadius={0.3}
        labelColor={() => 'rgba(255, 165, 0, 0.75)'}
        labelResolution={2}
        onClickLabel={handleCityClick}
        globeZoom={2}
        onLabelClick = {(label, event, { lat, lng, altitude }) => handleCityClick(label, event, { lat, lng, altitude })}
      />
    </Box>
    <ItineraryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveItinerary} selectedCity={selectedCity}/>
    </>
  );
};


export default GlobeInterface;
