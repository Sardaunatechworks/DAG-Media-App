import React, { useState } from 'react';
import { 
  User as UserIcon, 
  ShieldCheck, 
  Wallet, 
  Bell, 
  Lock, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  Key,
  Smartphone,
  Check,
  Edit2,
  Trash2,
  Plus
} from './Icons';
import { User } from '../types';

interface MoreViewProps {
  currentUser: User;
  onUpdateUser: (updates: Partial<User>) => void;
  onLogout: () => void;
}

type SubView = 'MENU' | 'ACCOUNT' | 'PRIVACY' | 'NOTIFICATIONS' | 'WALLET_SETTINGS' | 'SECURITY' | 'HELP' | 'CHANGE_PASSWORD' | 'BLOCKED_ACCOUNTS' | 'MUTED_WORDS';

const MoreView: React.FC<MoreViewProps> = ({ currentUser, onUpdateUser, onLogout }) => {
  const [currentSubView, setCurrentSubView] = useState<SubView>('MENU');

  // Account Editing State
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [accountForm, setAccountForm] = useState({
    username: currentUser.username,
    handle: currentUser.handle,
    email: currentUser.email || '',
    phone: currentUser.phone || '',
    country: currentUser.location || ''
  });

  // Security State
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });

  // Privacy Lists Mock State
  const [blockedUsers, setBlockedUsers] = useState([
    { id: 'b1', name: 'SpamBot9000', handle: '@spambot' },
    { id: 'b2', name: 'AngryUser', handle: '@angry_user_123' },
  ]);
  const [mutedWords, setMutedWords] = useState(['crypto_scam', 'shilling', 'rugpull']);
  const [newMutedWord, setNewMutedWord] = useState('');

  // FAQ State
  const [expandedFaqId, setExpandedFaqId] = useState<number | null>(null);

  const menuItems = [
    { id: 'ACCOUNT', icon: UserIcon, label: 'Account Information', desc: 'See your account information like phone number and email address.' },
    { id: 'PRIVACY', icon: Lock, label: 'Privacy & Safety', desc: 'Manage what information you see and share on DAG Media.' },
    { id: 'NOTIFICATIONS', icon: Bell, label: 'Notifications', desc: 'Select the kinds of notifications you get about your activities, interests, and recommendations.' },
    { id: 'WALLET_SETTINGS', icon: Wallet, label: 'Wallet Integration', desc: 'Manage your connected Web3 wallets and NFT assets.' },
    { id: 'SECURITY', icon: ShieldCheck, label: 'Security', desc: 'Manage your account\'s security and keep track of your account usage.' },
    { id: 'HELP', icon: HelpCircle, label: 'Help Center', desc: 'Get help with any issues you are facing.' },
  ];

  const handleAccountSave = () => {
    onUpdateUser({ 
        username: accountForm.username, 
        handle: accountForm.handle,
        email: accountForm.email,
        phone: accountForm.phone,
        location: accountForm.country
    });
    setIsEditingAccount(false);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) {
        alert("New passwords do not match.");
        return;
    }
    alert("Password updated successfully!");
    setCurrentSubView('SECURITY');
    setPasswordForm({ current: '', new: '', confirm: '' });
  };

  const handleAddMutedWord = () => {
      if(newMutedWord.trim()) {
          setMutedWords([...mutedWords, newMutedWord.trim()]);
          setNewMutedWord('');
      }
  }

  const handleRemoveMutedWord = (word: string) => {
      setMutedWords(mutedWords.filter(w => w !== word));
  }

  const handleUnblock = (id: string) => {
      setBlockedUsers(blockedUsers.filter(u => u.id !== id));
  }

  const renderHeader = (title: string, backView: SubView = 'MENU') => (
    <div className="sticky top-0 z-10 bg-dag-dark/95 backdrop-blur-md px-4 py-3 border-b border-dag-border flex items-center space-x-4">
      <button 
        onClick={() => setCurrentSubView(backView)}
        className="p-2 hover:bg-white/10 rounded-full transition-colors"
      >
        <ArrowLeft size={20} />
      </button>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
  );

  const ToggleSwitch = ({ label, description, defaultChecked }: { label: string, description?: string, defaultChecked?: boolean }) => {
    const [checked, setChecked] = useState(defaultChecked || false);
    return (
        <div className="flex items-center justify-between py-4">
            <div className="pr-4">
                <h4 className="font-bold text-white">{label}</h4>
                {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
            </div>
            <button 
                onClick={() => setChecked(!checked)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-dag-accent' : 'bg-gray-700'}`}
            >
                <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
        </div>
    );
  };

  const renderAccountInfo = () => (
    <div className="min-h-screen bg-dag-dark pb-20 md:pb-0">
      <div className="sticky top-0 z-10 bg-dag-dark/95 backdrop-blur-md px-4 py-3 border-b border-dag-border flex items-center justify-between">
          <div className="flex items-center space-x-4">
             <button onClick={() => setCurrentSubView('MENU')} className="p-2 hover:bg-white/10 rounded-full"><ArrowLeft size={20} /></button>
             <h2 className="text-xl font-bold text-white">Account Information</h2>
          </div>
          <button 
            onClick={() => isEditingAccount ? handleAccountSave() : setIsEditingAccount(true)}
            className={`font-bold text-sm px-4 py-2 rounded-full transition-colors ${isEditingAccount ? 'bg-dag-accent text-dag-dark' : 'text-dag-accent hover:bg-dag-accent/10 border border-dag-accent'}`}
          >
              {isEditingAccount ? 'Save' : 'Edit'}
          </button>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-6">
        <div className="bg-dag-card p-4 rounded-xl border border-dag-border">
          <div className="space-y-4">
            <div>
              <label className="text-gray-500 text-xs uppercase font-bold tracking-wider">Username</label>
              {isEditingAccount ? (
                  <input 
                    value={accountForm.username}
                    onChange={(e) => setAccountForm({...accountForm, username: e.target.value})}
                    className="w-full mt-1 p-3 bg-black/40 rounded-lg border border-dag-accent text-white focus:outline-none"
                  />
              ) : (
                <div className="flex items-center justify-between mt-1 p-3 bg-black/20 rounded-lg border border-white/5">
                    <span className="text-white">{accountForm.username}</span>
                </div>
              )}
            </div>
            <div>
              <label className="text-gray-500 text-xs uppercase font-bold tracking-wider">Handle</label>
               {isEditingAccount ? (
                  <input 
                    value={accountForm.handle}
                    onChange={(e) => setAccountForm({...accountForm, handle: e.target.value})}
                    className="w-full mt-1 p-3 bg-black/40 rounded-lg border border-dag-accent text-white focus:outline-none"
                  />
              ) : (
                  <div className="flex items-center justify-between mt-1 p-3 bg-black/20 rounded-lg border border-white/5">
                    <span className="text-dag-accent">{accountForm.handle}</span>
                  </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-dag-card p-4 rounded-xl border border-dag-border space-y-4">
            <div className="flex items-center space-x-3 p-2 rounded-lg">
                <Mail className="text-gray-400" size={20} />
                <div className="flex-1">
                    <p className="text-white">Email Address</p>
                    {isEditingAccount ? (
                         <input 
                            value={accountForm.email}
                            onChange={(e) => setAccountForm({...accountForm, email: e.target.value})}
                            className="w-full mt-1 p-2 bg-black/40 rounded border border-dag-accent text-sm text-white focus:outline-none"
                          />
                    ) : (
                        <p className="text-sm text-gray-500">{accountForm.email || 'Not set'}</p>
                    )}
                </div>
            </div>
            <div className="border-t border-white/5 my-2" />
            <div className="flex items-center space-x-3 p-2 rounded-lg">
                <Phone className="text-gray-400" size={20} />
                <div className="flex-1">
                    <p className="text-white">Phone Number</p>
                     {isEditingAccount ? (
                         <input 
                            value={accountForm.phone}
                            onChange={(e) => setAccountForm({...accountForm, phone: e.target.value})}
                            className="w-full mt-1 p-2 bg-black/40 rounded border border-dag-accent text-sm text-white focus:outline-none"
                          />
                    ) : (
                        <p className="text-sm text-gray-500">{accountForm.phone || 'Not set'}</p>
                    )}
                </div>
            </div>
             <div className="border-t border-white/5 my-2" />
             <div className="flex items-center space-x-3 p-2 rounded-lg">
                <Globe className="text-gray-400" size={20} />
                <div className="flex-1">
                    <p className="text-white">Country</p>
                     {isEditingAccount ? (
                         <input 
                            value={accountForm.country}
                            onChange={(e) => setAccountForm({...accountForm, country: e.target.value})}
                            className="w-full mt-1 p-2 bg-black/40 rounded border border-dag-accent text-sm text-white focus:outline-none"
                          />
                    ) : (
                        <p className="text-sm text-gray-500">{accountForm.country || 'Not set'}</p>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacy = () => (
      <div className="min-h-screen bg-dag-dark pb-20 md:pb-0">
          {renderHeader('Privacy & Safety')}
          <div className="p-4 max-w-2xl mx-auto">
              <div className="bg-dag-card rounded-xl border border-dag-border px-4 py-2 divide-y divide-white/5">
                  <ToggleSwitch 
                    label="Private Account" 
                    description="Only people you approve can see your posts and media." 
                  />
                  <ToggleSwitch 
                    label="Activity Status" 
                    description="Allow accounts you follow and anyone you message to see when you were last active." 
                    defaultChecked={true}
                  />
                  <ToggleSwitch 
                    label="Read Receipts" 
                    description="Let others know when you've seen their messages." 
                    defaultChecked={true}
                  />
              </div>

              <h3 className="text-gray-500 text-sm font-bold uppercase mt-8 mb-2 px-2">Interactions</h3>
              <div className="bg-dag-card rounded-xl border border-dag-border px-4 py-2 divide-y divide-white/5">
                   <div 
                      onClick={() => setCurrentSubView('BLOCKED_ACCOUNTS')}
                      className="py-4 flex justify-between items-center cursor-pointer hover:bg-white/5 -mx-4 px-4 transition-colors"
                   >
                       <div>
                           <h4 className="font-bold text-white">Blocked Accounts</h4>
                           <p className="text-sm text-gray-500">Manage accounts you have blocked.</p>
                       </div>
                       <ChevronRight size={16} className="text-gray-600" />
                   </div>
                   <div 
                      onClick={() => setCurrentSubView('MUTED_WORDS')}
                      className="py-4 flex justify-between items-center cursor-pointer hover:bg-white/5 -mx-4 px-4 transition-colors"
                   >
                       <div>
                           <h4 className="font-bold text-white">Muted Words</h4>
                           <p className="text-sm text-gray-500">Words you don't want to see in your feed.</p>
                       </div>
                       <ChevronRight size={16} className="text-gray-600" />
                   </div>
              </div>
          </div>
      </div>
  );

  const renderBlockedAccounts = () => (
      <div className="min-h-screen bg-dag-dark pb-20 md:pb-0">
          {renderHeader('Blocked Accounts', 'PRIVACY')}
          <div className="p-4 max-w-2xl mx-auto">
             <p className="text-gray-400 mb-4 text-sm">Blocked accounts cannot follow you or view your profile.</p>
             <div className="bg-dag-card rounded-xl border border-dag-border divide-y divide-white/5">
                 {blockedUsers.length === 0 && (
                     <div className="p-6 text-center text-gray-500">No blocked accounts.</div>
                 )}
                 {blockedUsers.map(user => (
                     <div key={user.id} className="p-4 flex items-center justify-between">
                         <div className="flex items-center space-x-3">
                             <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                                 <UserIcon size={20} className="text-gray-400" />
                             </div>
                             <div>
                                 <p className="font-bold text-white">{user.name}</p>
                                 <p className="text-xs text-gray-500">{user.handle}</p>
                             </div>
                         </div>
                         <button 
                            onClick={() => handleUnblock(user.id)}
                            className="px-3 py-1 border border-red-500/30 text-red-400 rounded-full text-sm hover:bg-red-500/10"
                        >
                             Unblock
                         </button>
                     </div>
                 ))}
             </div>
          </div>
      </div>
  );

  const renderMutedWords = () => (
      <div className="min-h-screen bg-dag-dark pb-20 md:pb-0">
          {renderHeader('Muted Words', 'PRIVACY')}
          <div className="p-4 max-w-2xl mx-auto">
             <div className="flex mb-4">
                 <input 
                    value={newMutedWord}
                    onChange={e => setNewMutedWord(e.target.value)}
                    placeholder="Add a word or phrase"
                    className="flex-1 bg-dag-card border border-dag-border rounded-l-xl px-4 py-3 text-white focus:outline-none focus:border-dag-accent"
                 />
                 <button 
                    onClick={handleAddMutedWord}
                    className="bg-dag-accent text-dag-dark font-bold px-6 rounded-r-xl hover:bg-dag-accent/90"
                 >
                     Add
                 </button>
             </div>
             
             <div className="flex flex-wrap gap-2">
                 {mutedWords.map((word, i) => (
                     <div key={i} className="bg-dag-card border border-dag-border rounded-full px-4 py-2 flex items-center space-x-2">
                         <span className="text-white">{word}</span>
                         <button onClick={() => handleRemoveMutedWord(word)} className="text-gray-500 hover:text-red-400">
                             <Check size={14} className="transform rotate-45" /> {/* Using generic icon as X */}
                         </button>
                     </div>
                 ))}
             </div>
          </div>
      </div>
  );

  const renderNotifications = () => (
      <div className="min-h-screen bg-dag-dark pb-20 md:pb-0">
          {renderHeader('Notifications')}
          <div className="p-4 max-w-2xl mx-auto">
              <h3 className="text-gray-500 text-sm font-bold uppercase mb-2 px-2">Push Notifications</h3>
              <div className="bg-dag-card rounded-xl border border-dag-border px-4 py-2 divide-y divide-white/5">
                  <ToggleSwitch label="Pause All" />
                  <ToggleSwitch label="Likes" defaultChecked={true} />
                  <ToggleSwitch label="Mentions" defaultChecked={true} />
                  <ToggleSwitch label="Reposts" defaultChecked={true} />
                  <ToggleSwitch label="New Followers" defaultChecked={true} />
                  <ToggleSwitch label="Direct Messages" defaultChecked={true} />
              </div>

               <h3 className="text-gray-500 text-sm font-bold uppercase mt-8 mb-2 px-2">Other</h3>
               <div className="bg-dag-card rounded-xl border border-dag-border px-4 py-2 divide-y divide-white/5">
                  <ToggleSwitch label="Email Notifications" description="Receive a weekly digest of top posts." defaultChecked={true} />
                  <ToggleSwitch label="SMS Notifications" />
               </div>
          </div>
      </div>
  );

  const renderWalletSettings = () => (
      <div className="min-h-screen bg-dag-dark pb-20 md:pb-0">
          {renderHeader('Wallet Integration')}
          <div className="p-4 max-w-2xl mx-auto space-y-6">
              <div className="bg-gradient-to-r from-dag-card to-dag-card/50 border border-dag-border rounded-xl p-6 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                          <div className="p-3 bg-green-500/10 rounded-full">
                              <Wallet className="text-green-500" size={24} />
                          </div>
                          <div>
                              <h3 className="font-bold text-white">Active Wallet</h3>
                              <p className="text-sm text-gray-400 font-mono">{currentUser.walletAddress || 'Not Connected'}</p>
                          </div>
                      </div>
                      {currentUser.walletAddress && (
                          <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20">
                              Connected
                          </div>
                      )}
                  </div>
              </div>

              <div className="bg-dag-card rounded-xl border border-dag-border px-4 py-2 divide-y divide-white/5">
                  <ToggleSwitch 
                    label="Display NFTs on Profile" 
                    description="Show your NFT collection tab to other users." 
                    defaultChecked={true} 
                  />
                  <ToggleSwitch 
                    label="Verify Token Ownership" 
                    description="Allow communities to check your token balance for access." 
                    defaultChecked={true} 
                  />
              </div>

              <button className="w-full py-4 text-red-500 font-bold bg-red-500/5 hover:bg-red-500/10 rounded-xl border border-red-500/20 transition-colors">
                  Disconnect Wallet
              </button>
          </div>
      </div>
  );

  const renderSecurity = () => (
      <div className="min-h-screen bg-dag-dark pb-20 md:pb-0">
          {renderHeader('Security')}
          <div className="p-4 max-w-2xl mx-auto space-y-6">
              <div className="bg-dag-card rounded-xl border border-dag-border p-4">
                  <div className="flex items-center space-x-4 mb-4">
                      <div className="p-2 bg-dag-accent/10 rounded-lg">
                          <ShieldCheck size={24} className="text-dag-accent" />
                      </div>
                      <div>
                          <h3 className="font-bold text-white">Security Status</h3>
                          <p className="text-sm text-green-400">Strong</p>
                      </div>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-green-500 w-[85%] h-full" />
                  </div>
              </div>

              <div className="bg-dag-card rounded-xl border border-dag-border divide-y divide-white/5">
                   <div 
                      onClick={() => setCurrentSubView('CHANGE_PASSWORD')}
                      className="p-4 flex items-center justify-between hover:bg-white/5 cursor-pointer transition-colors"
                   >
                       <div className="flex items-center space-x-3">
                           <Key className="text-gray-400" size={20} />
                           <div>
                               <h4 className="font-bold text-white">Password</h4>
                               <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                           </div>
                       </div>
                       <ChevronRight size={16} className="text-gray-600" />
                   </div>
                   <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                             <div className="flex items-center space-x-3">
                                <Smartphone className="text-gray-400" size={20} />
                                <h4 className="font-bold text-white">Two-Factor Authentication</h4>
                             </div>
                             <div className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs font-bold border border-green-500/20">Enabled</div>
                        </div>
                        <p className="text-sm text-gray-500 pl-8">Your account is protected with 2FA via Authenticator App.</p>
                   </div>
              </div>
          </div>
      </div>
  );

  const renderChangePassword = () => (
      <div className="min-h-screen bg-dag-dark pb-20 md:pb-0">
          {renderHeader('Change Password', 'SECURITY')}
          <div className="p-4 max-w-xl mx-auto">
              <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                      <label className="block text-sm font-bold text-gray-400 mb-1">Current Password</label>
                      <input 
                         type="password" 
                         className="w-full bg-dag-card border border-dag-border rounded-lg p-3 text-white focus:border-dag-accent focus:outline-none"
                         value={passwordForm.current}
                         onChange={e => setPasswordForm({...passwordForm, current: e.target.value})}
                         required
                      />
                  </div>
                  <div>
                      <label className="block text-sm font-bold text-gray-400 mb-1">New Password</label>
                      <input 
                         type="password" 
                         className="w-full bg-dag-card border border-dag-border rounded-lg p-3 text-white focus:border-dag-accent focus:outline-none"
                         value={passwordForm.new}
                         onChange={e => setPasswordForm({...passwordForm, new: e.target.value})}
                         required
                      />
                  </div>
                  <div>
                      <label className="block text-sm font-bold text-gray-400 mb-1">Confirm New Password</label>
                      <input 
                         type="password" 
                         className="w-full bg-dag-card border border-dag-border rounded-lg p-3 text-white focus:border-dag-accent focus:outline-none"
                         value={passwordForm.confirm}
                         onChange={e => setPasswordForm({...passwordForm, confirm: e.target.value})}
                         required
                      />
                  </div>
                  <div className="pt-4">
                      <button 
                        type="submit"
                        className="w-full bg-dag-accent text-dag-dark font-bold py-3 rounded-lg hover:bg-dag-accent/90 transition-colors"
                      >
                          Update Password
                      </button>
                  </div>
              </form>
          </div>
      </div>
  );

  const renderHelp = () => {
    const faqs = [
        { id: 1, q: 'How do I connect my Ledger?', a: 'Go to Wallet Integration > Connect Wallet and select Ledger from the hardware wallet options.' },
        { id: 2, q: 'Is my private key stored?', a: 'No. DAG Media is a non-custodial platform. We never store your private keys.' },
        { id: 3, q: 'How to reset password?', a: 'Go to Security > Password and click on "Forgot Password" or initiate a reset via email.' },
        { id: 4, q: 'What is DAG?', a: 'Directed Acyclic Graph (DAG) is a data structure used in crypto that allows for higher throughput and scalability compared to traditional blockchains.' }
    ];

    return (
      <div className="min-h-screen bg-dag-dark pb-20 md:pb-0">
          {renderHeader('Help Center')}
          <div className="p-4 max-w-2xl mx-auto space-y-6">
              <div className="bg-dag-accent/10 border border-dag-accent/20 rounded-xl p-6 text-center">
                  <h3 className="font-bold text-dag-accent text-xl mb-2">How can we help?</h3>
                  <input 
                    type="text" 
                    placeholder="Search for answers..." 
                    className="w-full bg-black/20 border border-dag-accent/30 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-dag-accent"
                  />
              </div>

              <div>
                  <h4 className="font-bold text-white mb-3 px-2">Common Questions</h4>
                  <div className="bg-dag-card rounded-xl border border-dag-border divide-y divide-white/5 overflow-hidden">
                      {faqs.map((faq) => (
                          <div 
                             key={faq.id} 
                             className="hover:bg-white/5 cursor-pointer transition-colors"
                             onClick={() => setExpandedFaqId(expandedFaqId === faq.id ? null : faq.id)}
                          >
                              <div className="p-4 flex justify-between items-center">
                                  <span className="text-gray-300 font-medium">{faq.q}</span>
                                  <ChevronRight size={16} className={`text-gray-600 transition-transform duration-200 ${expandedFaqId === faq.id ? 'rotate-90' : ''}`} />
                              </div>
                              {expandedFaqId === faq.id && (
                                  <div className="px-4 pb-4 text-sm text-gray-500 leading-relaxed bg-black/10">
                                      {faq.a}
                                  </div>
                              )}
                          </div>
                      ))}
                  </div>
              </div>

              <div className="bg-dag-card rounded-xl border border-dag-border p-4 flex items-center justify-between">
                  <div>
                      <h4 className="font-bold text-white">Contact Support</h4>
                      <p className="text-sm text-gray-500">Our team is available 24/7</p>
                  </div>
                  <button className="bg-white text-black font-bold px-4 py-2 rounded-full hover:bg-gray-200 transition-colors">
                      Chat
                  </button>
              </div>
          </div>
      </div>
    );
  };

  switch (currentSubView) {
    case 'ACCOUNT': return renderAccountInfo();
    case 'PRIVACY': return renderPrivacy();
    case 'NOTIFICATIONS': return renderNotifications();
    case 'WALLET_SETTINGS': return renderWalletSettings();
    case 'SECURITY': return renderSecurity();
    case 'HELP': return renderHelp();
    case 'CHANGE_PASSWORD': return renderChangePassword();
    case 'BLOCKED_ACCOUNTS': return renderBlockedAccounts();
    case 'MUTED_WORDS': return renderMutedWords();
    default:
      // Main Menu View
      return (
        <div className="pb-20 md:pb-0 min-h-screen bg-dag-dark">
          <div className="sticky top-0 z-10 bg-dag-dark/95 backdrop-blur-md px-4 py-3 border-b border-dag-border">
            <h2 className="text-xl font-bold text-white">More Options</h2>
          </div>

          <div className="p-4 max-w-2xl mx-auto">
            {/* Profile Card */}
            <div className="bg-dag-card rounded-2xl p-6 mb-6 flex items-center space-x-4 border border-dag-border shadow-lg">
                <img src={currentUser.avatarUrl} alt="Profile" className="w-16 h-16 rounded-full border-2 border-dag-accent object-cover" />
                <div>
                    <h3 className="font-bold text-xl text-white">{currentUser.username}</h3>
                    <p className="text-gray-500">{currentUser.handle}</p>
                    {currentUser.isVerified && (
                      <div className="mt-2 text-xs text-dag-accent border border-dag-accent/30 bg-dag-accent/10 px-2 py-0.5 rounded inline-flex items-center space-x-1">
                          <Check size={10} />
                          <span>Verified Member</span>
                      </div>
                    )}
                </div>
            </div>

            <div className="space-y-3">
                {menuItems.map((item) => (
                    <button 
                      key={item.id} 
                      onClick={() => setCurrentSubView(item.id as SubView)}
                      className="flex items-center space-x-4 p-4 w-full text-left bg-dag-card/30 hover:bg-dag-card rounded-xl cursor-pointer transition-all duration-200 group border border-transparent hover:border-dag-border"
                    >
                        <div className="text-gray-400 group-hover:text-dag-accent mt-1 bg-white/5 p-2 rounded-lg transition-colors group-hover:bg-dag-accent/10 flex-shrink-0">
                            <item.icon size={24} />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-white group-hover:text-dag-accent transition-colors">{item.label}</h4>
                            <p className="text-sm text-gray-500 mt-1 leading-snug">{item.desc}</p>
                        </div>
                        <div className="text-gray-600 group-hover:text-dag-accent transition-colors">
                            <ChevronRight size={20} />
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-8 border-t border-dag-border pt-6 pb-6">
                <button 
                  onClick={onLogout}
                  className="flex items-center justify-center space-x-2 text-red-500 bg-red-500/10 p-4 hover:bg-red-500/20 w-full rounded-xl transition-colors font-bold border border-red-500/20"
                >
                    <LogOut size={20} />
                    <span>Log Out</span>
                </button>
                <p className="text-center text-xs text-gray-600 mt-6">
                    DAG Media App v1.1.0 <br/>
                    Build 2025.10.16
                </p>
            </div>
          </div>
        </div>
      );
  }
};

export default MoreView;