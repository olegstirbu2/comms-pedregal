'use client';

import { useState, useRef, useEffect, useMemo } from 'react';

interface MultiSelectComboboxProps {
  label: string;
  value: string[];
  options: readonly string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  variant?: 'filter' | 'template'; // filter: compact with +n, template: full tags with X buttons
  showFlags?: boolean; // Show country flags for country options
}

// Country flags mapping
const COUNTRY_FLAGS: Record<string, string> = {
  'Finland': '🇫🇮',
  'Sweden': '🇸🇪',
  'Norway': '🇳🇴',
  'Denmark': '🇩🇰',
  'Iceland': '🇮🇸',
};

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

// Small Search Icon for Dropdown
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

// Checkbox Icons - Checked and Unchecked
function CheckboxCheckedIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={className}>
      <path d="M4 1H14C15.6569 1 17 2.34315 17 4V14C17 15.6569 15.6569 17 14 17H4C2.34315 17 1 15.6569 1 14V4C1 2.34315 2.34315 1 4 1Z" fill="#111318"/>
      <path d="M4 1H14C15.6569 1 17 2.34315 17 4V14C17 15.6569 15.6569 17 14 17H4C2.34315 17 1 15.6569 1 14V4C1 2.34315 2.34315 1 4 1Z" stroke="#111318" strokeWidth="2"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M14.0303 5.46967C14.3232 5.76256 14.3232 6.23744 14.0303 6.53033L7.65533 12.9053C7.36244 13.1982 6.88756 13.1982 6.59467 12.9053L3.96967 10.2803C3.67678 9.98744 3.67678 9.51256 3.96967 9.21967C4.26256 8.92678 4.73744 8.92678 5.03033 9.21967L7.125 11.3143L12.9697 5.46967C13.2626 5.17678 13.7374 5.17678 14.0303 5.46967Z" fill="white"/>
    </svg>
  );
}

function CheckboxUncheckedIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={className}>
      <path d="M4 1H14C15.6569 1 17 2.34315 17 4V14C17 15.6569 15.6569 17 14 17H4C2.34315 17 1 15.6569 1 14V4C1 2.34315 2.34315 1 4 1Z" fill="white" stroke="#111318" strokeWidth="2"/>
    </svg>
  );
}

export default function MultiSelectCombobox({
  label,
  value,
  options,
  onChange,
  placeholder = 'Select...',
  variant = 'filter',
  showFlags = false,
}: MultiSelectComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter options based on search
  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    return options.filter((option) =>
      option.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery]);

  // Handle selecting/deselecting an option
  const handleToggle = (option: string) => {
    if (value.includes(option)) {
      // Remove from selection
      onChange(value.filter(v => v !== option));
    } else {
      // Add to selection
      onChange([...value, option]);
    }
  };

  // Handle "All" toggle
  const handleToggleAll = () => {
    if (value.length === options.length) {
      // Deselect all
      onChange([]);
    } else {
      // Select all
      onChange([...options]);
    }
  };

  // Check if all options are selected
  const isAllSelected = value.length === options.length;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Helper function to format option with flag if needed
  const formatOption = (option: string) => {
    if (showFlags && COUNTRY_FLAGS[option]) {
      return `${COUNTRY_FLAGS[option]} ${option}`;
    }
    return option;
  };

  // Determine visible tags and overflow count (filter variant only)
  const visibleTags = variant === 'filter' ? value.slice(0, 2) : value;
  const overflowCount = variant === 'filter' ? Math.max(0, value.length - 2) : 0;
  const overflowTags = variant === 'filter' && overflowCount > 0 ? value.slice(2) : [];

  // Determine styling based on variant
  const buttonHeight = variant === 'template' ? 'min-h-[48px]' : 'h-[40px]';
  const buttonPadding = variant === 'template' ? 'px-[16px] py-[12px]' : 'px-[12px] py-[8px]';
  const tagGap = variant === 'template' ? 'gap-[8px]' : 'gap-[4px]';

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-[12px] ${buttonHeight} ${buttonPadding} bg-white border border-[#d3d6d9] rounded-[8px] hover:border-[#111318] transition-colors w-full`}
      >
        {variant === 'filter' ? (
          /* Filter variant: label always visible with tag/All */
          <div className={`flex items-center ${tagGap} flex-1 min-w-0`}>
            <span className="text-[14px] text-[#51545d] leading-[20px] tracking-[-0.01px] whitespace-nowrap">
              {label}:
            </span>
            
            {value.length === 0 || value.length === options.length ? (
              <span className="inline-flex items-center bg-[#e9eaec] px-[8px] h-[24px] rounded-full shrink-0">
                <span className="text-[12px] font-semibold text-[#111318] leading-[18px] tracking-[-0.01px] whitespace-nowrap">
                  All
                </span>
              </span>
            ) : (
              <div className={`flex items-center ${tagGap} flex-1 min-w-0`}>
                {visibleTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center bg-[#e9eaec] px-[8px] h-[24px] rounded-full shrink-0"
                  >
                    <span className="text-[12px] font-semibold text-[#111318] leading-[18px] tracking-[-0.01px] whitespace-nowrap">
                      {formatOption(tag)}
                    </span>
                  </span>
                ))}
                
                {overflowCount > 0 && (
                  <div 
                    className="relative inline-flex"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <span className="inline-flex items-center bg-[#e9eaec] px-[8px] h-[24px] rounded-full shrink-0">
                      <span className="text-[12px] font-semibold text-[#111318] leading-[18px] tracking-[-0.01px] whitespace-nowrap">
                        +{overflowCount}
                      </span>
                    </span>
                    
                    {/* Tooltip */}
                    {showTooltip && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-[8px] z-50 pointer-events-none">
                        {/* Arrow pointer pointing up */}
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full w-[40px] h-[8px] flex items-center justify-center">
                          <svg width="40" height="8" viewBox="0 0 40 8" fill="none">
                            <path d="M16 8L20 0L24 8H16Z" fill="#111318"/>
                          </svg>
                        </div>
                        <div className="bg-[#111318] px-[8px] py-[8px] rounded-[8px] shadow-[0px_4px_12px_0px_rgba(17,19,24,0.15)] whitespace-nowrap">
                          <p className="text-[12px] text-white leading-[18px] tracking-[-0.01px]">
                            {overflowTags.map((tag) => formatOption(tag)).join(', ')}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Template variant: placeholder or label with all tags */
          value.length === 0 ? (
            <span className="text-[14px] text-[#51545d] leading-[20px] tracking-[-0.01px]">
              {placeholder}
            </span>
          ) : (
            <div className={`flex items-center ${tagGap} flex-1 min-w-0 flex-wrap`}>
              <span className="text-[14px] text-[#51545d] leading-[20px] tracking-[-0.01px] whitespace-nowrap">
                {label}:
              </span>
              
              {visibleTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center bg-[#e9eaec] px-[8px] h-[24px] rounded-full shrink-0"
                >
                  <span className="text-[12px] font-semibold text-[#111318] leading-[18px] tracking-[-0.01px] whitespace-nowrap">
                    {formatOption(tag)}
                  </span>
                </span>
              ))}
            </div>
          )
        )}
        
        {/* Chevron */}
        <ChevronDownIcon className={`w-6 h-6 text-[#111318] transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[265px] bg-white rounded-[12px] shadow-[0px_4px_12px_0px_rgba(17,19,24,0.15)] z-20 py-[8px] max-h-[400px] overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Search Bar */}
          <div className="px-[16px] py-[8px]">
            <div className="flex items-center gap-[8px] h-[32px] px-[8px] bg-white border border-[#d3d6d9] rounded-[8px]">
              <SearchIconSmall className="w-[16px] h-[16px] text-[#191919]" />
              <input
                type="text"
                placeholder={`Search for a ${label.toLowerCase()}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 text-[12px] text-[#111318] placeholder-[#51545d] leading-[18px] tracking-[-0.01px] outline-none"
              />
            </div>
          </div>

          {/* Separator */}
          <div className="px-[16px] py-[8px]">
            <div className="h-px bg-[#e9eaec]" />
          </div>

          {/* "All" Option */}
          <button
            type="button"
            onClick={handleToggleAll}
            className="w-full text-left px-[16px] py-[4px] min-h-[32px] text-[14px] text-[#111318] hover:bg-[#f6f7f8] transition-colors flex items-center gap-[12px]"
          >
            {isAllSelected ? (
              <CheckboxCheckedIcon className="flex-shrink-0" />
            ) : (
              <CheckboxUncheckedIcon className="flex-shrink-0" />
            )}
            <span className="flex-1">All</span>
          </button>

          {/* Separator */}
          <div className="px-[16px] py-[8px]">
            <div className="h-px bg-[#e9eaec]" />
          </div>

          {/* Options List */}
          <div className="flex-1 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isSelected = value.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleToggle(option)}
                    className="w-full text-left px-[16px] py-[4px] min-h-[32px] text-[14px] text-[#111318] hover:bg-[#f6f7f8] transition-colors flex items-center gap-[12px]"
                  >
                    {isSelected ? (
                      <CheckboxCheckedIcon className="flex-shrink-0" />
                    ) : (
                      <CheckboxUncheckedIcon className="flex-shrink-0" />
                    )}
                    <span className="flex-1">{formatOption(option)}</span>
                  </button>
                );
              })
            ) : (
              <div className="px-[16px] py-[4px] text-[14px] text-[#51545d]">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

