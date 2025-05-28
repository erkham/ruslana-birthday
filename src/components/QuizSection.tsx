import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    question: 'What does "Fernweh" mean in German?',
    options: [
      "A longing for distant places; wanderlust",
      "Fear of traveling far away",
      "A distant relative",
      "Television from far away",
    ],
    correct: 0,
    explanation:
      "Fernweh is that beautiful German word for wanderlust - the longing to travel to distant places! 🌍",
    flag: "🇩🇪",
  },
  {
    id: 2,
    question: 'Which Ukrainian word means "to miss someone deeply"?',
    options: ["Сумувати", "Кохати", "Чекати", "Шукати"],
    correct: 0,
    explanation:
      "Сумувати perfectly captures that deep longing when you miss someone special! 💙💛",
    flag: "🇺🇦",
  },
  {
    id: 3,
    question: 'What is the correct English idiom for "being very happy"?',
    options: [
      "Over the moon",
      "Under the weather",
      "Behind the clouds",
      "Above the stars",
    ],
    correct: 0,
    explanation:
      "Over the moon means extremely happy - just like how I feel about you! 🌙✨",
    flag: "🇬🇧",
  },
  {
    id: 4,
    question: 'How do you say "butterfly" in German?',
    options: ["Schmetterling", "Käfer", "Libelle", "Biene"],
    correct: 0,
    explanation:
      "Schmetterling! Such a beautiful word for a beautiful creature, just like you! 🦋",
    flag: "🇩🇪",
  },
  {
    id: 5,
    question: 'What does "мрійливий" mean in Ukrainian?',
    options: [
      "Dreamy, imaginative",
      "Angry, upset",
      "Tired, sleepy",
      "Hungry, starving",
    ],
    correct: 0,
    explanation:
      "Мрійливий means dreamy and imaginative - perfect for describing someone special! ✨💭",
    flag: "🇺🇦",
  },
];

const QuizSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

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
      ".quiz-title",
      { opacity: 0, y: -50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.7)" }
    )
      .fromTo(
        ".quiz-progress",
        { opacity: 0, width: 0 },
        { opacity: 1, width: "100%", duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        ".question-card",
        { opacity: 0, y: 50, rotationX: -90 },
        { opacity: 1, y: 0, rotationX: 0, duration: 1, ease: "power2.out" },
        "-=0.3"
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    // Animate question change
    if (currentQuestion > 0) {
      gsap.fromTo(
        ".question-card",
        { opacity: 0, x: 100, rotationY: 90 },
        { opacity: 1, x: 0, rotationY: 0, duration: 0.8, ease: "back.out(1.7)" }
      );
    }
  }, [currentQuestion]);

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
      gsap.fromTo(
        ".explanation",
        { opacity: 0, y: 30, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
      );
    }, 1500);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);

      // Reset option styles
      const options = document.querySelectorAll(".quiz-option");
      options.forEach((option) => {
        option.classList.remove("correct", "incorrect");
        gsap.set(option, { opacity: 1, scale: 1 });
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
          <div className="animate-bounce text-4xl">👇</div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="section">
      <div className="max-w-4xl mx-auto w-full quiz-content">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="quiz-title text-5xl font-bold text-white mb-4 dancing-script">
            🌍 Language Challenge 💫
          </h2>
          <div className="quiz-progress bg-white/20 rounded-full h-3 mb-6 overflow-hidden">
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
        <div className="question-card glass-effect p-8 rounded-3xl mb-8">
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
                className="quiz-option glass-effect p-4 rounded-xl text-white text-left hover:bg-white/20 transition-all duration-300"
              >
                <span className="font-semibold mr-2">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            ))}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="explanation glass-effect p-6 rounded-xl bg-green-500/20">
              <p className="text-white text-lg">✨ {currentQ.explanation}</p>
              <button
                onClick={nextQuestion}
                className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
              >
                {currentQuestion < questions.length - 1
                  ? "Next Question 🚀"
                  : "See Results 🎉"}
              </button>
            </div>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 text-3xl animate-spin">📚</div>
        <div className="absolute top-20 right-10 text-4xl floating-animation">
          🧠
        </div>
        <div className="absolute bottom-20 left-20 text-3xl bounce-animation">
          💡
        </div>
        <div className="absolute bottom-10 right-20 text-4xl pulse-animation">
          🎯
        </div>
      </div>
    </div>
  );
};

export default QuizSection;
