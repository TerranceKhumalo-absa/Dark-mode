
import React, { useState } from 'react';
import { X, AlertTriangle, ThumbsUp, Maximize2, Move, AlertCircle } from 'lucide-react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  blurBackdrop?: boolean;
  className?: string;
  showIcon?: boolean;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, title, children, blurBackdrop, className = '', showIcon }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 ${blurBackdrop ? 'backdrop-blur-md' : ''} transition-all duration-300 animate-in fade-in`} 
        onClick={onClose}
      />
      
      {/* Dialog Container */}
      <div className={`relative bg-white dark:bg-absa-surface rounded-md shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] w-full max-w-md overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 border border-absa-border ${className}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-absa-border bg-white dark:bg-absa-surface">
          <div className="flex items-center gap-3">
            <div className="w-1 h-5 bg-absa-primary rounded-full"></div>
            <div className="flex items-center gap-2">
              {showIcon && <AlertCircle size={18} className="text-absa-primary" />}
              <h3 className="font-bold text-absa-text text-sm tracking-tight">{title}</h3>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-absa-muted hover:text-absa-primary transition-all p-1 hover:bg-gray-100 dark:hover:bg-white/5 rounded"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-10">
          {children}
        </div>
      </div>
    </div>
  );
};

const DialogShowcase: React.FC = () => {
  const [activeDialog, setActiveDialog] = useState<string | null>(null);

  const dialogButtons = [
    { id: 'confirm', label: 'Confirmation dialog' },
    { id: 'regular', label: 'Regular dialog' },
    { id: 'blurred', label: 'Dialog with blurred background' },
    { id: 'draggable', label: 'Draggable dialog' },
    { id: 'maximizable', label: 'Maximizable dialog' },
    { id: 'resizable', label: 'Resizable dialog' },
    { id: 'nonmodal', label: 'Non-modal dialog' },
    { id: 'bottomright', label: 'Bottom-right positioned dialog' },
    { id: 'topleft', label: 'Top-left positioned dialog opened from the root instance' },
  ];

  return (
    <div className="space-y-8 min-h-[900px] pb-24">
      {/* Page Header */}
      <div className="bg-[#7a0d31] text-white p-4 -mx-8 -mt-8 mb-8 flex items-center justify-between font-bold tracking-widest text-sm uppercase shadow-inner">
        <div className="flex items-center gap-4">
           <button className="p-1 hover:bg-white/10 rounded"><Move size={18} /></button>
           <span>Dialog</span>
        </div>
      </div>

      {/* Tabs Layout matching screenshot */}
      <div className="flex border-b border-absa-border mb-8">
        <button className="px-10 py-3 text-absa-primary font-bold border-b-2 border-absa-primary text-sm relative">
          Examples
        </button>
        <button className="px-10 py-3 text-absa-muted hover:text-absa-text text-sm font-medium transition-colors">
          API
        </button>
      </div>

      {/* Button List */}
      <div className="flex flex-col gap-3 items-start max-w-sm">
        {dialogButtons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => setActiveDialog(btn.id)}
            className="w-full px-4 py-2 bg-[#7a0d31] text-white text-[13px] font-semibold rounded hover:bg-[#630b28] transition-all shadow-sm text-left active:scale-[0.98]"
          >
            {btn.label}
          </button>
        ))}
        
        <div className="mt-8 border-t border-absa-border w-full pt-8">
          <button 
            onClick={() => setActiveDialog(null)}
            className="px-5 py-2 border border-[#7a0d31] text-[#7a0d31] dark:text-[#f0325a] dark:border-[#f0325a] text-[13px] font-bold rounded flex items-center gap-2 hover:bg-[#7a0d31]/5 transition-all"
          >
            <X size={16} /> Close all dialogs
          </button>
        </div>
      </div>

      {/* 1. Confirmation Dialog - High Fidelity to Image 1 */}
      <Dialog 
        isOpen={activeDialog === 'confirm'} 
        onClose={() => setActiveDialog(null)} 
        title="Confirm the action"
        showIcon
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-8 text-absa-primary transform transition-transform hover:scale-110 duration-500">
            <AlertTriangle size={56} strokeWidth={1.5} />
          </div>
          <p className="text-absa-text text-base font-medium mb-12">
            Are you really sure you want to break the law?
          </p>
          <div className="flex gap-4 w-full">
            <button 
              onClick={() => setActiveDialog(null)}
              className="flex-1 py-3 border-2 border-absa-secondary text-absa-secondary font-bold rounded-sm text-sm hover:bg-absa-secondary/5 transition-all active:scale-[0.97]"
            >
              No
            </button>
            <button 
              onClick={() => setActiveDialog(null)}
              className="flex-1 py-3 bg-absa-secondary text-white font-bold rounded-sm text-sm hover:bg-orange-600 transition-all shadow-lg shadow-absa-secondary/20 active:scale-[0.97]"
            >
              Yes
            </button>
          </div>
        </div>
      </Dialog>

      {/* 2. Regular Dialog - High Fidelity to Image 2 */}
      <Dialog 
        isOpen={activeDialog === 'regular'} 
        onClose={() => setActiveDialog(null)} 
        title="Regular dialog"
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-10 text-[#7a0d31] dark:text-[#f0325a]">
            <ThumbsUp size={56} strokeWidth={1.5} />
          </div>
          <h2 className="text-[32px] font-light text-absa-text mb-2 leading-tight">
            This is the dialog content
          </h2>
          <p className="text-[13px] text-absa-muted mb-12 tracking-wide font-medium">
            Greetings from the dialog content component
          </p>
          <button 
            onClick={() => setActiveDialog(null)}
            className="px-8 py-3 bg-[#7a0d31] text-white text-[13px] font-bold rounded-sm hover:bg-[#5a0a25] transition-all shadow-md active:scale-[0.97]"
          >
            Disable closing
          </button>
        </div>
      </Dialog>

      {/* 3. Blurred Background Dialog */}
      <Dialog 
        isOpen={activeDialog === 'blurred'} 
        onClose={() => setActiveDialog(null)} 
        title="Blurred Backdrop Dialog"
        blurBackdrop
      >
        <div className="text-center space-y-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
             <p className="text-sm text-absa-text leading-relaxed font-medium">
               The backdrop behind this dialog uses a Gaussian blur to reduce visual noise and improve reading focus.
             </p>
          </div>
          <button 
            onClick={() => setActiveDialog(null)} 
            className="text-absa-primary text-sm font-bold uppercase tracking-widest hover:underline"
          >
            Got it
          </button>
        </div>
      </Dialog>

      {/* Draggable Placeholder */}
      <Dialog 
        isOpen={activeDialog === 'draggable'} 
        onClose={() => setActiveDialog(null)} 
        title="Draggable Dialog"
      >
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-absa-muted">
             <Move size={32} />
          </div>
          <p className="text-sm text-absa-muted leading-relaxed">
            In a full implementation, this window could be repositioned anywhere on the screen by dragging the header.
          </p>
        </div>
      </Dialog>

      {/* Maximizable Placeholder */}
      <Dialog 
        isOpen={activeDialog === 'maximizable'} 
        onClose={() => setActiveDialog(null)} 
        title="Maximizable Dialog"
      >
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-absa-muted">
             <Maximize2 size={32} />
          </div>
          <p className="text-sm text-absa-muted leading-relaxed">
            This variant supports a "Full Screen" toggle in the header, expanding the container to 100% viewport width/height.
          </p>
        </div>
      </Dialog>

    </div>
  );
};

export default DialogShowcase;
