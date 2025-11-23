import React from 'react';
import { User as UserIcon, ShieldCheck, Wallet, Bell, Lock, HelpCircle, LogOut } from './Icons';
import { User } from '../types';

interface MoreViewProps {
  currentUser: User;
}

const MoreView: React.FC<MoreViewProps> = ({ currentUser }) => {
  const menuItems = [
    { icon: UserIcon, label: 'Account Information', desc: 'See your account information like phone number and email address.' },
    { icon: Lock, label: 'Privacy & Safety', desc: 'Manage what information you see and share on DAG Media.' },
    { icon: Bell, label: 'Notifications', desc: 'Select the kinds of notifications you get about your activities, interests, and recommendations.' },
    { icon: Wallet, label: 'Wallet Integration', desc: 'Manage your connected Web3 wallets and NFT assets.' },
    { icon: ShieldCheck, label: 'Security', desc: 'Manage your account\'s security and keep track of your account usage.' },
    { icon: HelpCircle, label: 'Help Center', desc: 'Get help with any issues you are facing.' },
  ];

  return (
    <div className="pb-20 md:pb-0 min-h-screen bg-dag-dark">
      <div className="sticky top-0 z-10 bg-dag-dark/95 backdrop-blur-md px-4 py-3 border-b border-dag-border">
        <h2 className="text-xl font-bold text-white">More Options</h2>
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        <div className="bg-dag-card rounded-2xl p-6 mb-6 flex items-center space-x-4 border border-dag-border shadow-lg">
             <img src={currentUser.avatarUrl} alt="Profile" className="w-16 h-16 rounded-full border-2 border-dag-accent object-cover" />
             <div>
                 <h3 className="font-bold text-xl text-white">{currentUser.username}</h3>
                 <p className="text-gray-500">{currentUser.handle}</p>
                 <div className="mt-2 text-xs text-dag-accent border border-dag-accent/30 bg-dag-accent/10 px-2 py-0.5 rounded inline-block">
                    Verified Member
                 </div>
             </div>
        </div>

        <div className="space-y-3">
            {menuItems.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-dag-card/30 hover:bg-dag-card rounded-xl cursor-pointer transition-all duration-200 group border border-transparent hover:border-dag-border">
                    <div className="text-gray-400 group-hover:text-dag-accent mt-1 bg-white/5 p-2 rounded-lg transition-colors group-hover:bg-dag-accent/10">
                        <item.icon size={24} />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-white group-hover:text-dag-accent transition-colors">{item.label}</h4>
                        <p className="text-sm text-gray-500 mt-1 leading-snug">{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-8 border-t border-dag-border pt-6 pb-6">
            <button className="flex items-center justify-center space-x-2 text-red-500 bg-red-500/10 p-4 hover:bg-red-500/20 w-full rounded-xl transition-colors font-bold border border-red-500/20">
                <LogOut size={20} />
                <span>Log Out</span>
            </button>
            <p className="text-center text-xs text-gray-600 mt-6">
                DAG Media App v1.0.2-beta <br/>
                Build 2025.10.15
            </p>
        </div>
      </div>
    </div>
  );
};

export default MoreView;