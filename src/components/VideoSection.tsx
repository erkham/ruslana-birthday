import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import surpriseVideo from "../assets/surprise.mp4";

gsap.registerPlugin(ScrollTrigger);

const VideoSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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
      ".video-title",
      { opacity: 0, y: -50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.7)" }
    )
      .fromTo(
        ".video-container",
        { opacity: 0, scale: 0.8, rotationY: -90 },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .fromTo(
        ".video-message",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      );

    // Floating hearts animation
    const hearts = container.querySelectorAll(".floating-heart");
    hearts.forEach((heart, index) => {
      gsap.to(heart, {
        y: -30,
        x: Math.sin(index) * 20,
        duration: Math.random() * 2 + 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: index * 0.3,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleVideoPlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);

      // Animate play button
      gsap.to(".play-button", {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <div ref={containerRef} className="section relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="video-title text-5xl font-bold text-white mb-8 dancing-script">
          🎬 Special Video 🎭
        </h2>

        <p className="video-message text-xl text-white/90 mb-12 max-w-3xl mx-auto">
          A special message just for you! 💖 Watch and feel all the love I have
          for you.
        </p>

        {/* Video Container */}
        <div className="video-container glass-effect p-8 rounded-3xl relative">
          <div className="aspect-video bg-black rounded-2xl overflow-hidden relative group">
            {/* Video Element */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster="/api/placeholder/800/450"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            >
              <source src={surpriseVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Play Button Overlay */}
            {!isPlaying && (
              <div
                className="play-button absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer group-hover:bg-black/20 transition-all duration-300"
                onClick={handleVideoPlay}
              >
                <div className="w-24 h-24 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <div className="w-0 h-0 border-l-8 border-l-gray-800 border-t-6 border-t-transparent border-b-6 border-b-transparent ml-1"></div>
                </div>
              </div>
            )}

            {/* Video Controls */}
            {isPlaying && (
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/50 rounded-lg p-2">
                <button
                  onClick={handleVideoPlay}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  ⏸️
                </button>
                <div className="flex-1 mx-4">
                  <div className="bg-white/30 rounded-full h-1">
                    <div className="bg-white rounded-full h-1 w-1/3"></div>
                  </div>
                </div>
                <span className="text-white text-sm">0:30 / 1:20</span>
              </div>
            )}
          </div>

          {/* Video Description */}
          <div className="mt-6 text-center">
            <p className="text-white/80 text-lg mb-4">
              "You are the light of my life, my greatest joy, and my sweetest
              dream come true. Every day with you is a celebration, and today is
              extra special because it's YOUR day!"
            </p>
            <p className="text-white/60 text-sm">Te iubesc mult! 💕</p>
          </div>
        </div>

        {/* Floating Hearts */}
        <div className="floating-heart absolute top-20 left-20 text-4xl">
          💖
        </div>
        <div className="floating-heart absolute top-32 right-24 text-3xl">
          💕
        </div>
        <div className="floating-heart absolute bottom-32 left-16 text-5xl">
          ❤️
        </div>
        <div className="floating-heart absolute bottom-20 right-20 text-3xl">
          💗
        </div>
        <div className="floating-heart absolute top-60 left-1/2 text-4xl">
          💝
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 text-3xl animate-pulse">🎪</div>
        <div className="absolute top-20 right-10 text-4xl floating-animation">
          🎭
        </div>
        <div className="absolute bottom-20 left-20 text-3xl bounce-animation">
          🎨
        </div>
        <div className="absolute bottom-10 right-20 text-4xl rotate-animation">
          🎪
        </div>

        {/* Continue indicator */}
        <div className="mt-12">
          <p className="text-white/70 text-lg mb-4">
            Continue scrolling for the final message... 👇
          </p>
          <div className="animate-bounce text-3xl">⬇️</div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
