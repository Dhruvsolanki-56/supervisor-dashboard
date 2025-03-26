import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";
import { 
  LayoutDashboard, 
  Users, 
  HeartPulse, 
  Package, 
  ChevronRight,
  ChevronLeft,
  BarChart3,
  Building,
} from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ComponentType<any>;
  href: string;
}

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useMobile();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  };

  const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { label: 'Centers', icon: Building, href: '/centers' },
  { label: 'Children', icon: Users, href: '/children' },
  { label: 'Nutrition', icon: HeartPulse, href: '/nutrition' },
  { label: 'Inventory', icon: Package, href: '/inventory' },
  { label: 'Analytics', icon: BarChart3, href: '/analytics' },
];

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-secondary border-r border-r-border",
        isCollapsed ? "w-16" : "w-60",
        isMobile ? "fixed left-0 top-0 z-50 transition-transform duration-300 ease-in-out" : "",
        isMobile && isCollapsed ? "-translate-x-full" : ""
      )}
    >
      <div className="flex-1 p-4">
        <div className="mb-4 flex items-center justify-between">
          <Link to="/" className="flex items-center text-lg font-semibold">
            {!isCollapsed && <span className="mr-2">Anganwadi App</span>}
            {/* You can add a logo here */}
          </Link>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleCollapse}>
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          )}
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={closeSidebar}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                location.pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
      {!isCollapsed && (
        <div className="p-4">
          {/* Add user profile or settings link here */}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
