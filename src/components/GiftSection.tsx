import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import surpriseVideo from "../assets/surprise.mp4";
import giftImage from "../assets/gift.png";

gsap.registerPlugin(ScrollTrigger);

interface GiftSectionProps {
  onNavigate: () => void;
}

const GiftSection: React.FC<GiftSectionProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const giftBoxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const giftBox = giftBoxRef.current;
    if (!container || !giftBox) return;

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

    gsap.to(giftBox, {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    gsap.utils
      .toArray(".emoji-orbit")
      .forEach((emoji: unknown, index: number) => {
        const element = emoji as Element;
        const radius = 160;
        const angle = (index / 6) * Math.PI * 2;

        gsap.to(element, {
          duration: 8 + Math.random() * 3,
          repeat: -1,
          ease: "linear",
          motionPath: {
            path: `M${radius * Math.cos(angle)},${radius * Math.sin(angle)}
                A${radius},${radius} 0 1,1 ${-radius * Math.cos(angle)},${
              -radius * Math.sin(angle)
            }
                A${radius},${radius} 0 1,1 ${radius * Math.cos(angle)},${
              radius * Math.sin(angle)
            }`,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
        });

        gsap.to(element, {
          rotation: 360,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          ease: "linear",
        });
      });

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.volume = 0.5;
    }
  }, [showVideo]);

  const handleGiftClick = () => {
    if (isOpened) return;
    setIsOpened(true);
    const giftBox = giftBoxRef.current;
    if (!giftBox) return;
    createConfetti();

    const tl = gsap.timeline();
    tl.to(giftBox, { scale: 1.2, duration: 0.3, ease: "power2.out" })
      .to(giftBox, {
        rotationY: 360,
        scale: 0.8,
        duration: 0.8,
        ease: "power2.inOut",
      })
      .to(
        ".gift-image",
        { opacity: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .to(
        ".gift-content",
        { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.3)" },
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
      confetti.style.cssText = `position: absolute; width: 10px; height: 10px; background: ${
        colors[Math.floor(Math.random() * colors.length)]
      }; left: 50%; top: 50%; border-radius: 50%; pointer-events: none; z-index: 1000;`;
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
            🎁 Your Special Surprise ! 🎁
          </h2>
          <p className="gift-instruction text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            You've proven your amazing language skills! Now it's time for your
            special gift...
          </p>
          <div
            ref={giftBoxRef}
            onClick={handleGiftClick}
            className="gift-box relative inline-block cursor-pointer transform-gpu"
          >
            <div className="relative">
              <img
                src={giftImage}
                alt="Gift Box"
                className="gift-image w-[228px] h-[228px] object-contain drop-shadow-2xl"
                width={228}
                height={228}
              />
              <div className="gift-content absolute inset-0 flex items-center justify-center opacity-0 scale-0">
                <div className="text-6xl">🎬</div>
              </div>
            </div>
            {["💖", "🎈", "🎉", "🌈", "💫", "🎊"].map((emoji, idx) => (
              <div
                key={idx}
                className="emoji-orbit absolute text-2xl"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) rotate(${
                    idx * 60
                  }deg) translateX(160px)`,
                }}
              >
                {emoji}
              </div>
            ))}
          </div>
          <p className="text-lg text-white/80 mt-8">Click me ! 👆✨</p>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-8 dancing-script">
            🎬 Special Video 🎭
          </h2>
          <div
            className="glass-effect p-8 rounded-3xl mx-auto"
            style={{ width: "70%" }}
          >
            <div className="aspect-video bg-black rounded-2xl overflow-hidden mb-6">
              <video
                className="w-full h-full object-cover"
                controls
                autoPlay
                muted={false}
                playsInline
                ref={videoRef}
              >
                <source src={surpriseVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="text-white text-lg mb-8">
              A special message just for you ! 💖
            </p>
            <button
              onClick={onNavigate}
              className="birthday-button birthday-button-glow"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Final step of the journey! 🎭
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftSection;
