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
  
  // Base styles
  let baseClass = "rounded-md font-medium transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-absa-primary dark:focus:ring-offset-absa-bg disabled:opacity-50 disabled:cursor-not-allowed";
  
  // Size styles
  const sizeClasses = {
    lg: "px-6 py-3 text-base",
    md: "px-4 py-2 text-sm",
    sm: "px-3 py-1.5 text-xs",
    xs: "px-2 py-1 text-[10px] uppercase tracking-wide",
  };

  // Variant styles 
  const variantClasses = {
    // Solid: Uses CSS variable --color-primary for background
    solid: "bg-absa-primary hover:bg-absa-secondary text-white shadow-sm disabled:bg-gray-300 dark:disabled:bg-gray-700 dark:disabled:text-gray-500",
    
    // Outlined: Border uses primary
    outlined: "bg-transparent border border-absa-primary text-absa-primary hover:bg-absa-primary/10 disabled:border-gray-300 disabled:text-gray-300 dark:disabled:border-gray-700 dark:disabled:text-gray-600",
    
    // Borderless: Text uses primary
    borderless: "bg-transparent text-absa-primary hover:bg-absa-primary/10 disabled:text-gray-300 dark:disabled:text-gray-600",
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

const ButtonRow: React.FC<{ variant: ButtonVariant }> = ({ variant }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start mb-8">
      {/* Column 1: Standard */}
      <div className="flex flex-col space-y-4 items-start">
        <span className="text-xs font-semibold text-absa-muted uppercase tracking-wider mb-1">Standard</span>
        <Button variant={variant} size="lg">Large button</Button>
        <Button variant={variant} size="md">Normal button</Button>
        <Button variant={variant} size="sm">Small button</Button>
        <Button variant={variant} size="xs">XSmall button</Button>
      </div>

      {/* Column 2: Left Icon */}
      <div className="flex flex-col space-y-4 items-start">
        <span className="text-xs font-semibold text-absa-muted uppercase tracking-wider mb-1">Left Icon</span>
        <Button variant={variant} size="lg" iconLeft>Large button</Button>
        <Button variant={variant} size="md" iconLeft>Normal button</Button>
        <Button variant={variant} size="sm" iconLeft>Small button</Button>
        <Button variant={variant} size="xs" iconLeft>XSmall button</Button>
      </div>

      {/* Column 3: Right Icon */}
      <div className="flex flex-col space-y-4 items-start">
        <span className="text-xs font-semibold text-absa-muted uppercase tracking-wider mb-1">Right Icon</span>
        <Button variant={variant} size="lg" iconRight>Large button</Button>
        <Button variant={variant} size="md" iconRight>Normal button</Button>
        <Button variant={variant} size="sm" iconRight>Small button</Button>
        <Button variant={variant} size="xs" iconRight>XSmall button</Button>
      </div>

      {/* Column 4: Disabled & Loading */}
      <div className="flex flex-col space-y-4 items-start">
        <span className="text-xs font-semibold text-absa-muted uppercase tracking-wider mb-1">Disabled</span>
        <Button variant={variant} size="lg" disabled iconLeft>Large button</Button>
        <Button variant={variant} size="md" disabled iconLeft>Normal button</Button>
        <Button variant={variant} size="sm" disabled iconLeft>Small button</Button>
        <Button variant={variant} size="xs" disabled iconLeft>XSmall button</Button>
      </div>
    </div>
  );
};

const ButtonShowcase: React.FC = () => {
  return (
    <div className="bg-white dark:bg-absa-surface p-8 rounded-xl shadow-sm border border-absa-border transition-colors duration-300">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-absa-text">Button Components</h1>
        <p className="text-absa-muted mt-2">Interactive button states using the active theme's primary color.</p>
      </div>

      <SectionHeader title="Solid Fill" />
      <ButtonRow variant="solid" />

      <SectionHeader title="Outlined" />
      <ButtonRow variant="outlined" />

      <SectionHeader title="Ghost / Borderless" />
      <ButtonRow variant="borderless" />
    </div>
  );
};

export default ButtonShowcase;