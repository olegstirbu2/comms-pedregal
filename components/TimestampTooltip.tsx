'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

interface TimestampTooltipProps {
  children: React.ReactNode;
  relativeTime: string; // e.g. "1m", "30s"
  is12Hour?: boolean;
  className?: string;
}

export function TimestampTooltip({ 
  children, 
  relativeTime, 
  is12Hour = false,
  className 
}: TimestampTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  // Parse relative time to get an absolute date (mock logic)
  const getAbsoluteDate = (rel: string): Date => {
    const now = new Date();
    const value = parseInt(rel);
    if (isNaN(value)) return now;

    if (rel.includes('s')) now.setSeconds(now.getSeconds() - value);
    else if (rel.includes('m')) now.setMinutes(now.getMinutes() - value);
    else if (rel.includes('h')) now.setHours(now.getHours() - value);
    else if (rel.includes('d')) now.setDate(now.getDate() - value);
    
    return now;
  };

  const formatDate = (date: Date, is12h: boolean): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const secString = `${seconds}sec`;

    if (is12h) {
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const h12 = hours % 12 || 12;
      return `${h12}:${formattedMinutes} ${secString} ${ampm}`;
    } else {
      const h24 = hours.toString().padStart(2, '0');
      return `${h24}:${formattedMinutes} ${secString}`;
    }
  };

  const timestampStr = formatDate(getAbsoluteDate(relativeTime), is12Hour);

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const updatePosition = () => {
        const rect = triggerRef.current?.getBoundingClientRect();
        if (rect) {
          // Position below the element with 8px gap for the pointer
          setPosition({
            top: rect.bottom + 8,
            left: rect.left + rect.width / 2,
          });
        }
      };
      
      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isVisible]);

  return (
    <div 
      ref={triggerRef}
      className={cn("relative inline-block cursor-default", className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && createPortal(
        <div 
          className="fixed z-50 pointer-events-none"
          style={{ 
            top: position.top, 
            left: position.left,
            transform: 'translate(-50%, 0)'
          }}
        >
          {/* Arrow / Pointer - Exact shape from Figma, flipped to point up */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full w-[40px] h-[8px] flex items-center justify-center rotate-180">
            <svg width="40" height="8" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.184 6.42133C20.8375 6.88336 20.6642 7.11437 20.4637 7.21931C20.1733 7.37134 19.8267 7.37134 19.5363 7.21931C19.3358 7.11437 19.1625 6.88336 18.816 6.42133L14 0L26 0L21.184 6.42133Z" fill="#111318"/>
            </svg>
          </div>
          
          {/* Tooltip Content */}
          <div className="bg-[#111318] text-white text-[12px] leading-[18px] tracking-[-0.01px] px-[8px] py-[8px] rounded-[8px] shadow-[0px_4px_12px_0px_rgba(17,19,24,0.15)] whitespace-nowrap font-['Inter',sans-serif] font-normal">
            {timestampStr}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

