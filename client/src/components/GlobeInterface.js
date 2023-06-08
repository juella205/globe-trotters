import React, { useState, useEffect } from 'react';
import { Box, useBreakpointValue } from '@chakra-ui/react';
import Globe from 'react-globe.gl';
import geodata from '../testData/test.json'
import ItineraryModal from './ItineraryModal';
console.log(geodata);

const GlobeInterface = ({isModalOpen, setIsModalOpen}) => {
  // const [places, setPlaces] = useState([]);

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
    // Handle city selection
    console.log('Selected city:', label.properties.NAME);
    {/* setIsModalOpen(!isModalOpen) */}
    // Modal needs to be passed in to the return statement
    // You also need to pass in the props as well. 
    // onSave={handleSaveItinerary} onClose={() => setIsModalOpen(false)}
    
  };

  const globeWidth = useBreakpointValue({ base: '100%', md: '500px' });

  return (
    <>
    <Box width={globeWidth} mx="auto">
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        labelsData={geodata.features}
        labelLat={(d) => d.properties.LATITUDE}
        labelLng={(d) => d.properties.LONGITUDE}
        labelText={(d) => d.properties.NAME_EN}
        labelSize={0.5}
        labelDotRadius={0.5}
        labelColor={() => 'rgba(255, 165, 0, 0.75)'}
        labelResolution={2}
        onClickLabel={handleCityClick}
        globeZoom={2}
        onLabelClick = {(label, event, { lat, lng, altitude }) => handleCityClick(label, event, { lat, lng, altitude })}
      />
    </Box>
    {/* <ItineraryModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/> */}
    </>
  );
};


export default GlobeInterface;
