import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function Pricing() {
  const features = [
    "Unlimited personalized syllabi generation",
    "Deep diagnostic progress tracking",
    "Dynamic concept linking AI engine",
    "Custom module breakdowns & dependencies",
    "Full responsive workspace access",
    "Priority processing speeds"
  ];

  return (
    <div className="min-h-screen bg-white text-black py-16 sm:py-24 flex items-center">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
      <Navbar/>
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-3">
            Simple Pricing
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Free while we optimize.
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto">
            Zest AI is currently in early access. Enjoy premium, unrestricted access to all features at zero cost.
          </p>
        </div>

        {/* PRICING CARD */}
        <div className="max-w-md mx-auto bg-white border border-gray-100 rounded-2xl shadow-xl shadow-black/[0.02] overflow-hidden">
          
          {/* TOP SECTION */}
          <div className="p-8 bg-gray-50/50 border-b border-gray-100/50 text-center relative">
            <span className="absolute top-4 right-4 bg-black text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              Beta Offer
            </span>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Early Access Plan</p>
            <div className="flex items-baseline justify-center gap-1 my-4">
              <span className="text-5xl font-extrabold tracking-tight text-gray-900">$0</span>
              <span className="text-sm font-medium text-gray-400 uppercase tracking-wide">/ forever</span>
            </div>
            <p className="text-xs text-gray-400">No credit card required. Free account activation.</p>
          </div>

          {/* FEATURES & ACTION LIST */}
          <div className="p-8 space-y-6">
            <p className="text-xs font-bold text-gray-900 uppercase tracking-wide">What's included:</p>
            
            <ul className="space-y-4">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-5 h-5 bg-gray-100 text-gray-900 rounded-full shrink-0 mt-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-500 font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CALL TO ACTION ACCELERATOR BUTTON */}
            <button className="w-full bg-black hover:opacity-90 text-white font-bold text-sm py-3.5 rounded-xl transition duration-200 shadow-sm mt-4">
              Get Started for Free
            </button>
          </div>

        </div>

      <Footer/>
      </div>
    </div>
  );
}

export default Pricing;