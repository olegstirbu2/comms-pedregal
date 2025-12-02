'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { SearchLineIcon } from './icons/CustomIcons';

interface GifModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (gifUrl: string) => void;
}

interface GiphyGif {
  id: string;
  images: {
    fixed_width: {
      url: string;
      width: string;
      height: string;
    };
    downsized: {
      url: string;
    };
  };
  title: string;
}

const TUMBLEWEED_GIF = 'https://media.giphy.com/media/2JUwr3tnfiQJa/giphy.gif';
// GIPHY API Key - get your own key at https://developers.giphy.com/
const GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY || 'LwaIK8DkD5gS24wMG7HUaA1yIbgKbHka';

export default function GifModal({ isOpen, onClose, onSelect }: GifModalProps) {
  const [query, setQuery] = useState('');
  const [gifs, setGifs] = useState<GiphyGif[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Grid dimensions
  const COLS = 3;

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setGifs([]);
      setSelectedIndex(0);
      setHasSearched(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Search GIFs from GIPHY API with debouncing
  const searchGifs = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setGifs([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(searchQuery)}&limit=9`;
      console.log('Fetching GIFs from:', url);
      
      const response = await fetch(url);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('GIFs received:', data.data?.length || 0);
      setGifs(data.data || []);
    } catch (error) {
      console.error('Error fetching GIFs:', error);
      setGifs([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search on query change
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.trim()) {
      searchTimeoutRef.current = setTimeout(() => {
        searchGifs(query);
      }, 300);
    } else {
      setGifs([]);
      setHasSearched(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query, searchGifs]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const maxIndex = gifs.length - 1;

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
          if (gifs[selectedIndex]) {
            const gifUrl = gifs[selectedIndex].images.downsized.url;
            onSelect(gifUrl);
            onClose();
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    },
    [gifs, selectedIndex, onSelect, onClose]
  );

  // Reset selection when search results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [gifs]);

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
        className="bg-white rounded-[24px] border-2 border-white overflow-hidden w-[646px] h-[556px] flex flex-col animate-in zoom-in-95 slide-in-from-bottom-4 duration-200"
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
            placeholder="Search GIF"
            className="flex-1 text-[14px] leading-[20px] font-normal text-[#191919] tracking-[-0.01px] bg-transparent border-none outline-none placeholder:text-[#51545d]"
          />
        </div>

        {/* GIF Grid Body - Scrollable middle section */}
        <div className="p-[24px] overflow-y-auto flex-1 min-h-0">
          {/* Empty State */}
          {!hasSearched && (
            <div className="flex flex-col gap-[16px] items-center justify-center w-full h-full">
              <div className="h-[138px] w-[300px] relative">
                <img 
                  src={TUMBLEWEED_GIF} 
                  alt="Search for a GIF"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-[12px] leading-[18px] font-normal text-[#51545d] tracking-[-0.01px]">
                Nothing to see here. Search a GIF
              </p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <p className="text-[14px] text-[#51545d]">Searching...</p>
            </div>
          )}

          {/* No Results */}
          {hasSearched && !isLoading && gifs.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <p className="text-[14px] text-[#51545d]">No GIFs found for "{query}"</p>
            </div>
          )}

          {/* GIF Grid */}
          {gifs.length > 0 && (
            <div className="flex flex-col gap-[16px] w-full">
              <div
                className="grid gap-[16px] w-full"
                style={{
                  gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                }}
              >
                {gifs.map((gif, index) => (
                  <button
                    key={gif.id}
                    onClick={() => {
                      const gifUrl = gif.images.downsized.url;
                      onSelect(gifUrl);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`relative w-[188px] h-[188px] rounded-[8px] overflow-hidden transition-all duration-100 ${
                      index === selectedIndex
                        ? 'ring-2 ring-[#111318] scale-105'
                        : 'hover:ring-2 hover:ring-[#9a9da3]'
                    }`}
                    title={gif.title}
                  >
                    <img
                      src={gif.images.fixed_width.url}
                      alt={gif.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
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
                Up / Down
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

