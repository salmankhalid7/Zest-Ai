import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChatBox = ({ documentId }) => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  
  // Create a reference for the scroll area
  const chatEndRef = useRef(null);

  // Automatically scroll to the bottom whenever messages array or typing state changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const askQuestion = async (e) => {
    if (e) e.preventDefault();
    if (!question.trim() || isTyping) return;

    const currentQuestion = question.trim();
    setQuestion("");
    setIsTyping(true);

    try {
      // 1. Pull the token just like your dashboard does
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/chat/ask",
        {
          documentId,
          question: currentQuestion,
        },
        {
          // 2. Add headers configuration block
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      setMessages((prev) => [
        ...prev,
        { q: currentQuestion, a: res.data.answer },
      ]);
    } catch (error) {
      console.error("Chat Error:", error.response?.data || error.message);
      setMessages((prev) => [
        ...prev,
        { 
          q: currentQuestion, 
          a: error.response?.data?.message || "Sorry, I ran into an error processing that request." 
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="mt-6 bg-white border border-green-100 rounded-xl shadow-sm flex flex-col overflow-hidden h-[500px] max-w-2xl mx-auto">
      
      {/* CHAT HEADER */}
      <div className="bg-green-50/50 border-b border-green-100 px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <h3 className="text-sm font-bold text-green-900 tracking-wide">
            Chat with PDF
          </h3>
        </div>
        <span className="text-xs text-green-700 bg-green-100/60 px-2 py-0.5 rounded font-medium">
          AI Engine Active
        </span>
      </div>

      {/* CHAT STREAM AREA */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/30">
        {messages.length === 0 && !isTyping && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              💡
            </div>
            <p className="text-sm font-medium text-gray-700">No questions yet</p>
            <p className="text-xs text-gray-400 max-w-[240px]">
              Ask anything about the document above to extract immediate answers or translations.
            </p>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className="space-y-3 animate-fadeIn">
            {/* USER MESSAGE BUBBLE */}
            <div className="flex justify-end">
              <div className="bg-gray-800 text-white text-sm px-4 py-2 rounded-2xl rounded-tr-none max-w-[85%] shadow-sm">
                {m.q}
              </div>
            </div>

            {/* AI RESPONSE BUBBLE */}
            <div className="flex justify-start">
              <div className="bg-white border border-green-100 text-gray-700 text-sm p-4 rounded-2xl rounded-tl-none max-w-[85%] shadow-sm space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-green-700 mb-0.5">
                  Zest Assistant
                </div>
                <p className="leading-relaxed">{m.a}</p>
              </div>
            </div>
          </div>
        ))}

        {/* LOADING INDICATOR BUBBLE */}
        {isTyping && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-green-50/60 border border-green-100/50 text-gray-500 text-xs px-4 py-2.5 rounded-2xl rounded-tl-none flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-bounce" />
              </div>
              <span className="text-green-800 font-medium">Reading pages...</span>
            </div>
          </div>
        )}

        {/* Dummy div to scroll into view */}
        <div ref={chatEndRef} />
      </div>

      {/* INPUT FORM CONTAINER */}
      <form 
        onSubmit={askQuestion} 
        className="p-4 bg-white border-t border-gray-100 flex items-center gap-2.5"
      >
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={isTyping}
          placeholder={isTyping ? "Waiting for response..." : "Ask a question about this file..."}
          className="flex-1 bg-gray-50 border border-gray-200 focus:border-green-400 focus:bg-white focus:ring-4 focus:ring-green-400/10 rounded-xl px-4 py-2.5 text-sm outline-none transition-all placeholder:text-gray-400 disabled:opacity-60"
        />

        <button 
          type="submit"
          disabled={!question.trim() || isTyping}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-100 text-white disabled:text-gray-400 font-medium px-4 py-2.5 rounded-xl text-sm transition-colors shrink-0 flex items-center justify-center gap-1.5"
        >
          <span>Send</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925a1.5 1.5 0 001.18 1.063l6.507 1.354a.25.25 0 010 .484l-6.507 1.354a1.5 1.5 0 00-1.18 1.062l-1.414 4.926a.75.75 0 00.826.95 24.921 24.921 0 0016.482-7.348.75.75 0 000-1.062 24.92 24.92 0 00-16.482-7.348z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatBox;