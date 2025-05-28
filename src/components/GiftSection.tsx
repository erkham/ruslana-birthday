import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import surpriseVideo from "../assets/surprise.mp4";

gsap.registerPlugin(ScrollTrigger);

const GiftSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const giftBoxRef = useRef<HTMLDivElement>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const giftBox = giftBoxRef.current;
    if (!container || !giftBox) return;

    // Animate section entrance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      ".gift-title",
      { opacity: 0, y: -50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.7)" }
    )
      .fromTo(
        giftBox,
        { opacity: 0, scale: 0, rotation: -180 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.3)",
        },
        "-=0.5"
      )
      .fromTo(
        ".gift-instruction",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );

    // Floating animation for gift box
    gsap.to(giftBox, {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    // Sparkle animation
    const sparkles = container.querySelectorAll(".sparkle");
    sparkles.forEach((sparkle, index) => {
      gsap.to(sparkle, {
        scale: Math.random() * 0.5 + 0.5,
        rotation: 360,
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: index * 0.2,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleGiftClick = () => {
    if (isOpened) return;

    setIsOpened(true);
    const giftBox = giftBoxRef.current;
    if (!giftBox) return;

    // Create confetti effect
    createConfetti();

    // Animate gift box opening
    const tl = gsap.timeline();

    tl.to(giftBox, {
      scale: 1.2,
      duration: 0.3,
      ease: "power2.out",
    })
      .to(giftBox, {
        rotationY: 360,
        scale: 0.8,
        duration: 0.8,
        ease: "power2.inOut",
      })
      .to(
        ".gift-lid",
        {
          y: -100,
          rotation: 45,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        ".gift-content",
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)",
        },
        "-=0.2"
      )
      .call(() => {
        setTimeout(() => setShowVideo(true), 500);
      });
  };

  const createConfetti = () => {
    const colors = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#96ceb4",
      "#feca57",
      "#ff9ff3",
      "#54a0ff",
    ];
    const container = containerRef.current;
    if (!container) return;

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div");
      confetti.style.cssText = `
        position: absolute;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: 50%;
        top: 50%;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
      `;
      container.appendChild(confetti);

      gsap.to(confetti, {
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 600,
        rotation: Math.random() * 360,
        scale: Math.random() * 2,
        opacity: 0,
        duration: Math.random() * 2 + 1,
        ease: "power2.out",
        onComplete: () => confetti.remove(),
      });
    }
  };

  return (
    <div ref={containerRef} className="section relative overflow-hidden">
      {!showVideo ? (
        <div className="text-center">
          <h2 className="gift-title text-5xl font-bold text-white mb-8 dancing-script">
            🎁 Your Special Surprise! 🎁
          </h2>

          <p className="gift-instruction text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            You've proven your amazing language skills! Now it's time for your
            special gift...
          </p>

          {/* Gift Box */}
          <div
            ref={giftBoxRef}
            onClick={handleGiftClick}
            className="gift-box relative inline-block cursor-pointer transform-gpu"
          >
            {/* Gift Box Base */}
            <div className="relative">
              <div className="w-48 h-48 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl shadow-2xl relative overflow-hidden">
                {/* Gift pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-300/50 to-transparent"></div>

                {/* Ribbon vertical */}
                <div className="absolute left-1/2 top-0 bottom-0 w-8 bg-gradient-to-b from-yellow-300 to-yellow-500 transform -translate-x-1/2"></div>

                {/* Ribbon horizontal */}
                <div className="absolute top-1/2 left-0 right-0 h-8 bg-gradient-to-r from-yellow-300 to-yellow-500 transform -translate-y-1/2"></div>

                {/* Gift content (hidden initially) */}
                <div className="gift-content absolute inset-4 bg-white/20 rounded-xl flex items-center justify-center opacity-0 scale-0">
                  <div className="text-6xl">🎬</div>
                </div>
              </div>

              {/* Gift Lid */}
              <div className="gift-lid absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-52 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-t-2xl shadow-lg relative">
                  {/* Bow */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full relative">
                      <div className="absolute inset-2 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full"></div>
                      <div className="absolute top-1/2 left-1/2 w-2 h-8 bg-yellow-600 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sparkles around gift */}
            <div className="sparkle absolute -top-8 -left-8 text-2xl">✨</div>
            <div className="sparkle absolute -top-4 -right-8 text-xl">💫</div>
            <div className="sparkle absolute -bottom-4 -left-4 text-2xl">
              ⭐
            </div>
            <div className="sparkle absolute -bottom-8 -right-4 text-xl">
              🌟
            </div>
            <div className="sparkle absolute top-4 -left-12 text-lg">✨</div>
            <div className="sparkle absolute top-8 -right-12 text-lg">💫</div>
          </div>

          <p className="text-lg text-white/80 mt-8">Click me! 👆✨</p>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-8 dancing-script">
            🎬 Special Video 🎭
          </h2>

          <div className="glass-effect p-8 rounded-3xl max-w-4xl mx-auto">
            <div className="aspect-video bg-black rounded-2xl overflow-hidden mb-6">
              {/* Actual Video */}
              <video
                className="w-full h-full object-cover"
                controls
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={surpriseVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <p className="text-white text-lg">
              A special message just for you! 💖 Watch and feel all the love I
              have for you.
            </p>
          </div>
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-4xl animate-bounce">🎈</div>
      <div className="absolute top-20 right-20 text-3xl animate-pulse">🎊</div>
      <div className="absolute bottom-20 left-20 text-5xl rotate-animation">
        🎪
      </div>
      <div className="absolute bottom-10 right-10 text-4xl floating-animation">
        🎭
      </div>
    </div>
  );
};

export default GiftSection;
