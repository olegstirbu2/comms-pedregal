'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { searchTemplates, MessageTemplate } from '@/lib/template-data';
import { SearchLineIcon } from './icons/CustomIcons';

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: MessageTemplate) => void;
}

export default function TemplateModal({ isOpen, onClose, onSelect }: TemplateModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const selectedItemRef = useRef<HTMLDivElement>(null);

  // Get templates based on search query
  const templates = searchTemplates(query);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Reset selection when search results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedItemRef.current && listRef.current) {
      const list = listRef.current;
      const item = selectedItemRef.current;
      const listRect = list.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      if (itemRect.top < listRect.top) {
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else if (itemRect.bottom > listRect.bottom) {
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const maxIndex = templates.length - 1;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => (prev < maxIndex ? prev + 1 : prev));
          break;
        case 'Enter':
          e.preventDefault();
          if (templates[selectedIndex]) {
            onSelect(templates[selectedIndex]);
            onClose();
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    },
    [templates, selectedIndex, onSelect, onClose]
  );

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Global escape key listener
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const selectedTemplate = templates[selectedIndex];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/20 animate-in fade-in duration-150"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-[24px] border-2 border-white overflow-hidden w-[646px] flex flex-col animate-in zoom-in-95 slide-in-from-bottom-4 duration-200"
        style={{
          boxShadow: '0px 4px 12px 0px rgba(17, 19, 24, 0.15)',
        }}
        onKeyDown={handleKeyDown}
      >
        {/* Search Header - Fixed */}
        <div className="h-[64px] border-b border-[#e9eaec] flex items-center gap-[16px] px-[24px] py-[12px] bg-[rgba(255,255,255,0.8)] shrink-0">
          <SearchLineIcon size={24} className="text-[#191919] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search message templates"
            className="flex-1 text-[14px] leading-[20px] font-normal text-[#191919] tracking-[-0.01px] bg-transparent border-none outline-none placeholder:text-[#51545d]"
          />
        </div>

        {/* Body - Fixed height with two columns */}
        <div className="p-[24px] h-[280px] overflow-hidden shrink-0">
          <div className="flex gap-[16px] h-full items-start">
            {/* Left column - Template list */}
            <div
              ref={listRef}
              className="flex-1 flex flex-col gap-[2px] overflow-y-auto overflow-x-hidden pr-[4px] h-full"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(17, 19, 24, 0.1) transparent',
              }}
            >
              {templates.length > 0 ? (
                templates.map((template, index) => (
                  <div
                    key={template.id}
                    ref={index === selectedIndex ? selectedItemRef : null}
                    onClick={() => {
                      setSelectedIndex(index);
                      onSelect(template);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex flex-col gap-[0px] px-[12px] py-[4px] rounded-[12px] cursor-pointer transition-colors duration-100 min-h-[40px] ${
                      index === selectedIndex
                        ? 'bg-[#f6f7f8]'
                        : 'bg-transparent hover:bg-[rgba(17,19,24,0.04)]'
                    }`}
                  >
                    {/* Title */}
                    <p className="text-[12px] leading-[18px] font-semibold text-[#111318] tracking-[-0.01px] whitespace-normal break-words">
                      {template.title}
                    </p>
                    {/* Description - truncated to 2 lines */}
                    <p
                      className="text-[12px] leading-[18px] font-normal text-[#51545d] tracking-[-0.01px] overflow-hidden"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {template.description}
                    </p>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-[14px] text-[#51545d]">No templates found for "{query}"</p>
                </div>
              )}
            </div>

            {/* Right column - Preview */}
            <div className="flex-1 p-[24px] rounded-[24px] overflow-y-auto overflow-x-hidden h-full flex items-center justify-center">
              <div className="w-full">
                {selectedTemplate ? (
                  <p className="text-[12px] leading-[18px] font-normal text-[#51545d] tracking-[-0.01px] whitespace-pre-wrap break-words">
                    {selectedTemplate.content}
                  </p>
                ) : (
                  <p className="text-[12px] leading-[18px] font-normal text-[#51545d] tracking-[-0.01px]">
                    Select a template to preview
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer with keyboard hints - Fixed */}
        <div className="border-t border-[#e9eaec] px-[24px] py-[16px] flex items-center justify-between shrink-0 h-[68px]">
          {/* Left - Select hint */}
          <div className="flex gap-[16px] items-center">
            <div className="flex gap-[8px] items-center">
              <div className="h-[20px] px-[4px] bg-white border border-[#d3d6d9] rounded-full flex items-center justify-center">
                <span className="text-[12px] leading-[18px] font-semibold text-[#111318] tracking-[-0.01px]">
                  ⏎
                </span>
              </div>
              <span className="text-[12px] leading-[18px] font-normal text-[#51545d] tracking-[-0.01px]">
                Select
              </span>
            </div>
          </div>

          {/* Right - Navigate and Close hints */}
          <div className="flex gap-[16px] items-center">
            <div className="flex gap-[8px] items-center">
              <div className="h-[20px] px-[4px] bg-white border border-[#d3d6d9] rounded-full flex items-center justify-center">
                <span className="text-[12px] leading-[18px] font-semibold text-[#111318] tracking-[-0.01px]">
                  ↑ ↓ ← →
                </span>
              </div>
              <span className="text-[12px] leading-[18px] font-normal text-[#51545d] tracking-[-0.01px]">
                Navigate
              </span>
            </div>
            <div className="flex gap-[8px] items-center">
              <div className="h-[20px] px-[4px] bg-white border border-[#d3d6d9] rounded-full flex items-center justify-center">
                <span className="text-[12px] leading-[18px] font-semibold text-[#111318] tracking-[-0.01px]">
                  ESC
                </span>
              </div>
              <span className="text-[12px] leading-[18px] font-normal text-[#51545d] tracking-[-0.01px]">
                Close window
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

