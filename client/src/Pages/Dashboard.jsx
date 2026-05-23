import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(res.data.stats);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Soft theme loading state matching previous elements
  if (!stats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-9 h-9 border-4 border-green-100 border-t-green-600 rounded-full animate-spin mb-3" />
        <p className="text-sm font-medium text-green-800">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="p-1 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* PAGE HEADER */}
      <div className="flex items-center gap-2.5">
        <span className="text-2xl">📊</span>
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
          Learning Dashboard
        </h2>
      </div>

      {/* METRIC CARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* TOTAL DOCUMENTS */}
        <div className="bg-white border border-green-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-400">Total Documents</h3>
            <span className="w-7 h-7 rounded-lg bg-green-50 text-green-600 flex items-center justify-center text-sm font-bold">📄</span>
          </div>
          <p className="text-3xl font-extrabold text-gray-800 tracking-tight">
            {stats.totalDocuments}
          </p>
        </div>

        {/* TOTAL QUIZZES */}
        <div className="bg-white border border-green-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-400">Quizzes Created</h3>
            <span className="w-7 h-7 rounded-lg bg-green-50 text-green-600 flex items-center justify-center text-sm font-bold">🧠</span>
          </div>
          <p className="text-3xl font-extrabold text-gray-800 tracking-tight">
            {stats.totalQuizzes}
          </p>
        </div>

        {/* TOTAL FLASHCARDS */}
        <div className="bg-white border border-green-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-400">Active Flashcards</h3>
            <span className="w-7 h-7 rounded-lg bg-green-50 text-green-600 flex items-center justify-center text-sm font-bold">🎴</span>
          </div>
          <p className="text-3xl font-extrabold text-gray-800 tracking-tight">
            {stats.totalFlashcards}
          </p>
        </div>

        {/* AVERAGE SCORE */}
        <div className="bg-white border border-green-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-400">Average Score</h3>
            <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-bold">🎯</span>
          </div>
          <div className="flex items-baseline gap-1">
            <p className="text-3xl font-extrabold text-green-700 tracking-tight">
              {stats.avgScore}
            </p>
            <span className="text-sm font-bold text-green-600">%</span>
          </div>
        </div>

      </div>

      {/* ACTIVITY SPLIT SECTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* RECENT DOCUMENTS CARD CONTAINER */}
        <div className="bg-white border border-green-100 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
            <span className="text-base">📌</span>
            <h3 className="text-base font-bold text-gray-800">
              Recent Documents
            </h3>
          </div>
          <div className="divide-y divide-gray-50 max-h-[280px] overflow-y-auto pr-1">
            {stats.recentDocs.length === 0 ? (
              <p className="text-sm text-gray-400 py-4 text-center">No documents analyzed yet.</p>
            ) : (
              stats.recentDocs.map((doc) => (
                <div key={doc._id} className="py-3 px-1 text-sm text-gray-600 hover:text-green-700 transition-colors flex items-center gap-2.5 font-medium truncate">
                  <span className="text-green-500 shrink-0 text-xs">●</span>
                  <span className="truncate">{doc.title}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RECENT QUIZZES CARD CONTAINER */}
        <div className="bg-white border border-green-100 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
            <span className="text-base">🔥</span>
            <h3 className="text-base font-bold text-gray-800">
              Recent Performance
            </h3>
          </div>
          <div className="divide-y divide-gray-50 max-h-[280px] overflow-y-auto pr-1">
            {stats.recentQuizzes.length === 0 ? (
              <p className="text-sm text-gray-400 py-4 text-center">No quizzes attempted yet.</p>
            ) : (
              stats.recentQuizzes.map((q) => {
                const percentage = Math.round((q.score / q.total) * 100);
                return (
                  <div key={q._id} className="py-3 px-1 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2.5 font-medium text-gray-600">
                      <span className="text-gray-300 shrink-0">📊</span>
                      <span>Quiz Session Evaluation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">
                        ({q.score}/{q.total} points)
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-xs font-bold shadow-sm
                        ${percentage >= 70 ? "bg-green-50 text-green-700 border border-green-100/50" : "bg-amber-50 text-amber-700 border border-amber-100/50"}
                      `}>
                        {percentage}%
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;