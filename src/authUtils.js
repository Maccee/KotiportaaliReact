export const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};

export const handleTokenCheck = async (setIsAuthenticated) => {
  const token = localStorage.getItem("token");
  if (!token) {
    setIsAuthenticated(false);
    return;
  }
  const decodedPayload = decodeJWT(token);
  if (!decodedPayload) {
    console.error("Failed to decode the token.");
    setIsAuthenticated(false);
    return;
  }
  const now = Date.now();
  const tokenExpirationTimeMs = decodedPayload.exp * 1000;
  if (now >= tokenExpirationTimeMs) {
    console.log("Token has expired.");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    return;
  }
  const isValid = await validateToken();
  if (isValid) {
    setIsAuthenticated(true);
  } else {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  }
};

export const getUsername = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }

  const decodedPayload = decodeJWT(token);
  return decodedPayload.username;
};

export const validateToken = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      "https://kopofunction.azurewebsites.net/api/verifyToken",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data.valid;
    } else {
      console.error("Failed to validate token:", await response.text());
      return false;
    }
  } catch (error) {
    console.error("Error while validating token:", error);
    return false;
  }
};

const decodeJWT = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));
    return payload;
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};
