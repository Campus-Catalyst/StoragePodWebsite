import React from 'react';
import {
  Search,
  HelpCircle,
  Bell,
  Settings,
  FolderOpen 
} from 'lucide-react';

export default function Header() {
  return (
    <div className="bg-cyan-50 bg-opacity-80 backdrop-blur-sm border-b border-white border-opacity-30 px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <FolderOpen className="w-6 h-6 text-gray-700" />
            <h1 className="text-xl font-semibold text-gray-800">Overview</h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 bg-white bg-opacity-50 border border-white border-opacity-30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300 w-64"
            />
          </div>
          <div className="flex items-center space-x-3">
            <HelpCircle className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
            <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
            <Settings className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full cursor-pointer"></div>
          </div>
        </div>
      </div>
    </div>
  );
}