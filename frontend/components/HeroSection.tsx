"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      url: "/landing1.jpg",
      alt: "Mathematical Reasoning"
      // title: "Mathematical Reasoning",
      // desc: "Curriculum-aligned preparation"
    },
    {
      url: "/landing2.jpeg",
      alt: "Thinking Skills"
      // title: "Thinking Skills",
      // desc: "Develop sharp logic and problem-solving confidence"
    },
    {
      url: "/landing3.jpeg",
      alt: "Selective Reading"
      // title: "Selective Reading",
      // desc: "Enhance comprehension & critical reading"
    },
    {
      url: "/landing4.jpeg",
      alt: "Writing Skills"
      // title: "Writing Skills",
      // desc: "Master creative and persuasive writing"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToNext = () => {
    const nextSection = document.getElementById('courses');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen pt-28 pb-20 md:pt-32 md:pb-24 overflow-hidden bg-[#F8FAFC]">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Side: Image Carousel */}
          <div className="w-full md:w-[45%] h-[400px] md:h-[550px] relative rounded-3xl overflow-hidden shrink-0 bg-gradient-to-br from-indigo-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-indigo-100 dark:border-slate-700 select-none group">
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
                {/* Beautiful overlay for text description */}
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

          {/* Right Side: Text (55-60%) */}
          <div className="w-full md:w-[55%] flex flex-col items-start">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white border border-[#E2E8F0] shadow-sm mb-8">
              <Shield size={16} className="text-[#64748B]" />
              <span className="text-[#64748B] text-sm font-medium">
                Aligned with Australian Curriculum
              </span>
            </div>

            {/* Heading: Forced Line Break & Responsive Typography */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl mb-6 leading-tight font-fraunces font-bold text-[#0F172A]">
              <span className="block sm:hidden text-[#0F172A]">Help Your Child</span>
              <span className="block sm:hidden text-[#0F172A]">Build Academic</span>
              <span className="block sm:hidden italic text-[#6366F1]">Confidence</span>
              <span className="hidden sm:block whitespace-nowrap not-italic">Help Your Child Build</span>
              <span className="hidden sm:block italic text-[#6366F1] mt-1">Academic Confidence</span>
            </h1>

            {/* Subheading */}
            <p className="text-[#334155] text-lg font-sans max-w-lg mb-10 leading-relaxed">
              Personalised assessments, targeted practice, and measurable progress tracking
              to strengthen Mathematical Reasoning, Thinking Skills and Selective Reading skills.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/courses"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#6366F1] text-white font-semibold text-base transition-transform duration-200 hover:scale-[1.02]"
                style={{ boxShadow: '0 0 18px #6366F140' }}
              >
                Try Free Assessment →
              </Link>

              <button
                onClick={scrollToNext}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl border border-[#6366F1] text-[#6366F1] bg-transparent font-semibold text-base transition-colors duration-200 hover:bg-[#6366F1]/5"
              >
                Learn More
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
