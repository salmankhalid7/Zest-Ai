import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Flashcards = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [flashcardSet, setFlashcardSet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // UI states for interactive card navigation
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchFlashcards = async () => {
    try {
      if (!id || id === "undefined") {
        setError("No document ID provided in the URL routing path.");
        setLoading(false);
        return;
      }

      setLoading(true);

      // ✅ TOKEN GUARD: Check if user is logged in before firing the API request
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to view or generate flashcards.");
        setLoading(false);
        return;
      }

      // ✅ FIXED: Token is attached, and an empty body object {} is passed as the second argument
      const res = await axios.post(
        `http://localhost:5000/api/flashcards/${id}`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFlashcardSet(res.data.flashcards);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
      setError(err.response?.data?.message || "Flashcard generation failed.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlashcards();
  }, [id]);

  // Handle saving favorite card to your database collection
  const handleSaveFavorite = async (card) => {
    if (isSaving) return;
    try {
      setIsSaving(true);
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in to save favorites.");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/favorites",
        {
          type: "flashcard",
          question: card.question,
          answer: card.answer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("⭐ Flashcard added to favorites!");
    } catch (err) {
      console.error("Failed to save favorite:", err.message);
      alert("Could not save card. Make sure you are authenticated.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
        <h3 className="text-xl text-green-800">⏳ Generating flashcards with Groq AI...</h3>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md shadow-sm">
        <h3 className="text-xl text-red-600 font-semibold mb-2">Error Encountered</h3>
        <p className="text-red-700">{error}</p>
        <button 
          onClick={() => navigate("/dashboard")}
          className="mt-4 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );

  const cards = flashcardSet?.cards || [];
  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md text-center shadow-sm">
          <h3 className="text-xl text-yellow-700 font-medium mb-4">No flashcards found for this document.</h3>
          <button 
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-md hover:bg-yellow-700 transition"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8 px-4">
      {/* Top Header Row */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center">
        <button 
          onClick={() => navigate("/dashboard")} 
          className="px-4 py-2 bg-white text-green-700 rounded-lg border border-green-200 hover:bg-green-50 hover:border-green-300 transition-all duration-200 font-medium flex items-center gap-2 shadow-sm"
        >
          <span>←</span> Back to Dashboard
        </button>
        <span className="text-green-800 font-medium bg-white px-4 py-2 rounded-lg shadow-sm border border-green-100">
          Card {currentIndex + 1} of {cards.length}
        </span>
      </div>

      {/* Card Wrapper with Interactive Action Buttons */}
      <div className="max-w-3xl mx-auto">
        <div className="relative" style={{ perspective: "1000px" }}>
          <div 
            className="w-full cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Flipping card container */}
            <div 
              className="relative transition-all duration-500 ease-in-out"
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* FRONT: QUESTION */}
              <div 
                className="w-full bg-white rounded-2xl shadow-xl p-8 backface-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    QUESTION
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleSaveFavorite(currentCard);
                    }}
                    disabled={isSaving}
                    className="px-3 py-1 text-green-700 border border-green-300 rounded-lg hover:bg-green-50 transition-all duration-200 text-sm font-medium flex items-center gap-1 disabled:opacity-50"
                  >
                    <span>⭐</span> Save to Collection
                  </button>
                </div>
                <p className="text-gray-800 text-xl leading-relaxed mb-6 min-h-[200px]">
                  {currentCard.question}
                </p>
                <span className="text-sm text-green-500 block text-center">
                  Click card to flip and reveal answer
                </span>
              </div>

              {/* BACK: ANSWER */}
              <div 
                className="w-full bg-gradient-to-br from-green-700 to-green-800 rounded-2xl shadow-xl p-8 absolute top-0 left-0 backface-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="inline-block px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">
                    ANSWER
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveFavorite(currentCard);
                    }}
                    disabled={isSaving}
                    className="px-3 py-1 text-green-200 border border-green-500 rounded-lg hover:bg-green-600 transition-all duration-200 text-sm font-medium flex items-center gap-1 disabled:opacity-50"
                  >
                    <span>⭐</span> Save to Collection
                  </button>
                </div>
                <p className="text-white text-xl leading-relaxed mb-6 min-h-[200px]">
                  {currentCard.answer}
                </p>
                <span className="text-sm text-green-300 block text-center">
                  Click card to flip back
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center gap-4 mt-8">
          <button 
            onClick={handlePrev} 
            className="px-6 py-2 bg-white text-green-700 rounded-lg border border-green-200 hover:bg-green-50 transition-all duration-200 font-medium shadow-sm"
          >
            ◀ Previous
          </button>
          <button 
            onClick={handleNext} 
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
          >
            Next ▶
          </button>
        </div>
      </div>

      {/* Add custom CSS for backface visibility */}
      <style jsx>{`
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default Flashcards;