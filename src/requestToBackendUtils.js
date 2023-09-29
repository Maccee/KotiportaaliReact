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
      return true;
    } else {
      const errorMsg = await response.text();
      console.error("Failed to login:", errorMsg);
      return errorMsg; // Return the error message
    }
  } catch (error) {
    setLoading(false);
    console.error("Error while logging in:", error);
    return "Unexpected error while logging in.";
  }
}

const registerUser = async ({ username, password }) => {
  try {
    const response = await fetch(
      "https://kopofunction.azurewebsites.net/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reg: 1, // Indicating registration as per your backend logic
          username,
          password,
        }),
      }
    );

    if (response.ok) {
      // Check if the response is JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        return await response.text(); // Return the response as a string if it's not JSON
      }
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    throw error;
  }
};

const fetchMessages = async () => {
  const token = localStorage.getItem("token");

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

export { loginUser, fetchMessages, sendMessage, registerUser };
