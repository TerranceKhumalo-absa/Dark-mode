
import React from 'react';
import { PlusCircle, Loader2 } from 'lucide-react';
import { ButtonSize, ButtonVariant } from '../types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: boolean;
  iconRight?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'solid', 
  size = 'md', 
  className = '', 
  children, 
  iconLeft, 
  iconRight,
  disabled,
  isLoading,
  ...props 
}) => {
  
  let baseClass = "rounded-[var(--radius-btn)] font-semibold transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-absa-primary dark:focus:ring-offset-absa-bg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
  
  const sizeClasses = {
    lg: "px-6 py-3 text-base h-12",
    md: "px-4 py-2 text-sm h-10",
    sm: "px-3 py-1.5 text-xs h-8",
    xs: "px-2 py-1 text-[10px] uppercase tracking-wide h-7",
  };

  const variantClasses = {
    solid: "bg-absa-primary hover:bg-absa-accent text-white shadow-sm border border-transparent",
    secondary: "bg-absa-secondary hover:bg-orange-600 text-white shadow-sm border border-transparent",
    outlined: "bg-transparent border border-absa-border text-absa-text hover:bg-gray-50 dark:hover:bg-white/5",
    borderless: "bg-transparent text-absa-primary hover:bg-absa-primary/10 border border-transparent",
  };

  return (
    <button 
      className={`${baseClass} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
      {!isLoading && iconLeft && <PlusCircle className={`mr-2 ${size === 'xs' ? 'h-3 w-3' : 'h-4 w-4'}`} />}
      {children}
      {!isLoading && iconRight && <PlusCircle className={`ml-2 ${size === 'xs' ? 'h-3 w-3' : 'h-4 w-4'}`} />}
    </button>
  );
};

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <h2 className="text-xl font-bold text-absa-text mt-8 mb-6 border-b border-absa-border pb-2 transition-colors duration-300 flex items-center">
    <span className="w-1.5 h-6 bg-absa-primary mr-3 rounded-full"></span>
    {title}
  </h2>
);

const ButtonShowcase: React.FC = () => {
  return (
    <div className="bg-white dark:bg-absa-surface p-8 rounded-xl border border-absa-border shadow-sm">
      <h1 className="text-2xl font-bold text-absa-text mb-2">Buttons</h1>
      <p className="text-absa-muted mb-8">Modernized components using the full Absa brand palette.</p>

      <div className="grid gap-12">
        <section>
          <SectionHeader title="Primary & Secondary (Action Highlight)" />
          <div className="flex flex-wrap gap-4">
            <Button variant="solid">Primary Passion</Button>
            <Button variant="secondary">Secondary Energy</Button>
            <Button variant="outlined">Outlined Neutral</Button>
            <Button variant="borderless">Ghost Primary</Button>
          </div>
        </section>

        <section>
          <SectionHeader title="Sizes" />
          <div className="flex items-end gap-4">
            <Button size="lg">Large</Button>
            <Button size="md">Medium</Button>
            <Button size="sm">Small</Button>
            <Button size="xs">X-Small</Button>
          </div>
        </section>

        <section>
          <SectionHeader title="States" />
          <div className="flex flex-wrap gap-4">
            <Button isLoading>Loading State</Button>
            <Button iconLeft>With Icon</Button>
            <Button disabled>Disabled State</Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ButtonShowcase;
