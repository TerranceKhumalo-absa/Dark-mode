export type ViewState = 'BUTTON' | 'TABLE' | 'INPUT';

export interface TableRow {
  id: string;
  colA: string;
  colB: string;
  colC: string;
  colD: boolean; // boolean for check/cross
  colE: string;
}

export type ButtonVariant = 'solid' | 'outlined' | 'borderless';
export type ButtonSize = 'lg' | 'md' | 'sm' | 'xs';