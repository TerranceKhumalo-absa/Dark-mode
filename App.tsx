import React, { useState, useEffect } from 'react';
import { Moon, Sun, CheckCircle2, Info } from 'lucide-react';
import ButtonShowcase from './components/ButtonShowcase';
import TableShowcase from './components/TableShowcase';
import InputShowcase from './components/InputShowcase';
import PaletteViewer from './components/PaletteViewer';
import Sidebar from './components/Sidebar';
import { ViewState } from './types';

// Expanded themes
export type DarkThemeVariant = 'corporate' | 'contrast' | 'premium' | 'material' | 'scifi';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('BUTTON');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [darkTheme, setDarkTheme] = useState<DarkThemeVariant>('corporate');
  const [activeTab, setActiveTab] = useState<'Examples' | 'API'>('Examples');

  // Handle Dark Mode & Theme Toggle
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('dark', 'light', 'theme-corporate', 'theme-contrast', 'theme-premium', 'theme-material', 'theme-scifi');

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
      color: '#af144b',
      desc: 'Surprise on Neutral Dark'
    },
    { 
      id: 'contrast', 
      name: 'Contrast', 
      color: '#f47721',
      desc: 'Energy on Pure Black'
    },
    { 
      id: 'premium', 
      name: 'Premium', 
      color: '#af144b',
      desc: 'Surprise on Espresso'
    },
    { 
      id: 'material', 
      name: 'Material 3', 
      color: '#ffb0c8',
      desc: 'M3 Guidelines & Shapes'
    },
    { 
      id: 'scifi', 
      name: 'Sci-Fi', 
      color: '#f52d28',
      desc: 'Agile on Gunmetal'
    },
  ];

  return (
    <div className="h-screen flex font-sans bg-absa-bg text-absa-text overflow-hidden transition-colors duration-300">
      
      {/* Sidebar Navigation */}
      <aside className="shrink-0 z-20 shadow-xl lg:shadow-none">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} isDarkMode={isDarkMode} />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Top Header */}
        <header className="bg-white dark:bg-absa-surface border-b border-absa-border h-16 flex items-center justify-between px-8 transition-colors shrink-0">
          <h2 className="text-lg font-bold text-absa-text">
            {currentView === 'BUTTON' && 'Buttons'}
            {currentView === 'TABLE' && 'Data Grid'}
            {currentView === 'INPUT' && 'Input Fields'}
          </h2>
          
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

        {/* Theme Toolbar (Sticky) */}
        {isDarkMode && (
          <div className="bg-absa-surface border-b border-absa-border py-3 px-8 shrink-0 overflow-x-auto">
            <div className="flex items-center gap-4 min-w-max">
              <div className="flex items-center gap-2 text-xs text-absa-muted uppercase tracking-wider font-bold">
                 <Info size={14} />
                 <span>Theme</span>
              </div>
              
              <div className="flex gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setDarkTheme(theme.id)}
                    className={`
                      group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all
                      ${darkTheme === theme.id 
                        ? 'bg-absa-primary/10 border-absa-primary text-absa-primary shadow-sm' 
                        : 'bg-transparent border-absa-border text-absa-muted hover:border-absa-primary/30 hover:text-absa-text'}
                    `}
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full" 
                      style={{ backgroundColor: theme.color }}
                    ></span>
                    {theme.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8 scroll-smooth">
          {activeTab === 'Examples' ? (
             <div className="max-w-5xl mx-auto flex flex-col gap-8 animate-fadeIn pb-12">
               
               {/* View Switcher */}
               {currentView === 'BUTTON' && <ButtonShowcase />}
               {currentView === 'TABLE' && <TableShowcase />}
               {currentView === 'INPUT' && <InputShowcase />}
               
               {/* Color Palette Info */}
               {isDarkMode && <PaletteViewer theme={darkTheme} />}
             </div>
          ) : (
              <div className="max-w-5xl mx-auto p-12 text-center text-absa-muted border border-dashed border-absa-border rounded-lg mt-8">
                  <div className="text-4xl mb-4 font-light">API Documentation</div>
                  <p>Select "Examples" to view the UI components and color palette.</p>
              </div>
          )}
        </main>

      </div>
    </div>
  );
};

export default App;