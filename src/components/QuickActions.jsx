import React from 'react';
import { FileText, Image ,File} from 'lucide-react';

export default function Suggestions({ suggestions }) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-4 gap-6">
        {suggestions.map((item, index) => (
          <div key={index} className={`${item.color} rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-shadow`}>
              <div className=" flex justify-center mb-4 ">
                <h3 className="font-medium text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3 p-1">{item.icon}</p>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}