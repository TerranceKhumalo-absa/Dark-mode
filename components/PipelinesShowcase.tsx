
import React from 'react';
import { Play, Edit, Trash2, Clock, Database, FileText, Settings, Terminal, Box } from 'lucide-react';
import { Pipeline } from '../types';

const MOCK_PIPELINES: Pipeline[] = [
  { id: '1', name: 'Transaction_Ingest_v2', format: 'CSV', status: 'running', lastRun: '2 mins ago', owner: 'John D.' },
  { id: '2', name: 'Core_Banking_Sync', format: 'JDBC', status: 'active', lastRun: '1 hour ago', owner: 'Sarah M.' },
  { id: '3', name: 'Legacy_Mainframe_Dump', format: 'COBOL', status: 'failed', lastRun: 'Yesterday', owner: 'Mike R.' },
  { id: '4', name: 'Realtime_Analytics_Feed', format: 'JSON', status: 'active', lastRun: '15 mins ago', owner: 'System' },
  { id: '5', name: 'Risk_Score_Batch', format: 'PARQUET', status: 'idle', lastRun: '3 days ago', owner: 'Risk Team' },
  { id: '6', name: 'Customer_Profile_Agg', format: 'JDBC', status: 'active', lastRun: '10 mins ago', owner: 'Sarah M.' },
];

const FormatIcon = ({ format }: { format: string }) => {
  switch (format) {
    case 'CSV': return <FileText className="text-blue-500" />;
    case 'JDBC': return <Database className="text-orange-500" />;
    case 'COBOL': return <Terminal className="text-purple-500" />;
    case 'JSON': return <Box className="text-yellow-500" />;
    case 'PARQUET': return <Settings className="text-green-500" />;
    default: return <FileText />;
  }
};

const StatusBadge = ({ status }: { status: Pipeline['status'] }) => {
  const styles = {
    active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    running: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 animate-pulse',
    failed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    idle: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[status]}`}>
      {status}
    </span>
  );
};

// Use React.FC to allow built-in props like 'key' when used in maps
const PipelineCard: React.FC<{ pipeline: Pipeline }> = ({ pipeline }) => (
  <div className="bg-white dark:bg-absa-surface border border-absa-border rounded-xl p-5 hover:shadow-lg transition-all group relative overflow-hidden">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
        <FormatIcon format={pipeline.format} />
      </div>
      <StatusBadge status={pipeline.status} />
    </div>
    
    <div className="mb-4">
      <h3 className="font-bold text-absa-text truncate text-lg" title={pipeline.name}>{pipeline.name}</h3>
      <p className="text-xs text-absa-muted flex items-center gap-1 mt-1">
        <span className="font-semibold text-absa-primary">{pipeline.format}</span> • {pipeline.owner}
      </p>
    </div>

    <div className="flex items-center gap-4 text-xs text-absa-muted mb-6">
      <div className="flex items-center gap-1">
        <Clock size={14} />
        <span>{pipeline.lastRun}</span>
      </div>
    </div>

    <div className="flex items-center gap-2 pt-4 border-t border-absa-border">
      <button className="flex-1 bg-absa-primary text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-absa-accent transition-colors">
        <Play size={14} /> Run
      </button>
      <button className="p-2 border border-absa-border rounded-lg text-absa-muted hover:text-absa-text hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
        <Edit size={16} />
      </button>
      <button className="p-2 border border-absa-border rounded-lg text-absa-muted hover:text-absa-error hover:bg-absa-error/5 transition-colors">
        <Trash2 size={16} />
      </button>
    </div>
  </div>
);

const PipelinesShowcase: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-absa-text">Pipelines</h1>
          <p className="text-absa-muted">Manage and monitor your data ingestion workflows.</p>
        </div>
        <button className="bg-absa-secondary hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-bold shadow-lg shadow-orange-500/20 flex items-center gap-2 transition-all active:scale-95">
          Create Pipeline
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PIPELINES.map(p => <PipelineCard key={p.id} pipeline={p} />)}
      </div>
    </div>
  );
};

export default PipelinesShowcase;
