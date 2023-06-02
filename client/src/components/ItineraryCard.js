import React from 'react';
import { Box, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react';

const ItineraryCard = ({ destination, accommodation, activities }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p="4"
      mb="4"
      boxShadow="md"
      bg="gray"
    >
      <Heading as="h3" size="md" mb="2">
        {destination}
      </Heading>
      <Text mb="2">Accommodation: {accommodation}</Text>
      <Text as="p" fontWeight="bold" mb="1">
        Activities:
      </Text>
      <UnorderedList pl="4">
        {activities.map((activity, index) => (
          <ListItem key={index}>{activity}</ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default ItineraryCard;
