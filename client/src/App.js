import React, { useState, useEffect } from "react";
import Globe from "react-globe.gl";
import GlobeInterface from "./components/GlobeInterface";
import Itinerary from "./components/Itinerary";
import Login from "./components/Login";
import { Heading } from "@chakra-ui/react";

function App() {
  return (
    <div className="app">
      <Heading>Globe Trotters</Heading>
      {/* Add navigation elements */}

      <div className="content">
        <Login />
        <GlobeInterface />
        <Itinerary />
      </div>
    </div>
  );
}

export default App;
