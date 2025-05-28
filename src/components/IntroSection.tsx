import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const IntroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const heart = heartRef.current;
    const particles = particlesRef.current;

    if (!container || !title || !subtitle || !heart || !particles) return;

    // Create timeline for intro animations
    const tl = gsap.timeline();

    // Initial states
    gsap.set([title, subtitle, heart], { opacity: 0, y: 50 });

    // Create floating particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.innerHTML = ["💖", "✨", "🎉", "💕", "🌟"][
        Math.floor(Math.random() * 5)
      ];
      particle.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 20 + 10}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: 0;
      `;
      particles.appendChild(particle);

      gsap.to(particle, {
        y: -100,
        x: Math.random() * 200 - 100,
        opacity: 1,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: Math.random() * 2,
      });
    }

    // Main animation sequence
    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "back.out(1.7)",
    })
      .to(
        title,
        {
          text: "🎉 Happy Birthday, Love! 💖",
          duration: 2,
          ease: "none",
        },
        "-=0.5"
      )
      .to(
        subtitle,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=1"
      )
      .to(
        heart,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)",
        },
        "-=0.5"
      );

    // Heart pulsing animation
    gsap.to(heart, {
      scale: 1.1,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    // Scroll indicator animation
    const scrollIndicator = container.querySelector(".scroll-indicator");
    if (scrollIndicator) {
      gsap.to(scrollIndicator, {
        y: 10,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="section relative overflow-hidden">
      {/* Animated background particles */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Main content */}
      <div className="text-center z-10 relative">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold text-white mb-8 dancing-script"
        ></h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto"
        >
          Get ready for an amazing interactive journey filled with surprises,
          games, and lots of love! 🎁✨
        </p>

        <div ref={heartRef} className="text-8xl mb-12 inline-block">
          💖
        </div>

        <p className="text-lg text-white/80 mb-8">Scroll to start! 👇</p>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-4xl animate-bounce">🎈</div>
      <div className="absolute top-20 right-20 text-3xl animate-pulse">🌟</div>
      <div className="absolute bottom-20 left-20 text-5xl rotate-animation">
        🎪
      </div>
      <div className="absolute bottom-10 right-10 text-4xl floating-animation">
        🎭
      </div>
    </div>
  );
};

export default IntroSection;
