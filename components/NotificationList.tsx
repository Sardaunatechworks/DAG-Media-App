import React, { useState } from 'react';
import { Notification, NotificationType } from '../types';
import { Heart, User, MessageCircle, Star, ShieldCheck } from './Icons';

interface NotificationListProps {
  notifications: Notification[];
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
  const [filter, setFilter] = useState<'ALL' | 'OFFICIAL' | 'MENTIONS'>('ALL');

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.LIKE: return <Heart size={20} className="text-pink-500 fill-current" />;
      case NotificationType.FOLLOW: return <User size={20} className="text-dag-accent fill-current" />;
      case NotificationType.COMMENT: return <MessageCircle size={20} className="text-blue-400 fill-current" />;
      case NotificationType.OFFICIAL: return <ShieldCheck size={24} className="text-yellow-400" />;
      default: return <Star size={20} className="text-purple-500" />;
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'OFFICIAL') return n.type === NotificationType.OFFICIAL;
    if (filter === 'MENTIONS') return n.type === NotificationType.MENTION;
    return true;
  });

  return (
    <div className="pb-20 md:pb-0 min-h-screen">
      <div className="sticky top-0 z-10 bg-dag-dark/95 backdrop-blur-md border-b border-dag-border">
        <div className="px-4 py-3">
          <h2 className="text-xl font-bold text-white">Notifications</h2>
        </div>
        <div className="flex px-4 space-x-6 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setFilter('ALL')}
            className={`py-3 text-sm font-medium border-b-2 transition-colors ${filter === 'ALL' ? 'border-dag-accent text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('OFFICIAL')}
            className={`py-3 text-sm font-medium border-b-2 transition-colors flex items-center space-x-1 ${filter === 'OFFICIAL' ? 'border-yellow-400 text-yellow-400' : 'border-transparent text-gray-500 hover:text-yellow-400'}`}
          >
            <ShieldCheck size={14} />
            <span>BlockDAG Official</span>
          </button>
          <button 
             onClick={() => setFilter('MENTIONS')}
             className={`py-3 text-sm font-medium border-b-2 transition-colors ${filter === 'MENTIONS' ? 'border-dag-accent text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
          >
            Mentions
          </button>
        </div>
      </div>

      <div className="divide-y divide-dag-border">
        {filteredNotifications.length === 0 && (
            <div className="p-12 text-center flex flex-col items-center justify-center text-gray-500 space-y-4">
                <div className="bg-dag-card p-4 rounded-full">
                    <Star size={32} className="text-gray-600" />
                </div>
                <p>No notifications here yet.</p>
            </div>
        )}
        {filteredNotifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`p-4 flex space-x-3 hover:bg-white/5 transition-colors cursor-pointer 
              ${!notification.isRead ? 'bg-dag-card/30' : ''}
              ${notification.type === NotificationType.OFFICIAL ? 'border-l-4 border-yellow-400 bg-yellow-400/5' : ''}
            `}
          >
            <div className="mt-1 min-w-[30px] flex justify-end">
              {getIcon(notification.type)}
            </div>
            <div className="flex-1">
              {notification.type === NotificationType.OFFICIAL ? (
                 <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                         <img src={notification.user?.avatarUrl} alt="Official" className="w-6 h-6 rounded-full border border-yellow-400" />
                         <span className="font-bold text-white text-sm">BlockDAG Official</span>
                         <span className="text-gray-400 text-xs">· {notification.timestamp}</span>
                    </div>
                    {notification.title && <h4 className="font-bold text-white text-md mt-1">{notification.title}</h4>}
                    <p className="text-gray-300 text-sm leading-relaxed">{notification.content}</p>
                 </div>
              ) : (
                <div className="flex flex-col">
                   <div className="flex items-center mb-1 flex-wrap">
                        <img src={notification.user?.avatarUrl} alt={notification.user?.username} className="w-8 h-8 rounded-full mr-2 object-cover" />
                        <span className="font-bold text-white mr-1 text-sm">{notification.user?.username}</span>
                        <span className="text-gray-400 text-sm">{notification.content}</span>
                   </div>
                   <p className="text-gray-500 text-xs mt-1">{notification.timestamp}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationList;