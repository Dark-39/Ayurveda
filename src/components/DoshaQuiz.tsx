import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, X } from 'lucide-react';
import { doshaQuestions } from '../data/questions';
import { doshaInfo } from '../data/doshas';
import type { DoshaResult } from '../types';

interface DoshaQuizProps {
  onComplete: (result: DoshaResult) => void;
  onClose: () => void;
}

export default function DoshaQuiz({ onComplete, onClose }: DoshaQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(doshaQuestions.length).fill(-1));

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
    
    // Auto-advance to next question after a short delay
    if (currentQuestion < doshaQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 500);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < doshaQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = () => {
    const scores = { vata: 0, pitta: 0, kapha: 0 };
    
    answers.forEach((answerIndex, questionIndex) => {
      if (answerIndex !== -1) {
        const question = doshaQuestions[questionIndex];
        const selectedAnswer = question.answers[answerIndex];
        scores[selectedAnswer.dosha] += selectedAnswer.score;
      }
    });

    const total = scores.vata + scores.pitta + scores.kapha;
    const percentages = {
      vata: Math.round((scores.vata / total) * 100),
      pitta: Math.round((scores.pitta / total) * 100),
      kapha: Math.round((scores.kapha / total) * 100)
    };

    const dominant = Object.entries(percentages).reduce((a, b) => 
      percentages[a[0] as keyof typeof percentages] > percentages[b[0] as keyof typeof percentages] ? a : b
    )[0] as keyof typeof percentages;

    // Pass the results in the format expected by the App component
    onComplete({
      dominantDosha: dominant,
      doshaScores: scores,
      completedQuestionnaire: true
    });
  };

  const progress = ((currentQuestion + 1) / doshaQuestions.length) * 100;
  const isAnswered = answers[currentQuestion] !== -1;
  const allAnswered = answers.every(answer => answer !== -1);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden z-50">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
          >
            <X className="w-5 h-5" />
            Close
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Dosha Assessment</h1>
            <p className="text-gray-300">Question {currentQuestion + 1} of {doshaQuestions.length}</p>
          </div>
          
          <div className="w-20"></div>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="w-full bg-white/10 rounded-full h-3 backdrop-blur-sm">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-relaxed">
              {doshaQuestions[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {doshaQuestions[currentQuestion].answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                    answers[currentQuestion] === index
                      ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 border-purple-400 shadow-lg shadow-purple-500/20'
                      : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white text-lg leading-relaxed pr-4">
                      {answer.text}
                    </span>
                    {answers[currentQuestion] === index && (
                      <CheckCircle className="w-6 h-6 text-purple-400 flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                currentQuestion === 0
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Previous
            </button>

            {currentQuestion === doshaQuestions.length - 1 ? (
              <button
                onClick={calculateResult}
                disabled={!allAnswered}
                className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  allAnswered
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                Complete Assessment
                <CheckCircle className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                disabled={!isAnswered}
                className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isAnswered
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                Next
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}