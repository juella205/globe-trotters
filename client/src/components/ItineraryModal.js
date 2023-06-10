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
// Importing mutations from the apollo client and create activity from mutations.js
import { useMutation } from 'apollo/client';
import { CREATE_ACTIVITY } from '../utils/mutations';

const ItineraryModal = ({ onSave, isOpen, onClose, selectedCity }) => {
  const [activities, setActivities] = useState([]);
// using hook to define create activity function and its mutation
  const [createActivity] = useMutation(CREATE_ACTIVITY);

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
  // in the function I made it map over the activities array and created a array of activity data objects including the neccessary variables for the createActivity mutation
  const handleSubmit = async (e) => {
    e.preventDefault();

    const activityData = activities.map((activity) => ({
      title: activity.title,
      description: activity.body,
      city: selectedCity,
      username: localStorage.getItem('username')
    }));
    // Using promise.all and await to async and create all the activities, if the creation is successful it then uses onSave which "should" handle the necessary UI updates 
    try {
      await Promise.all(activityData.map((data) => createActivity({ variables: data })));
      onSave();
      // then clear activities array to reset the form
      setActivities([]);
    } catch (error) {
      console.error("Error creating activities", error);
    }
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
