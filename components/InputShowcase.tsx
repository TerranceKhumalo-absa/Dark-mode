
import React, { useState, useRef, useEffect } from 'react';
import { Info, Eye, EyeOff, XCircle, Search, Loader2, ChevronDown, MapPin, Check, Building2, Briefcase, Truck, ShieldCheck, AlertCircle } from 'lucide-react';

const InputLabel: React.FC<{ label: string; tooltip?: boolean; error?: boolean }> = ({ label, tooltip, error }) => (
  <label className={`block text-sm font-medium mb-1.5 flex items-center gap-2 ${error ? 'text-absa-error' : 'text-absa-text'}`}>
    {label}
    {tooltip && <Info size={14} className="text-blue-500 cursor-pointer" />}
  </label>
);

const HelperText: React.FC<{ text: string; error?: boolean }> = ({ text, error }) => (
  <p className={`mt-1 text-xs ${error ? 'text-absa-error font-medium' : 'text-absa-muted'}`}>{text}</p>
);

const InputContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`mb-8 ${className}`}>
    {children}
  </div>
);

interface AutocompleteProps {
  placeholder: string;
  options: string[];
  icon: React.ReactNode;
  label?: string;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ placeholder, options, icon }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option => 
    option.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const baseInputClass = "w-full bg-white dark:bg-absa-surfaceHighlight border border-absa-border rounded-md px-4 py-2.5 text-sm text-absa-text placeholder-absa-muted focus:outline-none focus:ring-2 focus:ring-absa-primary focus:border-transparent transition-all";

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={`${baseInputClass} pr-10`}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-absa-muted pointer-events-none">
          <ChevronDown size={18} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-absa-surface border border-absa-border rounded-lg shadow-xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          {filteredOptions.length > 0 ? (
            <div className="py-1">
              {filteredOptions.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(option);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-left hover:bg-absa-primary/10 hover:text-absa-primary transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-absa-muted group-hover:text-absa-primary">{icon}</span>
                    <span className="font-medium">{option}</span>
                  </div>
                  {query === option && <Check size={14} className="text-absa-primary" />}
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-absa-muted italic">No results match "{query}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const InputShowcase: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [clearableValue, setClearableValue] = useState('Persistent Value');

  const locationOptions = [
    'Absa Bank Johannesburg',
    'Absa Bank Cape Town',
    'Absa Bank Durban',
    'Absa Bank Pretoria',
    'Absa Branch Sandton',
    'Absa Digital Hub',
    'Absa Mall of Africa',
  ];

  const companyOptions = [
    'Absa Group Limited',
    'Vodacom South Africa',
    'Sasol Limited',
    'Standard Bank Group',
    'Discovery Limited',
    'Naspers Corporate',
    'Anglo American Platinum',
    'Shoprite Holdings',
  ];

  const vendorOptions = [
    'CloudTech Solutions',
    'Delta Logistics Group',
    'Global Security Systems',
    'Prime Energy Partners',
    'Quantum Data Services',
    'Silverline FinTech',
    'Zenith Marketing Corp',
  ];

  const baseInputClass = "w-full bg-white dark:bg-absa-surfaceHighlight border border-absa-border rounded-md px-4 py-2.5 text-sm text-absa-text placeholder-absa-muted focus:outline-none focus:ring-2 focus:ring-absa-primary focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed read-only:bg-gray-50 dark:read-only:bg-black/20 read-only:border-absa-border";
  const errorInputClass = "w-full bg-red-50/30 dark:bg-red-900/10 border border-absa-error rounded-md px-4 py-2.5 text-sm text-absa-text placeholder-absa-error/50 focus:outline-none focus:ring-2 focus:ring-absa-error transition-all";

  return (
    <div className="bg-white dark:bg-absa-surface p-8 rounded-xl shadow-sm border border-absa-border transition-colors duration-300">
      <div className="mb-8 border-b border-absa-border pb-4">
        <h1 className="text-2xl font-bold text-absa-text">Input Components</h1>
        <p className="text-absa-muted mt-2">Form controls with advanced autocomplete, search, and validation states.</p>
      </div>

      <div className="max-w-3xl space-y-2">
        
        {/* Autocomplete Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <InputContainer className="mb-0">
                <InputLabel label="Branch Search" tooltip />
                <Autocomplete 
                    placeholder="Search Absa locations..." 
                    options={locationOptions} 
                    icon={<MapPin size={14} />}
                />
            </InputContainer>

            <InputContainer className="mb-0">
                <InputLabel label="Client Company" />
                <Autocomplete 
                    placeholder="Search client entities..." 
                    options={companyOptions} 
                    icon={<Building2 size={14} />}
                />
            </InputContainer>
        </div>

        {/* Vendor Search */}
        <InputContainer>
          <InputLabel label="Vendor / Service Provider Search" tooltip />
          <Autocomplete 
            placeholder="Search verified vendors..." 
            options={vendorOptions} 
            icon={<Truck size={14} />}
          />
          <HelperText text="Verify and select authorized procurement partners" />
        </InputContainer>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-8 border-t border-absa-border">
            {/* Standard Input States */}
            <div>
                <h3 className="text-sm font-bold text-absa-muted uppercase tracking-wider mb-6">Standard Inputs</h3>
                
                <InputContainer>
                    <InputLabel label="Required Numeric Input" tooltip />
                    <input 
                        type="text" 
                        placeholder="Enter 8 digit code" 
                        className={baseInputClass}
                    />
                </InputContainer>

                <InputContainer>
                    <InputLabel label="Loading State" />
                    <div className="relative overflow-hidden rounded-md">
                        <input 
                            type="text" 
                            placeholder="Validating..." 
                            className={`${baseInputClass} pr-10 border-b-2 border-b-absa-primary/30`}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <Loader2 size={16} className="animate-spin text-absa-primary" />
                        </div>
                        <div className="absolute bottom-0 left-0 h-[2px] bg-absa-primary/50 w-full animate-pulse"></div>
                    </div>
                </InputContainer>

                {/* NEW: Error Input State */}
                <InputContainer>
                    <InputLabel label="Invalid Input State" error />
                    <div className="relative">
                        <input 
                            type="text" 
                            defaultValue="INVALID_ACC_001"
                            className={errorInputClass}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-absa-error">
                            <AlertCircle size={18} />
                        </div>
                    </div>
                    <HelperText text="The value entered is not a valid account number format." error />
                </InputContainer>
            </div>

            <div>
                <h3 className="text-sm font-bold text-absa-muted uppercase tracking-wider mb-6">Security & Utilities</h3>

                <InputContainer>
                    <InputLabel label="Secure Password" />
                    <div className="relative">
                        <input 
                        type={passwordVisible ? "text" : "password"} 
                        placeholder="••••••••" 
                        className={`${baseInputClass} pr-10`}
                        />
                        <button 
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-absa-muted hover:text-absa-text transition-colors"
                        >
                        {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </InputContainer>

                <InputContainer>
                    <InputLabel label="Clearable Input" />
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
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-absa-error hover:scale-110 transition-transform"
                            >
                            <XCircle size={18} />
                            </button>
                        )}
                    </div>
                </InputContainer>

                {/* Readonly Example for Balance */}
                <InputContainer>
                    <InputLabel label="Read-only Reference" />
                    <div className="bg-gray-100 dark:bg-white/5 border border-absa-border rounded-md px-4 py-2.5 text-sm text-absa-muted select-none">
                        ZAR 1,250,000.00
                    </div>
                </InputContainer>
            </div>
        </div>

        {/* Full Width Search */}
        <InputContainer className="mt-8">
          <InputLabel label="Global Database Search" />
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-absa-muted group-focus-within:text-absa-primary transition-colors">
                <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Search customers, transactions, or files..." 
              className={`${baseInputClass} pl-12 h-14 text-lg border-2`}
            />
          </div>
        </InputContainer>

      </div>
    </div>
  );
};

export default InputShowcase;
