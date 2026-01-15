
import React, { useState } from 'react';
import { Info, CheckCircle2, XCircle, Clock } from 'lucide-react';

interface ToggleOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface ButtonToggleGroupProps {
  options: ToggleOption[];
  multiple?: boolean;
  mandatory?: boolean;
  value: string | string[];
  onChange: (value: any) => void;
  className?: string;
}

const ButtonToggleGroup: React.FC<ButtonToggleGroupProps> = ({ 
  options, 
  multiple, 
  mandatory = true, 
  value, 
  onChange,
  className = ""
}) => {
  const isSelected = (id: string) => {
    if (Array.isArray(value)) return value.includes(id);
    return value === id;
  };

  const handleToggle = (id: string) => {
    if (multiple) {
      const current = Array.isArray(value) ? value : [];
      if (current.includes(id)) {
        if (mandatory && current.length === 1) return;
        onChange(current.filter(i => i !== id));
      } else {
        onChange([...current, id]);
      }
    } else {
      if (value === id) {
        if (!mandatory) onChange("");
      } else {
        onChange(id);
      }
    }
  };

  return (
    <div className={`flex flex-wrap ${className}`}>
      {options.map((option, idx) => {
        const selected = isSelected(option.id);
        const isFirst = idx === 0;
        const isLast = idx === options.length - 1;

        return (
          <button
            key={option.id}
            disabled={option.disabled}
            onClick={() => handleToggle(option.id)}
            className={`
              px-5 py-2 text-[13px] font-medium transition-all flex items-center gap-2 border border-absa-border
              ${isFirst ? 'rounded-l-md' : '-ml-[1px]'}
              ${isLast ? 'rounded-r-md' : ''}
              ${selected 
                ? 'bg-[#7a0d31] text-white border-[#7a0d31] z-10' 
                : 'bg-white dark:bg-transparent text-absa-muted hover:bg-gray-50 dark:hover:bg-white/5 disabled:bg-gray-50 dark:disabled:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed'
              }
            `}
          >
            {option.icon}
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

const SectionHeader: React.FC<{ title: string; tooltip?: boolean }> = ({ title, tooltip }) => (
  <div className="flex items-center gap-2 mb-3 mt-8 first:mt-0">
    <h3 className="text-[13px] font-bold text-absa-text">{title}</h3>
    {tooltip && <Info size={14} className="text-sky-500 cursor-pointer" />}
  </div>
);

const ButtonToggleShowcase: React.FC = () => {
  const [val1, setVal1] = useState("opt2");
  const [val2, setVal2] = useState("opt2");
  const [val3, setVal3] = useState("opt1");
  const [val4, setVal4] = useState("opt2");
  const [val5, setVal5] = useState(["opt2"]);
  const [val6, setVal6] = useState(["opt2"]);
  const [val7, setVal7] = useState("pending");

  const standardOptions = [
    { id: 'opt1', label: 'Option 1' },
    { id: 'opt2', label: 'Option 2' },
    { id: 'opt3', label: 'Option 3' },
    { id: 'opt4', label: 'Option 4' },
  ];

  const extendedOptions = [
    ...standardOptions,
    { id: 'opt5', label: 'Option 5', disabled: true },
    { id: 'opt6', label: 'Option 6', disabled: true },
  ];

  const statusOptions = [
    { id: 'succeeded', label: 'Succeeded', icon: <CheckCircle2 size={16} /> },
    { id: 'failed', label: 'Failed', icon: <XCircle size={16} /> },
    { id: 'pending', label: 'Pending', icon: <Clock size={16} /> },
  ];

  return (
    <div className="min-h-[800px] pb-24">
      {/* Header Bar matching UI Kit */}
      <div className="bg-[#7a0d31] text-white p-3 -mx-8 -mt-8 mb-8 flex items-center justify-center font-bold tracking-widest text-sm uppercase">
        Button Toggle
      </div>

      {/* Tabs */}
      <div className="flex border-b border-absa-border mb-8">
        <button className="px-10 py-3 text-absa-primary font-bold border-b-2 border-absa-primary text-sm">
          Examples
        </button>
        <button className="px-10 py-3 text-absa-muted hover:text-absa-text text-sm transition-colors">
          API
        </button>
      </div>

      <div className="space-y-4">
        <section>
          <SectionHeader title="Single button toggles with a tooltip" tooltip />
          <ButtonToggleGroup 
            options={standardOptions} 
            value={val1} 
            onChange={setVal1} 
          />
        </section>

        <section>
          <SectionHeader title="Single button toggles with partially disabled options and targeted tooltips" />
          <ButtonToggleGroup 
            options={extendedOptions} 
            value={val2} 
            onChange={setVal2} 
          />
        </section>

        <section>
          <SectionHeader title="Disabled button toggles" />
          <ButtonToggleGroup 
            options={standardOptions.map(o => ({ ...o, disabled: true }))} 
            value={val3} 
            onChange={setVal3} 
          />
        </section>

        <section>
          <SectionHeader title="Single button toggles without mandatory selection" />
          <ButtonToggleGroup 
            options={standardOptions} 
            mandatory={false}
            value={val4} 
            onChange={setVal4} 
          />
        </section>

        <section>
          <SectionHeader title="Multiple button toggles" />
          <ButtonToggleGroup 
            options={standardOptions} 
            multiple
            value={val5} 
            onChange={setVal5} 
          />
        </section>

        <section>
          <SectionHeader title="Multiple button toggles without mandatory selection" />
          <ButtonToggleGroup 
            options={standardOptions} 
            multiple
            mandatory={false}
            value={val6} 
            onChange={setVal6} 
          />
        </section>

        <section>
          <SectionHeader title="Single button toggles with icons and unequal widths" />
          <ButtonToggleGroup 
            options={statusOptions} 
            value={val7} 
            onChange={setVal7} 
          />
        </section>
      </div>
    </div>
  );
};

export default ButtonToggleShowcase;
