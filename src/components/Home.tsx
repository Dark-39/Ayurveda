import React from 'react';
import { Sparkles, Crown, Star, ArrowRight } from 'lucide-react';

interface HomeProps {
  onStartQuiz: () => void;
}

export default function Home({ onStartQuiz }: HomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Crown className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent leading-tight">
            Discover Your
            <br />
            <span className="text-white">Inner Balance</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Unlock the ancient wisdom of Ayurveda and discover your unique constitution through our comprehensive dosha assessment
          </p>

          <button
            onClick={onStartQuiz}
            className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 rounded-3xl text-xl font-semibold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            <span className="flex items-center gap-3">
              Start Your Journey
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Personalized Assessment</h3>
            <p className="text-gray-300 leading-relaxed">
              Take our comprehensive questionnaire to discover your unique dosha constitution and receive personalized insights
            </p>
          </div>

          <div className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Ancient Wisdom</h3>
            <p className="text-gray-300 leading-relaxed">
              Based on 5,000 years of Ayurvedic knowledge, our assessment provides authentic insights into your mind-body type
            </p>
          </div>

          <div className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Holistic Wellness</h3>
            <p className="text-gray-300 leading-relaxed">
              Understand how your dosha influences your physical, mental, and emotional well-being for optimal health
            </p>
          </div>
        </div>

        {/* Dosha Overview */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            The Three Doshas
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">V</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Vata</h3>
              <p className="text-gray-300 leading-relaxed">
                The energy of movement, governing breathing, circulation, and nervous system functions
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">P</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Pitta</h3>
              <p className="text-gray-300 leading-relaxed">
                The energy of transformation, controlling digestion, metabolism, and body temperature
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">K</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Kapha</h3>
              <p className="text-gray-300 leading-relaxed">
                The energy of structure, providing stability, strength, and immune system support
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}