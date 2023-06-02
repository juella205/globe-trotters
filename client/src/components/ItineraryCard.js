import React from 'react';
import { Box, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react';

const ItineraryCard = ({ itineraries }) => {
  return (
    <>
      {itineraries.map((itinerary, index) => (
        <Box
          key={index}
          borderWidth="1px"
          borderRadius="lg"
          p="4"
          mb="4"
          boxShadow="md"
          bg="gray"
        >
          <Heading as="h3" size="md" mb="2">
            {itinerary.destination}
          </Heading>
          <Text mb="2">Accommodation: {itinerary.accommodation}</Text>
          <Text as="p" fontWeight="bold" mb="1">
            Activities:
          </Text>
          <UnorderedList pl="4">
            {itinerary.activities.map((activity, activityIndex) => (
              <ListItem key={activityIndex}>{activity}</ListItem>
            ))}
          </UnorderedList>
        </Box>
      ))}
    </>
  );
};

export default ItineraryCard;
