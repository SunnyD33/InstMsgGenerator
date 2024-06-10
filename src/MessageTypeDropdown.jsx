import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./MessageTypeDropdown.css";
import PropTypes from "prop-types";

function MessageTypeDropdown({ messageType, onMessageTypeChange }) {
  const options = ["Result", "Query"];

  return (
    <div>
      <Dropdown
        className="dropdown"
        options={options}
        value={messageType}
        onChange={onMessageTypeChange}
        placeholder="Select A Message Type"
      />
    </div>
  );
}

MessageTypeDropdown.propTypes = {
  messageType: PropTypes.string.isRequired,
  onMessageTypeChange: PropTypes.func.isRequired,
};

export default MessageTypeDropdown;
