import React, { useState } from 'react';
import { Filter, ChevronUp, ChevronDown, Check, X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { TableRow } from '../types';

// Mock data matching the structure in the provided screenshot
const MOCK_DATA: TableRow[] = [
  { id: '1', colA: 'A11', colB: '12/29/2021', colC: '100%', colD: false, colE: 'Tiger' },
  { id: '2', colA: 'A12', colB: '12/09/2022', colC: '110%', colD: false, colE: 'Cheetah' },
  { id: '3', colA: 'A13', colB: '03/02/2023', colC: '120%', colD: false, colE: 'Penguin' },
  { id: '4', colA: 'A14', colB: '11/12/2022', colC: '130%', colD: true, colE: 'Giraffe' },
  { id: '5', colA: 'A15', colB: '08/18/2022', colC: '140%', colD: false, colE: 'Tiger' },
];

const HeaderCell: React.FC<{ label: string }> = ({ label }) => (
  <th className="px-6 py-4 text-left text-xs font-bold text-absa-muted uppercase tracking-wider border-b border-absa-border">
    <div className="flex items-center space-x-2 group cursor-pointer select-none">
      <span>{label}</span>
      <Filter size={12} className="text-absa-muted hover:text-absa-primary transition-colors" />
      <div className="flex flex-col opacity-30 group-hover:opacity-100 transition-opacity">
        <ChevronUp size={10} />
        <ChevronDown size={10} />
      </div>
    </div>
  </th>
);

const TableShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Table 1');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Generate tabs Table 1 to Table 10 to match screenshot
  const tabs = Array.from({ length: 10 }, (_, i) => `Table ${i + 1}`);

  return (
    <div className="bg-white dark:bg-absa-surface rounded-xl shadow-sm border border-absa-border flex flex-col min-h-[600px] transition-colors duration-300">
      
      {/* Table Tabs (Scrollable) */}
      <div className="flex overflow-x-auto border-b border-absa-border bg-gray-50/50 dark:bg-black/10 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors flex-shrink-0 ${
              activeTab === tab
                ? 'border-absa-primary text-absa-primary bg-absa-primary/5'
                : 'border-transparent text-absa-muted hover:text-absa-text hover:bg-gray-50 dark:hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
        {/* Spacer to fill width */}
        <div className="flex-grow border-b-2 border-transparent"></div>
      </div>

      {/* Description Row */}
      <div className="p-6 border-b border-absa-border bg-white dark:bg-absa-surface">
         <h3 className="text-base font-bold text-absa-text">Table with a paginator, multiple sorting and individual filtering</h3>
      </div>

      {/* The Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-absa-border">
          <thead className="bg-white dark:bg-absa-surface">
            <tr>
              <HeaderCell label="A" />
              <HeaderCell label="B" />
              <HeaderCell label="C" />
              <HeaderCell label="D" />
              <HeaderCell label="E" />
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-absa-surface divide-y divide-absa-border">
            {MOCK_DATA.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-absa-muted font-medium">{row.colA}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-absa-muted">{row.colB}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-absa-muted">{row.colC}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {row.colD ? (
                    <Check size={18} className="text-absa-success font-bold" strokeWidth={3} />
                  ) : (
                     <X size={18} className="text-absa-error font-bold" strokeWidth={3} />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-absa-muted">{row.colE}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Spacer to push pagination to bottom */}
      <div className="flex-1 min-h-[50px]"></div>

      {/* Pagination Footer - Structurally matched to screenshot */}
      <div className="border-t border-absa-border p-4 flex flex-col md:flex-row items-center justify-between text-xs text-absa-muted bg-white dark:bg-absa-surface rounded-b-xl">
        
        {/* Left: Rows Per Page */}
        <div className="flex items-center mb-4 md:mb-0">
          <span className="mr-3">Rows per page:</span>
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="border-b border-absa-muted/50 pb-0.5 flex items-center hover:border-absa-primary hover:text-absa-primary transition-colors text-absa-text font-medium"
            >
              {rowsPerPage}
              <ChevronDown size={14} className="ml-2" />
            </button>
            
            {/* Rows Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute bottom-full left-0 mb-1 w-20 bg-white dark:bg-absa-surface border border-absa-border rounded shadow-lg z-10">
                {[5, 10, 25, 50].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      setRowsPerPage(num);
                      setIsDropdownOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-white/5 text-absa-text ${rowsPerPage === num ? 'bg-gray-50 dark:bg-white/10 font-bold text-absa-primary' : ''}`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Pagination Controls */}
        <div className="flex items-center gap-6">
            <span>11 - 15 of 32</span>
            
            <div className="flex items-center space-x-1">
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-white/10 disabled:opacity-30 text-absa-muted">
                    <ChevronsLeft size={16} />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-white/10 disabled:opacity-30 text-absa-muted">
                    <ChevronLeft size={16} />
                </button>
                
                {/* Page Numbers */}
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-white/10 text-absa-muted">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-white/10 text-absa-muted">2</button>
                {/* Active Page */}
                <button className="w-8 h-8 flex items-center justify-center rounded bg-absa-primary text-white font-medium shadow-sm">3</button>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-white/10 text-absa-muted">4</button>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-white/10 text-absa-muted">5</button>

                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-white/10 disabled:opacity-30 text-absa-muted">
                    <ChevronRight size={16} />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-white/10 disabled:opacity-30 text-absa-muted">
                    <ChevronsRight size={16} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TableShowcase;