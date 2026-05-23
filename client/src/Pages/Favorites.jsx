import React, { useEffect, useState } from "react";
import axios from "axios";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFavorites(res.data.favorites || []);
    } catch (err) {
      console.error("Error fetching favorites:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-1 space-y-6 animate-fadeIn">
      
      {/* HEADER BLOCK */}
      <div className="flex items-center gap-2.5 border-b border-gray-100 pb-4">
        <span className="text-2xl text-amber-400 drop-shadow-sm">⭐</span>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            Saved Insights
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Your collection of starred Q&amp;A sessions and reference material.
          </p>
        </div>
      </div>

      {/* FEED LOGIC RENDER */}
      {isLoading ? (
        /* SKELETON FEED SPINNING STATE */
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-green-100/40 rounded-xl shadow-sm">
          <div className="w-8 h-8 border-4 border-green-100 border-t-green-600 rounded-full animate-spin mb-3" />
          <p className="text-xs font-medium text-green-800 tracking-wide">Syncing saved metrics...</p>
        </div>
      ) : favorites.length === 0 ? (
        /* EMPTY ARTIFACT CARD GRAPHIC */
        <div className="text-center py-16 bg-white border border-dashed border-gray-200 rounded-2xl p-8 shadow-inner max-w-xl mx-auto space-y-3">
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-xl mx-auto text-amber-400 shadow-sm">
            ⭐
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-gray-700">Your clipboard is empty</p>
            <p className="text-xs text-gray-400 max-w-xs mx-auto">
              Star important answers inside your document chat logs to pin critical flashcards or study metrics here.
            </p>
          </div>
        </div>
      ) : (
        /* ITERATING THE CARD FEED METRICS */
        <div className="grid grid-cols-1 gap-4">
          {favorites.map((f) => (
            <div 
              key={f._id} 
              className="bg-white border border-green-100/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 group flex flex-col gap-3"
            >
              {/* QUESTION SUB-SURFACE BLOCK */}
              <div className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-gray-800 text-white font-bold text-xs flex items-center justify-center mt-0.5 shadow-sm">
                  Q
                </span>
                <p className="text-sm font-semibold text-gray-800 leading-relaxed pt-0.5">
                  {f.question}
                </p>
              </div>

              {/* ANSWER THEMED ENVELOPE CARD */}
              <div className="bg-green-50/40 border border-green-100/40 rounded-lg p-4 flex gap-3 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-green-600 text-white font-bold text-xs flex items-center justify-center mt-0.5 shadow-sm">
                  A
                </span>
                <p className="text-sm text-gray-600 leading-relaxed pt-0.5">
                  {f.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Favorites;