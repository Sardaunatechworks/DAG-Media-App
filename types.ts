export interface User {
  id: string;
  username: string;
  handle: string;
  avatarUrl: string;
  bio: string;
  isVerified: boolean;
  walletAddress?: string;
  followers: number;
  following: number;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatarUrl: string;
  content: string;
  timestamp: string;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  imageUrl?: string;
  timestamp: string;
  likes: number;
  comments: number;
  reposts: number;
  tags: string[];
  likedByMe: boolean;
  commentList?: Comment[];
  isPinned?: boolean;
  isReply?: boolean;
}

export interface Story {
  id: string;
  user: User;
  imageUrl: string;
  hasUnseen: boolean;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  imageUrl: string;
}

export enum NotificationType {
  LIKE = 'LIKE',
  COMMENT = 'COMMENT',
  FOLLOW = 'FOLLOW',
  MENTION = 'MENTION',
  OFFICIAL = 'OFFICIAL'
}

export interface Notification {
  id: string;
  type: NotificationType;
  user?: User; // Optional for system/official messages if no specific user profile
  title?: string; // For official announcements
  content?: string;
  timestamp: string;
  isRead: boolean;
  isOfficial?: boolean;
}

export interface NFT {
  id: string;
  name: string;
  collection: string;
  imageUrl: string;
}

export interface Token {
  symbol: string;
  name: string;
  balance: string;
  value: string;
  change: string; // e.g. "+2.5%"
  iconUrl?: string;
}

export enum ViewState {
  HOME = 'HOME',
  EXPLORE = 'EXPLORE',
  COMMUNITIES = 'COMMUNITIES',
  PROFILE = 'PROFILE',
  NOTIFICATIONS = 'NOTIFICATIONS',
  WALLET = 'WALLET',
  MORE = 'MORE'
}