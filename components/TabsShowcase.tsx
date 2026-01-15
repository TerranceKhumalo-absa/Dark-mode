
import React, { useState } from 'react';
import { ChevronRight, FileText, Target, LayoutGrid, User, Lock, ShieldAlert } from 'lucide-react';

interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  tooltip?: string;
  disabled?: boolean;
}

const TabsShowcase: React.FC = () => {
  const [activeTab1, setActiveTab1] = useState('tab1');
  const [activeTab2, setActiveTab2] = useState('tab1');
  const [activeTab3, setActiveTab3] = useState('tab1');
  const [activeTab4, setActiveTab4] = useState('tab1');

  const tabs1: TabItem[] = Array.from({ length: 6 }, (_, i) => ({
    id: `tab${i + 1}`,
    label: `Tab ${i + 1}`,
    tooltip: i === 2 ? 'This tab is restricted for your user role' : `View content for Tab ${i + 1}`,
    disabled: i === 2 // Tab 3 is disabled
  }));

  const tabs2: TabItem[] = [
    { id: 'tab1', label: 'Dashboard', icon: <LayoutGrid size={16} /> },
    { id: 'tab2', label: 'Reports (Locked)', icon: <Lock size={16} />, disabled: true },
    { id: 'tab3', label: 'Settings', icon: <Target size={16} /> },
  ];

  const tabs3: TabItem[] = [
    { id: 'tab1', label: 'Standard Access' },
    { id: 'tab2', label: 'Admin Only', disabled: true },
    { id: 'tab3', label: 'Guest View' },
  ];

  const tabs4: TabItem[] = [
    { id: 'tab1', label: 'Profile', icon: <User size={14} /> },
    { id: 'tab2', label: 'Security (Hidden)', disabled: true },
    { id: 'tab3', label: 'Notifications' },
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="bg-absa-primary text-white p-4 -mx-8 -mt-8 mb-8 flex items-center justify-center font-bold tracking-widest text-sm uppercase shadow-md">
        Tab Components & States
      </div>

      {/* Left-aligned tabs with disabled example */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-absa-text flex items-center gap-2">
           Left-aligned tabs with fade transition and disabled states
        </h2>
        <div className="border-b border-absa-border relative flex items-center bg-gray-50/30 dark:bg-white/5">
          <div className="flex overflow-x-auto no-scrollbar scroll-smooth">
            {tabs1.map((tab) => (
              <button
                key={tab.id}
                onClick={() => !tab.disabled && setActiveTab1(tab.id)}
                disabled={tab.disabled}
                title={tab.tooltip}
                className={`px-8 py-4 text-sm transition-all whitespace-nowrap relative flex items-center gap-2
                  ${tab.disabled 
                    ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' 
                    : activeTab1 === tab.id 
                      ? 'text-absa-primary font-bold' 
                      : 'text-absa-muted hover:text-absa-text'
                  }
                `}
              >
                {tab.label}
                {tab.disabled && <ShieldAlert size={12} className="opacity-50" />}
                {!tab.disabled && activeTab1 === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-absa-primary transition-all duration-300"></div>
                )}
              </button>
            ))}
          </div>
          <div className="ml-auto px-4 text-absa-muted border-l border-absa-border h-full flex items-center bg-white dark:bg-absa-surface">
            <ChevronRight size={18} />
          </div>
        </div>
        <div className="py-6 px-4 text-sm text-absa-muted animate-in fade-in duration-500 bg-white dark:bg-absa-surface border border-t-0 border-absa-border rounded-b-lg">
          {activeTab1 ? `Displaying content for ${activeTab1.toUpperCase()}` : 'Select an active tab'}
        </div>
      </section>

      {/* Right-aligned tabs with icons */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-absa-text">Right-aligned tabs with icons (Locked Variant)</h2>
        <div className="border-b border-absa-border flex justify-end bg-gray-50/30 dark:bg-white/5">
          {tabs2.map((tab) => (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && setActiveTab2(tab.id)}
              disabled={tab.disabled}
              className={`px-8 py-4 text-sm transition-all flex items-center gap-2 relative
                ${tab.disabled 
                  ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-60' 
                  : activeTab2 === tab.id 
                    ? 'text-absa-primary font-bold' 
                    : 'text-absa-muted hover:text-absa-text'
                }
              `}
            >
              {tab.icon}
              {tab.label}
              {!tab.disabled && activeTab2 === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-absa-primary"></div>
              )}
            </button>
          ))}
        </div>
        <div className="py-6 px-4 text-sm text-absa-muted">
          Active view: {activeTab2}
        </div>
      </section>

      {/* Stretched tabs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-absa-text">Stretched tabs with slide transition</h2>
        <div className="border-b border-absa-border flex bg-gray-50/30 dark:bg-white/5">
          {tabs3.map((tab) => (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && setActiveTab3(tab.id)}
              disabled={tab.disabled}
              className={`flex-1 py-4 text-sm transition-all relative
                ${tab.disabled
                  ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                  : activeTab3 === tab.id 
                    ? 'text-absa-primary font-bold' 
                    : 'text-absa-muted hover:text-absa-text'
                }
              `}
            >
              {tab.label}
              {!tab.disabled && activeTab3 === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-absa-primary"></div>
              )}
            </button>
          ))}
        </div>
        <div className="py-6 px-4 text-sm text-absa-muted">
          Switching between active stretched segments. Currently: {activeTab3}
        </div>
      </section>

      {/* Subtabs styled out of the box */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-absa-text">Tabs styled as subtabs with a disabled state</h2>
        <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-md w-fit">
          {tabs4.map((tab) => (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && setActiveTab4(tab.id)}
              disabled={tab.disabled}
              className={`px-10 py-2.5 text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center gap-2
                ${tab.disabled
                  ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : activeTab4 === tab.id 
                    ? 'bg-white dark:bg-absa-surface text-absa-primary shadow-sm' 
                    : 'text-absa-muted hover:text-absa-text'
                }
              `}
            >
              {tab.icon && <span className={tab.disabled ? 'text-gray-400' : 'text-absa-primary'}>{tab.icon}</span>}
              {tab.label}
            </button>
          ))}
        </div>
        <div className="py-4 px-4 text-sm text-absa-muted">
          Subtab Context: {activeTab4}
        </div>
      </section>
    </div>
  );
};

export default TabsShowcase;
