import React from 'react';
import { Search, MoreHorizontal } from './Icons';

const Widgets: React.FC = () => {
  const trends = [
    { topic: 'Tech • Trending', name: '#DAGSummer', posts: '12.5K posts' },
    { topic: 'Crypto • Trending', name: '$SOL', posts: '45.2K posts' },
    { topic: 'Technology', name: 'Web3 Identity', posts: '8.1K posts' },
    { topic: 'Trending', name: 'ZeroKnowledge', posts: '5K posts' },
  ];

  return (
    <div className="h-screen py-4 pl-6 pr-4 sticky top-0 overflow-y-auto no-scrollbar">
      {/* Search */}
      <div className="sticky top-0 bg-dag-dark z-10 pb-4 pt-2">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-dag-accent">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search BDAG"
            className="w-full bg-dag-card border-none rounded-full py-3 pl-10 pr-4 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-dag-accent focus:bg-black transition-all outline-none"
          />
        </div>
      </div>

      {/* Trending */}
      <div className="bg-dag-card rounded-2xl p-4 mb-4">
        <h2 className="font-bold text-xl mb-4 px-2">What's happening</h2>
        <div className="space-y-4">
          {trends.map((trend, i) => (
            <div key={i} className="px-2 py-1 hover:bg-white/5 rounded-lg cursor-pointer transition-colors relative">
              <div className="flex justify-between text-gray-500 text-xs">
                <span>{trend.topic}</span>
                <button className="hover:text-dag-accent"><MoreHorizontal size={14} /></button>
              </div>
              <p className="font-bold text-white mt-0.5">{trend.name}</p>
              <span className="text-gray-500 text-xs">{trend.posts}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 px-2 text-dag-accent text-sm cursor-pointer hover:underline">Show more</div>
      </div>

      {/* Who to follow */}
      <div className="bg-dag-card rounded-2xl p-4">
        <h2 className="font-bold text-xl mb-4 px-2">Who to follow</h2>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between px-2">
              <div className="flex items-center space-x-2">
                <img src={`https://picsum.photos/50/50?random=${i+100}`} alt="User" className="w-10 h-10 rounded-full" />
                <div className="text-sm">
                  <div className="font-bold hover:underline cursor-pointer">User_{i}</div>
                  <div className="text-gray-500">@user_{i}_eth</div>
                </div>
              </div>
              <button className="bg-white text-black text-sm font-bold px-4 py-1.5 rounded-full hover:bg-gray-200">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 px-4 text-xs text-gray-600 flex flex-wrap gap-2">
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
          <span>Cookie Policy</span>
          <span>© 2025 BDAG Social</span>
      </div>
    </div>
  );
};

export default Widgets;