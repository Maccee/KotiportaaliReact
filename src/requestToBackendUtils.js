async function loginUser({
  username,
  password,
  setLoading,
  setUsername,
  setPassword,
}) {
  try {
    const response = await fetch(
      "https://kopofunction.azurewebsites.net/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );
    setLoading(false);
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      setPassword("");
      setUsername("");
      return true; // Successful login
    } else {
      console.error("Failed to login:", await response.text());
      return false; // Failed login
    }
  } catch (error) {
    setLoading(false);
    console.error("Error while logging in:", error);
    return false; // Failed login
  }
}

const fetchMessages = async () => {
  const token = localStorage.getItem("token"); // Assuming 'token' is the key used in local storage

  // Check if token exists
  if (!token) {
    throw new Error("Token is missing.");
  }

  const response = await fetch(
    "https://kopofunction.azurewebsites.net/api/heippalappu",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }

  const data = await response.json();
  return data.reverse();
};

const sendMessage = async (message, author) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token. Exiting.");
  }

  if (message.trim() === "") {
    throw new Error("Empty message. Exiting.");
  }

  let apiUrl = "https://kopofunction.azurewebsites.net/api/heippalappu";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text: message, author: author }),
  });

  if (!response.ok) {
    throw new Error("Network response not ok");
  }

  return response.text();
};

export { loginUser, fetchMessages, sendMessage };
