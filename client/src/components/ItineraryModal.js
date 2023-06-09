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
