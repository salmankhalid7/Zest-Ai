import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import LearningIllustration from "../assets/images/1.svg";
import LogoMarquee from "../components/LogoMarquee";
import HowItWorks from "../components/HowItWorks";
import TrialModal from "../components/TrialModal";

const Home = () => {
  // Modal state management flags
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialSignUp, setModalInitialSignUp] = useState(true);

  // Smooth scroll handler function
  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Trigger modal wrapper with custom flow flags
  const openAuthModal = (e, targetSignUpMode) => {
    e.preventDefault();
    setModalInitialSignUp(targetSignUpMode);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden relative">
      <Navbar />

      {/* HERO SECTION */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left space-y-6">
            {/* HEADLINE */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Learn Smarter with <br className="hidden sm:block" />
              <span>Zest AI</span>{" "}
              <span className="text-black/60">Instantly</span>
            </h1>

            {/* DESCRIPTION */}
            <p className="text-base sm:text-lg text-black/70 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Zest AI transforms your study materials into{" "}
              <span className="font-semibold text-black">
                structured learning paths, flashcards, and adaptive quizzes
              </span>
              , helping you learn faster with a fully personalized AI system.
            </p>

            {/* RATING */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-black/80">
              <span className="text-yellow-500 tracking-widest">★★★★★</span>
              <span>4.8/5 from 2,300+ learners</span>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              {/* INTERCEPT BUTTON FOR POPUP INJECTION */}
              <button
                onClick={(e) => openAuthModal(e, true)}
                className="px-7 py-3.5 bg-black text-white rounded-lg font-medium hover:opacity-90 transition text-center shadow-sm focus:outline-none"
              >
                Start Free Trial
              </button>

              {/* SMOOTH SCROLL ANCHOR LINK */}
              <a
                href="#how-it-works"
                onClick={(e) => handleScroll(e, "how-it-works")}
                className="px-7 py-3.5 border border-black text-black rounded-lg font-medium hover:bg-black hover:text-white transition text-center"
              >
                How It Works
              </a>
            </div>

            {/* FEATURES TICKS */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 text-sm pt-2">
              {[
                "Learning Analytics",
                "Smart Quizzes",
                "PDF Upload"
              ].map((item) => (
                <span key={item} className="flex items-center gap-2 font-medium text-gray-500">
                  <span className="flex items-center justify-center w-5 h-5 bg-emerald-500 text-white rounded-full text-[10px] font-bold">
                    ✓
                  </span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-xl">
              <img
                src={LearningIllustration}
                alt="Zest AI Learning Platform"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

        </div>
      </section>

      {/* TRUST MARQUEE */}
      <LogoMarquee />

      {/* HOW IT WORKS SECTION WITH ANCHOR ID */}
      <div id="how-it-works" className="scroll-mt-16">
        <HowItWorks />
      </div>

      <Footer />

      {/* UNIFIED MODAL OVERLAY PORTAL */}
      <TrialModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        isSignUpInitial={modalInitialSignUp}
      />
    </div>
  );
};

export default Home;