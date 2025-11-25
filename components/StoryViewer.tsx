import React, { useState, useEffect } from 'react';
import { Story } from '../types';
import { X } from './Icons';

interface StoryViewerProps {
  stories: Story[];
  initialIndex: number;
  onClose: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ stories, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const story = stories[currentIndex];

  useEffect(() => {
    // If the story index is invalid or story doesn't exist, close viewer
    if (!story) {
        onClose();
        return;
    }

    // Auto-advance after 5 seconds
    const timer = setTimeout(() => {
      handleNext();
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex, story, onClose]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  if (!story) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-in fade-in duration-200">
      {/* Progress Bars */}
      <div className="absolute top-0 left-0 right-0 p-2 flex space-x-1 z-20 pt-4 safe-top">
        {stories.map((_, idx) => (
          <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
             <div 
               className={`h-full bg-white transition-all duration-300 ease-linear ${
                 idx < currentIndex ? 'w-full' : idx === currentIndex ? 'w-full' : 'w-0'
               }`}
             />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-6 left-0 right-0 p-4 flex items-center justify-between z-20 mt-2">
        <div className="flex items-center space-x-3 bg-black/20 p-2 rounded-full backdrop-blur-sm">
          <img src={story.user.avatarUrl} alt={story.user.username} className="w-8 h-8 rounded-full border border-white/20" />
          <div className="pr-2">
             <p className="font-bold text-white text-sm drop-shadow-md leading-none">{story.user.username}</p>
             <p className="text-gray-200 text-xs drop-shadow-md leading-none mt-0.5">Just now</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors bg-black/20 backdrop-blur-sm">
          <X size={24} className="text-white drop-shadow-md" />
        </button>
      </div>

      {/* Image */}
      <div className="flex-1 flex items-center justify-center bg-black relative">
         <img src={story.imageUrl} alt="Story" className="max-h-full max-w-full object-contain" />
         
         {/* Touch Zones */}
         <div className="absolute inset-y-0 left-0 w-1/3 z-10 h-full cursor-pointer" onClick={(e) => { e.stopPropagation(); handlePrev(); }}></div>
         <div className="absolute inset-y-0 right-0 w-2/3 z-10 h-full cursor-pointer" onClick={(e) => { e.stopPropagation(); handleNext(); }}></div>
      </div>
    </div>
  );
};

export default StoryViewer;