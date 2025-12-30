import React, { useState } from 'react';
import { Trophy, RefreshCw } from 'lucide-react';
import { QuizQuestion } from '../types';

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which scaling method eventually hits a hard hardware limit?",
    options: ["Horizontal Scaling", "Vertical Scaling", "Diagonal Scaling", "Load Balancing"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Which component is essential for distributing traffic in Horizontal Scaling?",
    options: ["Bigger CPU", "More RAM", "Load Balancer", "Power Supply"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "If you need High Availability (uptime even if a server crashes), you should choose:",
    options: ["Vertical Scaling", "Horizontal Scaling", "Just buy a better server", "None of the above"],
    correctAnswer: 1
  }
];

export const TabQuiz: React.FC = () => {
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIndex: number, optionIndex: number) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[qIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const getScore = () => {
    return answers.reduce((acc, ans, idx) => {
      return acc + (ans === questions[idx].correctAnswer ? 1 : 0);
    }, 0);
  };

  const reset = () => {
    setAnswers(new Array(questions.length).fill(-1));
    setSubmitted(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Knowledge Check</h2>
        <p className="text-slate-400">Review what you've learned about scaling architectures.</p>
      </div>

      <div className="space-y-6">
        {questions.map((q, qIdx) => (
          <div key={q.id} className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h3 className="text-lg text-white font-medium mb-4">{qIdx + 1}. {q.question}</h3>
            <div className="space-y-2">
              {q.options.map((opt, oIdx) => {
                const isSelected = answers[qIdx] === oIdx;
                const isCorrect = q.correctAnswer === oIdx;
                
                let btnClass = "w-full text-left p-3 rounded-lg border transition-all ";
                
                if (submitted) {
                  if (isCorrect) btnClass += "bg-neon-green/20 border-neon-green text-neon-green";
                  else if (isSelected && !isCorrect) btnClass += "bg-red-500/20 border-red-500 text-red-400";
                  else btnClass += "bg-slate-800 border-slate-700 text-slate-500 opacity-50";
                } else {
                  if (isSelected) btnClass += "bg-neon-blue/20 border-neon-blue text-white";
                  else btnClass += "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700";
                }

                return (
                  <button 
                    key={oIdx}
                    onClick={() => handleSelect(qIdx, oIdx)}
                    className={btnClass}
                    disabled={submitted}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!submitted ? (
        <button 
          onClick={() => setSubmitted(true)}
          disabled={answers.includes(-1)}
          className="w-full py-4 bg-neon-blue text-slate-900 font-bold rounded-xl hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Submit Answers
        </button>
      ) : (
        <div className="bg-slate-800 p-8 rounded-xl text-center border border-slate-700 animate-fadeIn">
          <Trophy className="mx-auto text-yellow-400 mb-4" size={48} />
          <h3 className="text-2xl font-bold text-white mb-2">
            You scored {getScore()} / {questions.length}
          </h3>
          <p className="text-slate-400 mb-6">
            {getScore() === 3 ? "Perfect! You're ready to design scalable systems." : "Good effort! Review the sections to master the concepts."}
          </p>
          <button 
            onClick={reset}
            className="flex items-center justify-center gap-2 mx-auto text-neon-blue hover:text-white"
          >
            <RefreshCw size={16} /> Try Again
          </button>
        </div>
      )}
    </div>
  );
};