import React, { useState } from 'react';
import { Wallet, Copy, ArrowLeftRight, CreditCard, Send, ExternalLink, Check } from './Icons';
import { User, Token, NFT } from '../types';
import { WALLET_TOKENS, MOCK_NFTS } from '../constants';

interface WalletViewProps {
  currentUser: User;
  isConnected: boolean;
  onConnect: () => void;
}

const WalletView: React.FC<WalletViewProps> = ({ currentUser, isConnected, onConnect }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'TOKENS' | 'NFTS'>('TOKENS');

  const handleCopy = () => {
    if (currentUser.walletAddress) {
      navigator.clipboard.writeText(currentUser.walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <div className="bg-dag-accent/10 p-6 rounded-full mb-6 animate-pulse">
          <Wallet size={64} className="text-dag-accent" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Connect to Web3</h1>
        <p className="text-gray-400 mb-8 max-w-md">
          Connect your crypto wallet to unlock exclusive features, display your NFTs, and interact with the DAG ecosystem.
        </p>
        
        <div className="space-y-4 w-full max-w-sm">
          <button 
            onClick={onConnect}
            className="flex items-center justify-between w-full bg-dag-card border border-dag-border hover:border-dag-accent p-4 rounded-xl transition-all group"
          >
            <span className="font-bold text-white">MetaMask</span>
            <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold text-xs">M</div>
          </button>
          <button 
            onClick={onConnect}
            className="flex items-center justify-between w-full bg-dag-card border border-dag-border hover:border-dag-accent p-4 rounded-xl transition-all group"
          >
            <span className="font-bold text-white">WalletConnect</span>
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-xs">W</div>
          </button>
          <button 
            onClick={onConnect}
            className="flex items-center justify-between w-full bg-dag-card border border-dag-border hover:border-dag-accent p-4 rounded-xl transition-all group"
          >
            <span className="font-bold text-white">Phantom</span>
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 font-bold text-xs">P</div>
          </button>
        </div>
        
        <p className="text-xs text-gray-600 mt-8">By connecting, you agree to our Terms of Service.</p>
      </div>
    );
  }

  return (
    <div className="pb-20 md:pb-0 min-h-screen bg-dag-dark">
      <div className="sticky top-0 z-10 bg-dag-dark/95 backdrop-blur-md px-4 py-3 border-b border-dag-border flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Wallet</h2>
        <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/30">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-green-500 font-bold">Connected</span>
        </div>
      </div>

      <div className="p-4">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-dag-card to-dag-card/50 border border-dag-border rounded-2xl p-6 shadow-xl mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-dag-accent/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          
          <div className="relative z-10">
            <p className="text-gray-400 text-sm mb-1">Total Balance</p>
            <h1 className="text-4xl font-bold text-white mb-4">$8,680.12</h1>
            
            <div className="flex items-center space-x-2 bg-black/30 w-fit px-3 py-1.5 rounded-lg border border-white/5 cursor-pointer hover:bg-black/50 transition-colors" onClick={handleCopy}>
              <span className="text-sm font-mono text-gray-300">{currentUser.walletAddress}</span>
              {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-gray-500" />}
            </div>

            <div className="flex items-center justify-between mt-8 gap-4">
               <button className="flex-1 flex flex-col items-center justify-center py-3 bg-dag-accent text-dag-dark rounded-xl font-bold hover:bg-dag-accent/90 transition-colors">
                  <Send size={20} className="mb-1" />
                  <span className="text-xs">Send</span>
               </button>
               <button className="flex-1 flex flex-col items-center justify-center py-3 bg-dag-card border border-dag-border text-white rounded-xl font-bold hover:bg-white/10 transition-colors">
                  <CreditCard size={20} className="mb-1" />
                  <span className="text-xs">Buy</span>
               </button>
               <button className="flex-1 flex flex-col items-center justify-center py-3 bg-dag-card border border-dag-border text-white rounded-xl font-bold hover:bg-white/10 transition-colors">
                  <ArrowLeftRight size={20} className="mb-1" />
                  <span className="text-xs">Swap</span>
               </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-dag-border mb-4">
          <button 
            onClick={() => setActiveTab('TOKENS')}
            className={`flex-1 py-3 font-bold text-sm text-center relative ${activeTab === 'TOKENS' ? 'text-white' : 'text-gray-500'}`}
          >
            Tokens
            {activeTab === 'TOKENS' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-dag-accent" />}
          </button>
          <button 
            onClick={() => setActiveTab('NFTS')}
            className={`flex-1 py-3 font-bold text-sm text-center relative ${activeTab === 'NFTS' ? 'text-white' : 'text-gray-500'}`}
          >
            NFTs
            {activeTab === 'NFTS' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-dag-accent" />}
          </button>
        </div>

        {/* List Content */}
        <div className="space-y-3">
          {activeTab === 'TOKENS' ? (
             WALLET_TOKENS.map((token, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-dag-border flex items-center justify-center text-xs font-bold text-gray-400">
                       {token.symbol[0]}
                    </div>
                    <div>
                      <p className="font-bold text-white">{token.name}</p>
                      <p className="text-xs text-gray-500">{token.balance} {token.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">{token.value}</p>
                    <p className={`text-xs ${token.change.startsWith('+') ? 'text-green-400' : token.change.startsWith('-') ? 'text-red-400' : 'text-gray-500'}`}>
                      {token.change}
                    </p>
                  </div>
                </div>
             ))
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {MOCK_NFTS.map((nft) => (
                <div key={nft.id} className="bg-dag-card border border-dag-border rounded-xl overflow-hidden group">
                  <div className="aspect-square relative overflow-hidden">
                    <img src={nft.imageUrl} alt={nft.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300" />
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
      </div>
    </div>
  );
};

export default WalletView;