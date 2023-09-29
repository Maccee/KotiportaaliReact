import React, { useState } from "react";
import "./css/Loginpage.css";
import { loginUser, registerUser } from "../requestToBackendUtils";

function Loginpage({ setIsAuthenticated }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const Kirjaudu = async () => {
    if (!username.trim() || !password.trim()) {
      setErrorMessage("Täytä kaikki kentät!");
      return;
    }
    setLoading(true);

    const result = await loginUser({
      username,
      password,
      setLoading,
      setUsername,
      setPassword,
    });

    if (typeof result === "boolean" && result) {
      setIsAuthenticated(true);
      setErrorMessage(""); // Clear any previous error messages
    } else {
      setIsAuthenticated(false);
      setErrorMessage(result); // Set the returned error message
    }
  };

  const Rekisteroidy = async () => {
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      setErrorMessage("Täytä kaikki kentät!");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Salasanat eivät täsmää!");
      return;
    }
    if (password === confirmPassword) {
      setErrorMessage("");
    }

    try {
      setLoading(true);
      const responseMessage = await registerUser({ username, password });
      setErrorMessage(responseMessage); // Set the response as a message
      setLoading(false);
      setPassword("");
      setUsername("");
      setConfirmPassword("");
      toggleRegister();
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
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
            onChange={(e) => {
              setUsername(e.target.value);
              setErrorMessage("");
            }}
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
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage("");
            }}
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
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrorMessage("");
              }}
              onKeyDown={handleKeyDown}
            />
          </div>
        )}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <p></p>
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
