import React from 'react';
import { Community } from '../types';

interface CommunityCardProps {
  community: Community;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ community }) => {
  return (
    <div className="bg-dag-card border border-dag-border rounded-xl p-4 flex items-center space-x-4 hover:border-dag-accent/50 transition-all cursor-pointer">
      <img 
        src={community.imageUrl} 
        alt={community.name} 
        className="w-16 h-16 rounded-lg object-cover"
      />
      <div className="flex-1">
        <h3 className="font-bold text-white">{community.name}</h3>
        <p className="text-sm text-gray-400 line-clamp-1">{community.description}</p>
        <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
          <span className="text-dag-purple font-medium">{community.memberCount.toLocaleString()} Members</span>
        </div>
      </div>
      <button className="px-4 py-2 rounded-full border border-dag-accent text-dag-accent text-sm font-medium hover:bg-dag-accent hover:text-dag-dark transition-colors">
        Join
      </button>
    </div>
  );
};

export default CommunityCard;