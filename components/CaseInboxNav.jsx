'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
  ChevronDownIcon,
  SearchLineIcon,
  SortIcon,
  ChatDefaultLineIcon,
  EmailLineIcon,
  PersonUserLineIcon,
  MerchantLineIcon,
  SignalLowIcon,
  WoltPlusBadge
} from './icons/NavIcons';

// Mock data for cases matching ChatInterface conversations
const MOCK_CASES = [
  {
    id: 1,
    name: 'Jessica A.',
    timestamp: '1m',
    category: 'Missing Items',
    message: 'Hi, my order is missing a small item - a pack of napkins. Everything else arrived fine.',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    avatarInitials: 'JA',
    audienceType: 'consumer',
    notificationCount: 1,
    isWoltPlus: false,
    slaSeverity: 'good',
    channelType: 'chat',
  },
  {
    id: 2,
    name: 'Edeka Weiß',
    timestamp: '30s',
    category: 'Item Substitution',
    message: 'I see Red Bull Sugar Free is out of stock. Can I get the original version instead?',
    avatarUrl: 'https://i.pravatar.cc/150?img=28',
    avatarInitials: 'EW',
    audienceType: 'consumer',
    notificationCount: null,
    isWoltPlus: false,
    slaSeverity: 'good',
    channelType: 'chat',
  },
  {
    id: 3,
    name: 'Giuseppe O.',
    timestamp: '3m',
    category: 'Missing Items',
    message: 'Hello, I received my order but three items are missing from the bag.',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    avatarInitials: 'GO',
    audienceType: 'consumer',
    notificationCount: null,
    isWoltPlus: false,
    slaSeverity: 'good',
    channelType: 'chat',
  },
  {
    id: 4,
    name: 'Sofia Martinez',
    timestamp: '45s',
    category: 'Late Delivery',
    message: 'Courier: I\'m stuck in traffic on the highway. Will be there in 10 mins.',
    avatarUrl: 'https://i.pravatar.cc/150?img=26',
    avatarInitials: 'SM',
    audienceType: 'consumer',
    notificationCount: 2,
    isWoltPlus: false,
    slaSeverity: 'good',
    channelType: 'chat',
  },
  {
    id: 5,
    name: 'Marcus Chen',
    timestamp: '1m',
    category: 'Wrong Order',
    message: 'Courier: Package has been picked up. ETA 15 minutes.',
    avatarUrl: 'https://i.pravatar.cc/150?img=52',
    avatarInitials: 'MC',
    audienceType: 'consumer',
    notificationCount: 2,
    isWoltPlus: false,
    slaSeverity: 'good',
    channelType: 'chat',
  },
];

export default function CaseInboxNav({ isOpen = true, onToggle, onCaseSelect, selectedCaseId, readCourierNotifications = {} }) {
  const [isExpanded, setIsExpanded] = useState(true); // true = expanded (272px), false = collapsed (56px)
  const [selectedFilter, setSelectedFilter] = useState('Open');
  const [readCases, setReadCases] = useState(new Set([2, 3])); // Track which cases have been read - cases 2 and 3 are already read
  
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
        h-full bg-white border-r border-[#e9eaec] rounded-l-[24px]
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
          <header className="flex items-center justify-between px-3 h-[64px] border-b border-[#e9eaec]">
            <div className="flex items-center gap-1">
              <h2 className="text-base font-semibold text-[#111318] tracking-[-0.01px]">
                Open (3)
              </h2>
            </div>
            <button
              onClick={handleChevronClick}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
              aria-label="Collapse case inbox"
            >
              <CaretDoubleLeftIcon size={16} className="text-[#111318]" />
            </button>
          </header>

          {/* Filter and Search */}
          <div className="flex items-center justify-between px-3 h-[64px] border-b border-[#e4e4e4]">
            <button
              onClick={() => {/* Toggle filter dropdown */}}
              className="h-8 px-3 flex items-center gap-1 rounded-lg border border-[#d3d6d9] hover:bg-gray-50 transition-colors"
            >
              <span className="text-xs font-bold text-[#111318] tracking-[-0.01px]">
                Filter
              </span>
              <ChevronDownIcon size={16} className="text-[#111318]" />
            </button>

            <div className="flex items-center gap-1">
              <button
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Sort cases"
              >
                <SortIcon size={16} className="text-[#111318]" />
              </button>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Search cases"
              >
                <SearchLineIcon size={16} className="text-[#111318]" />
              </button>
            </div>
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
                onClick={() => {
                  // Mark case as read
                  setReadCases(prev => new Set([...prev, caseItem.id]));
                  onCaseSelect?.(caseItem);
                }}
                className={`
                  relative px-4 py-3 border-b border-[#e9eaec]
                  cursor-pointer hover:bg-gray-50 transition-colors
                  ${selectedCaseId === caseItem.id ? 'bg-[#f6f7f8]' : ''}
                `}
              >
                {/* Selected indicator */}
                {selectedCaseId === caseItem.id && (
                  <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-[#111318]" />
                )}

                {/* Case content */}
                <div className="flex flex-col gap-1">
                  {/* Header row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {/* Avatar with audience badge */}
                      <div className="relative w-6 h-6 flex-shrink-0">
                        <div className="w-6 h-6 rounded-full bg-[#4969f5] flex items-center justify-center overflow-hidden">
                          {caseItem.avatarUrl ? (
                            <img src={caseItem.avatarUrl} alt={caseItem.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-white text-[10px] font-semibold">{caseItem.avatarInitials}</span>
                          )}
                        </div>
                        {/* Audience badge (person or merchant icon) */}
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#f6f7f8] border border-white rounded-full flex items-center justify-center">
                          {caseItem.audienceType === 'consumer' ? (
                            <PersonUserLineIcon size={8} className="text-[#51545d]" />
                          ) : (
                            <MerchantLineIcon size={8} className="text-[#51545d]" />
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-[#191919] tracking-[-0.01px] truncate">
                          {caseItem.name}
                        </h3>
                        {caseItem.isWoltPlus && (
                          <WoltPlusBadge className="flex-shrink-0" />
                        )}
                      </div>
                    </div>
                    <time className="text-xs text-[#606060] tracking-[-0.01px] ml-2 flex-shrink-0">
                      {caseItem.timestamp}
                    </time>
                  </div>

                  {/* Message preview with notification badge */}
                  <div className="flex items-start justify-between gap-2">
                    {caseItem.message && (
                      <p className={`text-sm tracking-[-0.01px] line-clamp-1 leading-5 flex-1 ${
                        // For courier messages, only mark as read when Courier tab is clicked
                        caseItem.message.startsWith('Courier:')
                          ? (readCourierNotifications[caseItem.id] ? 'font-normal text-[#51545d]' : 'font-semibold text-[#191919]')
                          : (readCases.has(caseItem.id) ? 'font-normal text-[#51545d]' : 'font-semibold text-[#191919]')
                      }`}>
                        {caseItem.message}
                      </p>
                    )}
                    {caseItem.notificationCount && (
                      // For courier messages, check readCourierNotifications; otherwise check readCases
                      caseItem.message?.startsWith('Courier:')
                        ? !readCourierNotifications[caseItem.id]
                        : !readCases.has(caseItem.id)
                    ) && (
                      <div className="flex-shrink-0 bg-[#eb1700] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center leading-none">
                        {caseItem.notificationCount}
                      </div>
                    )}
                  </div>

                  {/* Category and SLA indicator */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {caseItem.channelType === 'chat' ? (
                        <ChatDefaultLineIcon size={12} className="text-[#b2b2b2] flex-shrink-0" />
                      ) : (
                        <EmailLineIcon size={12} className="text-[#b2b2b2] flex-shrink-0" />
                      )}
                      <span className="text-xs text-[#51545d] tracking-[-0.01px] truncate">
                        {caseItem.category}
                      </span>
                    </div>
                    {/* SLA severity indicator */}
                    <div className="flex items-center justify-center w-4 h-4 bg-[#f6f7f8] rounded-full">
                      <SignalLowIcon size={8} className="text-[#111318]" />
                    </div>
                  </div>
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
          <div className="flex items-center justify-center h-[64px] px-3 border-b border-[#e4e4e4]">
            <button
              onClick={handleChevronClick}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
              aria-label="Expand case inbox"
            >
              <CaretDoubleRightIcon size={16} className="text-[#191919]" />
            </button>
          </div>

          {/* Search button */}
          <div className="flex items-center justify-center py-4 px-3">
            <button
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Search cases"
            >
              <SearchLineIcon size={16} className="text-[#191919]" />
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

