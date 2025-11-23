import React, { useState } from 'react';
import { Post } from '../types';
import { Heart, MessageCircle, Repeat, Share, MoreHorizontal, Pin, ShieldCheck } from './Icons';

interface PostCardProps {
  post: Post;
  onClick?: () => void;
  onPin?: (postId: string) => void;
  isOwner?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick, onPin, isOwner }) => {
  const [isLiked, setIsLiked] = useState(post.likedByMe);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isReposted, setIsReposted] = useState(false);
  const [repostsCount, setRepostsCount] = useState(post.reposts);
  const [showMenu, setShowMenu] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleRepost = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isReposted) {
      setRepostsCount(prev => prev - 1);
    } else {
      setRepostsCount(prev => prev + 1);
    }
    setIsReposted(!isReposted);
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Logic to open comment modal would go here
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: `Post by ${post.author.username}`,
        text: post.content,
        url: window.location.href
      }).catch(console.error);
    }
  };

  const handleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handlePinAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPin) {
      onPin(post.id);
    }
    setShowMenu(false);
  };

  return (
    <div 
      onClick={onClick}
      className={`border-b border-dag-border p-4 hover:bg-white/5 transition-colors duration-200 cursor-pointer ${post.isPinned ? 'bg-dag-accent/5' : ''}`}
    >
      {/* Pinned Indicator */}
      {post.isPinned && (
        <div className="flex items-center space-x-2 text-gray-500 text-xs font-bold mb-2 ml-12">
          <Pin size={12} className="fill-current" />
          <span>Pinned</span>
        </div>
      )}

      <div className="flex space-x-3">
        <img 
          src={post.author.avatarUrl} 
          alt={post.author.username} 
          className="w-10 h-10 rounded-full object-cover border border-dag-border"
        />
        <div className="flex-1 min-w-0 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 overflow-hidden">
              <span className="font-bold text-white truncate hover:underline" onClick={(e) => {e.stopPropagation();}}>{post.author.username}</span>
              {post.author.isVerified && (
                 <span className="text-dag-accent">
                    <ShieldCheck size={14} className="fill-current" />
                 </span>
              )}
              <span className="text-gray-500 text-sm truncate">{post.author.handle}</span>
              <span className="text-gray-500 text-sm">· {post.timestamp}</span>
            </div>
            
            <div className="relative">
              <button 
                onClick={handleMenu} 
                className="text-gray-500 hover:text-dag-accent p-1 rounded-full hover:bg-dag-accent/10 transition-colors"
              >
                <MoreHorizontal size={16} />
              </button>
              
              {/* Dropdown Menu */}
              {showMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setShowMenu(false); }} />
                  <div className="absolute right-0 mt-2 w-48 bg-dag-card border border-dag-border rounded-lg shadow-xl z-20 py-1 overflow-hidden">
                    {isOwner && onPin && (
                      <button 
                        onClick={handlePinAction} 
                        className="flex items-center space-x-2 w-full px-4 py-3 text-left hover:bg-white/10 text-sm transition-colors text-white"
                      >
                         <Pin size={16} />
                         <span>{post.isPinned ? 'Unpin from profile' : 'Pin to profile'}</span>
                      </button>
                    )}
                    <button className="flex items-center space-x-2 w-full px-4 py-3 text-left hover:bg-white/10 text-sm transition-colors text-white">
                         <Share size={16} />
                         <span>Copy link</span>
                    </button>
                    {!isOwner && (
                       <button className="flex items-center space-x-2 w-full px-4 py-3 text-left hover:bg-white/10 text-sm transition-colors text-red-400">
                           <span>Report post</span>
                       </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          
          <p className="text-gray-200 mt-1 whitespace-pre-wrap text-sm leading-relaxed">
            {post.content}
          </p>
          
          {post.imageUrl && (
            <div className="mt-3 rounded-xl overflow-hidden border border-dag-border">
              <img src={post.imageUrl} alt="Post attachment" className="w-full h-auto object-cover max-h-96" />
            </div>
          )}

          <div className="flex justify-between mt-3 text-gray-500 max-w-md">
            <button 
              onClick={handleComment}
              className="flex items-center space-x-2 hover:text-dag-accent group transition-colors"
            >
              <div className="p-2 rounded-full group-hover:bg-dag-accent/10">
                <MessageCircle size={18} />
              </div>
              <span className="text-xs">{post.comments}</span>
            </button>
            
            <button 
              onClick={handleRepost}
              className={`flex items-center space-x-2 group transition-colors ${isReposted ? 'text-green-400' : 'hover:text-green-400'}`}
            >
               <div className="p-2 rounded-full group-hover:bg-green-400/10">
                <Repeat size={18} />
              </div>
              <span className="text-xs">{repostsCount}</span>
            </button>
            
            <button 
              onClick={handleLike}
              className={`flex items-center space-x-2 group transition-colors ${isLiked ? 'text-pink-500' : 'hover:text-pink-500'}`}
            >
               <div className="p-2 rounded-full group-hover:bg-pink-500/10">
                <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
              </div>
              <span className="text-xs">{likesCount}</span>
            </button>
            
            <button 
              onClick={handleShare}
              className="flex items-center space-x-2 hover:text-dag-accent group transition-colors"
            >
               <div className="p-2 rounded-full group-hover:bg-dag-accent/10">
                <Share size={18} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;