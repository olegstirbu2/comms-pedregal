'use client';

import { useState, useMemo } from 'react';
import {
  OPERATIONS_TEMPLATES,
  CATEGORIES,
  COUNTRIES,
  filterTemplates,
  sortTemplates,
  type OperationsTemplate,
  type SortColumn,
  type SortDirection,
} from '@/lib/operations-template-data';

// Tab types
type TabType = 'message-templates' | 'email-templates' | 'email-addresses' | 'team-management';

const TABS: { id: TabType; label: string }[] = [
  { id: 'message-templates', label: 'Message Templates' },
  { id: 'email-templates', label: 'Email Templates' },
  { id: 'email-addresses', label: 'Email Addresses' },
  { id: 'team-management', label: 'Team Management' },
];

// Language display options (all templates are English now)
const LANGUAGE_OPTIONS = ['All', 'English'] as const;

// Search Icon Component
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M15 11C15 8.23858 12.7614 6 10 6C7.23858 6 5 8.23858 5 11C5 13.7614 7.23858 16 10 16C12.7614 16 15 13.7614 15 11ZM17 11C17 12.5913 16.4814 14.0576 15.5999 15.2413L19.707 19.3485C20.0975 19.739 20.0975 20.3722 19.707 20.7627C19.3165 21.1532 18.6833 21.1532 18.2928 20.7627L14.1856 16.6555C13.0019 17.537 11.5356 18 10 18C6.13401 18 3 14.866 3 11C3 7.13401 6.13401 4 10 4C13.866 4 17 7.13401 17 11Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Chevron Down Icon Component
function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M17.793 8.79289C18.1835 8.40237 18.8165 8.40237 19.2071 8.79289C19.5976 9.18342 19.5976 9.81658 19.2071 10.2071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.79289 10.2071C4.40237 9.81658 4.40237 9.18342 4.79289 8.79289C5.18342 8.40237 5.81658 8.40237 6.20711 8.79289L12 14.5858L17.793 8.79289Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Arrow Up Icon Component (for sort indicator)
function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M8 3L8 13M8 3L4 7M8 3L12 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Sort Icon Component
function SortIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M8.70711 2.29289C8.31658 1.90237 7.68342 1.90237 7.29289 2.29289L4.29289 5.29289C3.90237 5.68342 3.90237 6.31658 4.29289 6.70711C4.68342 7.09763 5.31658 7.09763 5.70711 6.70711L8 4.41421L10.2929 6.70711C10.6834 7.09763 11.3166 7.09763 11.7071 6.70711C12.0976 6.31658 12.0976 5.68342 11.7071 5.29289L8.70711 2.29289Z" fill="#B2B2B2"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.29289 13.7071C7.68342 14.0976 8.31658 14.0976 8.70711 13.7071L11.7071 10.7071C12.0976 10.3166 12.0976 9.68342 11.7071 9.29289C11.3166 8.90237 10.6834 8.90237 10.2929 9.29289L8 11.5858L5.70711 9.29289C5.31658 8.90237 4.68342 8.90237 4.29289 9.29289C3.90237 9.68342 3.90237 10.3166 4.29289 10.7071L7.29289 13.7071Z" fill="#B2B2B2"/>
    </svg>
  );
}

// Chevron Left Icon Component
function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M15.2071 6.79289C15.5976 7.18342 15.5976 7.81658 15.2071 8.20711L10.4142 13L15.2071 17.7929C15.5976 18.1834 15.5976 18.8166 15.2071 19.2071C14.8166 19.5976 14.1834 19.5976 13.7929 19.2071L8.29289 13.7071C7.90237 13.3166 7.90237 12.6834 8.29289 12.2929L13.7929 6.79289C14.1834 6.40237 14.8166 6.40237 15.2071 6.79289Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Chevron Right Icon Component
function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M8.79289 6.79289C8.40237 7.18342 8.40237 7.81658 8.79289 8.20711L13.5858 13L8.79289 17.7929C8.40237 18.1834 8.40237 18.8166 8.79289 19.2071C9.18342 19.5976 9.81658 19.5976 10.2071 19.2071L15.7071 13.7071C16.0976 13.3166 16.0976 12.6834 15.7071 12.2929L10.2071 6.79289C9.81658 6.40237 9.18342 6.40237 8.79289 6.79289Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Small Search Icon for Popover
function SearchIconSmall({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M11 7C11 4.79086 9.20914 3 7 3C4.79086 3 3 4.79086 3 7C3 9.20914 4.79086 11 7 11C9.20914 11 11 9.20914 11 7ZM13 7C13 8.2957 12.587 9.49384 11.8887 10.4746L15.207 13.793C15.5976 14.1835 15.5976 14.8165 15.207 15.207C14.8165 15.5976 14.1835 15.5976 13.793 15.207L10.4746 11.8887C9.49384 12.587 8.2957 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Checkmark Icon for Selected Items
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M13.3704 3.27958C13.7432 2.90681 14.3476 2.90681 14.7204 3.27958C15.0932 3.65235 15.0932 4.2568 14.7204 4.62957L6.12948 13.2205C5.95048 13.3995 5.70762 13.5 5.45449 13.5C5.20135 13.4999 4.95849 13.3995 4.77949 13.2205L1.27955 9.72057C0.906798 9.34781 0.906833 8.74335 1.27955 8.37058C1.65233 7.99781 2.25677 7.99781 2.62954 8.37058L5.45449 11.1955L13.3704 3.27958Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Filter Dropdown Component
function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter options based on search
  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    return options.filter((option) =>
      option.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery]);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 h-10 px-4 bg-white border border-[#d3d6d9] rounded-[8px] hover:border-[#111318] transition-colors"
      >
        <div className="flex items-center gap-1">
          <span className="text-[14px] text-[#51545d] leading-[20px] tracking-[-0.01px]">{label}:</span>
          <span className="bg-[#e9eaec] px-2 h-6 rounded-full flex items-center">
            <span className="text-[12px] font-semibold text-[#111318] leading-[18px] tracking-[-0.01px]">{value}</span>
          </span>
        </div>
        <ChevronDownIcon className={`w-6 h-6 text-[#111318] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-2 w-[265px] bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(17,19,24,0.15)] z-20 py-2 max-h-[400px] overflow-hidden flex flex-col">
            {/* Search Bar */}
            <div className="px-4 py-2">
              <div className="flex items-center gap-2 h-8 px-2 bg-white border border-[#d3d6d9] rounded-lg">
                <SearchIconSmall className="w-4 h-4 text-[#191919]" />
                <input
                  type="text"
                  placeholder={`Search for a ${label.toLowerCase()}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-[12px] text-[#111318] placeholder-[#51545d] leading-[18px] tracking-[-0.01px] outline-none"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
            
            {/* Separator */}
            <div className="px-4 py-2">
              <div className="h-px bg-[#e9eaec]" />
            </div>
            
            {/* All Option - only show if no search or matches search */}
            {(!searchQuery || 'all'.includes(searchQuery.toLowerCase())) && (
              <>
                <button
                  className="flex items-center gap-3 w-full px-4 py-1 text-[14px] leading-[20px] tracking-[-0.01px] hover:bg-[#f6f7f8] transition-colors min-h-[32px]"
                  onClick={() => handleSelect('All')}
                >
                  <div className="flex-1 text-left text-[#111318]">All</div>
                  {value === 'All' && <CheckIcon className="w-4 h-4 text-[#191919]" />}
                </button>
                
                {/* Separator */}
                <div className="px-4 py-2">
                  <div className="h-px bg-[#e9eaec]" />
                </div>
              </>
            )}
            
            {/* Options List */}
            <div className="overflow-y-auto">
              {filteredOptions.filter(opt => opt !== 'All').map((option) => (
                <button
                  key={option}
                  className="flex items-center gap-3 w-full px-4 py-1 text-[14px] leading-[20px] tracking-[-0.01px] hover:bg-[#f6f7f8] transition-colors min-h-[32px]"
                  onClick={() => handleSelect(option)}
                >
                  <div className="flex-1 text-left text-[#111318]">{option}</div>
                  {value === option && <CheckIcon className="w-4 h-4 text-[#191919]" />}
                </button>
              ))}
              {filteredOptions.filter(opt => opt !== 'All').length === 0 && searchQuery && !('all'.includes(searchQuery.toLowerCase())) && (
                <div className="px-4 py-2 text-[12px] text-[#51545d]">No results found</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Table Header Cell Component
function TableHeaderCell({
  children,
  sortable = false,
  sortColumn,
  currentSortColumn,
  currentSortDirection,
  onSort,
  align = 'left',
}: {
  children: React.ReactNode;
  sortable?: boolean;
  sortColumn?: SortColumn;
  currentSortColumn?: SortColumn;
  currentSortDirection?: SortDirection;
  onSort?: (column: SortColumn) => void;
  align?: 'left' | 'right';
}) {
  const isActive = sortColumn && currentSortColumn === sortColumn;
  
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 bg-[#f6f7f8] h-12 ${
        sortable ? 'cursor-pointer hover:bg-[#ebeced]' : ''
      }`}
      onClick={() => sortable && sortColumn && onSort?.(sortColumn)}
    >
      <div className={`flex items-center gap-2 ${align === 'right' ? 'ml-auto' : ''}`}>
        <span className="text-[12px] font-semibold text-[#111318] leading-[18px] tracking-[-0.01px]">
          {children}
        </span>
        {sortable && (
          <div className="w-4 h-4 flex items-center justify-center">
            {isActive ? (
              <ArrowUpIcon className={`text-[#111318] ${currentSortDirection === 'desc' ? 'rotate-180' : ''}`} />
            ) : (
              <SortIcon />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Table Body Cell Component
function TableBodyCell({
  children,
  align = 'left',
}: {
  children: React.ReactNode;
  align?: 'left' | 'right';
}) {
  return (
    <div
      className={`flex items-center px-4 py-2 min-h-12 ${align === 'right' ? 'justify-end' : ''}`}
    >
      {children}
    </div>
  );
}

// Pagination Component
function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  
  // Generate page numbers to show
  const pageNumbers = [];
  for (let i = 1; i <= Math.min(4, totalPages); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-between h-8">
      <span className="text-[12px] text-[#191919] leading-[18px] tracking-[-0.01px]">
        {startItem}–{endItem} of {totalItems} templates
      </span>
      
      <div className="flex items-center gap-2">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-8 h-8 flex items-center justify-center rounded-lg border ${
            currentPage === 1
              ? 'border-transparent text-[#d3d6d9] cursor-not-allowed'
              : 'border-[#d3d6d9] text-[#111318] hover:bg-[#f6f7f8]'
          }`}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        
        {/* Page numbers */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-lg text-[14px] ${
              page === currentPage
                ? 'border-2 border-[#111318] font-medium'
                : 'border border-[#d3d6d9] hover:bg-[#f6f7f8]'
            }`}
          >
            {page}
          </button>
        ))}
        
        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`w-8 h-8 flex items-center justify-center rounded-lg border ${
            currentPage === totalPages
              ? 'border-transparent text-[#d3d6d9] cursor-not-allowed'
              : 'border-[#d3d6d9] text-[#111318] hover:bg-[#f6f7f8]'
          }`}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default function MessageTemplatesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('message-templates');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [countryFilter, setCountryFilter] = useState('All');
  const [languageFilter, setLanguageFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<SortColumn>('title');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 10;

  // Filter and sort templates
  const filteredTemplates = useMemo(() => {
    const templates = filterTemplates(OPERATIONS_TEMPLATES, {
      category: categoryFilter,
      country: countryFilter,
      language: languageFilter,
      search: searchQuery,
    });
    
    return sortTemplates(templates, sortColumn, sortDirection);
  }, [categoryFilter, countryFilter, languageFilter, searchQuery, sortColumn, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);
  const paginatedTemplates = filteredTemplates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle sort
  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Column widths matching Figma
  // Grid template for consistent column widths
  const gridTemplate = '1fr 140px 140px 100px 140px 130px 130px';

  return (
    <div className="flex flex-col min-h-full pb-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2 py-6 bg-white">
        {/* Tabs */}
        <div className="px-6">
          <div className="flex items-center bg-white rounded-lg">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`h-8 px-3 rounded-lg text-[12px] font-bold leading-[18px] tracking-[-0.01px] transition-colors border-2 ${
                  activeTab === tab.id
                    ? 'bg-[#e9eaec] text-[#111318] border-white'
                    : 'text-[#51545d] hover:text-[#111318] border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Title and Create Button */}
        <div className="flex flex-col gap-2 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-[32px] font-bold text-[#111318] leading-[40px] tracking-[-0.01px]">
              Message Templates
            </h1>
            <button className="h-10 px-3 bg-[#00855f] text-white rounded-lg text-[14px] font-bold leading-[20px] tracking-[-0.01px] hover:bg-[#006f4f] transition-colors">
              Create template
            </button>
          </div>
          <p className="text-[14px] text-[#51545d] leading-[20px] tracking-[-0.01px] max-w-[632px]">
            Manage reusable message templates for agents across countries and languages.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col gap-4 px-6 pb-6 min-h-0">
        {/* Filters */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <FilterDropdown
              label="Category"
              value={categoryFilter}
              options={CATEGORIES}
              onChange={(value) => {
                setCategoryFilter(value);
                setCurrentPage(1);
              }}
            />
            <FilterDropdown
              label="Country"
              value={countryFilter}
              options={COUNTRIES}
              onChange={(value) => {
                setCountryFilter(value);
                setCurrentPage(1);
              }}
            />
            <FilterDropdown
              label="Language"
              value={languageFilter}
              options={LANGUAGE_OPTIONS}
              onChange={(value) => {
                setLanguageFilter(value);
                setCurrentPage(1);
              }}
            />
          </div>
          
          {/* Search */}
          <div className="w-[343px]">
            <div className="flex items-center gap-3 h-10 px-4 bg-white border border-[#d3d6d9] rounded-[8px]">
              <SearchIcon className="w-6 h-6 text-[#191919]" />
              <input
                type="text"
                placeholder="Search for a template"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="flex-1 text-[14px] text-[#111318] placeholder-[#51545d] leading-[20px] tracking-[-0.01px] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Table Container with Pagination */}
        <div className="flex flex-col">
          <div className="bg-white border border-[#e7e7e7] rounded-xl overflow-hidden">
            {/* Table Header */}
            <div 
              className="grid border-b-2 border-[#e9eaec]"
              style={{ gridTemplateColumns: gridTemplate }}
            >
              <TableHeaderCell
                sortable
                sortColumn="title"
                currentSortColumn={sortColumn}
                currentSortDirection={sortDirection}
                onSort={handleSort}
              >
                Template
              </TableHeaderCell>
              <TableHeaderCell
                sortable
                sortColumn="category"
                currentSortColumn={sortColumn}
                currentSortDirection={sortDirection}
                onSort={handleSort}
                align="right"
              >
                Category
              </TableHeaderCell>
              <TableHeaderCell
                sortable
                sortColumn="country"
                currentSortColumn={sortColumn}
                currentSortDirection={sortDirection}
                onSort={handleSort}
                align="right"
              >
                Country
              </TableHeaderCell>
              <TableHeaderCell
                sortable
                sortColumn="language"
                currentSortColumn={sortColumn}
                currentSortDirection={sortDirection}
                onSort={handleSort}
                align="right"
              >
                Language
              </TableHeaderCell>
              <TableHeaderCell
                sortable
                sortColumn="owner"
                currentSortColumn={sortColumn}
                currentSortDirection={sortDirection}
                onSort={handleSort}
                align="right"
              >
                Owner
              </TableHeaderCell>
              <TableHeaderCell
                sortable
                sortColumn="creationDate"
                currentSortColumn={sortColumn}
                currentSortDirection={sortDirection}
                onSort={handleSort}
                align="right"
              >
                Creation Date
              </TableHeaderCell>
              <TableHeaderCell
                sortable
                sortColumn="updateDate"
                currentSortColumn={sortColumn}
                currentSortDirection={sortDirection}
                onSort={handleSort}
                align="right"
              >
                Update Date
              </TableHeaderCell>
            </div>

            {/* Table Body */}
            <div>
              {paginatedTemplates.length === 0 ? (
                <div className="flex items-center justify-center h-48 text-[#51545d]">
                  No templates found matching your criteria
                </div>
              ) : (
                paginatedTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="grid border-b border-[#e9eaec] hover:bg-[#f6f7f8] transition-colors cursor-pointer"
                    style={{ gridTemplateColumns: gridTemplate }}
                  >
                    <TableBodyCell>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-[12px] font-semibold text-[#191919] leading-[18px] tracking-[-0.01px] truncate">
                          {template.title}
                        </span>
                        <span className="text-[12px] text-[#191919] leading-[18px] tracking-[-0.01px] line-clamp-1">
                          {template.content}
                        </span>
                      </div>
                    </TableBodyCell>
                    <TableBodyCell align="right">
                      <span className="text-[12px] text-[#191919] leading-[18px] tracking-[-0.01px]">
                        {template.category}
                      </span>
                    </TableBodyCell>
                    <TableBodyCell align="right">
                      <span className="text-[12px] text-[#191919] leading-[18px] tracking-[-0.01px]">
                        {template.country}
                      </span>
                    </TableBodyCell>
                    <TableBodyCell align="right">
                      <span className="text-[12px] text-[#191919] leading-[18px] tracking-[-0.01px]">
                        {template.language}
                      </span>
                    </TableBodyCell>
                    <TableBodyCell align="right">
                      <span className="text-[12px] text-[#191919] leading-[18px] tracking-[-0.01px]">
                        {template.owner}
                      </span>
                    </TableBodyCell>
                    <TableBodyCell align="right">
                      <span className="text-[12px] text-[#191919] leading-[18px] tracking-[-0.01px]">
                        {template.creationDate}
                      </span>
                    </TableBodyCell>
                    <TableBodyCell align="right">
                      <span className="text-[12px] text-[#191919] leading-[18px] tracking-[-0.01px]">
                        {template.updateDate}
                      </span>
                    </TableBodyCell>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pagination */}
          <div className="pt-4 pb-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredTemplates.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

