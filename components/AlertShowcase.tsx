
import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  children: React.ReactNode;
}

// Explicitly use React.FC to handle children prop correctly in TSX
const Alert: React.FC<AlertProps> = ({ type, title, children }) => {
  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400',
    error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400',
    warning: 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400',
    info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400',
  };

  const Icons = {
    success: <CheckCircle2 size={20} />,
    error: <AlertCircle size={20} />,
    warning: <AlertTriangle size={20} />,
    info: <Info size={20} />,
  };

  return (
    <div className={`p-4 border rounded-lg flex gap-3 relative overflow-hidden ${styles[type]}`}>
      <div className="shrink-0">{Icons[type]}</div>
      <div className="flex-1">
        <h4 className="font-bold text-sm mb-1">{title}</h4>
        <div className="text-sm opacity-90">{children}</div>
      </div>
      <button className="text-current opacity-50 hover:opacity-100 transition-opacity">
        <X size={16} />
      </button>
    </div>
  );
};

const AlertShowcase: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-absa-text">Alerts</h1>
    <div className="grid gap-4 max-w-3xl">
      <Alert type="info" title="Informational">
        This is a neutral alert used to provide general feedback to the user.
      </Alert>
      <Alert type="success" title="Success!">
        Your pipeline has been successfully deployed to the production environment.
      </Alert>
      <Alert type="warning" title="Warning Required">
        Low storage capacity detected. Please archive old logs soon.
      </Alert>
      <Alert type="error" title="Critical Error">
        Failed to authenticate with the remote JDBC source. Check your credentials.
      </Alert>
    </div>
  </div>
);

export default AlertShowcase;
