import React from 'react';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';

export const SocialPost = ({ username, description, children }) => {
  return (
    <div className="max-w-md w-full bg-white border border-gray-200 rounded-lg shadow-sm mx-auto my-4">
      {/* Header */}
      <div className="flex items-center p-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 mr-3"></div>
        <span className="font-semibold text-sm">{username}</span>
      </div>

      {/* Content (The Image/Document) */}
      <div className="bg-gray-100 min-h-[200px] flex items-center justify-center overflow-hidden relative">
        {children}
      </div>

      {/* Actions */}
      <div className="p-3">
        <div className="flex justify-between mb-2">
          <div className="flex space-x-4">
            <Heart className="w-6 h-6 hover:text-red-500 cursor-pointer" />
            <MessageCircle className="w-6 h-6 cursor-pointer" />
            <Send className="w-6 h-6 cursor-pointer" />
          </div>
          <Bookmark className="w-6 h-6 cursor-pointer" />
        </div>
        
        {/* Description */}
        <div className="text-sm">
          <span className="font-semibold mr-2">{username}</span>
          {description}
        </div>
        <div className="text-xs text-gray-400 mt-1 uppercase">2 hours ago</div>
      </div>
    </div>
  );
};
