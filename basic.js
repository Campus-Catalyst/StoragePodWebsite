import React, { useState } from 'react';
import {
  Search,
  HelpCircle,
  Bell,
  Settings,
  User,
  Image,
  Video,
  Music,
  FileText,
  Users,
  GraduationCap,
  FolderOpen,
  Heart,
  Trash2,
  File,
  Lock,
  Globe,
  Share2,
  Plus,
  MoreVertical,
  ChevronDown
} from 'lucide-react';

export default function MyBoxFileManager() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [activeSection, setActiveSection] = useState('overview'); // This state is defined but not used in the provided JSX

  const storageData = [
    { type: 'Images', count: 361, used: '15GB', total: '1TB', color: 'bg-purple-400', icon: Image },
    { type: 'Video', count: 361, used: '15GB', total: '1TB', color: 'bg-blue-400', icon: Video },
    { type: 'Music', count: 361, used: '15GB', total: '1TB', color: 'bg-indigo-400', icon: Music },
    { type: 'Documents', count: 361, used: '15GB', total: '1TB', color: 'bg-gray-400', icon: FileText }
  ];

  const suggestions = [
    {
      title: 'UI/UX design guidelines',
      description: 'These are the design guidelines, please follow them every...',
      type: 'Design-guidelines.docx',
      icon: FileText,
      color: 'bg-teal-100'
    },
    {
      title: 'Biology research',
      description: 'Whales are large sea animals. We\'ve found out they can swim in the oceans and seas...',
      type: 'School paper.docx',
      icon: FileText,
      color: 'bg-teal-100'
    },
    {
      title: '',
      description: '',
      type: 'IMG_000007.jpg',
      icon: Image,
      color: 'bg-blue-200',
      isImage: true
    },
    {
      title: 'Australia',
      description: 'This presentation is about beautiful country called Australia',
      type: 'Important keynote.pptx',
      icon: FileText,
      color: 'bg-teal-100'
    }
  ];

  const recentFiles = [
    { name: 'Design-guidelines.docx', size: '8.95 MB', shared: 'Public', lastModified: '24/08/2023 08:42 AM', icon: FileText, shareType: 'public' },
    { name: 'Cool music.mp3', size: '219 MB', shared: 'Only me', lastModified: '24/08/2023 11:23 PM', icon: Music, shareType: 'private' },
    { name: 'Work keynote.pptx', size: '2 MB', shared: 'Team', lastModified: '21/08/2023 07:09 AM', icon: FileText, shareType: 'team' },
    { name: 'Holiday plans.xls', size: '1 MB', shared: 'Only me', lastModified: '21/08/2023 06:10 AM', icon: FileText, shareType: 'private' },
    { name: 'Nice movie.mp4', size: '20 MB', shared: 'Me, Jessica', lastModified: '20/08/2023 03:55 AM', icon: Video, shareType: 'shared' }
  ];

  const sidebarItems = [
    { name: 'Overview', icon: FolderOpen, active: true, count: null },
    { name: 'My storage', icon: FolderOpen, active: false, count: null },
    { name: 'Recent files', icon: File, active: false, count: 2 },
    { name: 'Favorites', icon: Heart, active: false, count: null },
    { name: 'Trash bin', icon: Trash2, active: false, count: null }
  ];

  const sharedItems = [
    { name: 'Team', icon: Users, active: false },
    { name: 'School', icon: GraduationCap, active: false }
  ];

  const toggleFileSelection = (index) => {
    setSelectedFiles(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getShareIcon = (shareType) => {
    switch(shareType) {
      case 'public': return <Globe className="w-4 h-4" />;
      case 'team': return <Users className="w-4 h-4" />;
      case 'private': return <Lock className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-cyan-100 to-purple-200">
      {/* Sidebar */}
      <div className="w-64 bg-cyan-50 bg-opacity-80 backdrop-blur-sm border-r border-white border-opacity-30">
        {/* Logo */}
        <div className="p-6 border-b border-white border-opacity-20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
              <FolderOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-800">MyBox</span>
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
                {item.count && (
                  <span className="bg-cyan-500 text-white text-xs rounded-full px-2 py-1">
                    {item.count}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Shared Files Section */}
        <div className="p-4">
          <div className="text-sm text-gray-600 font-medium mb-3">Shared files</div>
          <div className="space-y-1">
            {sharedItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer text-gray-600 hover:bg-white hover:bg-opacity-30 transition-colors">
                <item.icon className="w-4 h-4" />
                <span className="text-sm">{item.name}</span>
              </div>
            ))}
          </div>
          <button className="flex items-center space-x-2 px-3 py-2 mt-3 text-sm text-gray-600 hover:bg-white hover:bg-opacity-30 rounded-lg transition-colors w-full">
            <Plus className="w-4 h-4" />
            <span>Create shared folder</span>
          </button>
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
s
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
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

        {/* Content */}
        <div className="p-8 overflow-y-auto h-full">
          {/* Overview Storage */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Overview storage</h2>
            <div className="grid grid-cols-4 gap-6">
              {storageData.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className={`${item.color} rounded-2xl p-6 text-white relative overflow-hidden`}>
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-white bg-opacity-10 rounded-full"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <div className="mb-2">
                        <h3 className="text-lg font-semibold">{item.type}</h3>
                        <p className="text-sm opacity-90">{item.count} files</p>
                      </div>
                      <div className="text-sm opacity-75">
                        {item.used} of {item.total}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Suggestions */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Suggestions</h2>
            <div className="grid grid-cols-4 gap-6">
              {suggestions.map((item, index) => (
                <div key={index} className={`${item.color} rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-shadow`}>
                  {item.isImage ? (
                    <div className="h-32 bg-gradient-to-br from-blue-300 to-blue-500 rounded-lg mb-4 flex items-center justify-center">
                      <div className="w-16 h-12 bg-white bg-opacity-20 rounded"></div>
                    </div>
                  ) : (
                    <div className="mb-4">
                      <h3 className="font-medium text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 text-gray-700">
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Files */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Recent files</h2>
            <div className="bg-white bg-opacity-50 backdrop-blur-sm rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 border-opacity-50">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600">
                  <div className="col-span-1"></div>
                  <div className="col-span-4 flex items-center space-x-2">
                    <span>Name</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  <div className="col-span-2 flex items-center space-x-2">
                    <span>Size</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  <div className="col-span-2">Shared</div>
                  <div className="col-span-2 flex items-center space-x-2">
                    <span>Last modified</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  <div className="col-span-1">Share</div>
                </div>
              </div>
              <div className="divide-y divide-gray-200 divide-opacity-50">
                {recentFiles.map((file, index) => (
                  <div key={index} className="px-6 py-4 hover:bg-white hover:bg-opacity-30 transition-colors">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={selectedFiles.includes(index)}
                          onChange={() => toggleFileSelection(index)}
                        />
                      </div>
                      <div className="col-span-4 flex items-center space-x-3">
                        <file.icon className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-800">{file.name}</span>
                      </div>
                      <div className="col-span-2 text-sm text-gray-600">{file.size}</div>
                      <div className="col-span-2 flex items-center space-x-2 text-sm text-gray-600">
                        {getShareIcon(file.shareType)}
                        <span>{file.shared}</span>
                      </div>
                      <div className="col-span-2 text-sm text-gray-600">{file.lastModified}</div>
                      <div className="col-span-1">
                        <Share2 className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}