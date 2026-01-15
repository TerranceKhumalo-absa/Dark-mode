
import React from 'react';

interface BadgeProps {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'success' | 'error';
  children: React.ReactNode;
}

// Explicitly use React.FC to handle children prop correctly in TSX
const Badge: React.FC<BadgeProps> = ({ variant = 'default', children }) => {
  const styles = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    primary: 'bg-absa-primary text-white',
    secondary: 'bg-absa-secondary text-white',
    outline: 'border border-absa-border text-absa-text',
    success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold inline-flex items-center ${styles[variant]}`}>
      {children}
    </span>
  );
};

const BadgeShowcase: React.FC = () => (
  <div className="bg-white dark:bg-absa-surface p-8 rounded-xl border border-absa-border shadow-sm">
    <h1 className="text-2xl font-bold text-absa-text mb-8">Badges</h1>
    <div className="flex flex-wrap gap-4 items-center">
      <Badge>Default</Badge>
      <Badge variant="primary">Passion Red</Badge>
      <Badge variant="secondary">Energy Orange</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Completed</Badge>
      <Badge variant="error">Failed</Badge>
    </div>
    <div className="mt-8">
        <h3 className="text-sm font-bold text-absa-muted uppercase mb-4">In Context</h3>
        <div className="flex items-center gap-3 p-4 border border-absa-border rounded-lg max-w-sm">
            <span className="font-medium">User Profile Status</span>
            <Badge variant="success">Verified</Badge>
        </div>
    </div>
  </div>
);

export default BadgeShowcase;
