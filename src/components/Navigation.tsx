import React from 'react';
import { Home, User } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-900 to-indigo-900 backdrop-blur-lg border-t border-purple-700/30 px-6 py-4 z-50">
      <div className="flex justify-center items-center max-w-md mx-auto space-x-12">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab.id
                  ? 'text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30'
                  : 'text-purple-200 hover:text-white hover:bg-purple-800/50'
              }`}
            >
              <IconComponent size={24} />
              <span className="text-sm mt-2 font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;