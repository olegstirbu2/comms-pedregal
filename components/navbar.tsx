'use client';

import { useState } from 'react';
import {
  MenuIcon,
  SearchLineIcon,
  SendFillIcon,
  BookmarkLineIcon,
  NotifyLineIcon,
  MiscellaneousLineIcon,
  PhoneCallFillIcon,
  CaretDoubleLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowTrendingUpIcon
} from './icons/NavIcons';

export default function Navbar({ onCaseInboxClick }: { onCaseInboxClick?: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);

  return (
    <div 
      className={`h-screen bg-[#111318] flex flex-col transition-all duration-300 relative ${
        isExpanded ? 'w-[224px]' : 'w-[64px]'
      }`}
    >
      {/* Main Content */}
      <div className="flex flex-col h-full">
        {/* Top Area */}
        <div className="flex flex-col">
          {/* Header with Menu (64px height) */}
          <div className={`flex items-center justify-between h-[64px] ${isExpanded ? 'px-3 pt-5 pb-3' : 'justify-center pt-5 pb-3'}`}>
            <button 
              onClick={() => {
                if (isExpanded) {
                  setIsExpanded(false);
                  setIsInboxOpen(false);
                } else {
                  setIsExpanded(true);
                }
              }}
              className="flex items-center justify-center w-10 h-10 hover:bg-white/5 transition-colors rounded-lg"
            >
              <MenuIcon size={24} className="text-white" />
            </button>
            {isExpanded && (
              <button 
                onClick={() => {
                  setIsExpanded(false);
                  setIsInboxOpen(false);
                }}
                className="flex items-center justify-center w-8 h-8 hover:bg-white/5 transition-colors rounded-lg"
              >
                <CaretDoubleLeftIcon size={16} className="text-white" />
              </button>
            )}
          </div>

          {/* Astra Help Desk Logo */}
          {isExpanded && (
            <div className="px-3 py-4">
              <div className="flex flex-col">
                <p className="text-white text-xs opacity-50">Astra</p>
                <p className="text-white text-lg font-bold leading-tight">Help Desk</p>
              </div>
            </div>
          )}

          {/* Search */}
          <div className="mb-2 px-3">
            {isExpanded ? (
              <div className="h-9 rounded-2xl bg-[#1c1f31] flex items-center px-3 gap-2">
                <SearchLineIcon size={16} className="text-white" />
                <span className="text-white text-xs">Search</span>
              </div>
            ) : (
              <div className="flex items-center justify-center h-10">
                <SearchLineIcon size={16} className="text-white" />
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <div className="flex flex-col gap-0.5 mt-2 px-3">
            {/* Case Inbox */}
            <button
              onClick={() => {
                if (isExpanded) {
                  setIsInboxOpen(!isInboxOpen);
                }
                onCaseInboxClick?.();
              }}
              className={`flex items-center rounded-lg min-h-[48px] transition-colors relative ${
                isExpanded ? 'px-2 bg-[#292e45] hover:bg-[#2f3551]' : 'justify-center bg-[#292e45]'
              }`}
            >
              <div className="relative">
                <SendFillIcon size={24} className="text-white shrink-0" />
                {!isExpanded && (
                  <div className="absolute -top-1 -right-1 bg-[#eb1700] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    2
                  </div>
                )}
              </div>
              {isExpanded && (
                <>
                  <div className="flex items-center gap-3 ml-2 flex-1">
                    <span className="text-white text-xs font-normal">Inbox</span>
                    <div className="bg-[#eb1700] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      2
                    </div>
                  </div>
                  {isInboxOpen ? (
                    <ChevronUpIcon size={16} className="text-white ml-auto" />
                  ) : (
                    <ChevronDownIcon size={16} className="text-white ml-auto" />
                  )}
                </>
              )}
            </button>

            {/* Tab 1 */}
            <button
              className={`flex items-center rounded-lg min-h-[40px] hover:bg-white/5 transition-colors ${
                isExpanded ? 'px-2' : 'justify-center'
              }`}
            >
              <BookmarkLineIcon size={24} className="text-[#d3d6d9] shrink-0" />
              {isExpanded && (
                <span className="text-white text-xs ml-2">Tab name</span>
              )}
            </button>

            {/* Tab 2 */}
            <button
              className={`flex items-center rounded-lg min-h-[40px] hover:bg-white/5 transition-colors ${
                isExpanded ? 'px-2' : 'justify-center'
              }`}
            >
              <BookmarkLineIcon size={24} className="text-[#d3d6d9] shrink-0" />
              {isExpanded && (
                <span className="text-white text-xs ml-2">Tab name</span>
              )}
            </button>

            {/* Performance */}
            <button
              className={`flex items-center rounded-lg min-h-[40px] hover:bg-white/5 transition-colors ${
                isExpanded ? 'px-2' : 'justify-center'
              }`}
            >
              <ArrowTrendingUpIcon size={24} className="text-[#d3d6d9] shrink-0" />
              {isExpanded && (
                <span className="text-white text-xs ml-2">Performance</span>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="mt-auto flex flex-col gap-2 px-3 pb-3">
          {/* Knowledge Base */}
          <button
            className={`flex items-center rounded-lg min-h-[40px] hover:bg-white/5 transition-colors ${
              isExpanded ? 'px-2' : 'justify-center'
            }`}
          >
            <BookmarkLineIcon size={24} className="text-[#d3d6d9] shrink-0" />
            {isExpanded && (
              <span className="text-white text-xs ml-2">Knowledge Base</span>
            )}
          </button>

          {/* Notifications */}
          <button
            className={`flex items-center rounded-lg min-h-[40px] hover:bg-white/5 transition-colors ${
              isExpanded ? 'px-2' : 'justify-center'
            }`}
          >
            <NotifyLineIcon size={24} className="text-[#d3d6d9] shrink-0" />
            {isExpanded && (
              <span className="text-white text-xs ml-2">Notifications</span>
            )}
          </button>

          {/* To-do List */}
          <button
            className={`flex items-center rounded-lg min-h-[40px] hover:bg-white/5 transition-colors ${
              isExpanded ? 'px-2' : 'justify-center'
            }`}
          >
            <MiscellaneousLineIcon size={24} className="text-[#d3d6d9] shrink-0" />
            {isExpanded && (
              <span className="text-white text-xs ml-2">To-do list</span>
            )}
          </button>

          {/* Connected */}
          <div
            className={`flex items-center rounded-2xl min-h-[48px] bg-[#1c1f31] ${
              isExpanded ? 'px-2' : 'justify-center'
            }`}
          >
            <PhoneCallFillIcon size={24} className="text-white shrink-0" />
            {isExpanded && (
              <div className="flex items-center gap-3 ml-2 flex-1">
                <span className="text-white text-xs">Connected</span>
                <div className="w-5 h-5 bg-[#00855f] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div className="pt-2">
            <div className={`bg-[#1c1f31] rounded-2xl p-2 ${isExpanded ? '' : 'flex justify-center items-center'}`}>
              {isExpanded ? (
                <button className="flex items-center gap-2 w-full">
                  <div className="relative w-8 h-8 flex-shrink-0 bg-[#eb1700] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">A</span>
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#00855f] rounded-full border-2 border-[#1c1f31]" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-white text-sm">Ana J.</p>
                  </div>
                  <ChevronDownIcon size={16} className="text-white flex-shrink-0" />
                </button>
              ) : (
                <div className="relative w-8 h-8 flex-shrink-0 bg-[#eb1700] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">A</span>
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#00855f] rounded-full border-2 border-[#1c1f31]" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}


