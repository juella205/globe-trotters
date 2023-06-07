import React, { useState } from 'react';
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

const ItineraryModal = ({ onSave, isOpen, onClose }) => {
  const [city, setCity] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [activities, setActivities] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const itineraryData = {
      city,
      accommodation,
      activities: activities.split('\n'), // Split activities by new line to create a list
    };
    onSave(itineraryData);
    setCity('');
    setAccommodation('');
    setActivities('');
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
                <FormLabel>City</FormLabel>
                <Input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Accommodation</FormLabel>
                <Input
                  type="text"
                  value={accommodation}
                  onChange={(e) => setAccommodation(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Activities (One per line)</FormLabel>
                <Textarea
                  value={activities}
                  onChange={(e) => setActivities(e.target.value)}
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
