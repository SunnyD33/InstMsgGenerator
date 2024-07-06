import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "react-dropdown/style.css";
import "./Fields.css";

function Fields({ currentProtocol, currentMessageType, onFormSubmit }) {
  const astmFieldsRes = ["H", "P", "O", "R", "L"];
  const astmFieldsQuery = ["H", "Q", "L"];
  const hl7FieldsRes = ["MSH", "PID", "PV1", "ORC", "OBR", "OBX"];
  const hl7FieldsQuery = ["MSH", "QID"];

  const [inputValues, setInputValues] = useState({});
  const [errorMessages, setErrorMessages] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const inputRefs = useRef({});

  //Reset form when protocol or message type changes.
  //Removes stale references from inputRefs
  useEffect(() => {
    setInputValues({});
    setErrorMessages([]);
    setFieldErrors({});
    inputRefs.current = {};
    setFormSubmitted(false);
    onFormSubmit({});
    console.log(
      "'Protocol' or 'Message Type' change detected. Resetting form...",
    );
  }, [currentProtocol, currentMessageType]);

  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;
    setInputValues({
      ...inputValues,
      [fieldName]: value,
    });
    setFieldErrors({
      ...fieldErrors,
      [fieldName]: false,
    });
  };

  const validateForm = () => {
    const errors = [];
    const newFieldErrors = {};
    Object.entries(inputRefs.current).forEach(([field, inputElement]) => {
      const value = inputElement.value;
      if (value === "") {
        errors.push(`Error: A value for the ${field} record is required.`),
          (newFieldErrors[field] = true);
      }
    });
    setFieldErrors(newFieldErrors);
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (errors.length > 0) {
      setErrorMessages(errors);
    } else {
      setErrorMessages([]);
      setFormSubmitted(true);
      console.log("Form Data:", inputValues);
      console.log("Generating Fields..");
      onFormSubmit(inputValues);
    }
  };

  const clearForm = () => {
    if (
      Object.keys(inputValues).length === 0 &&
      errorMessages.length === 0 &&
      Object.keys(fieldErrors).length === 0
    ) {
      alert("Form Already Clear");
    } else {
      //Remember to clear up state here
      setInputValues({});
      setErrorMessages([]);
      setFieldErrors({});
      inputRefs.current = {};
      setFormSubmitted(false);
      onFormSubmit({});
      console.log("Form Reset.");
    }
  };

  const renderInitialFields = (fields) => {
    return fields.map((field, index) => (
      <div key={index} className="field-group">
        <label className="record-label">{field}</label>
        <input
          className={`record-input ${fieldErrors[field] ? "error" : ""}`}
          type="number"
          ref={(el) => {
            inputRefs.current[field] = el;
          }}
          value={inputValues[field] || ""}
          onChange={(e) => handleInputChange(e, field)}
          min={1}
          max={35}
          minLength={1}
          maxLength={2}
        />
      </div>
    ));
  };

  return (
    <div className="fields-container">
      {!isFormSubmitted && (
        <form onSubmit={handleSubmit}>
          <p>
            Please Enter The Amount Of Fields Needed For Each Record <br />
            Do NOT include the field record in the count <br />
            The field record is automatically included in the output
          </p>
          {currentProtocol === "ASTM" && currentMessageType === "Result"
            ? renderInitialFields(astmFieldsRes)
            : null}
          {currentProtocol === "ASTM" && currentMessageType === "Query"
            ? renderInitialFields(astmFieldsQuery)
            : null}
          {currentProtocol === "HL7" && currentMessageType === "Result"
            ? renderInitialFields(hl7FieldsRes)
            : null}
          {currentProtocol === "HL7" && currentMessageType === "Query"
            ? renderInitialFields(hl7FieldsQuery)
            : null}
          <div className="button-container">
            <button className="submitBtn" type="submit">
              Submit
            </button>
            <button className="reset-button" type="reset" onClick={clearForm}>
              Clear
            </button>
          </div>
          {errorMessages.length > 0 && (
            <div className="error-messages">
              {errorMessages.map((message, index) => (
                <p key={index} className="error">
                  {message}
                </p>
              ))}
            </div>
          )}
        </form>
      )}
      {isFormSubmitted && (
        <form onSubmit={handleSubmit}>
          <p>
            Please Enter The Amount Of Fields Needed For Each Record <br />
            Do NOT include the field record in the count <br />
            The field record is automatically included in the output
          </p>
          {currentProtocol === "ASTM" && currentMessageType === "Result"
            ? renderInitialFields(astmFieldsRes)
            : null}
          {currentProtocol === "ASTM" && currentMessageType === "Query"
            ? renderInitialFields(astmFieldsQuery)
            : null}
          {currentProtocol === "HL7" && currentMessageType === "Result"
            ? renderInitialFields(hl7FieldsRes)
            : null}
          {currentProtocol === "HL7" && currentMessageType === "Query"
            ? renderInitialFields(hl7FieldsQuery)
            : null}
          <div className="button-container">
            <button className="submitBtn" type="submit">
              Submit
            </button>
            <button className="reset-button" type="reset" onClick={clearForm}>
              Clear
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

Fields.propTypes = {
  currentProtocol: PropTypes.string.isRequired,
  currentMessageType: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default Fields;
