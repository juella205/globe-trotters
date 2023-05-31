import React from 'react';
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
} from '@chakra-ui/react';

const pointsOfInterest = [
  {
    name: 'Boat on River',
    url: 'https://images.unsplash.com/photo-1683964012110-97053d85cdd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80',
  },
  {
    name: 'Asian Architecture',
    url: 'https://images.unsplash.com/photo-1617018681623-987895ca1c99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  },
  {
    name: 'Dubai',
    url: 'https://images.unsplash.com/photo-1528702748617-c64d49f918af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  },
  {
    name: 'Streets of Tokyo',
    url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  },
  {
    name: 'Ski Lift',
    url: 'https://images.unsplash.com/photo-1546706442-373624e9c90b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
];

export default function Login() {
  return (
    <Box position="relative">
      <Container
        as={SimpleGrid}
        maxW="7xl"
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
          >
            Explore new destinations{' '}
            <Text
              as="span"
              bgGradient="linear(to-r, blue.400,blue.600)"
              bgClip="text"
            >
             &
            </Text>{' '}
            activities
          </Heading>
          <Stack direction="row" spacing={4} align="center">
            <AvatarGroup>
              {pointsOfInterest.map((POI) => (
                <Avatar
                  key={POI.name}
                  name={POI.name}
                  src={POI.url}
                  size={{ base: 'md', md: 'lg' }}
                  position="relative"
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: 'full',
                    height: 'full',
                    rounded: 'full',
                    transform: 'scale(1.125)',
                    bgGradient: 'linear(to-bl, blue.400,green.400)',
                    position: 'absolute',
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text
              fontFamily="heading"
              fontSize={{ base: '4xl', md: '6xl' }}
            >
              +
            </Text>
            <Flex
              align="center"
              justify="center"
              fontFamily="heading"
              fontSize={{ base: 'sm', md: 'lg' }}
              bg="gray.800"
              color="white"
              rounded="full"
              minW={{ base: '44px', md: '60px' }}
              minH={{ base: '44px', md: '60px' }}
              position="relative"
              _before={{
                content: '""',
                width: 'full',
                height: 'full',
                rounded: 'full',
                transform: 'scale(1.125)',
                bgGradient: 'linear(to-bl, blue.400,yellow.500)',
                position: 'absolute',
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg="gray.50"
          rounded="xl"
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}
        >
          <Stack spacing={4}>
            <Heading
              color="gray.800"
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
            >
              Start tracking now!
              <Text
                as="span"
                bgGradient="linear(to-r, blue.400,green.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color="gray.500" fontSize={{ base: 'sm', sm: 'md' }}>
              Globe Trotter's Guide was created to provide users with an interactive and simple way to plan for vacations. This planner helps busy vacationers get the most out of their time.
            </Text>
          </Stack>
          <Box as="form" mt={10}>
            <Stack spacing={4}>
              <Input
                placeholder="username@email.com"
                bg="gray.100"
                border={0}
                color="gray.500"
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Input
                placeholder="password"
                bg="gray.100"
                border={0}
                color="gray.500"
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Button
                fontFamily="heading"
                bg="gray.200"
                color="gray.800"
              >
                Sign Up
              </Button>
            </Stack>
            <Button
              fontFamily="heading"
              mt={8}
              w="full"
              bgGradient="linear(to-r, blue.400,green.200)"
              color="white"
              _hover={{
                bgGradient: 'linear(to-r, blue.400,yellow.300)',
                boxShadow: 'xl',
              }}
            >
              Login
            </Button>
          </Box>
        </Stack>
      </Container>
      <Blur />
    </Box>
  );
}

function Blur() {
  return (
    <svg
      width="100%"
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'blur(70px)' }}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="92.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#4299E1" />
    </svg>
  );
}
