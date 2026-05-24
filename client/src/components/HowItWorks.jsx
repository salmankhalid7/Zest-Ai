import React from "react";

// Importing your requested SVGs to replace the mockups
import LearnIllustration from "../assets/images/3.svg";       // Step 1 Vector
import SyllabusIllustration from "../assets/images/6.svg";    // Step 2 Vector
import AssistantIllustration from "../assets/images/7.svg";   // Step 3 Vector

const HowItWorks = () => {
const steps = [
  {
    id: 1,
    title: "Upload Your Learning Material",
    description:
      "Start by uploading your PDFs, notes, or study materials. Zest AI instantly processes your content and extracts key concepts, turning unstructured material into structured learning data.",
    bullets: [
      {
        label: "PDF Intelligence",
        detail: "AI extracts topics, definitions, and key concepts automatically",
      },
      {
        label: "Smart Processing",
        detail: "Breaks long documents into structured learning units",
      },
      {
        label: "Instant Setup",
        detail: "No manual organization required — upload and start learning",
      },
    ],
    image: LearnIllustration,
    imgAlt: "Upload learning materials to Zest AI",
    reverse: false,
  },

  {
    id: 2,
    title: "AI Generates Your Personalized Learning System",
    description:
      "Zest AI transforms your content into a complete learning system — including structured topics, smart flashcards, and adaptive quizzes tailored to your understanding level.",
    bullets: [
      {
        label: "Smart Flashcards",
        detail: "Auto-generated revision cards from your uploaded content",
      },
      {
        label: "AI Quizzes",
        detail: "Adaptive questions that test real understanding, not memorization",
      },
      {
        label: "Structured Roadmap",
        detail: "Topics organized into a clear learning progression",
      },
    ],
    image: SyllabusIllustration,
    imgAlt: "AI generated learning system",
    reverse: true,
  },

  {
    id: 3,
    title: "Learn, Revise & Master Faster with AI Guidance",
    description:
      "Your AI learning assistant helps you study effectively by explaining concepts simply, testing your knowledge, and guiding you through weak areas until mastery is achieved.",
    bullets: [
      {
        label: "Interactive Learning",
        detail: "Ask questions and get instant AI explanations",
      },
      {
        label: "Progress Tracking",
        detail: "See what you've mastered and what needs revision",
      },
      {
        label: "Smarter Revision",
        detail: "Focus only on weak areas to save time and learn faster",
      },
    ],
    image: AssistantIllustration,
    imgAlt: "AI learning assistant guidance",
    reverse: false,
  },
];

  return (
    <section className="w-full bg-white text-black py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        
        {/* SECTION MASTER HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-black/60">
            Get started with your personalized learning journey in just three simple steps - no prior experience required
          </p>
        </div>

        {/* STEPS COLUMN CONTAINER */}
        <div className="space-y-24 sm:space-y-32">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                step.reverse ? "lg:direction-rtl" : ""
              }`}
            >
              
              {/* TEXT COMPONENT SIDE */}
              <div 
                className={`space-y-6 lg:col-span-7 ${
                  step.reverse ? "lg:order-2" : "lg:order-1"
                }`}
              >
                {/* Step ID badge and Title Heading */}
                <div className="flex items-start gap-4">
                  <span className="flex items-center justify-center bg-black text-white font-bold rounded-full w-8 h-8 text-sm shrink-0 mt-1">
                    {step.id}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 pt-0.5">
                    {step.title}
                  </h3>
                </div>

                {/* Main Body Text Paragraph */}
                <p className="text-base text-gray-500 leading-relaxed pl-12">
                  {step.description}
                </p>

                {/* Sub features sub-list indicators */}
                <div className="pl-12 space-y-4 pt-2">
                  {step.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      {/* Stylized custom indicator dot badge element */}
                      <span className="flex items-center justify-center w-5 h-5 bg-gray-100 rounded-full shrink-0 mt-0.5">
                        <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                      </span>
                      <div className="text-sm">
                        <span className="font-bold text-gray-900 block sm:inline mr-1">
                          {bullet.label}
                        </span>
                        <span className="text-gray-500 block sm:inline">
                          {bullet.detail}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* GRAPHICS / VECTOR SVG SIDE */}
              <div
                className={`flex justify-center items-center lg:col-span-5 w-full ${
                  step.reverse ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="w-full max-w-md lg:max-w-full p-4 sm:p-6 bg-gray-50/50 rounded-2xl border border-gray-100/50 transition duration-300 hover:bg-gray-50/80">
                  <img
                    src={step.image}
                    alt={step.imgAlt}
                    className="w-full h-auto max-h-[320px] object-contain mx-auto"
                  />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;