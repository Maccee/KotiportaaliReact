import React from "react";
import "./css/Pageheader.css";
import logo from "../assets/logoportaali.svg";
import TooltipButton from "./TooltipButton";

function PageHeader({ showLoginPage, isAuthenticated, setIsAuthenticated }) {
  return (
    <>
      <div className="pageHeader">
        <div className="logojalogin">
          <img onClick={() => window.location.reload()} src={logo} alt="KotiPortaali -logo" />
          <span style={{ display: isAuthenticated ? "none" : "block" }}>
            <a onClick={showLoginPage}>
              <i className="fa-solid fa-right-to-bracket"></i>
            </a>
          </span>
          <span
            className="tooltipButton"
            style={{ display: isAuthenticated ? "block" : "none" }}
          >
            <TooltipButton setIsAuthenticated={setIsAuthenticated} />
          </span>
        </div>
      </div>
    </>
  );
}

export default PageHeader;
