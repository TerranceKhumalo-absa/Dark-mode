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
                    { name: 'Surprise', hex: '#af144b', desc: 'Primary (Pantone® Rubine Red)' },
                    { name: 'Neutral Dark', hex: '#1a1a1a', desc: 'Surface (Dark Grey)' },
                    { name: 'Near Black', hex: '#0f0f0f', desc: 'Background' },
                ],
                theory: "You requested 'Surprise' (#af144b) as the primary. To fix the 'low contrast' issue on the standard Graphite background, I have darkened the background significantly to a Neutral Dark Grey. This makes the Rubine Red pop crisply while maintaining a professional 'Corporate' look.",
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
                theory: "Orange ('Energy') has a significantly higher luminance value than red. Paired with pure black, this theme offers the highest possible contrast ratio, making it the most accessible choice for visually impaired users.",
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
                 theory: "Addressing the 'too much dark red' feedback: This theme keeps the elegant 'Surprise' primary but drastically reduces the background saturation. Instead of the heavy purple 'Depth' background, it uses a deep Charcoal/Espresso blend. It feels luxurious without being overwhelming.",
                 icon: <Sparkles size={20} className="text-absa-primary"/>,
                 title: "Color Theory: Balanced Luxury"
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