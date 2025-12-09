import React from 'react';
import { LayoutGrid, Table2, Type, LogOut } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  isDarkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isDarkMode }) => {
  
  const navItems: { id: ViewState; label: string; icon: React.ReactNode }[] = [
    { id: 'BUTTON', label: 'Buttons', icon: <LayoutGrid size={20} /> },
    { id: 'TABLE', label: 'Data Grid', icon: <Table2 size={20} /> },
    { id: 'INPUT', label: 'Inputs', icon: <Type size={20} /> },
  ];

  return (
    <div className="w-64 bg-white dark:bg-absa-surface border-r border-absa-border flex flex-col h-full transition-colors duration-300">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-absa-border">
        <div className="w-8 h-8 rounded-full bg-absa-primary flex items-center justify-center text-white font-bold text-xs shrink-0 mr-3 shadow-lg shadow-absa-primary/30">
          AB
        </div>
        <div>
           <h1 className="font-bold text-absa-text leading-tight tracking-tight">Absa UI</h1>
           <p className="text-[10px] text-absa-muted uppercase tracking-wider">Design System</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
              ${currentView === item.id 
                ? 'bg-absa-primary text-white shadow-md shadow-absa-primary/20' 
                : 'text-absa-muted hover:bg-gray-100 dark:hover:bg-white/5 hover:text-absa-text'
              }
            `}
          >
            <span className={currentView === item.id ? 'text-white' : 'text-absa-muted group-hover:text-absa-text'}>
                {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer Info */}
      <div className="p-6 border-t border-absa-border">
         <div className="flex items-center space-x-3 text-absa-muted hover:text-absa-text cursor-pointer transition-colors">
            <LogOut size={16} />
            <span className="text-sm font-medium">Log Out</span>
         </div>
      </div>
    </div>
  );
};

export default Sidebar;