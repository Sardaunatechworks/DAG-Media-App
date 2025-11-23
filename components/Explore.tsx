import React from 'react';
import { Search } from './Icons';
import { Post } from '../types';
import PostCard from './PostCard';
import { TRENDING_TOPICS } from '../constants';

interface ExploreProps {
  posts: Post[];
}

const Explore: React.FC<ExploreProps> = ({ posts }) => {
  return (
    <div className="pb-20 md:pb-0">
      {/* Search Header */}
      <div className="sticky top-0 z-10 bg-dag-dark/95 backdrop-blur-md px-4 py-3 border-b border-dag-border">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search DAG Media"
            className="w-full bg-dag-card border border-transparent focus:border-dag-accent rounded-full py-2 pl-10 pr-4 text-gray-200 placeholder-gray-500 focus:bg-black transition-all outline-none"
          />
        </div>
      </div>

      {/* Trending Topics Grid */}
      <div className="p-4">
        <h3 className="font-bold text-xl mb-4 text-white">Trending on DAG</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {TRENDING_TOPICS.map((topic) => (
            <div key={topic.id} className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer">
              <img src={topic.imageUrl} alt={topic.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <p className="font-bold text-white text-lg shadow-black drop-shadow-md">{topic.name}</p>
                <p className="text-xs text-gray-300">{topic.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explore Feed */}
      <div className="border-t border-dag-border">
         <div className="px-4 py-3 font-bold text-lg text-white">For You</div>
         {posts.map(post => (
           <PostCard key={`explore-${post.id}`} post={post} />
         ))}
      </div>
    </div>
  );
};

export default Explore;