import React, { useState } from "react";

const MessagesPage = () => {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      setStatus("sending");

      console.log(formData);

      const response = await fetch("http://localhost:3000/addMessage", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
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
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Form fields */}
        <label htmlFor="message" style={{ width: "200px", marginTop: "10px" }}>
          Message
        </label>
        <input
          id="message"
          type="text"
          name="message"
          style={{ width: "200px" }}
        />
        <label htmlFor="name" style={{ width: "200px", marginTop: "10px" }}>
          Name
        </label>
        <input id="name" type="text" name="name" style={{ width: "200px" }} />
        <button type="submit" style={{ marginTop: "10px" }}>
          Submit
        </button>
      </form>
      {status === "sending" && <p>Sending...</p>}
      {status === "success" && <p>Message sent successfully!</p>}
      {status === "failed" && <p>Failed to send message.</p>}
    </>
  );
};

export default MessagesPage;
