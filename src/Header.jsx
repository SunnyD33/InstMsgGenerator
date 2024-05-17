import React from "react";
import PropTypes from "prop-types";
import "./Header.css";

function Header({ selectedProtocol, onProtocolChange }) {
  return (
    <header className="header">
      <h1 className="header-title">Instrument Message Generator</h1>
      <p className="header-subtitle">
        A Tool for Building Messages from Specifications
      </p>
      <div className="header-radio-group">
        <label className="header-radio-label">
          <input
            type="radio"
            value="ASTM"
            checked={selectedProtocol === "ASTM"}
            onChange={onProtocolChange}
            className="header-radio-input"
          />
          ASTM
        </label>
        <label className="header-radio-label">
          <input
            type="radio"
            value="HL7"
            checked={selectedProtocol === "HL7"}
            onChange={onProtocolChange}
            className="header-radio-input"
          />
          HL7
        </label>
      </div>
    </header>
  );
}

Header.propTypes = {
  selectedProtocol: PropTypes.string.isRequired,
  onProtocolChange: PropTypes.func.isRequired,
};

export default Header;
