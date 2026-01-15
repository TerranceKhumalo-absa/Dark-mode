
export type ViewState = 'BUTTON' | 'TABLE' | 'INPUT' | 'PIPELINES' | 'ALERTS' | 'BADGES' | 'TABS' | 'DIALOG' | 'BUTTON_TOGGLE';

export interface TableRow {
  id: string;
  colA: string;
  colB: string;
  colC: string;
  colD: boolean; // boolean for check/cross
  colE: string;
}

export interface Pipeline {
  id: string;
  name: string;
  format: 'CSV' | 'JDBC' | 'COBOL' | 'JSON' | 'PARQUET';
  status: 'active' | 'running' | 'failed' | 'idle';
  lastRun: string;
  owner: string;
}

export type ButtonVariant = 'solid' | 'secondary' | 'outlined' | 'borderless';
export type ButtonSize = 'lg' | 'md' | 'sm' | 'xs';
