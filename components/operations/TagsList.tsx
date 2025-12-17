'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface TagsListProps {
  tags: string[];
  renderTag?: (tag: string) => React.ReactNode;
}

export default function TagsList({ tags, renderTag }: TagsListProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const badgeRef = useRef<HTMLSpanElement>(null);

  const visibleTags = tags.slice(0, 2);
  const hiddenTags = tags.slice(2);
  const overflowCount = hiddenTags.length;

  useEffect(() => {
    if (showTooltip && badgeRef.current) {
      const updatePosition = () => {
        const rect = badgeRef.current?.getBoundingClientRect();
        if (rect) {
          // Position below the badge with 8px gap for the pointer
          setTooltipPosition({
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
  }, [showTooltip]);

  if (tags.length === 0) {
    return <span className="text-[12px] text-[#51545d]">—</span>;
  }

  return (
    <div className="flex items-center justify-end gap-[4px] flex-wrap">
      {visibleTags.map((tag, index) => (
        <span
          key={`${tag}-${index}`}
          className="inline-flex items-center bg-[#e9eaec] px-[8px] py-[4px] rounded-full"
        >
          <span className="text-[12px] font-semibold text-[#111318] leading-[18px] tracking-[-0.01px]">
            {renderTag ? renderTag(tag) : tag}
          </span>
        </span>
      ))}
      
      {overflowCount > 0 && (
        <>
          <span
            ref={badgeRef}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="inline-flex items-center bg-[#e9eaec] px-[8px] py-[4px] rounded-full cursor-default"
          >
            <span className="text-[12px] font-semibold text-[#111318] leading-[18px] tracking-[-0.01px]">
              +{overflowCount}
            </span>
          </span>
          
          {showTooltip && createPortal(
            <div 
              className="fixed z-50 pointer-events-none"
              style={{ 
                top: tooltipPosition.top, 
                left: tooltipPosition.left,
                transform: 'translate(-50%, 0)'
              }}
            >
              {/* Arrow / Pointer - Exact shape from TimestampTooltip, flipped to point up */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full w-[40px] h-[8px] flex items-center justify-center rotate-180">
                <svg width="40" height="8" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.184 6.42133C20.8375 6.88336 20.6642 7.11437 20.4637 7.21931C20.1733 7.37134 19.8267 7.37134 19.5363 7.21931C19.3358 7.11437 19.1625 6.88336 18.816 6.42133L14 0L26 0L21.184 6.42133Z" fill="#111318"/>
                </svg>
              </div>
              
              {/* Tooltip Content */}
              <div className="bg-[#111318] text-white text-[12px] leading-[18px] tracking-[-0.01px] px-[8px] py-[8px] rounded-[8px] shadow-[0px_4px_12px_0px_rgba(17,19,24,0.15)] whitespace-nowrap font-['Inter',sans-serif] font-normal">
                <div className="flex flex-col gap-[4px]">
                  {hiddenTags.map((tag, index) => (
                    <div key={`${tag}-${index}`}>
                      {renderTag ? renderTag(tag) : tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>,
            document.body
          )}
        </>
      )}
    </div>
  );
}


