import React from 'react';
import { Copy, Palette, Eye, Sparkles, Smartphone, Cpu, Leaf } from 'lucide-react';
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
                    { name: 'Surprise', hex: '#af144b', desc: 'Primary (Pantone® Rubine Red)' },
                    { name: 'Neutral Dark', hex: '#1a1a1a', desc: 'Surface (Dark Grey)' },
                    { name: 'Near Black', hex: '#0f0f0f', desc: 'Background' },
                ],
                theory: "Uses #af144b on a neutral dark grey background. This is a classic corporate dark mode.",
                icon: <Palette size={20} className="text-absa-primary"/>,
                title: "Color Theory: Contrast Correction"
            };
        case 'contrast':
             return {
                colors: [
                    { name: 'Energy', hex: '#f47721', desc: 'Pantone® 1375C (Primary)' },
                    { name: 'Black', hex: '#000000', desc: 'Background' },
                    { name: 'Prepared', hex: '#fa551e', desc: 'Pantone® 2018C (Secondary)' },
                ],
                theory: "High luminance orange on pure black for maximum accessibility.",
                icon: <Eye size={20} className="text-absa-primary"/>,
                title: "Color Theory: Accessibility"
            };
        case 'premium':
             return {
                 colors: [
                    { name: 'Surprise', hex: '#af144b', desc: 'Primary (Pantone® Rubine Red)' },
                    { name: 'Espresso', hex: '#240e16', desc: 'Surface (Darkened Depth)' },
                    { name: 'Dark Warmth', hex: '#120509', desc: 'Background (Subtle Red Tint)' },
                 ],
                 theory: "Low saturation background with warm undertones. Feels distinct and luxurious.",
                 icon: <Sparkles size={20} className="text-absa-primary"/>,
                 title: "Color Theory: Balanced Luxury"
             };
        case 'fresh':
            return {
                colors: [
                   { name: 'Smile', hex: '#f0325a', desc: 'Primary (Pantone® 191C)' },
                   { name: 'Graphite', hex: '#2d2323', desc: 'Background (Pantone® 440C)' },
                   { name: 'Surface', hex: '#3a2f2f', desc: 'Lightened Graphite' },
                ],
                theory: "Brand Harmony: Instead of black, this theme uses the official 'Graphite' color as the dark background. Paired with 'Smile' pink, it creates a warm, human-centric, and fresh dark mode.",
                icon: <Leaf size={20} className="text-absa-primary"/>,
                title: "Theme: Fresh / Warm Dark"
            };
        case 'scifi':
            return {
                colors: [
                   { name: 'Agile', hex: '#f52d28', desc: 'Primary Red' },
                   { name: 'Gunmetal', hex: '#151e32', desc: 'Surface Blue-Grey' },
                   { name: 'Deep Space', hex: '#0b1120', desc: 'Background' },
                ],
                theory: "Agile Red on a deep, cool Gunmetal Blue background. Sharp corners (2px radius) for a high-tech, data-heavy dashboard feel.",
                icon: <Cpu size={20} className="text-absa-primary"/>,
                title: "Theme: Sci-Fi / Data"
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