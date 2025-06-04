import React from 'react';
import {  useNavigate } from '@tanstack/react-router';
import {
  FolderOpen,
  File,
  Heart,
  Trash2,
} from 'lucide-react';

export default function DevicesSideMenu() {
    const navigate = useNavigate();
  const sidebarItems = [
    { name: 'Devices', id:1,icon: FolderOpen, active: true, count: null },
    { name: 'My settings', id:2,icon: FolderOpen, active: false, count: null },
    { name: 'logout', id:3,icon: Heart, active: false, count: null },
  ];
  const handleClick = (itemId) => {
    navigate({ to: '/login' });
  };


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
            <div key={item.id} className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
              item.active ? 'bg-white bg-opacity-50 text-gray-800' : 'text-gray-600 hover:bg-white hover:bg-opacity-30'
            }`}onClick={() => handleClick(item.id)}>
              <div className="flex items-center space-x-3">
                <item.icon className="w-4 h-4" />
                <span className="text-sm">{item.name}</span>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}