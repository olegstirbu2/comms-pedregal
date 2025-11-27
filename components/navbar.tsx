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
  ArrowTrendingUpIcon,
  PeopleGroupLineIcon,
  ListIcon,
  ChevronRightIcon
} from './icons/NavIcons';

export default function Navbar({ onCaseInboxClick }: { onCaseInboxClick?: () => void }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isInboxOpen, setIsInboxOpen] = useState(false);

  return (
    <div 
      className={`h-screen bg-[#111318] flex flex-col transition-all duration-300 relative ${
        isExpanded ? 'w-[224px]' : 'w-[64px]'
      }`}
    >
      {/* Main Content */}
      <div className="flex flex-col h-full p-[12px]">
        {/* Top Area */}
        <div className="flex flex-col">
          {/* Header with Menu */}
          <div className={`flex items-center justify-between pt-[8px] ${isExpanded ? '' : 'justify-center'}`}>
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
            <div className="px-[10px] py-[11px]">
              <div className="flex flex-col gap-1 items-start">
                <img 
                  src="/logos/astra-logo.png" 
                  alt="Astra" 
                  className="h-[12px] object-contain opacity-50"
                  style={{ width: 'auto' }}
                />
                <p className="text-white text-[18px] font-bold leading-[22px] tracking-[-0.01px]">Help Desk</p>
              </div>
            </div>
          )}

          {/* Navigation Items */}
          <div className="flex flex-col gap-[2px] pt-[28px]">
            {/* Search */}
            <div className="mb-[4px]">
              {isExpanded ? (
                <div className="h-[36px] rounded-[16px] bg-[#1c1f31] flex items-center px-[12px] gap-[8px]">
                  <SearchLineIcon size={16} className="text-white" />
                  <span className="text-white text-[12px] leading-[18px] tracking-[-0.01px]">Search</span>
                </div>
              ) : (
                <div className="flex items-center justify-center w-[40px] h-[40px]">
                  <SearchLineIcon size={16} className="text-white" />
                </div>
              )}
            </div>

            {/* Inbox */}
            <div className={`${isExpanded ? 'bg-[#161929] rounded-[20px] overflow-hidden' : ''}`}>
              <button
                onClick={() => {
                  if (isExpanded) {
                    setIsInboxOpen(!isInboxOpen);
                  }
                  onCaseInboxClick?.();
                }}
                className={`flex items-center transition-colors relative w-full ${
                  isExpanded ? 'px-[8px] h-[48px] bg-[#292e45] hover:bg-[#2f3551] rounded-[8px]' : 'justify-center w-[40px] h-[40px] bg-[#292e45] rounded-[8px]'
                }`}
              >
                <div className="relative flex items-center">
                  <SendFillIcon size={24} className="text-white shrink-0" />
                  {!isExpanded && (
                    <div className="absolute -top-1 -right-1 bg-[#eb1700] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      3
                    </div>
                  )}
                </div>
                {isExpanded && (
                  <>
                    <span className="text-white text-[12px] leading-[18px] tracking-[-0.01px] ml-[8px]">Inbox</span>
                    <div className="flex items-center gap-[8px] ml-auto">
                      <div className="bg-[#eb1700] text-white text-[12px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                        3
                      </div>
                      {isInboxOpen ? (
                        <ChevronUpIcon size={16} className="text-white" />
                      ) : (
                        <ChevronDownIcon size={16} className="text-white" />
                      )}
                    </div>
                  </>
                )}
              </button>
              
              {/* Inbox Sub-menu */}
              {isExpanded && isInboxOpen && (
                <div className="flex flex-col py-[4px]">
                  <button className="flex items-center justify-between px-[16px] h-[36px] hover:bg-white/5 transition-colors">
                    <span className="text-white text-[12px] leading-[18px] tracking-[-0.01px]">All</span>
                    <span className="text-[#d3d6d9] text-[12px] leading-[18px] tracking-[-0.01px]">6</span>
                  </button>
                  <button className="flex items-center justify-between px-[16px] h-[36px] hover:bg-white/5 transition-colors">
                    <span className="text-white text-[12px] leading-[18px] tracking-[-0.01px]">Open</span>
                    <span className="text-[#d3d6d9] text-[12px] leading-[18px] tracking-[-0.01px]">2</span>
                  </button>
                  <button className="flex items-center justify-between px-[16px] h-[36px] hover:bg-white/5 transition-colors">
                    <span className="text-white text-[12px] leading-[18px] tracking-[-0.01px]">Proactive</span>
                    <span className="text-[#d3d6d9] text-[12px] leading-[18px] tracking-[-0.01px]">1</span>
                  </button>
                  <button className="flex items-center justify-between px-[16px] h-[36px] hover:bg-white/5 transition-colors">
                    <span className="text-white text-[12px] leading-[18px] tracking-[-0.01px]">Snoozed</span>
                    <span className="text-[#d3d6d9] text-[12px] leading-[18px] tracking-[-0.01px]">2</span>
                  </button>
                  <button className="flex items-center justify-between px-[16px] h-[36px] hover:bg-white/5 transition-colors">
                    <span className="text-white text-[12px] leading-[18px] tracking-[-0.01px]">Follow-ups</span>
                    <span className="text-[#d3d6d9] text-[12px] leading-[18px] tracking-[-0.01px]">1</span>
                  </button>
                </div>
              )}
            </div>

            {/* Team */}
            <button
              className={`flex items-center rounded-[12px] hover:bg-white/5 transition-colors ${
                isExpanded ? 'px-[8px] min-h-[40px]' : 'justify-center w-[40px] h-[40px]'
              }`}
            >
              <PeopleGroupLineIcon size={24} className="text-white shrink-0" />
              {isExpanded && (
                <span className="text-white text-[12px] leading-[18px] tracking-[-0.01px] ml-[8px]">Team</span>
              )}
            </button>

            {/* Queues */}
            <button
              className={`flex items-center rounded-[12px] hover:bg-white/5 transition-colors ${
                isExpanded ? 'px-[8px] min-h-[40px]' : 'justify-center w-[40px] h-[40px]'
              }`}
            >
              <ListIcon size={24} className="text-white shrink-0" />
              {isExpanded && (
                <span className="text-white text-[12px] leading-[18px] tracking-[-0.01px] ml-[8px]">Queues</span>
              )}
            </button>

            {/* Performance */}
            <button
              className={`flex items-center rounded-[12px] hover:bg-white/5 transition-colors ${
                isExpanded ? 'px-[8px] min-h-[40px]' : 'justify-center w-[40px] h-[40px]'
              }`}
            >
              <ArrowTrendingUpIcon size={24} className="text-[#d3d6d9] shrink-0" />
              {isExpanded && (
                <span className="text-white text-[12px] leading-[18px] tracking-[-0.01px] ml-[8px]">Performance</span>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="mt-auto flex flex-col gap-[8px]">
          {/* Bottom Nav Items */}
          <div className="flex flex-col gap-[2px]">
            {/* Knowledge Base */}
            <button
              className={`flex items-center rounded-[12px] hover:bg-white/5 transition-colors ${
                isExpanded ? 'px-[8px] min-h-[40px]' : 'justify-center w-[40px] h-[40px]'
              }`}
            >
              <BookmarkLineIcon size={24} className="text-[#d3d6d9] shrink-0" />
              {isExpanded && (
                <span className="text-white text-[12px] leading-[18px] tracking-[-0.01px] ml-[8px]">Knowledge Base</span>
              )}
            </button>

            {/* Notifications */}
            <button
              className={`flex items-center rounded-[12px] hover:bg-white/5 transition-colors ${
                isExpanded ? 'px-[8px] min-h-[40px]' : 'justify-center w-[40px] h-[40px]'
              }`}
            >
              <NotifyLineIcon size={24} className="text-[#d3d6d9] shrink-0" />
              {isExpanded && (
                <span className="text-white text-[12px] leading-[18px] tracking-[-0.01px] ml-[8px]">Notifications</span>
              )}
            </button>

            {/* To-do List */}
            <button
              className={`flex items-center rounded-[12px] hover:bg-white/5 transition-colors ${
                isExpanded ? 'px-[8px] min-h-[40px]' : 'justify-center w-[40px] h-[40px]'
              }`}
            >
              <MiscellaneousLineIcon size={24} className="text-[#d3d6d9] shrink-0" />
              {isExpanded && (
                <span className="text-white text-[12px] leading-[18px] tracking-[-0.01px] ml-[8px]">To-do list</span>
              )}
            </button>
          </div>

          {/* Connected */}
          <div
            className={`flex items-center bg-[#1c1f31] ${
              isExpanded ? 'px-[8px] min-h-[48px] rounded-[20px]' : 'justify-center w-[40px] h-[40px] rounded-[8px]'
            }`}
          >
            <PhoneCallFillIcon size={24} className="text-white shrink-0" />
            {isExpanded && (
              <div className="flex items-center gap-[12px] ml-[8px] flex-1">
                <span className="text-white text-[12px] leading-[18px] tracking-[-0.01px]">Connected</span>
                <div className="w-[12px] h-[12px] bg-[#00832D] rounded-full ml-auto" />
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className={`bg-[#1c1f31] rounded-[20px] p-[8px] ${isExpanded ? '' : 'flex justify-center items-center'}`}>
            {isExpanded ? (
              <button className="flex items-center gap-[8px] w-full">
                <div className="relative w-8 h-8 flex-shrink-0 rounded-full overflow-hidden">
                  <img 
                    src="https://i.pravatar.cc/150?img=47" 
                    alt="Ana J."
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#00855f] rounded-full border-2 border-[#1c1f31]" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-white text-[12px] leading-[18px] tracking-[-0.01px]">Ana J.</p>
                  <p className="text-[#D3D6D9] text-[12px] leading-[18px] tracking-[-0.01px]">Active • 24 min</p>
                </div>
                <ChevronRightIcon size={16} className="text-white flex-shrink-0" />
              </button>
            ) : (
              <div className="relative w-8 h-8 flex-shrink-0 rounded-full overflow-hidden">
                <img 
                  src="https://i.pravatar.cc/150?img=47" 
                  alt="Ana J."
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#00855f] rounded-full border-2 border-[#1c1f31]" />
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

