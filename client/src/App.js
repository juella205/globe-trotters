import React, { useState, useEffect } from "react";
import Globe from "react-globe.gl";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import GlobeInterface from "./components/GlobeInterface";
// import Itinerary from "./components/Itinerary";
import ItineraryCard from "./components/ItineraryCard";
import Navbar from "./components/NavBar";
import {
  Heading,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import ItineraryModal from "./components/ItineraryModal";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const { colorMode } = useColorMode();
  const [itineraries, setItineraries] = useState([]);
  
  const handleSaveItinerary = (itineraryData) => {
    setItineraries([...itineraries, itineraryData]);
  };

  return (
    <ApolloProvider client={client}>
    <div className="app">
      <div className="heading-container">
        <Heading
          textAlign="center"
          bg={colorMode === "light" ? "gray.100" : "gray.900"}
        >
          Globe Trotters
        </Heading>
      </div>
      <Navbar onSave={handleSaveItinerary} />
      <div className="content">
        <GlobeInterface />
        {/* isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} ^was in Global Interface */}
        {/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
        <ItineraryModal onSave={handleSaveItinerary} onClose={() => setIsModalOpen(false)}/>
        </ModalContent>
        </Modal> */}
          <ItineraryCard itineraries={itineraries}
          />
        {/* <Itinerary /> */}
      </div>
    </div>
    </ApolloProvider>
  );
}

export default App;
