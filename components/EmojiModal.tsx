'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { searchEmojis, EmojiEntry, EMOJI_DATA } from '@/lib/emoji-data';
import { SmileyHappyLine24Icon } from './icons/CustomIcons';

interface EmojiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (emoji: EmojiEntry) => void;
}

// Default popular emojis to show when no search query
const DEFAULT_EMOJIS = EMOJI_DATA.slice(0, 16);

export default function EmojiModal({ isOpen, onClose, onSelect }: EmojiModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Get emojis based on search query
  const emojis = query.length >= 2 
    ? searchEmojis(query, 16) 
    : DEFAULT_EMOJIS;

  // Grid dimensions
  const COLS = 8;
  const rows = Math.ceil(emojis.length / COLS);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const maxIndex = emojis.length - 1;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => {
            const newIndex = prev - COLS;
            return newIndex >= 0 ? newIndex : prev;
          });
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => {
            const newIndex = prev + COLS;
            return newIndex <= maxIndex ? newIndex : prev;
          });
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
          break;
        case 'ArrowRight':
          e.preventDefault();
          setSelectedIndex(prev => (prev < maxIndex ? prev + 1 : prev));
          break;
        case 'Enter':
          e.preventDefault();
          if (emojis[selectedIndex]) {
            onSelect(emojis[selectedIndex]);
            // Don't close - allow selecting multiple emojis
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    },
    [emojis, selectedIndex, onSelect, onClose]
  );

  // Reset selection when search results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

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

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/20 animate-in fade-in duration-150"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-[24px] border-2 border-white overflow-hidden w-[520px] animate-in zoom-in-95 slide-in-from-bottom-4 duration-200"
        style={{
          boxShadow: '0px 4px 24px 0px rgba(17, 19, 24, 0.2)',
        }}
        onKeyDown={handleKeyDown}
      >
        {/* Search Header */}
        <div className="h-[64px] border-b border-[#e9eaec] flex items-center gap-[16px] px-[24px] py-[12px] bg-[rgba(255,255,255,0.8)]">
          <SmileyHappyLine24Icon size={24} className="text-[#191919] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search emojis..."
            className="flex-1 text-[14px] leading-[20px] font-normal text-[#191919] tracking-[-0.01px] bg-transparent border-none outline-none placeholder:text-[#9a9da3]"
          />
        </div>

        {/* Emoji Grid Body */}
        <div className="p-[24px]" ref={gridRef}>
          <div className="flex flex-col gap-[8px] items-center justify-center w-full">
            {emojis.length > 0 ? (
              <div
                className="grid gap-[16px] w-full"
                style={{
                  gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                }}
              >
                {emojis.map((emoji, index) => (
                  <button
                    key={emoji.emoji + emoji.name}
                    onClick={() => {
                      onSelect(emoji);
                      // Don't close - allow selecting multiple emojis
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-center justify-center h-[40px] text-[32px] leading-[40px] rounded-[8px] transition-all duration-100 ${
                      index === selectedIndex
                        ? 'bg-[rgba(17,19,24,0.08)] scale-110'
                        : 'bg-transparent hover:bg-[rgba(17,19,24,0.04)]'
                    }`}
                    title={emoji.name}
                  >
                    {emoji.emoji}
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-[40px] text-center text-[14px] text-[#51545d]">
                No emojis found for "{query}"
              </div>
            )}
          </div>
        </div>

        {/* Footer with keyboard hints */}
        <div className="border-t border-[#e9eaec] px-[24px] py-[16px] flex items-center justify-between">
          {/* Left - Select hint */}
          <div className="flex gap-[16px] items-center">
            <div className="flex gap-[8px] items-center">
              <div className="h-[20px] px-[4px] bg-white border border-[#d3d6d9] rounded-full flex items-center justify-center">
                <span className="text-[12px] leading-[18px] font-semibold text-[#111318] tracking-[-0.01px]">
                  ⏎
                </span>
              </div>
              <span className="text-[12px] leading-[18px] font-normal text-[#51545d] tracking-[-0.01px]">
                Add emoji
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

