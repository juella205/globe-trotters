// import React from "react";
// import {
//   Box,
//   Heading,
//   Text,
//   UnorderedList,
//   ListItem,
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
// } from "@chakra-ui/react";

// const ItineraryCard = ({ itineraries, onEdit }) => {
//   const handleEditClick = (index) => {
//     setEditIndex(index);
//     setEditedActivity(itineraries[index].activities.join(", "));
//   };

//   const handleSaveClick = (index) => {
//     const editedActivities = editedActivity.split(",").map((activity) => activity.trim());
//     const updatedItineraries = [...itineraries];
//     updatedItineraries[index].activities = editedActivities;
//     onEdit(updatedItineraries);
//     setEditIndex(-1);
//   };

//   return (
//     <>
//     {/* New Card Format */}
//       {/* <Card>
//         <CardHeader>Title</CardHeader>
//         <CardBody>Body</CardBody>

//         <CardFooter>Footer</CardFooter>
//       </Card> */}
//       {itineraries.map((itinerary, index) => (
//         <Box
//           key={index}
//           borderWidth="1px"
//           borderRadius="lg"
//           p="4"
//           mb="4"
//           boxShadow="md"
//           bg="gray"
//         >
//           <Heading as="h3" size="md" mb="2">
//             {itinerary.city}
//           </Heading>
//           <Text mb="2">Accommodation: {itinerary.accommodation}</Text>
//           <Text as="p" fontWeight="bold" mb="1">
//             Activities:
//           </Text>
//           <UnorderedList pl="4">
//             {itinerary.activities.map((activity, activityIndex) => (
//               <ListItem key={activityIndex}>{activity}</ListItem>
//             ))}
//           </UnorderedList>
//           <Button onClick={() => handleEdit(index)} colorScheme="blue">
//             Edit
//           </Button>
//         </Box>
//       ))}
//     </>
//   );
// };

// export default ItineraryCard;

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

const ItineraryCard = ({ itineraries, onEdit }) => {
  const [editIndex, setEditIndex] = useState(-1);
  const [editedActivities, setEditedActivities] = useState([]);

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedActivities(itineraries[index].activities);
  };

  const handleActivityEdit = (activityIndex, e) => {
    const updatedActivities = [...editedActivities];
    updatedActivities[activityIndex] = e.target.value;
    setEditedActivities(updatedActivities);
  };

  const handleSaveClick = (index) => {
    const updatedItineraries = [...itineraries];
    updatedItineraries[index].activities = editedActivities;
    onEdit(updatedItineraries);
    setEditIndex(-1);
  };

  return (
    <>
      {itineraries.map((itinerary, index) => (
        <Card key={index} mb="4" boxShadow="lg">
          <CardHeader bg="teal.500" color="white" py="2" px="4" fontSize="xl" fontWeight="bold">
            {itinerary.city}
          </CardHeader>
          <CardBody>
            <Text mb="2">Accommodation: {itinerary.accommodation}</Text>
            {index === editIndex ? (
              <>
                <Text as="p" fontWeight="bold" mb="1">
                  Activities:
                </Text>
                {itinerary.activities.map((activity, activityIndex) => (
                  <Input
                    key={activityIndex}
                    value={editedActivities[activityIndex]}
                    onChange={(e) => handleActivityEdit(activityIndex, e)}
                    mb="2"
                  />
                ))}
                <Button colorScheme="blue" size="sm" onClick={() => handleSaveClick(index)}>
                  Save
                </Button>
              </>
            ) : (
              <>
                <Text as="p" fontWeight="bold" mb="1">
                  Activities:
                </Text>
                <UnorderedList pl="4">
                  {itinerary.activities.map((activity, activityIndex) => (
                    <ListItem key={activityIndex}>{activity}</ListItem>
                  ))}
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

