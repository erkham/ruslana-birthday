import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Add CSS styles to prevent layout shifts
const quizStyles = `
  .quiz-initial-hidden {
    opacity: 0 !important;
    visibility: hidden !important;
    transform: translateY(50px) scale(0.8) !important;
  }
  .quiz-title-initial {
    opacity: 0 !important;
    visibility: hidden !important;
    transform: translateY(-50px) scale(0.8) !important;
  }
  .quiz-progress-initial {
    opacity: 0 !important;
    visibility: hidden !important;
    width: 0 !important;
  }
  .explanation-initial {
    opacity: 0 !important;
    visibility: hidden !important;
    transform: translateY(30px) scale(0.9) !important;
  }
`;

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  flag: string;
}

const questions: Question[] = [
  {
    id: 1,
    question:
      "Which of the following English sentences uses the subjunctive mood correctly?",
    options: [
      " If I was you, I would go.",
      " If I were you, I would go.",
      " If I am you, I would go.",
      " If I be you, I would go.",
    ],
    correct: 1,
    explanation:
      "The correct use of the English subjunctive mood is 'If I were you' when expressing hypothetical situations.",
    flag: "🇬🇧",
  },
  {
    id: 2,
    question:
      'What is the German equivalent of the English idiom "to beat around the bush"?',
    options: [
      " Um den heißen Brei herumreden",
      " Die Katze im Sack kaufen",
      " Den Nagel auf den Kopf treffen",
      " Jemandem Honig ums Maul schmieren",
    ],
    correct: 0,
    explanation:
      "'Um den heißen Brei herumreden' literally means 'to talk around the hot porridge', and is used just like 'beat around the bush'.",
    flag: "🇩🇪",
  },
  {
    id: 3,
    question:
      "Which of these English sentences demonstrates a correct use of inversion?",
    options: [
      " Never I have seen such chaos.",
      " Rarely she goes out. ",
      " Hardly had he arrived when the phone rang.",
      " Only then he realized his mistake.",
    ],
    correct: 2,
    explanation:
      "'Hardly had he arrived when...' is a correct example of inversion used for emphasis.",
    flag: "🇬🇧",
  },
  {
    id: 4,
    question:
      'Which of the following words is a correct German translation of "sophisticated" in the context of someone being cultured?',
    options: [" Kompliziert", " Ausgereift", " Gebildet", " Verwirrt"],
    correct: 2,
    explanation:
      "'Gebildet' refers to someone well-educated or cultured, the right translation of 'sophisticated' in this context.",
    flag: "🇩🇪",
  },
  {
    id: 5,
    question:
      'What does the English expression "to take something with a grain of salt" mean?',
    options: [
      " To believe something completely",
      " To consider something lightly or skeptically",
      " To cook something with caution",
      " To season something carefully",
    ],
    correct: 1,
    explanation:
      "To 'take something with a grain of salt' means to be skeptical about the truth of a statement.",
    flag: "🇬🇧",
  },
  {
    id: 6,
    question:
      "Which German phrase best conveys the idea of feeling awkward or out of place?",
    options: [
      " Sich wie ein Fisch im Wasser fühlen",
      " Sich wie ein Elefant im Porzellanladen fühlen",
      " Sich den Kopf zerbrechen",
      " Da steppt der Bär",
    ],
    correct: 1,
    explanation:
      "'Sich wie ein Elefant im Porzellanladen fühlen' means feeling clumsy or out of place, like a bull in a china shop.",
    flag: "🇩🇪",
  },
  {
    id: 7,
    question: 'What is the best English synonym for the word "ubiquitous"?',
    options: [" Rare", " Present everywhere", " Unique", " Obsolete"],
    correct: 1,
    explanation:
      "'Ubiquitous' means something that is present, appearing, or found everywhere.",
    flag: "🇬🇧",
  },
  {
    id: 8,
    question:
      'What is the function of the German word "doch" in this sentence: "Du kommst doch mit, oder?"?',
    options: [
      " To express doubt",
      " To express contradiction",
      " To reinforce a positive expectation",
      " To add a question",
    ],
    correct: 2,
    explanation:
      "'Doch' in this context emphasizes a positive expectation – the speaker assumes the other person is coming.",
    flag: "🇩🇪",
  },
  {
    id: 9,
    question:
      'Which English word best replaces the phrase "to make something seem less important"?',
    options: [" Undermine", " Downplay", " Overstate", " Elevate"],
    correct: 1,
    explanation:
      "'Downplay' means to make something appear less important than it really is.",
    flag: "🇬🇧",
  },
  {
    id: 10,
    question: 'What does the German expression "Ins Fettnäpfchen treten" mean?',
    options: [
      " To step into a muddy puddle",
      " To unintentionally say something embarrassing",
      " To fall in love",
      " To make a lucky guess",
    ],
    correct: 1,
    explanation:
      "'Ins Fettnäpfchen treten' means to make a faux pas or say something embarrassing without intending to.",
    flag: "🇩🇪",
  },
];

interface QuizSectionProps {
  onNavigate: () => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isAnimationReady, setIsAnimationReady] = useState(false);

  // Add styles to head
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = quizStyles;
    document.head.appendChild(styleElement);

    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Wait for next frame to ensure DOM is ready
    requestAnimationFrame(() => {
      setIsAnimationReady(true);

      // Animate section entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top center",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(".quiz-title", {
        opacity: 0,
        visibility: "hidden",
        y: 0,
        x: 0,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
        transformOrigin: "center center",
      })
        .to(
          ".quiz-progress",
          {
            opacity: 1,
            visibility: "visible",
            width: "100%",
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .to(
          ".question-card",
          {
            opacity: 1,
            visibility: "visible",
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1,
            ease: "power2.out",
            transformOrigin: "center center",
          },
          "-=0.3"
        )
        .to(".quiz-title", {
          opacity: 1,
          visibility: "visible",
          x: 0,
          duration: 1,
        });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    // Animate question change
    if (currentQuestion > 0 && isAnimationReady) {
      gsap.fromTo(
        ".question-card",
        { opacity: 0, x: 100, rotationY: 90 },
        { opacity: 1, x: 0, rotationY: 0, duration: 0.8, ease: "back.out(1.7)" }
      );
    }
  }, [currentQuestion, isAnimationReady]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);

    const isCorrect = answerIndex === questions[currentQuestion].correct;
    if (isCorrect) {
      setScore(score + 1);
    }

    // Animate answer selection
    const options = document.querySelectorAll(".quiz-option");
    options.forEach((option, index) => {
      if (index === answerIndex) {
        gsap.to(option, {
          scale: 1.05,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
        option.classList.add(isCorrect ? "correct" : "incorrect");
      } else {
        gsap.to(option, {
          opacity: 0.5,
          scale: 0.95,
          duration: 0.3,
        });
      }
    });

    // Show correct answer if wrong
    if (!isCorrect) {
      setTimeout(() => {
        const correctOption = options[questions[currentQuestion].correct];
        correctOption.classList.add("correct");
        gsap.to(correctOption, {
          scale: 1.05,
          opacity: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      }, 1000);
    }

    setTimeout(() => {
      setShowExplanation(true);

      // Use requestAnimationFrame to ensure element is in DOM
      requestAnimationFrame(() => {
        gsap.to(".explanation", {
          opacity: 1,
          visibility: "visible",
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          transformOrigin: "center center",
          onComplete: () => {
            // Add a subtle glow effect after appearance
            gsap.to(".explanation", {
              boxShadow: "0 0 30px rgba(34, 197, 94, 0.3)",
              duration: 0.5,
              yoyo: true,
              repeat: 1,
              ease: "power2.inOut",
            });

            // Animate the button separately with a delay
            gsap.fromTo(
              ".explanation button",
              {
                opacity: 0,
                scale: 0.8,
                y: 20,
              },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                delay: 0.2,
                ease: "elastic.out(1, 0.6)",
              }
            );
          },
        });
      });
    }, 1500);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);

      // Reset option styles completely
      const options = document.querySelectorAll(".quiz-option");
      options.forEach((option) => {
        option.classList.remove("correct", "incorrect");
        gsap.set(option, {
          opacity: 1,
          scale: 1,
          y: 0,
          x: 0,
          rotation: 0,
          transformOrigin: "center center",
          clearProps: "transform",
        });
      });
    } else {
      setQuizCompleted(true);
      // Animate completion
      gsap.to(".quiz-content", {
        opacity: 0,
        y: -50,
        duration: 0.5,
        onComplete: () => {
          gsap.fromTo(
            ".completion-message",
            { opacity: 0, scale: 0, rotation: -180 },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 1,
              ease: "elastic.out(1, 0.3)",
            }
          );
        },
      });
    }
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (quizCompleted) {
    return (
      <div ref={containerRef} className="section">
        <div className="completion-message text-center">
          <div className="text-8xl mb-8">🎓</div>
          <h2 className="text-5xl font-bold text-white mb-6 dancing-script">
            Amazing! You're a Language Master!
          </h2>
          <p className="text-2xl text-white/90 mb-8">
            Score: {score}/{questions.length} 🌟
          </p>
          <div className="text-6xl mb-8">🎉✨🎊</div>
          <p className="text-xl text-white/80 mb-12">
            Your linguistic skills are incredible! Now let's see what surprise
            awaits you...
          </p>
          <button
            onClick={onNavigate}
            className="birthday-button birthday-button-glow mb-8"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Continue Adventure 🎁
            </span>
          </button>
          <div className="animate-bounce text-4xl">👇</div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="section">
      <div className="max-w-4xl mx-auto w-full quiz-content">
        {/* Header */}
        <div className="text-center mb-12 pb-4">
          <h2
            className={`quiz-title text-5xl font-bold text-white mb-4 dancing-script ${
              !isAnimationReady ? "quiz-title-initial" : ""
            }`}
          >
            🌍 Language Challenge 💫
          </h2>
          <div
            className={`quiz-progress bg-white/20 rounded-full h-3 mb-6 overflow-hidden ${
              !isAnimationReady ? "quiz-progress-initial" : ""
            }`}
          >
            <div
              className="bg-gradient-to-r from-yellow-400 to-pink-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/80 text-lg">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        {/* Question Card */}
        <div
          className={`question-card glass-effect p-8 rounded-3xl mb-4 w-[800px] mx-auto ${
            !isAnimationReady ? "quiz-initial-hidden" : ""
          }`}
        >
          <div className="flex items-center justify-center mb-6">
            <span className="text-4xl mr-4">{currentQ.flag}</span>
            <h3 className="text-2xl font-semibold text-white text-center">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                className="quiz-option glass-effect p-4 m-1 rounded-xl text-white text-left hover:bg-white/20 transition-all duration-300 w-full"
              >
                <span className="font-semibold mr-2">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Explanation Section - Now separate from question card */}
        {showExplanation && (
          <div className="explanation glass-effect p-6 rounded-xl bg-gradient-to-br from-green-400/30 to-emerald-500/20 border border-green-400/30 backdrop-blur-sm mt-4 mb-8 w-[800px] mx-auto">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl">💡</span>
              <p className="text-white text-lg leading-relaxed">
                ✨ {currentQ.explanation}
              </p>
            </div>
            <button
              onClick={nextQuestion}
              className="opacity-0 birthday-button birthday-button-glow"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {currentQuestion < questions.length - 1 ? (
                  <>
                    <span className="text-2xl">🚀 &nbsp;</span>
                    Next Question
                    <span className="text-2xl"> &nbsp;✨</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl">🎉 &nbsp;</span>
                    See Results
                    <span className="text-2xl"> &nbsp;🏆</span>
                  </>
                )}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizSection;
