import React, { useState, useEffect } from "react";
import Globe from "react-globe.gl";
import GlobeInterface from "./components/GlobeInterface";
import Itinerary from "./components/Itinerary";
import Login from "./components/Login";
import Navbar from "./components/NavBar";
import { Heading, useColorMode } from "@chakra-ui/react";


function App() {
  const {colorMode} = useColorMode();
  return (
    <div className="app">
      <div className="heading-container">
      <Heading textAlign="center" bg={colorMode === "light" ? "gray.100" : "gray.900"}>Globe Trotters</Heading>
      </div>
      <Navbar />
      <div className="content">
        <GlobeInterface />
        <Itinerary />
      </div>
    </div>
  );
}

export default App;
