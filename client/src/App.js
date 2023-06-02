import React, { useState, useEffect } from "react";
import Globe from "react-globe.gl";
import GlobeInterface from "./components/GlobeInterface";
import Itinerary from "./components/Itinerary";
import ItineraryCard from "./components/ItineraryCard";
import Navbar from "./components/NavBar";
import { Heading, useColorMode, Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import ItineraryModal from "./components/ItineraryModal";

function App() {
  const { colorMode } = useColorMode();
  const [itineraries, setItineraries] = useState([]);
  const handleSaveItinerary = (itineraryData) => {
    setItineraries([...itineraries, itineraryData]);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewPlan = () => {
    setIsModalOpen(true);
};

  return (
    <div className="app">
      <div className="heading-container">
        <Heading
          textAlign="center"
          bg={colorMode === "light" ? "gray.100" : "gray.900"}
        >
          Globe Trotters
        </Heading>
      </div>
      <Navbar handleNewPlan={handleNewPlan}/>
      <div className="content">
        <GlobeInterface />
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
        <ItineraryModal onSave={handleSaveItinerary} onClose={() => setIsModalOpen(false)}/>
        </ModalContent>
        </Modal>
        {itineraries.map((itinerary, index) => (
          <ItineraryCard
            key={index}
            destination={itinerary.city}
            accommodation={itinerary.accommodation}
            activities={itinerary.activities}
          />
        ))}
        <Itinerary />
      </div>
    </div>
  );
}

export default App;
