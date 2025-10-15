'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Search, MessageSquare } from 'lucide-react';

// Mock data for cases
const MOCK_CASES = [
  {
    id: 1,
    name: 'Jessica A',
    caseNumber: '#54632324254',
    timestamp: 'Now',
    category: 'Missing Minor',
    message: 'Waiting for response...',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    avatarGradient: 'bg-gradient-to-r from-[#31b9c0] to-[#00838a]',
    avatarInitials: 'JA',
    isUnread: false,
    isSelected: false,
  },
  {
    id: 2,
    name: 'Edeka Weiß',
    caseNumber: '#2411124254',
    timestamp: '30s',
    category: 'Item Substitution',
    message: 'Red Bull Sugar Free 250ml (x4) is out of stock. We suggest Red Bull Original 250ml (x4) as a substitute.',
    avatarUrl: 'https://i.pravatar.cc/150?img=28',
    avatarGradient: 'bg-purple-500',
    avatarInitials: 'EW',
    isUnread: true,
    isSelected: false,
  },
  {
    id: 3,
    name: 'Giuseppe O.',
    caseNumber: '#323234242',
    timestamp: '3m',
    category: 'Missing Items',
    message: null,
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    avatarGradient: 'bg-[#111318]',
    avatarInitials: 'GO',
    isUnread: false,
    isSelected: false,
  },
];

export default function CaseInboxNav({ isOpen = true, onToggle, onCaseSelect, selectedCaseId }) {
  const [isExpanded, setIsExpanded] = useState(true); // true = expanded (272px), false = collapsed (56px)
  const [selectedFilter, setSelectedFilter] = useState('Open');
  
  // Resize state
  const [inboxWidth, setInboxWidth] = useState(380); // Default width
  const [isResizing, setIsResizing] = useState(false);
  const inboxContainerRef = useRef(null);

  const handleChevronClick = () => {
    setIsExpanded(!isExpanded);
  };

  // Resize handlers
  const handleResizeStart = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  // Handle resize on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing || !inboxContainerRef.current) return;
      
      const containerRect = inboxContainerRef.current.getBoundingClientRect();
      const newWidth = e.clientX - containerRect.left;
      
      // Clamp width between 320px and 480px
      const clampedWidth = Math.max(320, Math.min(480, newWidth));
      setInboxWidth(clampedWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      // Prevent text selection during resize
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing]);

  // Don't render if not open at all
  if (!isOpen) return null;

  return (
    <nav 
      ref={inboxContainerRef}
      role="navigation" 
      aria-label="Case inbox navigation"
      className={`
        ${isExpanded ? '' : 'w-[56px]'}
        h-screen bg-white border-r border-[#e4e4e4]
        ${!isResizing ? 'transition-all duration-200 ease-in-out' : ''}
        overflow-hidden flex-shrink-0 relative
      `}
      style={isExpanded ? { width: `${inboxWidth}px` } : {}}
    >
      {/* Resize Handle - Right Edge (only when expanded) */}
      {isExpanded && (
        <div
          className="absolute right-0 top-0 bottom-0 w-1 hover:w-2 bg-transparent hover:bg-blue-400 cursor-col-resize hover:transition-all z-50"
          onMouseDown={handleResizeStart}
        />
      )}

      {/* Expanded State */}
      {isExpanded && (
        <div className="h-full flex flex-col" style={{ width: `${inboxWidth}px` }}>
          {/* Header */}
          <header className="flex items-center justify-between px-4 h-[80px] border-b border-[#e4e4e4]">
            <h2 className="text-base font-bold text-[#191919] tracking-[-0.01px]">
              Case Inbox
            </h2>
            <button
              onClick={handleChevronClick}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
              aria-label="Collapse case inbox"
            >
              <ChevronLeft size={16} className="text-[#191919]" />
            </button>
          </header>

          {/* Filter and Search */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#e4e4e4]">
            <button
              onClick={() => {/* Toggle filter dropdown */}}
              className="h-6 px-2 flex items-center gap-1 rounded-full border border-[#d3d6d9] hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-semibold text-[#111318] tracking-[-0.01px]">
                {selectedFilter}
              </span>
              <ChevronDown size={12} className="text-[#111318]" />
            </button>

            <button
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Search cases"
            >
              <Search size={16} className="text-[#191919]" />
            </button>
          </div>

          {/* Case List */}
          <section
            role="list"
            aria-label="Case list"
            className="flex-1 overflow-y-auto"
          >
            {MOCK_CASES.map((caseItem) => (
              <article
                key={caseItem.id}
                role="listitem"
                onClick={() => onCaseSelect?.(caseItem)}
                className={`
                  relative px-4 py-3 border-b border-[#e9eaec]
                  cursor-pointer hover:bg-gray-50 transition-colors
                  ${selectedCaseId === caseItem.id ? 'bg-[#f6f7f8]' : ''}
                `}
              >
                {/* Selected indicator */}
                {selectedCaseId === caseItem.id && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[5px] h-full bg-[#111318] rounded-l" />
                )}

                {/* Case content */}
                <div className="flex flex-col gap-1">
                  {/* Header row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {caseItem.isUnread && (
                        <div className="w-2 h-2 rounded-full bg-[#0099ff] flex-shrink-0" />
                      )}
                      <h3 className="text-sm font-semibold text-[#191919] tracking-[-0.01px] truncate">
                        {caseItem.name} {caseItem.caseNumber}
                      </h3>
                    </div>
                    <time className="text-xs text-[#606060] tracking-[-0.01px] ml-2 flex-shrink-0">
                      {caseItem.timestamp}
                    </time>
                  </div>

                  {/* Category */}
                  <div className="flex items-center gap-1">
                    <MessageSquare size={12} className="text-[#51545d] flex-shrink-0" />
                    <span className="text-xs text-[#51545d] tracking-[-0.01px] truncate">
                      {caseItem.category}
                    </span>
                  </div>

                  {/* Message preview */}
                  {caseItem.message && (
                    <p className="text-sm text-[#606060] tracking-[-0.01px] line-clamp-2 leading-5">
                      {caseItem.message}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </section>
        </div>
      )}

      {/* Collapsed State (Avatar View) */}
      {!isExpanded && (
        <div className="w-[56px] h-full flex flex-col bg-white">
          {/* Expand button */}
          <div className="flex items-center justify-center h-[80px] px-3 border-b border-[#e4e4e4]">
            <button
              onClick={handleChevronClick}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
              aria-label="Expand case inbox"
            >
              <ChevronRight size={16} className="text-[#191919]" />
            </button>
          </div>

          {/* Search button */}
          <div className="flex items-center justify-center py-4 px-3">
            <button
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Search cases"
            >
              <Search size={16} className="text-[#191919]" />
            </button>
          </div>

          {/* Avatar list */}
          <section
            role="list"
            aria-label="Case avatars"
            className="flex-1 overflow-y-auto"
          >
            {MOCK_CASES.map((caseItem) => (
              <div
                key={caseItem.id}
                role="listitem"
                onClick={() => {
                  handleChevronClick();
                  onCaseSelect?.(caseItem);
                }}
                className={`
                  relative p-3 border-b border-[#e9eaec]
                  cursor-pointer hover:bg-gray-50 transition-colors
                  ${selectedCaseId === caseItem.id || caseItem.isSelected ? 'bg-[#f6f7f8]' : ''}
                `}
              >
                {/* Selected indicator */}
                {(selectedCaseId === caseItem.id || caseItem.isSelected) && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-[112px] bg-[#111318] rounded-l" />
                )}

                {/* Avatar */}
                <div className="relative w-8 h-8 mx-auto">
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center overflow-hidden
                      ${caseItem.avatarGradient}
                      text-white text-xs font-semibold
                      border border-[#e9eaec]
                    `}
                  >
                    {caseItem.avatarUrl ? (
                      <img src={caseItem.avatarUrl} alt={caseItem.name} className="w-full h-full object-cover" />
                    ) : (
                      caseItem.avatarInitials
                    )}
                  </div>

                  {/* Unread badge */}
                  {caseItem.isUnread && (
                    <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#0099ff] border-2 border-white" />
                  )}
                </div>
              </div>
            ))}
          </section>
        </div>
      )}
    </nav>
  );
}

