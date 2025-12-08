import React, { useState, useEffect } from 'react';
import { Menu, Moon, Sun, CheckCircle2, Info } from 'lucide-react';
import ButtonShowcase from './components/ButtonShowcase';
import TableShowcase from './components/TableShowcase';
import PaletteViewer from './components/PaletteViewer';
import { ViewState } from './types';

// Reduced to 3 distinct strategic themes
export type DarkThemeVariant = 'corporate' | 'contrast' | 'premium';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('BUTTON');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [darkTheme, setDarkTheme] = useState<DarkThemeVariant>('corporate');
  const [activeTab, setActiveTab] = useState<'Examples' | 'API'>('Examples');

  // Handle Dark Mode & Theme Toggle
  useEffect(() => {
    const html = document.documentElement;
    
    // Remove all possible theme classes
    html.classList.remove('dark', 'light', 'theme-corporate', 'theme-contrast', 'theme-premium');

    if (isDarkMode) {
      html.classList.add('dark');
      html.classList.add(`theme-${darkTheme}`);
    } else {
      html.classList.add('light');
    }
  }, [isDarkMode, darkTheme]);

  const themes: { id: DarkThemeVariant; name: string; color: string; desc: string }[] = [
    { 
      id: 'corporate', 
      name: 'Corporate', 
      color: '#f52d28',
      desc: 'Standard Brand (Agile on Graphite)'
    },
    { 
      id: 'contrast', 
      name: 'High Contrast', 
      color: '#f47721',
      desc: 'Accessibility (Energy on Black)'
    },
    { 
      id: 'premium', 
      name: 'Premium', 
      color: '#af144b',
      desc: 'Sophisticated (Surprise on Depth)'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      {/* Top Header */}
      <header className="bg-white dark:bg-absa-surface border-b border-absa-border h-16 flex items-center justify-between px-6 transition-colors duration-300">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full border-2 border-absa-primary flex items-center justify-center text-absa-primary font-bold text-sm shrink-0">
            UI
          </div>
          <div className="flex flex-col">
             <span className="font-bold text-absa-primary dark:text-absa-text leading-tight">Absa UI Kit</span>
             <span className="text-[10px] text-absa-muted uppercase tracking-wider">Consumer Products</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-transparent hover:border-absa-border bg-gray-100 dark:bg-black/20 text-gray-600 dark:text-absa-text transition-colors"
          >
            {isDarkMode ? <Moon size={18} className="text-absa-primary" /> : <Sun size={18} className="text-orange-500" />}
            <span className="hidden sm:inline text-sm font-medium">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
        </div>
      </header>

      {/* Main Navigation Bar - Absa Brand Color */}
      <div className="bg-[#780F36] text-white h-12 flex items-center px-4 shadow-md sticky top-0 z-50 transition-colors">
        <button className="mr-4 hover:bg-white/10 p-1.5 rounded transition">
          <Menu size={20} />
        </button>
        
        {/* Navigation / View Switcher */}
        <div className="flex flex-1 justify-center">
            <div className="flex space-x-1 bg-black/20 p-1 rounded-lg">
                <button 
                    onClick={() => setCurrentView('BUTTON')}
                    className={`px-6 py-1 rounded text-sm font-medium transition-all ${currentView === 'BUTTON' ? 'bg-white text-[#780F36] shadow-sm' : 'text-white/80 hover:bg-white/10'}`}
                >
                    Buttons
                </button>
                <button 
                    onClick={() => setCurrentView('TABLE')}
                    className={`px-6 py-1 rounded text-sm font-medium transition-all ${currentView === 'TABLE' ? 'bg-white text-[#780F36] shadow-sm' : 'text-white/80 hover:bg-white/10'}`}
                >
                    Data Grid
                </button>
            </div>
        </div>
        <div className="w-8"></div> {/* Spacer for balance */}
      </div>

      {/* THEME TOOLBAR (VISIBLE ONLY IN DARK MODE) */}
      {isDarkMode && (
        <div className="bg-absa-surface border-b border-absa-border py-4 px-6 animate-in slide-in-from-top-2 duration-300">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-sm text-absa-muted">
               <Info size={16} />
               <span className="font-semibold text-absa-text">Choose Style:</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setDarkTheme(theme.id)}
                  className={`
                    group flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium border transition-all relative overflow-hidden
                    ${darkTheme === theme.id 
                      ? 'bg-absa-primary/10 border-absa-primary text-absa-primary shadow-sm ring-1 ring-absa-primary/30' 
                      : 'bg-transparent border-absa-border text-absa-muted hover:border-absa-primary/30 hover:text-absa-text'}
                  `}
                >
                  <span 
                    className="w-4 h-4 rounded-full border border-black/10 shadow-sm" 
                    style={{ backgroundColor: theme.color }}
                  ></span>
                  <div className="flex flex-col items-start text-left">
                     <span className="leading-none mb-0.5">{theme.name}</span>
                     <span className="text-[10px] opacity-70 font-normal">{theme.desc}</span>
                  </div>
                  {darkTheme === theme.id && <CheckCircle2 size={16} className="ml-2" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub Navigation (Examples / API) */}
      <div className="bg-white dark:bg-absa-surface border-b border-absa-border px-6 transition-colors duration-300">
        <div className="flex space-x-8 max-w-7xl mx-auto">
          <button 
            onClick={() => setActiveTab('Examples')}
            className={`py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'Examples' ? 'border-absa-primary text-absa-primary' : 'border-transparent text-absa-muted hover:text-absa-text'}`}
          >
            Examples
          </button>
          <button 
             onClick={() => setActiveTab('API')}
             className={`py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'API' ? 'border-absa-primary text-absa-primary' : 'border-transparent text-absa-muted hover:text-absa-text'}`}
          >
            API
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-6 overflow-auto bg-absa-bg transition-colors duration-300">
        {activeTab === 'Examples' ? (
           <div className="max-w-7xl mx-auto flex flex-col gap-8 animate-fadeIn pb-12">
             {/* Component Display */}
             {currentView === 'BUTTON' ? <ButtonShowcase /> : <TableShowcase />}
             
             {/* Color Palette Info */}
             {isDarkMode && <PaletteViewer theme={darkTheme} />}
           </div>
        ) : (
            <div className="max-w-7xl mx-auto p-12 text-center text-absa-muted border border-dashed border-absa-border rounded-lg mt-8">
                <div className="text-4xl mb-4 font-light">API Documentation</div>
                <p>Select "Examples" to view the UI components and color palette.</p>
            </div>
        )}
      </main>
    </div>
  );
};

export default App;