import React, { useState } from "react";
import Header from "./Header";
import "./App.css"; // Ensure this file is correctly linked to your global styles

function App() {
  const [selectedProtocol, setSelectedProtocol] = useState("ASTM");

  const handleProtocolChange = (event) => {
    setSelectedProtocol(event.target.value);
  };

  return (
    <div id="root">
      <div className="header-container">
        <Header
          selectedProtocol={selectedProtocol}
          onProtocolChange={handleProtocolChange}
        />
      </div>
      <main>
        <p>Selected Protocol: {selectedProtocol}</p>
        {/* Add other components or content here */}
      </main>
    </div>
  );
}

export default App;
