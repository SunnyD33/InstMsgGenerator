import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./DataEntry.css";
import MessageEncoder from "./MessageEncoder";
import SaveToFile from "./SaveToFile";

function DataEntry({ frameValues, messageType, protocol }) {
  const [fieldValues, setFieldValues] = useState({});
  const [frameData, setFrameData] = useState([]);
  const fieldRefs = useRef({});

  console.log(frameValues);

  useEffect(() => {
    setFieldValues({});
    setFrameData([]);
    fieldRefs.current = {};
  }, [frameValues]);

  const handleInputChange = (e, key, index) => {
    const value = e.target.value;
    setFieldValues((prevValues) => ({
      ...prevValues,
      [key]: {
        ...prevValues[key],
        [index]: value,
      },
    }));
  };

  const clearFields = () => {
    setFieldValues({});
    fieldRefs.current = {};
    setFrameData([]);
  };

  const generateMessage = () => {
    const messageFrames = Object.keys(frameValues).map((key) => {
      const numberOfFields = parseInt(frameValues[key], 10);
      const fields = Array.from({ length: numberOfFields }, (_, index) => {
        const value = fieldValues[key]?.[index];
        return value === undefined || value === null ? "" : value;
      }).join("|");
      return `${key}|${fields}`;
    });
    console.log(messageFrames);
    setFrameData(messageFrames);
  };

  const encodeMessage = () => {
    const encodedMessage = MessageEncoder.encodeMessageFrames(frameData);
    MessageEncoder.logControlCharacters(encodedMessage);
    console.log(encodedMessage);

    //Switch statement
    if (protocol === "ASTM") {
      if ((messageType = "Result")) {
        SaveToFile.save(encodedMessage, "astmResults.in", "text/plain");
      } else if ((messageType = "Query")) {
        SaveToFile.save(encodedMessage, "astmQuery.in", "text/plain");
      }
    } else {
      alert("HL7 function coming soon");
    }
  };

  return (
    <div className="frames-container">
      <div>
        <p className="frame-separator"></p>
      </div>
      <div className="header-label-div">
        <label className="frames-header-label">Message Frames</label>
      </div>
      <div className="frame-label-div">
        <p className="frames-p-label">Please Enter Data For Each Field</p>
      </div>
      <div className="frames">
        {Object.keys(frameValues).map((key) => {
          const numberOfFields = parseInt(frameValues[key], 10);
          return (
            <div key={key} className="frame">
              <label className="frame-label">{key}</label>
              {[...Array(numberOfFields)].map((_, index) => (
                <input
                  key={index}
                  className="frame-input"
                  type="text"
                  ref={(el) => {
                    fieldRefs.current[`${key}-${index}`] = el;
                  }}
                  value={fieldValues[key]?.[index] || ""}
                  onChange={(e) => handleInputChange(e, key, index)}
                />
              ))}
            </div>
          );
        })}
      </div>
      <div className="generate-button-container">
        <button className="generate-message-button" onClick={generateMessage}>
          Generate Message
        </button>
        <button className="clear-button" onClick={clearFields}>
          Clear
        </button>
        {frameData.length > 0 && (
          <button className="encode-button" onClick={encodeMessage}>
            Encode Message
          </button>
        )}
      </div>
      {frameData.length > 0 && (
        <textarea
          className="message-text-area"
          value={frameData.join("\n")}
          readOnly
        />
      )}
    </div>
  );
}

DataEntry.propTypes = {
  frameValues: PropTypes.object.isRequired,
};

export default DataEntry;
