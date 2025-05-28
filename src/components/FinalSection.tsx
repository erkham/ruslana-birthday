import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const FinalSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const message = messageRef.current;
    if (!container || !message) return;

    // Create timeline for final section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse",
      },
    });

    // Animate title entrance
    tl.fromTo(
      ".final-title",
      { opacity: 0, y: -100, scale: 0.5 },
      { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "elastic.out(1, 0.3)" }
    )
      .fromTo(
        ".heart-big",
        { opacity: 0, scale: 0, rotation: -180 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "-=0.8"
      )
      .fromTo(
        ".message-card",
        { opacity: 0, y: 50, rotationX: -90 },
        { opacity: 1, y: 0, rotationX: 0, duration: 1.2, ease: "power2.out" },
        "-=0.5"
      );

    // Typewriter effect for the message
    const messages = [
      "Thank You for Being You ❤️",
      "Дякую тобі за те, що ти є 💙💛",
      "Danke, dass du du bist 🇩🇪",
      "I love you more than words can say 💕",
    ];

    let messageIndex = 0;
    const typewriterTl = gsap.timeline({ repeat: -1, delay: 2 });

    messages.forEach((msg, index) => {
      typewriterTl
        .to(".typewriter-text", {
          text: msg,
          duration: 2,
          ease: "none",
        })
        .to(".typewriter-text", {
          opacity: 1,
          duration: 0.1,
        })
        .to(".typewriter-text", {
          opacity: 0.7,
          duration: 2,
        })
        .to(".typewriter-text", {
          text: "",
          duration: 0.5,
          ease: "none",
        });
    });

    // Floating hearts animation
    const hearts = container.querySelectorAll(".floating-heart");
    hearts.forEach((heart, index) => {
      gsap.to(heart, {
        y: -50,
        x: Math.sin(index * 2) * 30,
        rotation: 360,
        duration: Math.random() * 3 + 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: index * 0.5,
      });
    });

    // Sparkle animation
    const sparkles = container.querySelectorAll(".sparkle");
    sparkles.forEach((sparkle, index) => {
      gsap.to(sparkle, {
        scale: Math.random() * 0.8 + 0.5,
        rotation: 360,
        opacity: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: index * 0.3,
      });
    });

    // Continuous confetti
    const createContinuousConfetti = () => {
      const colors = [
        "#ff6b6b",
        "#4ecdc4",
        "#45b7d1",
        "#96ceb4",
        "#feca57",
        "#ff9ff3",
        "#54a0ff",
      ];

      setInterval(() => {
        for (let i = 0; i < 5; i++) {
          const confetti = document.createElement("div");
          confetti.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            top: -10px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
          `;
          container.appendChild(confetti);

          gsap.to(confetti, {
            y: window.innerHeight + 100,
            x: (Math.random() - 0.5) * 200,
            rotation: Math.random() * 360,
            duration: Math.random() * 3 + 2,
            ease: "power2.out",
            onComplete: () => confetti.remove(),
          });
        }
      }, 1000);
    };

    createContinuousConfetti();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="section relative overflow-hidden min-h-screen"
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Main Title */}
        <h1 className="final-title text-6xl md:text-8xl font-bold text-white mb-8 dancing-script">
          💖 Thank You for Being You 💖
        </h1>

        {/* Big Heart */}
        <div className="heart-big text-9xl mb-12 inline-block">❤️</div>

        {/* Message Card */}
        <div
          ref={messageRef}
          className="message-card glass-effect p-8 md:p-12 rounded-3xl mb-12"
        >
          <div className="typewriter-text text-2xl md:text-3xl font-semibold text-white mb-8 min-h-[3rem]">
            Thank You for Being You ❤️
          </div>

          <div className="space-y-6 text-lg md:text-xl text-white/90">
            <p>
              You're the light of my life, my greatest joy, and my sweetest
              dream come true. Every day with you is a celebration, and today is
              extra special because it's YOUR day!
            </p>

            <p>
              I hope this little journey brought a smile to your beautiful face.
              Your linguistic skills are incredible, just like everything else
              about you!
            </p>

            <p className="text-2xl font-semibold gradient-text">
              Te iubesc mult! 💕
            </p>

            <p className="text-xl text-white/80">
              🇺🇦 З Днем народження, кохана! 💙💛
              <br />
              🇩🇪 Alles Gute zum Geburtstag, meine Liebe! 🎂
              <br />
              🇬🇧 Happy Birthday, My Love! 🎉
            </p>
          </div>

          <div className="mt-8 text-3xl">🎂🎉🎊✨🌟💫🎈🎁</div>
        </div>

        {/* Signature */}
        <div className="text-center">
          <p className="text-2xl text-white/80 dancing-script mb-4">
            Always yours,
          </p>
          <p className="text-3xl font-bold gradient-text dancing-script">
            Your Loving Partner 💕
          </p>
        </div>

        {/* Birthday Date */}
        <div className="mt-12 glass-effect p-6 rounded-2xl inline-block">
          <p className="text-white/70 text-lg">
            Made with 💖 for your special day
          </p>
          <p className="text-white font-semibold text-xl">
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Floating Hearts */}
      <div className="floating-heart absolute top-20 left-10 text-4xl">💖</div>
      <div className="floating-heart absolute top-40 right-20 text-3xl">💕</div>
      <div className="floating-heart absolute bottom-40 left-20 text-5xl">
        ❤️
      </div>
      <div className="floating-heart absolute bottom-20 right-10 text-3xl">
        💗
      </div>
      <div className="floating-heart absolute top-60 left-1/3 text-4xl">💝</div>
      <div className="floating-heart absolute bottom-60 right-1/3 text-3xl">
        💘
      </div>

      {/* Sparkles */}
      <div className="sparkle absolute top-16 left-1/4 text-2xl">✨</div>
      <div className="sparkle absolute top-32 right-1/4 text-xl">💫</div>
      <div className="sparkle absolute bottom-32 left-1/5 text-2xl">⭐</div>
      <div className="sparkle absolute bottom-16 right-1/5 text-xl">🌟</div>
      <div className="sparkle absolute top-1/2 left-16 text-lg">✨</div>
      <div className="sparkle absolute top-1/2 right-16 text-lg">💫</div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-3xl animate-bounce">🎈</div>
      <div className="absolute top-20 right-20 text-4xl animate-pulse">🎊</div>
      <div className="absolute bottom-20 left-20 text-5xl rotate-animation">
        🎪
      </div>
      <div className="absolute bottom-10 right-10 text-4xl floating-animation">
        🎭
      </div>
    </div>
  );
};

export default FinalSection;
