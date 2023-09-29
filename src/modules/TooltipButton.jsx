import React, { useState, useEffect, useRef } from "react";
import "./css/TooltipButton.css";
import { getUsername, handleLogout } from "../authUtils";

const TooltipButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [username, setUsername] = useState(""); // <- Add this state
  const tooltipRef = useRef(null);
  const buttonRef = useRef(null);

  const fetchUsername = () => {
    const name = getUsername();
    if (!name) {
      setTimeout(fetchUsername, 50); // retry after 50ms
    } else {
      setUsername(name);
    }
  };

  useEffect(() => {
    fetchUsername();

    function handleOutsideClick(event) {
      if (!showTooltip || !tooltipRef.current || !buttonRef.current) return;

      if (
        !tooltipRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowTooltip(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showTooltip]);

  return (
    <div className="tooltip-container">
      <button
        ref={buttonRef}
        className="circle-btn"
        onClick={() => setShowTooltip(!showTooltip)}
      >
        {username ? username[0].toUpperCase() : ""}
        {/* Display the first letter of the username */}
      </button>

      <div
        ref={tooltipRef}
        className={`tooltip-window ${showTooltip ? "show" : ""}`}
      >
        <p>{username}</p> {/* Display the entire username */}
        <p></p>
        <hr />
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
    </div>
  );
};

export default TooltipButton;
