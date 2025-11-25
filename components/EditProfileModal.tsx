import React, { useState, useRef } from 'react';
import { User } from '../types';
import { X, Camera, ShieldCheck } from './Icons';

interface EditProfileModalProps {
  user: User;
  onSave: (updates: Partial<User>) => void;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ user, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    username: user.username,
    bio: user.bio,
    location: user.location || '',
    email: user.email || '',
    phone: user.phone || '',
    avatarUrl: user.avatarUrl
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const countries = [
    "United States", "United Kingdom", "Canada", "Germany", "France", 
    "Japan", "South Korea", "Singapore", "Australia", "India", 
    "Brazil", "Nigeria", "South Africa", "United Arab Emirates"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, avatarUrl: imageUrl }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-dag-card w-full max-w-lg rounded-2xl border border-dag-border overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-dag-border bg-dag-dark/50">
          <div className="flex items-center space-x-4">
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-white">Edit Profile</h2>
          </div>
          <button 
            onClick={handleSubmit}
            className="bg-dag-accent text-dag-dark font-bold px-5 py-1.5 rounded-full hover:bg-dag-accent/90 transition-colors"
          >
            Save
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[80vh] p-4 custom-scrollbar">
          
          {/* Avatar Header */}
          <div className="relative mb-6">
             <div className="h-24 bg-gradient-to-r from-dag-dark to-dag-purple rounded-xl opacity-70"></div>
             <div className="absolute top-12 left-4">
                 <div className="relative group cursor-pointer inline-block">
                    <img 
                      src={formData.avatarUrl} 
                      alt="Avatar" 
                      className="w-24 h-24 rounded-full border-4 border-dag-card object-cover"
                    />
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Camera size={24} className="text-white/80" />
                    </div>
                    <input 
                       type="file" 
                       ref={fileInputRef} 
                       onChange={handleAvatarChange} 
                       className="hidden" 
                       accept="image/*"
                    />
                 </div>
             </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5 mt-14">
            
            {/* Name */}
            <div>
              <label className="block text-gray-500 text-sm font-bold mb-1">Name</label>
              <input 
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full bg-black/20 border border-dag-border rounded-lg p-3 text-white focus:border-dag-accent focus:outline-none focus:bg-black/40 transition-colors"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-gray-500 text-sm font-bold mb-1">Bio</label>
              <textarea 
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={3}
                className="w-full bg-black/20 border border-dag-border rounded-lg p-3 text-white focus:border-dag-accent focus:outline-none focus:bg-black/40 transition-colors resize-none"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-500 text-sm font-bold mb-1">Location</label>
              <div className="relative">
                <select 
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full bg-black/20 border border-dag-border rounded-lg p-3 text-white focus:border-dag-accent focus:outline-none focus:bg-black/40 transition-colors appearance-none"
                >
                  <option value="" disabled>Select your country</option>
                  {countries.map(country => (
                    <option key={country} value={country} className="bg-dag-card text-white">
                      {country}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                   <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
                <h3 className="text-white font-bold mb-3">Private Information</h3>
                
                {/* Email */}
                <div className="mb-4">
                  <label className="block text-gray-500 text-sm font-bold mb-1">Email</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Add your email"
                    className="w-full bg-black/20 border border-dag-border rounded-lg p-3 text-white focus:border-dag-accent focus:outline-none focus:bg-black/40 transition-colors"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-500 text-sm font-bold mb-1">Phone Number</label>
                  <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Add your phone number"
                    className="w-full bg-black/20 border border-dag-border rounded-lg p-3 text-white focus:border-dag-accent focus:outline-none focus:bg-black/40 transition-colors"
                  />
                </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;