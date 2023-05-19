import React, { useState } from "react";
import "./messagesPage.css";
import axios from "axios";

const MessagesPage = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsDisabled(true);

    const formData = new FormData(event.target);
    const message = formData.get("message");
    const name = formData.get("name");

    const requestData = {
      message,
      name,
    };

    try {
      setStatus("sending");

      const response = await axios.post(
        "http://localhost:3000/addMessage",
        requestData
      );

      if (response.status !== 200) {
        setStatus("failed");
        throw new Error("Failed to add message");
      }

      setStatus("success");
      // Handle success response
      console.log("Message added successfully");
    } catch (error) {
      setStatus("failed");
      // Handle error
      console.error("Error adding message:", error.message);
    }
  };
  return (
    <>
      {/* Input form */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Form fields */}
        <label htmlFor="message">Message</label>
        <input id="message" type="text" name="message" />
        <label htmlFor="name">Name</label>
        <input id="name" type="text" name="name" />
        <button
          type="submit"
          className={isDisabled ? "buttonDisabled" : "button"}
          disabled={isDisabled}
        >
          Post
        </button>
      </form>
      {/* Response status*/}
      {status === "sending" && <p>Sending...</p>}
      {status === "success" && <p>Message sent successfully!</p>}
      {status === "failed" && <p>Failed to send message.</p>}
    </>
  );
};

export default MessagesPage;
