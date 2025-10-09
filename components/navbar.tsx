'use client';

import { useState } from 'react';
import { 
  Menu, 
  Search, 
  Send, 
  Users, 
  Filter, 
  Bookmark, 
  Bell, 
  List, 
  Phone,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function Navbar({ onCaseInboxClick }: { onCaseInboxClick?: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);

  return (
    <div 
      className={`h-screen bg-[#161929] flex flex-col transition-all duration-300 relative ${
        isExpanded ? 'w-[224px]' : 'w-[64px]'
      }`}
    >
      {/* Main Content */}
      <div className="flex flex-col h-full p-3">
        {/* Top Area */}
        <div className="flex flex-col pt-2 pb-0">
          {/* Header with Menu and Toggle */}
          <div className={`flex items-center ${isExpanded ? 'justify-between' : 'justify-center'} mb-6`}>
            <button className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/5 transition-colors">
              <Menu size={24} className="text-white" />
            </button>
            
            {isExpanded && (
              <>
                <button 
                  onClick={() => {
                    setIsExpanded(false);
                    setIsInboxOpen(false);
                  }}
                  className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <ChevronLeft size={16} className="text-white" />
                </button>
              </>
            )}
          </div>

          {/* Search */}
          <div className="mb-2">
            {isExpanded ? (
              <div className="h-9 rounded-2xl border border-white/20 flex items-center px-3 gap-2">
                <Search size={16} className="text-white" />
                <span className="text-white text-xs">Search</span>
              </div>
            ) : (
              <div className="flex items-center justify-center h-10">
                <Search size={24} className="text-white" />
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <div className="flex flex-col gap-0.5 mt-2">
            {/* Case Inbox */}
            <button
              onClick={() => {
                if (isExpanded) {
                  setIsInboxOpen(!isInboxOpen);
                }
                onCaseInboxClick?.();
              }}
              className={`flex items-center rounded-lg min-h-[40px] transition-colors ${
                isExpanded ? 'px-2 bg-[#292e45] hover:bg-[#2f3551]' : 'justify-center bg-[#292e45]'
              }`}
            >
              <Send size={24} className="text-white shrink-0" />
              {isExpanded && (
                <>
                  <div className="flex items-center gap-3 ml-2 flex-1">
                    <span className="text-white text-xs font-semibold">Case Inbox</span>
                    <div className="bg-[#f63a26] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      3
                    </div>
                  </div>
                  {isInboxOpen ? (
                    <ChevronUp size={16} className="text-white ml-auto" />
                  ) : (
                    <ChevronDown size={16} className="text-white ml-auto" />
                  )}
                </>
              )}
            </button>

            {/* Inbox Submenu */}
            {isExpanded && isInboxOpen && (
              <div className="bg-[#292e45] rounded-2xl p-1 flex flex-col gap-0.5 mt-0">
                {[
                  { label: 'All', count: 3 },
                  { label: 'Open', count: 3 },
                  { label: 'Solved', count: 0 },
                  { label: 'Closed', count: 0 },
                  { label: 'Unspecified', count: 0 },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => onCaseInboxClick?.()}
                    className="flex items-center gap-3 px-2 min-h-[32px] rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <span className="text-white text-xs flex-1 text-left">{item.label}</span>
                    <div className="text-white text-xs w-5 h-5 flex items-center justify-center">
                      {item.count}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Teams */}
            <button
              className={`flex items-center rounded-lg min-h-[40px] hover:bg-white/5 transition-colors ${
                isExpanded ? 'px-2' : 'justify-center'
              }`}
            >
              <Users size={24} className="text-white shrink-0" />
              {isExpanded && (
                <span className="text-white text-xs ml-2">Teams</span>
              )}
            </button>

            {/* Queues */}
            <button
              className={`flex items-center rounded-lg min-h-[40px] hover:bg-white/5 transition-colors ${
                isExpanded ? 'px-2' : 'justify-center'
              }`}
            >
              <Filter size={24} className="text-white shrink-0" />
              {isExpanded && (
                <span className="text-white text-xs ml-2">Queues</span>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="mt-auto flex flex-col gap-2">
          {/* Knowledge Base */}
          <button
            className={`flex items-center rounded-lg min-h-[40px] hover:bg-white/5 transition-colors ${
              isExpanded ? 'px-2' : 'justify-center'
            }`}
          >
            <Bookmark size={24} className="text-white shrink-0" />
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
            <Bell size={24} className="text-white shrink-0" />
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
            <List size={24} className="text-white shrink-0" />
            {isExpanded && (
              <span className="text-white text-xs ml-2">To-do list</span>
            )}
          </button>

          {/* Connected */}
          <div
            className={`flex items-center rounded-2xl min-h-[40px] bg-[#1c1f31] ${
              isExpanded ? 'px-2' : 'justify-center'
            }`}
          >
            <Phone size={24} className="text-white shrink-0" />
            {isExpanded && (
              <div className="flex items-center gap-3 ml-2 flex-1">
                <span className="text-white text-xs">Connected</span>
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <ChevronUp size={16} className="text-white ml-auto" />
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div className="py-2">
            <div className={`bg-[#1c1f31] rounded-2xl p-2 ${isExpanded ? '' : 'flex justify-center'}`}>
              {isExpanded ? (
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 bg-[#eb1700] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">A</span>
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#00855f] rounded-full border-2 border-[#1c1f31]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">Ana J.</p>
                  </div>
                  <ChevronRight size={16} className="text-white" />
                </div>
              ) : (
                <div className="relative w-8 h-8 bg-[#eb1700] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">A</span>
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#00855f] rounded-full border-2 border-[#1c1f31]" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expand Button (when collapsed) */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="absolute left-10 top-7 bg-[#161929] rounded-full w-6 h-6 flex items-center justify-center hover:bg-[#1c1f31] transition-colors shadow-lg border border-white/10"
        >
          <ChevronRight size={16} className="text-white" />
        </button>
      )}
    </div>
  );
}


