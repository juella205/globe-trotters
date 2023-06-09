import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Textarea,
} from '@chakra-ui/react';

import { useQuery, useMutation } from '@apollo/client';
import { ADD_CITY, CREATE_ACTIVITY } from '../utils/mutations';
// import {} from '../utils/queries';
import auth from '../utils/auth';

const username = localStorage.getItem('username')

const ItineraryModal = ({ onSave, isOpen, onClose, selectedCity }, props) => {
  // const [city, setCity] = useState('');
  const [activityTitle, setActivityTitle] = useState('');
  const [activityDescription, setActivityDescription] = useState('');

  const [addCityMutation] = useMutation(ADD_CITY);
  const [createActivityMutation] = useMutation(CREATE_ACTIVITY);
  // making it a async function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const itineraryData = {
      activityTitle,
      activityDescription,
      selectedCity,
      username
    };
      // checking if the city exists
    try {
      const { data } = await client.query({
        query: GET_CITY_QUERY,
        variables: { cityName: selectedCity }
      });

      let city;
      // checks If it already exists, then creates the city if it doesnt exist
      if(data.city) {
        city = data.city;
      } else {
        const { data: { addCity } } = await addCityMutation({
          variables: { cityName: selectedCity, username }
        });
        city = addCity;
      }

      // Create the activity using the city ID 
      await createActivityMutation({
        variables: {
          title: itineraryData.activityTitle,
          description: itineraryData.activityDescription,
          cityId: city._id,
          username: itineraryData,username
        }
      });
      // checking to see if it works
      console.log("Activity created successfully!");
    } catch (error) {
      console.error("Error creating activity", error);
    }
      

    



    // onSave((itineraryData) => {
      // we need to check if the city exists
      // if city does not exist, create the city first
      // we need to pass itineraryData as a variable to create activity
    // });
    setActivityTitle('');
    setActivityDescription('');
  };

  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Itinerary</ModalHeader>
        <ModalCloseButton />
        <form>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>{selectedCity}</FormLabel>
                {/* <Input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                /> */}
              </FormControl>
              <FormControl>
                <FormLabel>Activity Title</FormLabel>
                <Input
                  type="text"
                  value={accommodation}
                  onChange={(e) => setActivityTitle(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Activity Description</FormLabel>
                <Textarea
                  value={activities}
                  onChange={(e) => setActivityDescription(e.target.value)}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" colorScheme="blue" onClick={handleSubmit}>
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ItineraryModal;