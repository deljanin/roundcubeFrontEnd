import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  const [messages, setMessages] = useState([]);

  const getMessages = () => {
    fetch("http://localhost:3000/getMessages")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMessages(data);
      });
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      <h1>Guestbook</h1>
      <p>See what people wrote about us and feel free to leave a message.</p>
      {messages.length > 0 && (
        <ol style={{ marginTop: "15px" }}>
          {messages.map((message) => (
            <li key={message.id}>
              {message.name}: {message.message}
            </li>
          ))}
        </ol>
      )}
      <Link to="/messages">
        <button style={{ marginTop: "15px" }}>Leave a message</button>
      </Link>
    </>
  );
};

export default WelcomePage;
