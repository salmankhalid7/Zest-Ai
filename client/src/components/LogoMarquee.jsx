import React from "react";

// Your local assets only
import IshaqAcademyLogo from "../assets/logos/Ishaq_academylogo.png";
import IssLogo from "../assets/logos/ISS_Logo.png";
import LguLogo from "../assets/logos/Lahore_Garrison_University.png";

const LogoMarquee = () => {
  const logos = [
    { name: "Ishaq Academy", url: IshaqAcademyLogo },
    { name: "ISS Lahore", url: IssLogo },
    { name: "Lahore Garrison University", url: LguLogo },

    // Safe public logos only (kept minimal + reliable)
    {
      name: "IBM",
      url: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    },
    {
      name: "Microsoft",
      url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    },
    {
      name: "Oxford University",
      url: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Oxford-University-Circlet.svg",
    },
  ];

  return (
    <section className="w-full py-8 sm:py-10 bg-white overflow-hidden">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-5 mb-8 text-center">
        <p className="text-xs sm:text-sm font-semibold tracking-wider text-gray-400 uppercase select-none">
          Trusted by learners and institutions
        </p>
      </div>

      {/* MARQUEE WINDOW */}
      <div className="relative w-full flex overflow-hidden">

        {/* FADE EDGES */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* TRACK CONTAINER - added w-max so it doesn't compress */}
        <div className="flex w-max whitespace-nowrap animate-marquee shrink-0 items-center">

          {/* 
            We map over two identical track blocks. 
            Each block contains the exact single list of logos. 
            This makes the total width exactly 200%, perfect for a flawless 50% loop shift!
          */}
          {[0, 1].map((trackIndex) => (
            <div
              key={trackIndex}
              className="flex gap-10 items-center shrink-0 min-w-full justify-around"
            >
              {logos.map((logo, idx) => (
                <div
                  key={`${trackIndex}-${idx}`}
                  className="flex items-center justify-center h-10 sm:h-12 w-28 sm:w-36 px-2 mx-2"
                >
                  <img
                    src={logo.url}
                    alt={logo.name}
                    title={logo.name}
                    className="max-h-full max-w-full object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-300"
                  />
                </div>
              ))}
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;