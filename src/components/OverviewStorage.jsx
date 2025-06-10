import React from 'react';
import { Image, Video, Music, FileText } from 'lucide-react';

export default function OverviewStorage({ storageData }) {
  return (
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
  );
}