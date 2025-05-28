import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IntroSection from "./components/IntroSection";
import QuizSection from "./components/QuizSection";
import GiftSection from "./components/GiftSection";
import VideoSection from "./components/VideoSection";
import FinalSection from "./components/FinalSection";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scroll setup
    const container = containerRef.current;
    if (!container) return;

    // Create scroll-triggered animations
    gsap.set(container, { overflow: "hidden" });

    // Background color transitions between sections
    const sections = gsap.utils.toArray(".section");

    sections.forEach((section: any, i) => {
      const colors = [
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Intro - purple gradient
        "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", // Quiz - pink gradient
        "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", // Gift - blue gradient
        "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", // Video - green gradient
        "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", // Final - orange gradient
      ];

      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          gsap.to("body", {
            background: colors[i],
            duration: 1,
            ease: "power2.inOut",
          });
        },
        onEnterBack: () => {
          gsap.to("body", {
            background: colors[i],
            duration: 1,
            ease: "power2.inOut",
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <IntroSection />
      <QuizSection />
      <GiftSection />
      <VideoSection />
      <FinalSection />
    </div>
  );
}
