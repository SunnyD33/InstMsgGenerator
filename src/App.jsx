import React, { useState } from "react";
import Header from "./Header";
import "./App.css"; // Ensure this file is correctly linked to your global styles
import Fields from "./Fields";
import MessageTypeDropdown from "./MessageTypeDropdown";
import DataEntry from "./DataEntry";

function App() {
  const [selectedProtocol, setSelectedProtocol] = useState("ASTM");
  const [messageType, setMessageType] = useState("");
  const [amountOfFrames, setAmountOfFrames] = useState({});

  const handleProtocolChange = (event) => {
    setSelectedProtocol(event.target.value);
  };

  const handleMessageType = (option) => {
    setMessageType(option.value);
  };

  const handleFrameData = (data) => {
    setAmountOfFrames(data);
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
      </main>
      <div>
        <MessageTypeDropdown
          messageType={messageType}
          onMessageTypeChange={handleMessageType}
        />
      </div>
      <div>
        {messageType ? (
          <Fields
            currentProtocol={selectedProtocol}
            currentMessageType={messageType}
            onFormSubmit={handleFrameData}
          />
        ) : (
          <p>
            Field Options Will Display Once A Message Type Has Been Selected
          </p>
        )}
      </div>
      <div>
        {Object.entries(amountOfFrames).length > 0 && (
          <div>
            <DataEntry
              frameValues={amountOfFrames}
              messageType={messageType}
              protocol={selectedProtocol}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
