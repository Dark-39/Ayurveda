import React, { useState } from 'react';
import { User, Edit3, Award, BarChart3, Target, Star, Sparkles, Crown } from 'lucide-react';
import { doshaInfo } from '../data/doshas';
import { UserProfile } from '../types';
import Header from './Header';

interface ProfileProps {
  userProfile: UserProfile;
  onUpdateProfile: (profile: Partial<UserProfile>) => void;
  onStartQuiz: () => void;
}

const Profile: React.FC<ProfileProps> = ({ userProfile, onUpdateProfile, onStartQuiz }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: userProfile.name || '',
    age: userProfile.age || ''
  });

  const handleSave = () => {
    onUpdateProfile({
      name: editForm.name,
      age: editForm.age ? parseInt(editForm.age.toString()) : undefined
    });
    setIsEditing(false);
  };

  const getDoshaColor = (dosha: string) => {
    switch (dosha) {
      case 'vata': return 'from-blue-500 to-indigo-600';
      case 'pitta': return 'from-red-500 to-pink-600';
      case 'kapha': return 'from-green-500 to-emerald-600';
      default: return 'from-gray-500 to-slate-600';
    }
  };

  const getDoshaScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 70) return 'bg-gradient-to-r from-emerald-500 to-teal-500';
    if (percentage >= 40) return 'bg-gradient-to-r from-amber-500 to-orange-500';
    return 'bg-gradient-to-r from-slate-400 to-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 pb-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 left-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <Header title="Profile" />
      
      <div className="relative px-6 space-y-8">
        {/* Profile Info */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          {isEditing ? (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Edit3 size={24} className="mr-3 text-purple-300" />
                Edit Profile
              </h3>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-purple-200 mb-2">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-purple-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-purple-200 mb-2">Age</label>
                <input
                  type="number"
                  value={editForm.age}
                  onChange={(e) => setEditForm({...editForm, age: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-purple-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your age"
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-2xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-white/10 backdrop-blur-sm text-white py-3 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-6 shadow-lg">
                    <User size={36} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {userProfile.name || 'Wellness Seeker'}
                    </h3>
                    {userProfile.age && (
                      <p className="text-purple-200 text-lg">{userProfile.age} years old</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-3 text-purple-300 hover:text-white transition-colors duration-300 bg-white/10 rounded-2xl hover:bg-white/20"
                >
                  <Edit3 size={24} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Dosha Results */}
        {userProfile.completedQuestionnaire && userProfile.dominantDosha ? (
          <div className="space-y-8">
            {/* Dominant Dosha */}
            <div className={`bg-gradient-to-br ${getDoshaColor(userProfile.dominantDosha)} rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
              <div className="relative">
                <div className="flex items-center mb-6">
                  <Crown size={28} className="mr-4" />
                  <h3 className="text-2xl font-bold">Your Dominant Dosha</h3>
                </div>
                <div className="text-4xl font-bold capitalize mb-4">
                  {userProfile.dominantDosha}
                </div>
                <p className="text-lg opacity-90 leading-relaxed">
                  {doshaInfo[userProfile.dominantDosha].description}
                </p>
              </div>
            </div>

            {/* Dosha Scores */}
            {userProfile.doshaScores && (
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <BarChart3 size={24} className="mr-3 text-purple-300" />
                  Dosha Balance
                </h3>
                <div className="space-y-6">
                  {Object.entries(userProfile.doshaScores).map(([dosha, score]) => {
                    const maxScore = Math.max(...Object.values(userProfile.doshaScores!));
                    const percentage = (score / maxScore) * 100;
                    return (
                      <div key={dosha}>
                        <div className="flex justify-between items-center mb-3">
                          <span className="capitalize font-semibold text-white text-lg">{dosha}</span>
                          <span className="text-purple-200 font-medium">{score} points</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
                          <div 
                            className={`h-4 rounded-full transition-all duration-1000 ${getDoshaScoreColor(score, maxScore)} shadow-lg`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Recommendations */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Target size={24} className="mr-3 text-purple-300" />
                Personalized Recommendations
              </h3>
              <div className="space-y-4">
                {doshaInfo[userProfile.dominantDosha].recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300">
                    <Star size={16} className="text-purple-300 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-purple-100 leading-relaxed">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Retake Quiz */}
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-3xl p-8 border border-amber-400/30">
              <div className="text-center">
                <Sparkles size={32} className="text-amber-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Reassess Your Dosha</h3>
                <p className="text-amber-200 mb-6 text-lg leading-relaxed">
                Your constitution can change over time. Retake the assessment to get updated recommendations.
                </p>
                <button
                  onClick={onStartQuiz}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Retake Assessment
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* No Quiz Taken */
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Award size={40} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Discover Your Dosha</h3>
            <p className="text-purple-200 mb-8 text-lg leading-relaxed max-w-md mx-auto">
              Take our comprehensive assessment to understand your unique constitution and get personalized wellness recommendations.
            </p>
            <button
              onClick={onStartQuiz}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Take Dosha Assessment
            </button>
          </div>
        )}

        {/* Wellness Stats */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Your Wellness Journey</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl border border-emerald-400/30">
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                {userProfile.completedQuestionnaire ? '1' : '0'}
              </div>
              <div className="text-sm text-emerald-200 font-semibold mt-2">Assessments Completed</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl border border-blue-400/30">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">∞</div>
              <div className="text-sm text-blue-200 font-semibold mt-2">Potential Unlocked</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;