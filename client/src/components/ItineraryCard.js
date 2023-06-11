import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
} from "@chakra-ui/react";

import { useQuery } from '@apollo/client';
import { QUERY_ACTIVITIES } from "../utils/queries";

const ItineraryCard = ({ onEdit }) => {
  const [editIndex, setEditIndex] = useState(-1);
  const [editedActivities, setEditedActivities] = useState([]);
  const username = localStorage.getItem('username');
  const {loading, data:itineraries} = useQuery(QUERY_ACTIVITIES, {
    variables: { username, city:localStorage.getItem("selectedCity") },
  });
  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedActivities([...itineraries[index].activities]);
  };

  const handleActivityTitleEdit = (activityIndex, e) => {
    const updatedActivities = [...editedActivities];
    updatedActivities[activityIndex].title = e.target.value;
    setEditedActivities(updatedActivities);
  };

  const handleActivityBodyEdit = (activityIndex, e) => {
    const updatedActivities = [...editedActivities];
    updatedActivities[activityIndex].body = e.target.value;
    setEditedActivities(updatedActivities);
  };

  const handleSaveClick = (index) => {
    const updatedItineraries = [...itineraries];
    updatedItineraries[index].activities = editedActivities;
    onEdit(updatedItineraries);
    setEditIndex(-1);
  };

  const handleAddActivity = () => {
    setEditedActivities([...editedActivities, { title: "", body: "" }]);
  };

  return (
    <>
      {itineraries.activities?.length>0 && !loading &&itineraries?.activities.map((itinerary, index) => (
        <Card key={index} mb="4" boxShadow="lg">
          <CardHeader bg="teal.500" color="white" py="2" px="4" fontSize="xl" fontWeight="bold">
            {itinerary.city}
          </CardHeader>
          <CardBody>
            {index === editIndex ? (
              <>
                {editedActivities.map((activity, activityIndex) => (
                  <Box key={activityIndex} mb="4">
                    <Input
                      value={activity.title}
                      onChange={(e) => handleActivityTitleEdit(activityIndex, e)}
                      placeholder="Activity Title"
                      mb="2"
                    />
                    <Input
                      value={activity.body}
                      onChange={(e) => handleActivityBodyEdit(activityIndex, e)}
                      placeholder="Activity Body"
                      mb="2"
                    />
                  </Box>
                ))}
                <Button colorScheme="blue" size="sm" onClick={() => handleSaveClick(index)}>
                  Save
                </Button>
                <Button colorScheme="green" size="sm" mt="2" onClick={handleAddActivity}>
                  Add Activity
                </Button>
              </>
            ) : (
              <>
                <Text as="p" fontWeight="bold" mb="1">
                  Activities:
                </Text>
                <UnorderedList pl="4">
                    <ListItem key={itinerary._id}>
                      <Text fontWeight="bold">{itinerary.title}</Text>
                      <Text>{itinerary.description}</Text>
                    </ListItem>
                </UnorderedList>
                <Button colorScheme="teal" size="sm" mt="2" onClick={() => handleEditClick(index)}>
                  Edit
                </Button>
              </>
            )}
          </CardBody>
        </Card>
      ))}
    </>
  );
};

export default ItineraryCard;
