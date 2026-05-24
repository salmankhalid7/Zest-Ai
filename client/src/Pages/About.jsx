import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  const values = [
    {
      title: "Hyper-Personalized Learning",
      desc: "Zest AI analyzes your unique background, goals, and skill level to generate fully personalized learning paths that naturally adapt to how you process context.",
      icon: (
        <svg
          className="w-5 h-5 text-gray-900"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
        </svg>
      ),
    },
    {
      title: "Accelerated Growth",
      desc: "Focus strictly on the concepts that move the needle. Zest AI strips away unnecessary filler modules, helping you master complex technical domains rapidly.",
      icon: (
        <svg
        className="w-5 h-5 text-gray-900"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
            />
        </svg>
      ),
    },
    {
      title: "Deep Diagnostics",
      desc: "Track your engineering progress in real time with continuous AI insights that accurately pinpoint active knowledge strengths, gaps, and retention levels.",
      icon: (
        <svg
        className="w-5 h-5 text-gray-900"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
  ];
  
  return (
    <div className="min-h-screen bg-white text-black py-16 sm:py-24">
      <Navbar/>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* HERO MASTER GRID - SIDE BY SIDE */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 sm:mb-24">
          {/* LEFT SIDE: HERO INTRO TEXT */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-3">
              Our Mission
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight mb-6">
              We are redefining how the world breaks down complex technical
              ideas.
            </h1>
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
              Zest AI was built to solve a simple problem: traditional learning
              frameworks are rigid, slow, and unoptimized. By combining modern
              cognitive principles with advanced language models, we generate
              dynamic learning pathways that mold themselves to how your brain
              processes context.
            </p>
          </div>

          {/* RIGHT SIDE: MAC CONTROL WINDOW CARD */}
          <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-2xl bg-white border border-gray-100 rounded-2xl shadow-xl shadow-black/[0.03] overflow-hidden select-none">
              {/* MAC CONTROL WINDOW HEADER BAR */}
              <div className="bg-[#1e293b] px-4 py-3.5 flex items-center gap-2 relative">
                {/* Apple Style Window Controls */}
                <div className="flex gap-1.5 z-10">
                  <span className="w-3 h-3 rounded-full bg-[#ef4444] block" />
                  <span className="w-3 h-3 rounded-full bg-[#f59e0b] block" />
                  <span className="w-3 h-3 rounded-full bg-[#10b981] block" />
                </div>
                {/* Title Text centered perfectly across the header */}
                <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-400 pointer-events-none">
                  New Learning Session
                </span>
              </div>

              {/* COMPONENT INTERIOR CONTAINER */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* INPUT BLOCK 1 */}
                <div className="space-y-2.5">
                  <label className="block text-[11px] font-bold text-[#64748b] uppercase tracking-wider">
                    What do you want to learn?
                  </label>
                  <div className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-3.5 text-sm text-[#1e293b] font-medium">
                    Machine Learning & Neural Networks
                  </div>
                </div>

                {/* INPUT BLOCK 2 */}
                <div className="space-y-2.5">
                  <label className="block text-[11px] font-bold text-[#64748b] uppercase tracking-wider">
                    Why are you learning this?
                  </label>
                  <div className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-3.5 text-sm text-[#1e293b] font-medium">
                    Career transition to ML Engineer role
                  </div>
                </div>

                {/* INPUT BLOCK 3 */}
                <div className="space-y-2.5">
                  <label className="block text-[11px] font-bold text-[#64748b] uppercase tracking-wider">
                    What do you already know?
                  </label>
                  <div className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-3.5 text-sm text-[#1e293b] font-medium">
                    Python, basic statistics, linear algebra fundamentals
                  </div>
                </div>

                {/* FOOTER INTERACTION LAYER */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                  {/* Action Trigger Button */}
                  <button className="bg-black hover:opacity-90 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition duration-200">
                    Create My Learning Path
                  </button>

                  {/* Timing Meta Copy Info */}
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium pl-1">
                    <svg
                      className="w-3.5 h-3.5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Takes ~60 seconds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-100 my-12" />

        {/* DRIVES COLUMN VALUES LIST */}
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              What Drives Zest AI
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Our core focus pillars when designing automated educational
              engines.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
            {values.map((value, idx) => (
              <div key={idx} className="space-y-4">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-gray-100 my-16 sm:my-24" />

        {/* PERFORMANCE STATS ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-6 text-center select-none">
          <div>
            <span className="block text-3xl sm:text-4xl font-extrabold text-gray-900">
              2,300+
            </span>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider block mt-1">
              Active Learners
            </span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-extrabold text-gray-900">
              15k+
            </span>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider block mt-1">
              Syllabi Generated
            </span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-extrabold text-gray-900">
              98%
            </span>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider block mt-1">
              Success Rate
            </span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-extrabold text-gray-900">
              60s
            </span>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider block mt-1">
              Avg Setup Speed
            </span>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default About;
