// ItineraryModal.js
import React, { useState } from "react";
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
} from "@chakra-ui/react";

const ItineraryModal = ({ onSave, isOpen, onClose, selectedCity }) => {
  const [activities, setActivities] = useState([]);

  const handleAddActivity = () => {
    setActivities([...activities, { title: "", body: "" }]);
  };

  const handleActivityTitleEdit = (index, e) => {
    const updatedActivities = [...activities];
    updatedActivities[index].title = e.target.value;
    setActivities(updatedActivities);
  };

  const handleActivityBodyEdit = (index, e) => {
    const updatedActivities = [...activities];
    updatedActivities[index].body = e.target.value;
    setActivities(updatedActivities);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itineraryData = {
      city: selectedCity,
      activities,
    };
    onSave(itineraryData);
    setActivities([]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Itinerary</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>{selectedCity}</FormLabel>
              </FormControl>
              {activities.map((activity, index) => (
                <React.Fragment key={index}>
                  <FormControl>
                    <Input
                      value={activity.title}
                      onChange={(e) => handleActivityTitleEdit(index, e)}
                      placeholder="Activity Title"
                    />
                  </FormControl>
                  <FormControl>
                    <Textarea
                      value={activity.body}
                      onChange={(e) => handleActivityBodyEdit(index, e)}
                      placeholder="Activity Body"
                    />
                  </FormControl>
                </React.Fragment>
              ))}
              <Button colorScheme="teal" size="sm" onClick={handleAddActivity}>
                Add Activity
              </Button>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" colorScheme="blue">
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ItineraryModal;
