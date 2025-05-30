import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import IntroSection from "./components/IntroSection";
import QuizSection from "./components/QuizSection";
import GiftSection from "./components/GiftSection";
import FinalSection from "./components/FinalSection";
import "./App.css";

type SectionType = "intro" | "quiz" | "gift" | "video" | "final";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState<SectionType>("intro");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const sectionColors = {
    intro: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    quiz: "linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 25%, #45b7d1 50%, #96ceb4 75%, #feca57 100%)",
    gift: "linear-gradient(135deg, #f093fb 0%, #f5576c 25%, #ff9a9e 50%, #fecfef 75%, #fbc2eb 100%)",
    final:
      "linear-gradient(135deg, #fa709a 0%, #fee140 25%, #ffa726 50%, #ff7043 75%, #e91e63 100%)",
  };

  const sectionEmojis = {
    intro: [
      "💖",
      "✨",
      "🎉",
      "💕",
      "🌟",
      "🎉",
      "✨",
      "🔥",
      "🥰",
      "🥳",
      "🤩",
      "💃",
      "💅",
      "🌸",
      "⭐️",
      "💐",
      "🌸",
      "🏆",
      "🎁",
      "🎈",
      "🎊",
    ],
    quiz: [
      "🧐",
      "🤩",
      "🤓",
      "✍️",
      "🧠",
      "👩🏼‍💻",
      "👩🏼‍🏫",
      "👩‍🔬",
      "🎒",
      "⚡️",
      "🔥",
      "🧪",
      "📚",
      "📝",
      "📊",
      "🇬🇧",
      "🇺🇦",
      "🇩🇪",
    ],
    gift: [
      "🎁",
      "🎀",
      "🎊",
      "✨",
      "💝",
      "🎈",
      "🎉",
      "💖",
      "🌟",
      "🎪",
      "🎭",
      "🎨",
      "🎵",
      "🎶",
      "💕",
      "🥳",
      "🤩",
      "🎂",
      "🍰",
      "🎆",
      "🎇",
    ],
    video: [
      "🎬",
      "🎭",
      "📹",
      "🎪",
      "🎨",
      "🎵",
      "🎶",
      "💖",
      "💕",
      "❤️",
      "💗",
      "💝",
      "🌹",
      "🌸",
      "🌺",
      "🦋",
      "✨",
      "🌟",
      "⭐",
      "💫",
      "🌙",
    ],
    final: [
      "💖",
      "❤️",
      "💕",
      "💗",
      "💝",
      "🌹",
      "🌸",
      "🌺",
      "🎉",
      "🎊",
      "✨",
      "🌟",
      "⭐",
      "💫",
      "🦋",
      "🌈",
      "🎆",
      "🎇",
      "🥳",
      "😍",
      "🥰",
    ],
  };

  // Store current floating particles
  const currentParticles = useRef<HTMLElement[]>([]);

  const createFloatingEmojis = (emojis: string[]) => {
    // Store old particles to fade them out
    const oldParticles = [...currentParticles.current];
    currentParticles.current = [];

    // Smoothly fade out old particles over 2 seconds
    oldParticles.forEach((particle, index) => {
      gsap.to(particle, {
        opacity: 0,
        scale: 0.7,
        duration: 2,
        delay: index * 0.03, // Staggered fade out
        ease: "power2.out",
        onComplete: () => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        },
      });
    });

    // Create new particles that will fade in smoothly
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
      particle.style.cssText = `
        position: fixed;
        font-size: ${Math.random() * 20 + 10}px;
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        opacity: 0;
        transform: scale(0.5);
        pointer-events: none;
        z-index: 50;
      `;
      document.body.appendChild(particle);
      currentParticles.current.push(particle);

      // Base opacity for this particle (between 0.3 and 0.7 for subtlety)
      const baseOpacity = Math.random() * 0.8 + 0.6;

      // Smooth fade in with staggered timing starting after 0.5s
      gsap.to(particle, {
        opacity: baseOpacity,
        scale: 1,
        duration: 2,
        delay: 0.5 + i * 0.05, // Start fading in while old ones are still fading out
        ease: "power2.out",
      });

      // Add beautiful breathing opacity animation
      gsap.to(particle, {
        opacity: baseOpacity * 0.7, // Fade to 30% of base opacity
        duration: Math.random() * 2 + 2, // Random duration between 2-4 seconds
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1 + Math.random() * 3, // Start breathing after initial fade in
      });

      // Start floating animation with delay
      gsap.to(particle, {
        y: -200,
        x: Math.random() * 400 - 200,
        duration: Math.random() * 4 + 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 1 + Math.random() * 2, // Start floating after fade in begins
      });

      // Add subtle scale breathing effect
      gsap.to(particle, {
        scale: 0.9,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5 + Math.random() * 2,
      });
    }
  };

  const navigateToSection = (targetSection: SectionType) => {
    if (isTransitioning || currentSection === targetSection) return;

    setIsTransitioning(true);

    const container = containerRef.current;
    if (!container) return;

    // Create spectacular transition animation
    const currentSectionEl = container.querySelector(
      `[data-section="${currentSection}"]`
    );
    const targetSectionEl = container.querySelector(
      `[data-section="${targetSection}"]`
    );

    if (currentSectionEl && targetSectionEl) {
      const tl = gsap.timeline({
        onComplete: () => {
          setCurrentSection(targetSection);
          setIsTransitioning(false);
          // Create new emojis for the target section
          createFloatingEmojis(sectionEmojis[targetSection]);
        },
      });

      // Hide current section with spectacular exit animation
      tl.to(currentSectionEl, {
        rotationY: -90,
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: "power2.in",
        transformOrigin: "center center",
      })
        // Change background color
        .to(
          "body",
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            background: sectionColors[targetSection],
            backgroundAttachment: "fixed",
            duration: 0.6,
            ease: "power2.inOut",
          },
          "-=0.4"
        )
        // Show target section with entrance animation
        .set(targetSectionEl, {
          display: "flex",
          rotationY: 90,
          scale: 1.2,
          opacity: 0,
        })
        .to(
          targetSectionEl,
          {
            rotationY: 0,
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            transformOrigin: "center center",
          },
          "-=0.2"
        );
    }
  };

  useEffect(() => {
    // Set initial background
    gsap.set("body", {
      background: sectionColors.intro,
      backgroundAttachment: "fixed",
    });

    // Ensure the body element has the correct initial background
    document.body.style.background = sectionColors.intro;

    // Create initial emojis for intro section
    createFloatingEmojis(sectionEmojis.intro);

    // Cleanup function
    return () => {
      currentParticles.current.forEach((particle) => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div
        data-section="intro"
        style={{ display: currentSection === "intro" ? "flex" : "none" }}
        className="section-container"
      >
        <IntroSection onNavigate={() => navigateToSection("quiz")} />
      </div>

      <div
        data-section="quiz"
        style={{ display: currentSection === "quiz" ? "flex" : "none" }}
        className="section-container"
      >
        <QuizSection onNavigate={() => navigateToSection("gift")} />
      </div>

      <div
        data-section="gift"
        style={{ display: currentSection === "gift" ? "flex" : "none" }}
        className="section-container"
      >
        <GiftSection onNavigate={() => navigateToSection("final")} />
      </div>

      <div
        data-section="final"
        style={{ display: currentSection === "final" ? "flex" : "none" }}
        className="section-container"
      >
        <FinalSection />
      </div>
    </div>
  );
}
