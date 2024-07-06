import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./DataEntry.css";
import MessageEncoder from "./MessageEncoder";
import SaveToFile from "./SaveToFile";

function DataEntry({ frameValues, messageType, protocol }) {
  const [fieldValues, setFieldValues] = useState({});
  const [frameData, setFrameData] = useState([]);
  const fieldRefs = useRef({});

  useEffect(() => {
    setFrameData([]);
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

  const anyFrameExceedsLimit = () => {
    return Object.keys(frameValues).some(
      (key) => parseInt(frameValues[key], 10) > 16,
    );
  };

  const generateMessage = () => {
    const messageFrames = Object.keys(frameValues).map((key) => {
      const numberOfFields = parseInt(frameValues[key], 10);
      const fields = Array.from({ length: numberOfFields }, (_, i) => {
        const value = fieldValues[key]?.[i];
        return value === undefined || value === null ? "" : value;
      }).join("|");
      return `${key}|${fields}`;
    });
    console.log(messageFrames);
    setFrameData(messageFrames);
  };

  const encodeMessage = async () => {
    const messageFrames = Object.keys(frameValues).map((key) => {
      const numberOfFields = parseInt(frameValues[key], 10);
      const fields = Array.from({ length: numberOfFields }, (_, i) => {
        const value = fieldValues[key]?.[i];
        return value === undefined || value === null ? "" : value;
      }).join("|");
      return `${key}|${fields}`;
    });
    const encodedMessage = MessageEncoder.encodeMessageFrames(messageFrames);
    MessageEncoder.logControlCharacters(encodedMessage);
    if (frameData.length !== 0) {
      if (messageType === "Result" && protocol === "ASTM") {
        await SaveToFile.save(encodedMessage, "astmResult.in", "text/plain");
      } else if (messageType === "Query" && protocol === "ASTM") {
        await SaveToFile.save(encodedMessage, "astmQuery.in", "text/plain");
      } else {
        alert("HL7 functionality coming soon!");
      }
    } else {
      alert("A message has to be generated first before it can be encoded!");
    }
  };

  return (
    <div
      className={`frames-container ${anyFrameExceedsLimit() ? "shift-left" : ""}`}
    >
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
                <div key={index} className="frame-field">
                  <label className="field-label">{index + 1}</label>
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
                </div>
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
        <button className="encode-button" onClick={encodeMessage}>
          Encode Message
        </button>
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
