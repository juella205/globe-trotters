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
// Imported Modal
import ItineraryModal from "./components/ItineraryModal";
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

function App() {
  const { colorMode } = useColorMode();
  const [itineraries, setItineraries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveItinerary = (itineraryData) => {
    setItineraries([...itineraries, itineraryData]);
  };

  const handleEdit = (index) => {
    // Handle edit functionality here
    console.log("Edit itinerary at index:", index);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
          <ItineraryCard itineraries={itineraries} onEdit={handleEdit}/>
        {/* <Itinerary /> */}
      </div>
    </div>
    </ApolloProvider>
  );
}

export default App;
