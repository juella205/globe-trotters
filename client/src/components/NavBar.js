import React, { useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon, SettingsIcon } from '@chakra-ui/icons';
import Login from './Login'; // Import the Login component
import ItineraryModal from './ItineraryModal';

const Links = ['Home', 'Itineraries'];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}
  >
    {children}
  </Link>
);

const Navbar = ({onSave}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false); // New state variable to track login form visibility

  const handleLoginFormToggle = () => {
    setIsLoginFormOpen(!isLoginFormOpen); // Toggle the value of isLoginFormOpen
  };
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleNewPlan = () => {
    setIsModalOpen(true);
  }

  const handleSave = (itnData) => {
    onSave(itnData);
  }
    

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Logo</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              leftIcon={<AddIcon />}
              onClick={handleNewPlan}
            >
              New Plan
            </Button>
            <ItineraryModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
             />
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              leftIcon={<SettingsIcon />}
              onClick={handleLoginFormToggle} // Toggle the login form visibility
            >
              Login / Signup
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              ></MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      {isLoginFormOpen && <Login />} {/* Render the Login component based on login form visibility */}
    </>
  );
};

export default Navbar;
