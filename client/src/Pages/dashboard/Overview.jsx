import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  FileText,
  BrainCircuit,
  Layers,
  Target,
  Activity,
  Clock,
  CircleDot,
} from "lucide-react";

const Overview = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Session token not found.");
        return;
      }

      const res = await axios.get(
        "http://localhost:5000/api/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data.stats);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load workspace statistics."
      );
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <p className="text-red-600 font-bold text-sm uppercase mb-2">
          Workspace Error
        </p>

        <p className="text-gray-500 text-xs font-semibold">
          {error}
        </p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="w-8 h-8 border-[3px] border-gray-200 border-t-black rounded-full animate-spin mb-4" />

        <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
          Loading Workspace...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn">
      
      {/* HEADER */}
      <div className="flex items-center gap-3 border-b-2 border-gray-300 pb-4">
        <Activity
          size={20}
          className="text-blue-600 animate-pulse shrink-0"
        />

        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900">
          Learning Workspace Overview
        </h2>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        <div className="bg-white border-2 border-gray-300 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold tracking-wide text-gray-500 uppercase">
              Total Documents
            </h3>

            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border-2 border-blue-200">
              <FileText size={16} />
            </div>
          </div>

          <p className="text-3xl font-black text-gray-900">
            {stats.totalDocuments}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Overview;