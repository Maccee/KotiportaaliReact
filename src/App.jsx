import { useState, useEffect } from "react";

import "./reset.css";
import "./App.css";
import { handleTokenCheck } from "./authUtils";

import Pageheader from "./modules/Pageheader";
import Landingpage from "./modules/Landingpage";
import Loginpage from "./modules/Loginpage";
import MessagesBoard from "./modules/MessageBoard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    handleTokenCheck(setIsAuthenticated);
  }, []);

  return (
    <div className="pageWrapper">
      <div className="headerWrapper">
        <Pageheader
          showLoginPage={() => setShowLogin(true)}
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      </div>

      <div className="content">
        {isAuthenticated ? (
          <MessagesBoard />
        ) : (
          <>
            {showLogin ? (
              <Loginpage setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Landingpage setShowLogin={setShowLogin} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
