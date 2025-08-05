import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Profile from './components/Profile';
import DoshaQuiz from './components/DoshaQuiz';
import { UserProfile } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showQuiz, setShowQuiz] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    completedQuestionnaire: false,
  });

  // Load profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('ayurveda-profile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ayurveda-profile', JSON.stringify(userProfile));
  }, [userProfile]);

  const handleQuizComplete = (quizResults: Partial<UserProfile>) => {
    setUserProfile(prev => ({
      ...prev,
      ...quizResults,
      completedQuestionnaire: true,
    }));
    setShowQuiz(false);
  };

  const handleUpdateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({
      ...prev,
      ...updates,
    }));
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Home 
            onStartQuiz={() => setShowQuiz(true)} 
            userProfile={userProfile}
          />
        );
      case 'profile':
        return (
          <Profile 
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            onStartQuiz={() => setShowQuiz(true)}
          />
        );
      default:
        return (
          <Home 
            onStartQuiz={() => setShowQuiz(true)} 
            userProfile={userProfile}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {renderActiveTab()}
      
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {showQuiz && (
        <DoshaQuiz 
          onComplete={handleQuizComplete}
          onClose={() => setShowQuiz(false)}
        />
      )}
    </div>
  );
}

export default App;