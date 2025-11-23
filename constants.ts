import { User, Post, Story, Community, Notification, NotificationType, NFT, Token } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  username: 'CryptoDev',
  handle: '@cryptodev',
  avatarUrl: 'https://picsum.photos/200/200?random=1',
  bio: 'Building the future on DAG. Rust & Solidity.',
  isVerified: true,
  walletAddress: '0x71C...9A21',
  followers: 1250,
  following: 420,
};

export const OFFICIAL_USER: User = {
  id: 'u_official',
  username: 'BlockDAG Official',
  handle: '@blockdag_official',
  avatarUrl: 'https://picsum.photos/200/200?random=99',
  bio: 'Official updates from the BlockDAG team.',
  isVerified: true,
  followers: 1000000,
  following: 0,
};

export const USERS: User[] = [
  CURRENT_USER,
  OFFICIAL_USER,
  {
    id: 'u2',
    username: 'AliceChain',
    handle: '@alice_chain',
    avatarUrl: 'https://picsum.photos/200/200?random=2',
    bio: 'DeFi enthusiast and NFT collector.',
    isVerified: false,
    followers: 890,
    following: 120,
  },
  {
    id: 'u3',
    username: 'BlockMaster',
    handle: '@block_m',
    avatarUrl: 'https://picsum.photos/200/200?random=3',
    bio: 'Analyzing the consensus mechanisms.',
    isVerified: true,
    followers: 5000,
    following: 50,
  },
];

export const STORIES: Story[] = [
  { id: 's1', user: USERS[2], imageUrl: 'https://picsum.photos/400/800?random=10', hasUnseen: true },
  { id: 's2', user: USERS[3], imageUrl: 'https://picsum.photos/400/800?random=11', hasUnseen: false },
  { id: 's3', user: CURRENT_USER, imageUrl: 'https://picsum.photos/400/800?random=12', hasUnseen: false },
  { id: 's4', user: { ...USERS[2], id: 'u4', username: 'DaoVinci' }, imageUrl: 'https://picsum.photos/400/800?random=13', hasUnseen: true },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    author: USERS[3],
    content: 'The throughput on the new DAG protocol is insane. 50k TPS achieved in testnet! 🚀 #DAG #Crypto #Blockchain',
    timestamp: '2h ago',
    likes: 1240,
    comments: 45,
    reposts: 120,
    tags: ['DAG', 'Crypto', 'Blockchain'],
    likedByMe: true,
  },
  {
    id: 'p2',
    author: USERS[2],
    content: 'Just minted my first dynamic NFT. The metadata changes based on market volatility. What do you guys think?',
    imageUrl: 'https://picsum.photos/600/400?random=20',
    timestamp: '4h ago',
    likes: 850,
    comments: 22,
    reposts: 50,
    tags: ['NFT', 'Art'],
    likedByMe: false,
  },
  {
    id: 'p3',
    author: CURRENT_USER,
    content: 'Working on a new smart contract for decentralized identity. Privacy is key. 🔐',
    timestamp: '5h ago',
    likes: 300,
    comments: 10,
    reposts: 5,
    tags: ['Dev', 'Privacy'],
    likedByMe: false,
  },
  {
    id: 'p4',
    author: OFFICIAL_USER,
    content: '📢 MAJOR ANNOUNCEMENT: Mainnet launch date has been set! Get ready for the next generation of DAG technology. Read the full whitepaper on our site. #BlockDAG #Mainnet',
    imageUrl: 'https://picsum.photos/600/300?random=44',
    timestamp: '1d ago',
    likes: 15000,
    comments: 890,
    reposts: 5000,
    tags: ['BlockDAG', 'Mainnet', 'Announcement'],
    likedByMe: false,
  },
  {
    id: 'p5',
    author: CURRENT_USER,
    content: 'Replying to @alice_chain: That dynamic NFT concept sounds amazing! Is it on the mainnet yet?',
    timestamp: '3h ago',
    likes: 25,
    comments: 2,
    reposts: 0,
    tags: [],
    likedByMe: false,
    isReply: true,
  },
  {
    id: 'p6',
    author: CURRENT_USER,
    content: 'Check out my workspace setup for today! Coding mode: ON.',
    imageUrl: 'https://picsum.photos/600/400?random=55',
    timestamp: '2d ago',
    likes: 150,
    comments: 12,
    reposts: 3,
    tags: ['Setup', 'DevLife'],
    likedByMe: false,
  }
];

export const COMMUNITIES: Community[] = [
  { id: 'c1', name: 'DAG Developers', description: 'Technical discussions about DAG implementation.', memberCount: 15400, imageUrl: 'https://picsum.photos/100/100?random=50' },
  { id: 'c2', name: 'NFT Collectors', description: 'Showcase your latest drops.', memberCount: 8200, imageUrl: 'https://picsum.photos/100/100?random=51' },
  { id: 'c3', name: 'Layer 1 Wars', description: 'Debating the best infrastructure.', memberCount: 25000, imageUrl: 'https://picsum.photos/100/100?random=52' },
];

export const NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: NotificationType.OFFICIAL,
    user: OFFICIAL_USER,
    title: 'System Update',
    content: 'The BlockDAG network will undergo scheduled maintenance on Sunday at 02:00 UTC.',
    timestamp: '1h ago',
    isRead: false,
    isOfficial: true,
  },
  {
    id: 'n2',
    type: NotificationType.LIKE,
    user: USERS[2],
    content: 'liked your post about Smart Contracts.',
    timestamp: '2h ago',
    isRead: false,
  },
  {
    id: 'n3',
    type: NotificationType.FOLLOW,
    user: USERS[3],
    content: 'followed you.',
    timestamp: '5h ago',
    isRead: true,
  },
  {
    id: 'n4',
    type: NotificationType.OFFICIAL,
    user: OFFICIAL_USER,
    title: 'Airdrop Alert',
    content: 'Early adopters round 2 snapshot has been taken. Check your eligibility.',
    timestamp: '1d ago',
    isRead: true,
    isOfficial: true,
  },
  {
    id: 'n5',
    type: NotificationType.MENTION,
    user: USERS[2],
    content: 'mentioned you in a post: "@cryptodev what do you think about this?"',
    timestamp: '1d ago',
    isRead: true,
  }
];

export const TRENDING_TOPICS = [
  { id: 't1', name: '#DAGMedia', count: '50.2K Posts', imageUrl: 'https://picsum.photos/200/200?random=81' },
  { id: 't2', name: '#Web3Gaming', count: '22.1K Posts', imageUrl: 'https://picsum.photos/200/200?random=82' },
  { id: 't3', name: '#DeFiSummer', count: '15.8K Posts', imageUrl: 'https://picsum.photos/200/200?random=83' },
  { id: 't4', name: '#NFTDrop', count: '10.5K Posts', imageUrl: 'https://picsum.photos/200/200?random=84' },
];

export const MOCK_NFTS: NFT[] = [
  { id: 'nft1', name: 'Cyber Punk #2077', collection: 'CyberDAG', imageUrl: 'https://picsum.photos/300/300?random=200' },
  { id: 'nft2', name: 'Genesis Block', collection: 'DAG History', imageUrl: 'https://picsum.photos/300/300?random=201' },
  { id: 'nft3', name: 'Abstract Mind', collection: 'Art on Chain', imageUrl: 'https://picsum.photos/300/300?random=202' },
  { id: 'nft4', name: 'Golden Ticket', collection: 'DAO Membership', imageUrl: 'https://picsum.photos/300/300?random=203' },
];

export const WALLET_TOKENS: Token[] = [
  { symbol: 'BDAG', name: 'BlockDAG', balance: '12,500.00', value: '$4,250.00', change: '+5.2%' },
  { symbol: 'ETH', name: 'Ethereum', balance: '1.45', value: '$3,890.12', change: '-1.2%' },
  { symbol: 'USDT', name: 'Tether', balance: '540.00', value: '$540.00', change: '0.0%' },
];
