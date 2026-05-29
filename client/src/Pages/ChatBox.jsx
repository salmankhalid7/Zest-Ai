import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import ZestLogo from "../assets/logos/ZestLogo.svg";

const PaperPlaneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const TypingDots = () => (
  <div className="flex items-center gap-1">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce"
        style={{ animationDelay: `${i * 0.15}s` }}
      />
    ))}
  </div>
);

const ChatBox = ({ documentId }) => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/chat/${documentId}`, {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        });
        if (res.data.history) setMessages(res.data.history);
      } catch (error) {
        console.error("History fetch failure:", error);
      } finally {
        setInitialLoading(false);
      }
    };
    if (documentId) fetchChatHistory();
  }, [documentId, token]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const askQuestion = async (e) => {
    if (e) e.preventDefault();
    if (!question.trim() || isTyping) return;

    const currentQuestion = question.trim();
    setQuestion("");
    setIsTyping(true);
    inputRef.current?.focus();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/chat/ask",
        { documentId, question: currentQuestion },
        { headers: { Authorization: token ? `Bearer ${token}` : "" } }
      );
      setMessages((prev) => [...prev, { q: currentQuestion, a: res.data.answer }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          q: currentQuestion,
          a: error.response?.data?.message || "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askQuestion();
    }
  };

  const suggestions = [
    "Summarize this document",
    "What are the key points?",
    "Explain the main topic",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;450;500;600&display=swap');
        @keyframes chatFadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .chat-msg { animation: chatFadeUp 0.25s ease forwards; }
      `}</style>

      <div className="font-['Geist'] h-full w-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">


        {/* MESSAGES AREA */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-6">
          {initialLoading ? (
            <div className="h-full flex items-center justify-center gap-3 text-gray-500">
              <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              Loading history...
            </div>
          ) : messages.length === 0 && !isTyping ? (
            /* EMPTY STATE */
            <div className="h-full flex flex-col items-center justify-center gap-8 text-center">
              <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center">
                <img src={ZestLogo} alt="Zest Logo" className="w-10 h-10" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  Ask anything about this document
                </p>
                <p className="text-sm text-gray-500 max-w-sm">
                  Get instant answers, summaries, explanations, and more.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setQuestion(s); inputRef.current?.focus(); }}
                    className="bg-white border border-gray-200 hover:border-emerald-200 hover:text-emerald-700 text-gray-600 px-5 py-2.5 rounded-2xl text-sm font-medium transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* MESSAGES */
            <div className="space-y-7">
              {messages.map((m, i) => (
                <div key={i} className="chat-msg">
                  {/* User Message */}
                  <div className="flex justify-end mb-3">
                    <div className="bg-gray-900 text-white px-5 py-3 rounded-3xl rounded-br-md max-w-[80%] text-[15px]">
                      {m.q}
                    </div>
                  </div>

{/* AI Message with Green Theme */}
<div className="flex gap-3">
  <div className="w-8 h-8 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5">
    <img src={ZestLogo} alt="Zest Logo" className="w-5 h-5" />
  </div>
  <div className="bg-[#e6fff2] border border-emerald-100 px-5 py-3 rounded-3xl rounded-bl-md max-w-[80%] text-[15px] leading-relaxed text-emerald-950">
    {m.a}
  </div>
</div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-emerald-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <img src={ZestLogo} alt="Zest Logo" className="w-5 h-5" />
                  </div>
                  <div className="bg-white border border-gray-200 px-5 py-3 rounded-3xl rounded-bl-md">
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* INPUT BAR */}
        <div className="p-5 border-t border-gray-100 bg-white flex-shrink-0">
          <div className="flex gap-2 bg-gray-50 border border-gray-200 rounded-2xl p-2 focus-within:border-emerald-500 transition-colors">
            <input
              ref={inputRef}
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              placeholder={isTyping ? "Generating response..." : "Ask a question about this document..."}
              className="flex-1 bg-transparent px-4 py-3 outline-none text-[15px] placeholder-gray-400"
            />
            <button
              onClick={askQuestion}
              disabled={!question.trim() || isTyping}
              className="w-11 h-11 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white rounded-xl flex items-center justify-center transition-colors"
            >
              <PaperPlaneIcon />
            </button>
          </div>
          <p className="text-center text-[10px] text-gray-400 mt-3">
            AI can make mistakes · Always verify important information
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatBox;