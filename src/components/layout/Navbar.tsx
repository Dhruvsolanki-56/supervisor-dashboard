
import React from 'react';
import { 
  Bell, 
  Search, 
  User
} from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-background/95 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center">
        <div className="relative rounded-md w-64">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 pl-10 text-sm text-foreground bg-muted input-focus"
            placeholder="Search..."
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors relative">
          <Bell size={18} className="text-muted-foreground" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-anganwadi-severe rounded-full"></span>
        </button>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <User size={18} className="text-muted-foreground" />
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-medium">Admin User</div>
            <div className="text-xs text-muted-foreground">Supervisor</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
