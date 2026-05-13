import React, { useState } from "react";
import axios from "axios";

const ChatBox = ({ documentId }) => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const askQuestion = async () => {
    const res = await axios.post("http://localhost:5000/api/chat/ask", {
      documentId,
      question,
    });

    setMessages([
      ...messages,
      { q: question, a: res.data.answer },
    ]);

    setQuestion("");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Chat with PDF</h3>

      <div>
        {messages.map((m, i) => (
          <div key={i}>
            <p><b>You:</b> {m.q}</p>
            <p><b>AI:</b> {m.a}</p>
            <hr />
          </div>
        ))}
      </div>

      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask something..."
      />

      <button onClick={askQuestion}>
        Send
      </button>
    </div>
  );
};

export default ChatBox;