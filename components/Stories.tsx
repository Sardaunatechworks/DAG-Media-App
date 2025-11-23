import React from 'react';
import { Story } from '../types';

interface StoriesProps {
  stories: Story[];
}

const Stories: React.FC<StoriesProps> = ({ stories }) => {
  return (
    <div className="flex space-x-4 overflow-x-auto p-4 border-b border-dag-border no-scrollbar bg-dag-card/30 backdrop-blur-sm">
      {/* Add Story Button */}
      <div className="flex flex-col items-center space-y-1 min-w-[70px] cursor-pointer">
        <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-500 flex items-center justify-center relative bg-gray-800">
          <span className="text-2xl text-dag-accent font-light">+</span>
        </div>
        <span className="text-xs text-gray-400 truncate w-full text-center">Add Story</span>
      </div>

      {stories.map((story) => (
        <div key={story.id} className="flex flex-col items-center space-y-1 min-w-[70px] cursor-pointer group">
          <div className={`w-16 h-16 rounded-full p-[2px] ${story.hasUnseen ? 'bg-gradient-to-tr from-dag-accent to-dag-purple' : 'bg-gray-700'}`}>
            <img 
              src={story.user.avatarUrl} 
              alt={story.user.username} 
              className="w-full h-full rounded-full border-2 border-dag-dark object-cover group-hover:scale-95 transition-transform" 
            />
          </div>
          <span className="text-xs text-gray-300 truncate w-16 text-center">{story.user.username}</span>
        </div>
      ))}
    </div>
  );
};

export default Stories;