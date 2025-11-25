import React, { useState, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Widgets from './components/Widgets';
import PostCard from './components/PostCard';
import CreatePost from './components/CreatePost';
import Stories from './components/Stories';
import StoryViewer from './components/StoryViewer';
import CommunityCard from './components/CommunityCard';
import Explore from './components/Explore';
import NotificationList from './components/NotificationList';
import MoreView from './components/MoreView';
import WalletView from './components/WalletView';
import EditProfileModal from './components/EditProfileModal';
import { ViewState, Post, User as UserType, Story } from './types';
import { CURRENT_USER, INITIAL_POSTS, STORIES, COMMUNITIES, NOTIFICATIONS, MOCK_NFTS } from './constants';
import { Home, Hash, Users, Bell, User, ImageIcon, ShieldCheck, Wallet, MapPin } from './components/Icons';

type ProfileTab = 'POSTS' | 'REPLIES' | 'MEDIA' | 'LIKES' | 'NFTS';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [stories, setStories] = useState<Story[]>(STORIES);
  const [currentUser, setCurrentUser] = useState<UserType>(CURRENT_USER);
  const [profileTab, setProfileTab] = useState<ProfileTab>('POSTS');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [viewingStoryIndex, setViewingStoryIndex] = useState<number | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const storyInputRef = useRef<HTMLInputElement>(null);

  const handlePostCreate = (content: string) => {
    const newPost: Post = {
      id: `p${Date.now()}`,
      author: currentUser,
      content,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      reposts: 0,
      tags: [],
      likedByMe: false,
      isPinned: false
    };
    setPosts([newPost, ...posts]);
  };

  const handleEditPost = (postId: string, newContent: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, content: newContent, isEdited: true } 
          : post
      )
    );
  };

  const handlePinPost = (postId: string) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, isPinned: !post.isPinned };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setCurrentUser(prev => ({ ...prev, avatarUrl: imageUrl }));
    }
  };

  const handleStoryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        const newStory: Story = {
            id: `s${Date.now()}`,
            user: currentUser,
            imageUrl,
            hasUnseen: true
        };
        // Add new story to the beginning of the list
        setStories([newStory, ...stories]);
    }
  };

  const handleUpdateUser = (updates: Partial<UserType>) => {
    setCurrentUser(prev => ({ ...prev, ...updates }));
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
        alert("Logged out successfully.");
        setCurrentView(ViewState.HOME);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const triggerStoryInput = () => {
    storyInputRef.current?.click();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePostClick = () => {
    setCurrentView(ViewState.HOME);
    setTimeout(scrollToTop, 100);
  };
  
  const handleConnectWallet = () => {
    setIsWalletConnected(true);
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME:
        return (
          <>
            <div className="sticky top-0 z-10 bg-dag-dark/80 backdrop-blur-md border-b border-dag-border px-4 py-3 cursor-pointer" onClick={scrollToTop}>
              <h2 className="text-xl font-bold text-white">Home</h2>
            </div>
            
            <Stories 
              stories={stories} 
              onStoryClick={(index) => setViewingStoryIndex(index)}
              onAddStory={triggerStoryInput}
            />
            
            <CreatePost currentUser={currentUser} onPostCreate={handlePostCreate} />
            <div className="pb-20 md:pb-0">
              {posts.map(post => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  onEdit={handleEditPost}
                  isOwner={post.author.id === currentUser.id}
                  onPin={handlePinPost}
                />
              ))}
            </div>
          </>
        );
      
      case ViewState.EXPLORE:
        return <Explore posts={[...posts].reverse()} />; 

      case ViewState.COMMUNITIES:
        return (
          <>
             <div className="sticky top-0 z-10 bg-dag-dark/80 backdrop-blur-md border-b border-dag-border px-4 py-3">
              <h2 className="text-xl font-bold text-white">Communities</h2>
            </div>
            <div className="p-4 space-y-4 pb-20 md:pb-0">
              {COMMUNITIES.map(community => (
                <CommunityCard key={community.id} community={community} />
              ))}
            </div>
          </>
        );

      case ViewState.NOTIFICATIONS:
        return <NotificationList notifications={NOTIFICATIONS} />;

      case ViewState.WALLET:
        return (
          <WalletView 
            currentUser={currentUser} 
            isConnected={isWalletConnected} 
            onConnect={handleConnectWallet} 
          />
        );

      case ViewState.PROFILE:
        let profilePosts = posts;
        let showPosts = true;

        switch (profileTab) {
          case 'POSTS':
            profilePosts = posts.filter(p => p.author.id === currentUser.id && !p.isReply);
            break;
          case 'REPLIES':
             profilePosts = posts.filter(p => p.author.id === currentUser.id && p.isReply);
             break;
          case 'MEDIA':
             profilePosts = posts.filter(p => p.author.id === currentUser.id && !!p.imageUrl);
             break;
          case 'LIKES':
             profilePosts = posts.filter(p => p.likedByMe);
             break;
          case 'NFTS':
            showPosts = false;
            break;
        }

        if (profileTab === 'POSTS') {
           profilePosts = [...profilePosts].sort((a, b) => {
            if (a.isPinned === b.isPinned) return 0;
            return a.isPinned ? -1 : 1;
          });
        }

        return (
          <>
            <div className="sticky top-0 z-10 bg-dag-dark/80 backdrop-blur-md border-b border-dag-border px-4 py-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-1">
                {currentUser.username}
                {currentUser.isVerified && <ShieldCheck className="text-dag-accent" size={18} />}
              </h2>
              <p className="text-xs text-gray-500">{posts.filter(p => p.author.id === currentUser.id).length} Posts</p>
            </div>
            <div className="relative">
               <div className="h-32 bg-gradient-to-r from-dag-card to-dag-purple"></div>
               <div className="px-4 pb-4">
                   <div className="relative -mt-16 mb-3 inline-block group">
                       <img 
                          src={currentUser.avatarUrl} 
                          className="w-32 h-32 rounded-full border-4 border-dag-dark object-cover cursor-pointer group-hover:brightness-75 transition-all" 
                          alt="profile" 
                          onClick={triggerFileInput}
                       />
                       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                          <ImageIcon className="text-white drop-shadow-lg" size={32} />
                       </div>
                       <input 
                          type="file" 
                          ref={fileInputRef}
                          onChange={handleAvatarUpload}
                          accept="image/*"
                          className="hidden"
                       />
                   </div>
                   <div className="flex justify-end absolute top-4 right-4">
                       <button 
                         onClick={() => setIsEditProfileOpen(true)}
                         className="border border-gray-500 text-white font-bold py-1.5 px-4 rounded-full hover:bg-white/10"
                        >
                         Edit Profile
                       </button>
                   </div>
                   <h1 className="font-bold text-2xl flex items-center gap-2">
                     {currentUser.username}
                     {currentUser.isVerified && <ShieldCheck className="text-dag-accent" size={24} />}
                   </h1>
                   <p className="text-gray-500">{currentUser.handle}</p>
                   <p className="mt-3 text-gray-200">{currentUser.bio}</p>
                   <div className="flex flex-wrap gap-4 mt-3 text-gray-500 text-sm items-center">
                       {currentUser.location && (
                           <div className="flex items-center space-x-1">
                               <MapPin size={14} className="text-gray-500" />
                               <span>{currentUser.location}</span>
                           </div>
                       )}
                       <span><strong className="text-white">{currentUser.following}</strong> Following</span>
                       <span><strong className="text-white">{currentUser.followers}</strong> Followers</span>
                   </div>
                   <div className="flex gap-4 mt-3 text-dag-accent text-sm font-mono bg-dag-card/50 p-2 rounded inline-block border border-dag-border cursor-pointer hover:bg-dag-card" onClick={() => setCurrentView(ViewState.WALLET)}>
                        {currentUser.walletAddress}
                   </div>
               </div>
               
               <div className="border-b border-dag-border mt-2 overflow-x-auto no-scrollbar">
                   <div className="flex min-w-max">
                       <button 
                         onClick={() => setProfileTab('POSTS')}
                         className={`flex-1 text-center py-4 px-6 font-medium hover:bg-white/5 cursor-pointer transition-colors relative ${profileTab === 'POSTS' ? 'font-bold text-white' : 'text-gray-500'}`}
                       >
                         Posts
                         {profileTab === 'POSTS' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-dag-accent rounded-t-full mx-auto w-10"></div>}
                       </button>
                       <button 
                         onClick={() => setProfileTab('REPLIES')}
                         className={`flex-1 text-center py-4 px-6 font-medium hover:bg-white/5 cursor-pointer transition-colors relative ${profileTab === 'REPLIES' ? 'font-bold text-white' : 'text-gray-500'}`}
                       >
                         Replies
                         {profileTab === 'REPLIES' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-dag-accent rounded-t-full mx-auto w-10"></div>}
                       </button>
                       <button 
                         onClick={() => setProfileTab('MEDIA')}
                         className={`flex-1 text-center py-4 px-6 font-medium hover:bg-white/5 cursor-pointer transition-colors relative ${profileTab === 'MEDIA' ? 'font-bold text-white' : 'text-gray-500'}`}
                       >
                         Media
                         {profileTab === 'MEDIA' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-dag-accent rounded-t-full mx-auto w-10"></div>}
                       </button>
                       <button 
                         onClick={() => setProfileTab('LIKES')}
                         className={`flex-1 text-center py-4 px-6 font-medium hover:bg-white/5 cursor-pointer transition-colors relative ${profileTab === 'LIKES' ? 'font-bold text-white' : 'text-gray-500'}`}
                       >
                         Likes
                         {profileTab === 'LIKES' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-dag-accent rounded-t-full mx-auto w-10"></div>}
                       </button>
                       <button 
                         onClick={() => setProfileTab('NFTS')}
                         className={`flex-1 text-center py-4 px-6 font-medium hover:bg-white/5 cursor-pointer transition-colors relative ${profileTab === 'NFTS' ? 'font-bold text-white' : 'text-gray-500'}`}
                       >
                         NFTs
                         {profileTab === 'NFTS' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-dag-accent rounded-t-full mx-auto w-10"></div>}
                       </button>
                   </div>
               </div>
               
                <div className="pb-20 md:pb-0 min-h-[300px]">
                  {showPosts ? (
                    <>
                      {profilePosts.map(post => (
                        <PostCard 
                          key={post.id} 
                          post={post} 
                          isOwner={post.author.id === currentUser.id}
                          onPin={handlePinPost}
                          onEdit={handleEditPost}
                        />
                      ))}
                      {profilePosts.length === 0 && (
                          <div className="p-12 text-center text-gray-500">
                              <p className="text-lg font-bold mb-2">
                                {profileTab === 'LIKES' ? "No liked posts yet" : "No posts found"}
                              </p>
                              <p className="text-sm">
                                {profileTab === 'LIKES' ? "Tap the heart on any post to show it some love." : "When you post, it will show up here."}
                              </p>
                          </div>
                      )}
                    </>
                  ) : (
                    <div className="p-4">
                      {!isWalletConnected ? (
                         <div className="text-center py-12">
                             <div className="mb-4 inline-block p-4 bg-dag-card rounded-full">
                                <Wallet size={48} className="text-gray-500" />
                             </div>
                             <h3 className="text-xl font-bold text-white mb-2">Wallet not connected</h3>
                             <p className="text-gray-500 mb-6">Connect your wallet to display your NFT collection.</p>
                             <button 
                               onClick={() => setCurrentView(ViewState.WALLET)}
                               className="px-6 py-2 bg-dag-accent text-dag-dark font-bold rounded-full hover:opacity-90 transition-opacity"
                             >
                               Connect Wallet
                             </button>
                         </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                           {MOCK_NFTS.map(nft => (
                             <div key={nft.id} className="bg-dag-card border border-dag-border rounded-xl overflow-hidden group hover:border-dag-accent/50 transition-all cursor-pointer">
                                <div className="aspect-square relative overflow-hidden">
                                  <img src={nft.imageUrl} alt={nft.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-3">
                                  <p className="font-bold text-white text-sm truncate">{nft.name}</p>
                                  <p className="text-xs text-gray-500 truncate">{nft.collection}</p>
                                </div>
                             </div>
                           ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
            </div>
          </>
        );

      case ViewState.MORE:
        return (
          <MoreView 
            currentUser={currentUser} 
            onUpdateUser={handleUpdateUser} 
            onLogout={handleLogout}
          />
        );

      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-500">
            Work in progress...
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-dag-dark text-white max-w-[1400px] mx-auto flex relative">
      
      {/* Hidden Inputs */}
      <input 
          type="file" 
          ref={storyInputRef}
          onChange={handleStoryUpload}
          accept="image/*"
          className="hidden"
      />

      {/* Story Viewer Overlay */}
      {viewingStoryIndex !== null && (
         <StoryViewer 
            stories={stories} 
            initialIndex={viewingStoryIndex} 
            onClose={() => setViewingStoryIndex(null)} 
         />
      )}

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <EditProfileModal 
          user={currentUser} 
          onSave={handleUpdateUser} 
          onClose={() => setIsEditProfileOpen(false)} 
        />
      )}

      {/* Left Sidebar */}
      <header className="hidden md:flex flex-col w-20 xl:w-72 flex-shrink-0 border-r border-dag-border z-20 sticky top-0 h-screen">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} currentUser={currentUser} onPostClick={handlePostClick} />
      </header>

      {/* Main Feed */}
      <main className="flex-1 min-w-0 border-r border-dag-border relative">
        {renderContent()}
      </main>

      {/* Right Widgets */}
      <aside className="hidden lg:block w-80 xl:w-96 flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
        <Widgets />
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-dag-dark/90 backdrop-blur-lg border-t border-dag-border flex justify-around py-3 z-50">
        <button onClick={() => setCurrentView(ViewState.HOME)} className={currentView === ViewState.HOME ? 'text-dag-accent' : 'text-gray-500'}>
          <Home size={24} strokeWidth={currentView === ViewState.HOME ? 2.5 : 2} />
        </button>
        <button onClick={() => setCurrentView(ViewState.EXPLORE)} className={currentView === ViewState.EXPLORE ? 'text-dag-accent' : 'text-gray-500'}>
          <Hash size={24} />
        </button>
        <button onClick={() => setCurrentView(ViewState.WALLET)} className={currentView === ViewState.WALLET ? 'text-dag-accent' : 'text-gray-500'}>
          <Wallet size={24} />
        </button>
        <button onClick={() => setCurrentView(ViewState.NOTIFICATIONS)} className={currentView === ViewState.NOTIFICATIONS ? 'text-dag-accent' : 'text-gray-500'}>
          <Bell size={24} />
        </button>
        <button onClick={() => setCurrentView(ViewState.PROFILE)} className={currentView === ViewState.PROFILE ? 'text-dag-accent' : 'text-gray-500'}>
          <User size={24} />
        </button>
      </nav>
    </div>
  );
};

export default App;