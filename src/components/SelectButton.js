import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <Button
      variant={selected ? "warning" : "outline-warning"} // Use Bootstrap variant classes
      className="selectbutton" // Custom class name for additional styling
      onClick={onClick}
      style={{
        border: "1px solid gold",
        borderRadius: 5,
        padding: "10px 20px",
        fontFamily: "Montserrat",
        cursor: "pointer",
        fontWeight: selected ? 700 : 500,
      }}
    >
      {children}
    </Button>
  );
};

SelectButton.propTypes = {
  children: PropTypes.node.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default SelectButton;
