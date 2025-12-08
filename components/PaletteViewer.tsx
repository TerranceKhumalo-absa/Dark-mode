import React from 'react';
import { Copy, Palette, Eye, Sparkles } from 'lucide-react';
import { DarkThemeVariant } from '../App';

interface PaletteViewerProps {
  theme: DarkThemeVariant;
}

const ColorCard: React.FC<{ name: string; hex: string; desc: string }> = ({ name, hex, desc }) => (
  <div className="flex items-center justify-between p-4 bg-white dark:bg-absa-surface border border-absa-border rounded-lg group">
    <div className="flex items-center space-x-4">
      <div 
        className="w-12 h-12 rounded-lg shadow-sm ring-1 ring-inset ring-black/10"
        style={{ backgroundColor: hex }}
      ></div>
      <div>
        <p className="font-bold text-sm text-absa-text">{name}</p>
        <p className="text-xs text-absa-muted">{desc}</p>
      </div>
    </div>
    <div className="flex items-center space-x-3">
        <code className="bg-gray-100 dark:bg-black/30 px-2 py-1 rounded text-xs font-mono text-absa-text">{hex}</code>
        <button 
            onClick={() => navigator.clipboard.writeText(hex)} 
            className="p-1.5 text-absa-muted hover:text-absa-primary hover:bg-gray-50 dark:hover:bg-white/5 rounded-md transition-colors"
            title="Copy Hex"
        >
            <Copy size={14} />
        </button>
    </div>
  </div>
);

const PaletteViewer: React.FC<PaletteViewerProps> = ({ theme }) => {
  
  const getPaletteInfo = (theme: DarkThemeVariant) => {
    switch(theme) {
        case 'corporate':
            return {
                colors: [
                    { name: 'Agile', hex: '#f52d28', desc: 'Pantone® 1655C (Primary)' },
                    { name: 'Graphite', hex: '#2d2323', desc: 'Pantone® 440C (Surface)' },
                    { name: 'Dark Graphite', hex: '#1c1515', desc: 'Background Mix' },
                ],
                theory: "Warm Greys reduce eye strain compared to high-contrast black. This theme maintains the classic Absa Red identity using 'Agile' (which is brighter than 'Passion') to ensure legibility against the dark surface.",
                icon: <Palette size={20} className="text-absa-primary"/>,
                title: "Color Theory: Brand Identity"
            };
        case 'contrast':
             return {
                colors: [
                    { name: 'Energy', hex: '#f47721', desc: 'Pantone® 1375C (Primary)' },
                    { name: 'Black', hex: '#000000', desc: 'Background' },
                    { name: 'Prepared', hex: '#fa551e', desc: 'Pantone® 2018C (Secondary)' },
                ],
                theory: "Orange ('Energy') has a significantly higher luminance value than red. Paired with pure black, this theme offers the highest possible contrast ratio, making it the most accessible choice for visually impaired users.",
                icon: <Eye size={20} className="text-absa-primary"/>,
                title: "Color Theory: Accessibility"
            };
        case 'premium':
             return {
                 colors: [
                    { name: 'Surprise', hex: '#af144b', desc: 'Pantone® Rubine Red C' },
                    { name: 'Depth', hex: '#500a28', desc: 'Pantone® 683C (Surface)' },
                    { name: 'Dark Depth', hex: '#1a030d', desc: 'Background Mix' },
                 ],
                 theory: "Uses an Analogous harmony. The background is a very deep purple/brown ('Depth'), and the primary action color is a lighter purple/red ('Surprise'). This low-contrast background with a rich hue creates a luxurious, sophisticated feel.",
                 icon: <Sparkles size={20} className="text-absa-primary"/>,
                 title: "Color Theory: Sophistication"
             };
        default:
            return { colors: [], theory: "", icon: null, title: "" };
    }
  };

  const info = getPaletteInfo(theme);

  return (
    <div className="bg-gray-50 dark:bg-black/20 border border-absa-border rounded-xl p-8 mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-absa-primary/10 rounded-lg">
            {info.icon}
        </div>
        <div>
            <h3 className="text-lg font-bold text-absa-text capitalize">{info.title}</h3>
            <p className="text-sm text-absa-muted">Analyzing the {theme} theme strategy.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {info.colors.map((c) => (
            <ColorCard key={c.name} {...c} />
        ))}
      </div>
      
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
        <strong>Why this works:</strong> {info.theory}
      </div>
    </div>
  );
};

export default PaletteViewer;