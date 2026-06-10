"use client";

import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

const STEPS = [
  {
    title: "Take a Free Assessment",
    description: "Identify strengths and areas for improvement with our comprehensive initial test."
  },
  {
    title: "Targeted Practice",
    description: "Engage with curriculum-aligned exercises designed to build core skills."
  },
  {
    title: "Track Measurable Progress",
    description: "Review detailed insights and watch your child's confidence grow over time."
  }
];

export default function SuccessJourney() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      url: "/hero1.jpg",
      alt: "Take a Free Assessment"
      // title: "Take a Free Assessment",
      // desc: "Identify strengths and areas for improvement"
    },
    {
      url: "/hero2.jpg",
      alt: "Targeted Practice"
      // title: "Targeted Practice",
      // desc: "Curriculum-aligned exercises to build core skills"
    },
    {
      url: "/hero3.jpg",
      alt: "Track Measurable Progress"
      // title: "Track Measurable Progress",
      // desc: "Review insights and watch confidence grow"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="py-24 relative bg-white border-t border-[#E2E8F0]">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Image Carousel */}
          <div className="w-full lg:w-1/2 h-[400px] md:h-[500px] relative rounded-3xl overflow-hidden shrink-0 bg-gradient-to-br from-[#EEF2FF] to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-[#E2E8F0] dark:border-slate-700 select-none group">
            {slides.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  idx === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <img
                  src={slide.url}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-6 text-left text-white">
                  <h4 className="font-serif font-bold text-xl md:text-2xl mb-1 drop-shadow-sm">
                    {/* {slide.title} */}
                  </h4>
                  <p className="font-sans text-xs md:text-sm text-white/90 drop-shadow-sm">
                    {/* {slide.desc} */}
                  </p>
                </div>
              </div>
            ))}

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === activeSlide ? "bg-white scale-110" : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0F172A] leading-tight mb-6">
              Your Child's Success Journey
            </h2>
            <p className="text-[#334155] text-lg font-sans leading-relaxed mb-10">
              Comprehensive test series designed to build confidence through consistent
              practice, timed tests, and clear performance insights — helping students master core
              subjects and achieve academic excellence.
            </p>

            <div className="flex flex-col gap-8">
              {STEPS.map((step, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="mt-1 text-[#6366F1] bg-[#EEF2FF] rounded-full p-1 transition-colors group-hover:bg-[#6366F1] group-hover:text-white">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-[#0F172A] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[#334155] font-sans text-sm md:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
