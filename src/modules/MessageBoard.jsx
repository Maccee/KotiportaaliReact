import React, { useState, useEffect } from "react";
import { fetchMessages, sendMessage } from "../requestToBackendUtils";
import "./css/MessageBoard.css";

const MessagesBoard = () => {
  const [messages, setMessages] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [messageText, setMessageText] = useState(""); // State to store the textarea value
  const [charCount, setCharCount] = useState(0); // State to store character count

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
        const fetchedMessages = await fetchMessages();
        setMessages(fetchedMessages);
        setLoading(false);
    }
    fetchData();
}, []);


  const updateCounter = () => {
    setCharCount(messageText.length);
  };

  
  const deleteInput = () => {
    setMessageText("");
    setCharCount(0);
  };

  const sendAndRefreshMessages = async () => {
    try {
      await sendMessage(messageText);
      const fetchedMessages = await fetchMessages(); 
      setMessages(fetchedMessages);
    } catch (error) {
      setHasError(error);
      console.log("There was a problem:", error.message);
    }

    setMessageText(""); 
    updateCounter();
  };

  if (hasError) {
    return <div>Error occurred while fetching messages.</div>;
  }

  return (
    <div>
      <div className="moduleHeader heippaHeader">
        <h1>Heippalappuseinä</h1>
        <div className="textarea-container">
          <textarea
            id="viesti"
            className="viestiKentta"
            placeholder="Kirjoita viesti"
            value={messageText}
            onChange={(e) => {
              setMessageText(e.target.value);
              updateCounter();
            }}
          ></textarea>
          <span id="counter" className="counter">
            {charCount}/250
          </span>
        </div>

        <section className="heippalappuNapit">
          <button onClick={deleteInput}>Tyhjennä</button>
          <button onClick={sendAndRefreshMessages}>Lähetä</button>
          <span>
            <input type="checkbox" name="" id="" />
            Lisää oma nimi
          </span>
        </section>
      </div>
      
      

      <section id="heippalappuseina" className="heippalappuseina">
      <hr />
      {loading && (
            <span className="spinner">
              <i className="fa-solid fa-spinner fa-spin"></i>
            </span>
          )}
        {hasError}
        {messages.map((message) => (
          <div key={message.id}>
            <p className="seinaPvm">{message.date}</p>
            <p className="seinaViesti">{message.text}</p>
            <hr />
          </div>
        ))}
      </section>
    </div>
  );
};

export default MessagesBoard;