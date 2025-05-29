import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

interface IntroSectionProps {
  onNavigate: () => void;
}

const IntroSection: React.FC<IntroSectionProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const heart = heartRef.current;
    const button = buttonRef.current;

    if (!container || !title || !subtitle || !heart || !button) return;

    // Main animation timeline
    const tl = gsap.timeline();

    gsap.set([title, subtitle, heart, button], { opacity: 0, y: 50 });

    tl.to(title, {
      text: "🎉 Happy Birthday, Love! 💖",
      duration: 2.5,
      ease: "none",
      onStart: () => {
        gsap.to(title, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.7)",
        });
      },
    })
      .to(
        subtitle,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        "+=0.2"
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
      )
      .to(
        button,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      );

    gsap.to(heart, {
      scale: 1.1,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleStart = () => {
    onNavigate();
  };

  return (
    <div ref={containerRef} className="section relative overflow-hidden">
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

        <button
          ref={buttonRef}
          onClick={handleStart}
          className="birthday-button birthday-button-glow"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            ✨ Start the Journey 🚀
          </span>
        </button>
      </div>
    </div>
  );
};

export default IntroSection;
