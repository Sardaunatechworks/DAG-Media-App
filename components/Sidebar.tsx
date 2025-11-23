import React from 'react';
import { ViewState, User } from '../types';
import { Home, Hash, Users, Bell, User as UserIcon, MoreHorizontal, Wallet } from './Icons';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  currentUser: User;
  onPostClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, currentUser, onPostClick }) => {
  const navItems = [
    { view: ViewState.HOME, icon: Home, label: 'Home' },
    { view: ViewState.EXPLORE, icon: Hash, label: 'Explore' },
    { view: ViewState.COMMUNITIES, icon: Users, label: 'Communities' },
    { view: ViewState.NOTIFICATIONS, icon: Bell, label: 'Notifications' },
    { view: ViewState.WALLET, icon: Wallet, label: 'Wallet' },
    { view: ViewState.PROFILE, icon: UserIcon, label: 'Profile' },
  ];

  return (
    <div className="h-screen flex flex-col justify-between py-4 px-4 sticky top-0">
      <div className="space-y-6">
        {/* Logo */}
        <div className="px-4 py-2 cursor-pointer" onClick={() => onViewChange(ViewState.HOME)}>
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-dag-accent rounded-lg flex items-center justify-center transform rotate-45">
                    <div className="w-4 h-4 bg-dag-dark transform -rotate-45" />
                </div>
                <h1 className="text-xl xl:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-dag-accent to-dag-purple whitespace-nowrap hidden xl:block">
                DAG Media
                </h1>
                <h1 className="text-xl font-bold text-dag-accent xl:hidden">
                  DM
                </h1>
            </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onViewChange(item.view)}
              className={`flex items-center space-x-4 w-full px-4 py-3 rounded-full transition-colors duration-200 text-lg group ${
                currentView === item.view 
                  ? 'font-bold text-white bg-white/10' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={26} strokeWidth={currentView === item.view ? 2.5 : 2} className="flex-shrink-0" />
              <span className="hidden xl:block">{item.label}</span>
            </button>
          ))}
          
           <button
              onClick={() => onViewChange(ViewState.MORE)}
              className={`flex items-center space-x-4 w-full px-4 py-3 rounded-full transition-colors duration-200 text-lg ${
                currentView === ViewState.MORE 
                  ? 'font-bold text-white bg-white/10' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <MoreHorizontal size={26} strokeWidth={2} className="flex-shrink-0" />
              <span className="hidden xl:block">More</span>
            </button>
        </nav>

        <button 
          onClick={onPostClick}
          className="w-12 h-12 xl:w-full xl:h-auto bg-dag-accent text-dag-dark font-bold py-3 rounded-full shadow-lg shadow-dag-accent/20 hover:bg-opacity-90 transition-all mt-4 flex items-center justify-center"
        >
          <span className="hidden xl:block">Post</span>
          <span className="xl:hidden">+</span>
        </button>
      </div>

      {/* User Profile / Wallet */}
      <div className="p-3 rounded-full hover:bg-white/5 cursor-pointer transition-colors flex items-center space-x-3" onClick={() => onViewChange(ViewState.PROFILE)}>
         <img src={currentUser.avatarUrl} alt="Me" className="w-10 h-10 rounded-full flex-shrink-0" />
         <div className="flex-1 min-w-0 hidden xl:block">
             <p className="font-bold text-sm truncate">{currentUser.username}</p>
             <p className="text-gray-500 text-xs truncate">{currentUser.handle}</p>
         </div>
         <div className="text-dag-accent hidden xl:block">
             <Wallet size={20} />
         </div>
      </div>
    </div>
  );
};

export default Sidebar;