import React, { useState, useCallback } from 'react';
import { User } from '../types';
import { ImageIcon, Sparkles } from './Icons';
import { generatePostContent } from '../services/geminiService';

interface CreatePostProps {
  currentUser: User;
  onPostCreate: (content: string) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ currentUser, onPostCreate }) => {
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePost = () => {
    if (content.trim()) {
      onPostCreate(content);
      setContent('');
    }
  };

  const handleMagicGenerate = useCallback(async () => {
    setIsGenerating(true);
    // In a real app, we might prompt user for a topic.
    // Here we use a random blockchain topic for demo smoothness.
    const topics = ["DAG scalability", "DeFi Regulation", "Web3 Gaming", "Zero Knowledge Proofs", "Future of Bitcoin"];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    
    const generated = await generatePostContent(randomTopic);
    setContent(generated);
    setIsGenerating(false);
  }, []);

  return (
    <div className="p-4 border-b border-dag-border bg-dag-card/20">
      <div className="flex space-x-3">
        <img 
          src={currentUser.avatarUrl} 
          alt={currentUser.username} 
          className="w-10 h-10 rounded-full object-cover" 
        />
        <div className="flex-1">
          <textarea
            className="w-full bg-transparent text-white placeholder-gray-500 text-lg outline-none resize-none min-h-[60px]"
            placeholder="What's happening in the block?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
            <div className="flex space-x-4 text-dag-accent">
              <button className="hover:bg-dag-accent/10 p-2 rounded-full transition-colors">
                <ImageIcon size={20} />
              </button>
              <button 
                onClick={handleMagicGenerate}
                disabled={isGenerating}
                className={`hover:bg-dag-purple/10 p-2 rounded-full transition-colors flex items-center space-x-1 ${isGenerating ? 'opacity-50' : ''}`}
                title="AI Magic Draft"
              >
                <Sparkles size={20} className={isGenerating ? "animate-pulse text-dag-purple" : "text-dag-purple"} />
                <span className="text-xs font-medium text-dag-purple hidden sm:inline">
                  {isGenerating ? 'Generating...' : 'AI Draft'}
                </span>
              </button>
            </div>
            
            <button
              onClick={handlePost}
              disabled={!content.trim()}
              className="bg-dag-accent text-dag-dark font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;