import React from 'react';
import {
  FolderOpen,
  File,
  Heart,
  Trash2,
} from 'lucide-react';

export default function SideMenu() {
  const sidebarItems = [
    { name: 'Overview', icon: FolderOpen, active: true, count: null },
    { name: 'My storage', icon: FolderOpen, active: false, count: null },
    { name: 'Favorites', icon: Heart, active: false, count: null },
    { name: 'Trash bin', icon: Trash2, active: false, count: null }
  ];


  return (
    <div className="w-64 bg-cyan-50  border-rborder-white border-opacity-50">
      {/* Logo */}
      <div className="p-6 border-b border-white border-opacity-20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
            <FolderOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-gray-800">MyApp</span>
        </div>
      </div>

      {/* File Manager Section */}
      <div className="p-4">
        <div className="text-sm text-gray-600 font-medium mb-3">File manager</div>
        <div className="space-y-1">
          {sidebarItems.map((item, index) => (
            <div key={index} className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
              item.active ? 'bg-white bg-opacity-50 text-gray-800' : 'text-gray-600 hover:bg-white hover:bg-opacity-30'
            }`}>
              <div className="flex items-center space-x-3">
                <item.icon className="w-4 h-4" />
                <span className="text-sm">{item.name}</span>
              </div>
              
            </div>
          ))}
        </div>
      </div>

     

      {/* Storage Info */}
      <div className="p-4 mt-auto">
        <div className="bg-white bg-opacity-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-800">Storage</span>
            <span className="text-sm text-gray-600">43% left</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div className="bg-cyan-500 h-2 rounded-full" style={{width: '57%'}}></div>
          </div>
          <button className="w-full bg-cyan-500 text-white text-sm py-2 rounded-lg hover:bg-cyan-600 transition-colors">
            Upgrade storage
          </button>
        </div>
      </div>
    </div>
  );
}