
import React from 'react';
import { Bell, User, Search, ExternalLink } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/9e6e1d5f-e8e7-46e1-99fb-d690c71e5e3f.png" 
              alt="K•SOLID" 
              className="h-8"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <ExternalLink size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
