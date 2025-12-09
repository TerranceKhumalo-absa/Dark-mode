import React, { useState } from 'react';
import { Info, Eye, EyeOff, XCircle, Search, Loader2 } from 'lucide-react';

const InputLabel: React.FC<{ label: string; tooltip?: boolean }> = ({ label, tooltip }) => (
  <label className="block text-sm font-medium text-absa-text mb-1.5 flex items-center gap-2">
    {label}
    {tooltip && <Info size={14} className="text-blue-500 cursor-pointer" />}
  </label>
);

const HelperText: React.FC<{ text: string }> = ({ text }) => (
  <p className="mt-1 text-xs text-absa-muted">{text}</p>
);

const InputContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`mb-8 ${className}`}>
    {children}
  </div>
);

const InputShowcase: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [clearableValue, setClearableValue] = useState('Clear me');

  const baseInputClass = "w-full bg-white dark:bg-absa-surface-highlight border border-absa-border rounded-md px-4 py-2.5 text-sm text-absa-text placeholder-absa-muted focus:outline-none focus:ring-2 focus:ring-absa-primary focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed read-only:bg-gray-50 dark:read-only:bg-black/20 read-only:border-absa-border";

  return (
    <div className="bg-white dark:bg-absa-surface p-8 rounded-xl shadow-sm border border-absa-border transition-colors duration-300">
      <div className="mb-8 border-b border-absa-border pb-4">
        <h1 className="text-2xl font-bold text-absa-text">Input Components</h1>
        <p className="text-absa-muted mt-2">Form controls with various states and validation styles.</p>
      </div>

      <div className="max-w-3xl space-y-2">
        
        {/* 1. Required numeric input with tooltip */}
        <InputContainer>
          <InputLabel label="Required numeric input with a tooltip" tooltip />
          <input 
            type="text" 
            placeholder="Enter 8 digit value" 
            className={baseInputClass}
          />
        </InputContainer>

        {/* 2. Loading input */}
        <InputContainer>
          <InputLabel label="Loading input" />
          <div className="relative overflow-hidden rounded-md">
            <input 
                type="text" 
                placeholder="Please enter" 
                className={`${baseInputClass} pr-10 border-b-2 border-b-absa-primary/30`}
            />
            {/* Loading Indicator */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 size={16} className="animate-spin text-absa-primary" />
            </div>
            {/* Progress Bar Line */}
            <div className="absolute bottom-0 left-0 h-[2px] bg-absa-primary/50 w-full animate-pulse"></div>
          </div>
          <HelperText text="This input is currently in a loading state" />
        </InputContainer>

        {/* 3. Password input */}
        <InputContainer>
          <InputLabel label="Password input" />
          <div className="relative">
            <input 
              type={passwordVisible ? "text" : "password"} 
              placeholder="Enter password" 
              className={`${baseInputClass} pr-10`}
            />
            <button 
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-absa-muted hover:text-absa-text"
            >
              {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </InputContainer>

        {/* 4. Disabled input */}
        <InputContainer>
          <InputLabel label="Disabled input" />
          <input 
            type="text" 
            placeholder="Please enter" 
            disabled
            className={baseInputClass}
          />
          <HelperText text="This input is disabled" />
        </InputContainer>

        {/* 5. Readonly input */}
        <InputContainer>
          <InputLabel label="Readonly input" />
          <input 
            type="text" 
            value="Value to show" 
            readOnly
            className={baseInputClass}
          />
          <HelperText text="This input is readonly" />
        </InputContainer>

        {/* 6. Clearable input */}
        <InputContainer>
          <InputLabel label="Clearable input with persistent clear icon" />
          <div className="relative">
            <input 
              type="text" 
              value={clearableValue}
              onChange={(e) => setClearableValue(e.target.value)}
              className={`${baseInputClass} pr-10`}
            />
            {clearableValue && (
                <button 
                onClick={() => setClearableValue('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-absa-error hover:text-red-600 transition-colors"
                >
                <XCircle size={18} />
                </button>
            )}
          </div>
          <HelperText text="This input is clearable" />
        </InputContainer>

        {/* 7. Input with prefix icon */}
        <InputContainer>
          <InputLabel label="Input with prefix icon" />
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-absa-text">
                <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Search something" 
              className={`${baseInputClass} pl-10`}
            />
          </div>
        </InputContainer>

      </div>
    </div>
  );
};

export default InputShowcase;