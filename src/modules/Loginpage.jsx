import React, { useState } from "react";
import "./css/Loginpage.css";
import { loginUser } from "../requestToBackendUtils";

function Loginpage({ setIsAuthenticated }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const Kirjaudu = async () => {
    if (!username.trim() || !password.trim()) {
      console.error("Username or Password cannot be empty");
      return;
    }
    setLoading(true);

    const isAuthenticated = await loginUser({
      username,
      password,
      setLoading,
      setUsername,
      setPassword,
    });
    setIsAuthenticated(isAuthenticated);
  };

  const Rekisteroidy = () => {
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      console.error("Username or Password cannot be empty");
      return;
    }
    if (password !== confirmPassword) {
      console.error("Passwords do not match!");
      return;
    }
    console.log("REKISTERÖIDYTÄÄN!");
    setLoading(false);
    setPassword("");
    setUsername("");
    setConfirmPassword("");
  };

  const toggleRegister = (e) => {
    setIsRegisterMode(!isRegisterMode);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      isRegisterMode ? Rekisteroidy() : Kirjaudu();
    }
  };

  return (
    <>
      <div className="moduleHeader login-container">
        <h1>Kirjaudu sisään</h1>
        <h2>username: a</h2>
        <h2>password: a</h2>
        <div className="input-group">
          <i className="fas fa-user"></i>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Käyttäjänimi"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="input-group">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Salasana"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {isRegisterMode && (
          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Vahvista Salasana"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        )}

        <div className="button-group">
          {isRegisterMode ? (
            <button type="button" id="backToLoginBtn" onClick={toggleRegister}>
              Takaisin
            </button>
          ) : (
            <button type="button" id="loginBtn" onClick={Kirjaudu}>
              Kirjaudu
            </button>
          )}

          {loading && (
            <span className="spinner">
              <i className="fa-solid fa-spinner fa-spin"></i>
            </span>
          )}

          {isRegisterMode ? (
            <button type="button" id="valmisBtn" onClick={Rekisteroidy}>
              Valmis
            </button>
          ) : (
            <button type="button" id="registerBtn" onClick={toggleRegister}>
              Rekisteröidy
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Loginpage;
