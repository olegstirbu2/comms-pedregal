'use client';

import { useEffect, useRef, useCallback } from 'react';
import { EmojiEntry } from '@/lib/emoji-data';

interface EmojiPopoverProps {
  isOpen: boolean;
  emojis: EmojiEntry[];
  selectedIndex: number;
  onSelect: (emoji: EmojiEntry) => void;
  onClose: () => void;
  onNavigate: (direction: 'up' | 'down') => void;
  leftPosition?: number; // Position from left edge to align with ":" character
}

export default function EmojiPopover({
  isOpen,
  emojis,
  selectedIndex,
  onSelect,
  onClose,
  onNavigate,
  leftPosition = 0,
}: EmojiPopoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedRef.current && containerRef.current) {
      selectedRef.current.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [selectedIndex]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          onNavigate('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          onNavigate('down');
          break;
        case 'Enter':
          e.preventDefault();
          if (emojis[selectedIndex]) {
            onSelect(emojis[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
        case 'Tab':
          e.preventDefault();
          onClose();
          break;
      }
    },
    [isOpen, emojis, selectedIndex, onSelect, onClose, onNavigate]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen || emojis.length === 0) return null;

  // Cap at 6 visible items
  const visibleEmojis = emojis.slice(0, 6);

  return (
    <div
      ref={containerRef}
      className="absolute w-[240px] bg-white rounded-[8px] py-[8px] z-[100] overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-150"
      style={{
        boxShadow: '0px 4px 12px 0px rgba(17, 19, 24, 0.15)',
        bottom: 'calc(100% + 8px)',
        left: `${leftPosition}px`,
      }}
    >
      {visibleEmojis.map((emoji, index) => (
        <button
          key={emoji.emoji + emoji.name}
          ref={index === selectedIndex ? selectedRef : null}
          onClick={() => onSelect(emoji)}
          onMouseEnter={() => onNavigate(index as any)} // We'll handle this in ChatInterface
          className={`w-full flex items-center gap-[12px] px-[16px] py-[4px] min-h-[32px] transition-colors duration-100 ${
            index === selectedIndex
              ? 'bg-[rgba(17,19,24,0.05)]'
              : 'bg-transparent hover:bg-[rgba(17,19,24,0.03)]'
          }`}
        >
          <span className="text-[14px] leading-[20px] font-normal text-[#111318] tracking-[-0.01px]">
            {emoji.emoji} {emoji.name}
          </span>
        </button>
      ))}
    </div>
  );
}

