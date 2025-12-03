'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { DragHandleIcon, ArrowLeftIcon, ArrowRightIcon, CloseIcon } from './icons/CustomIcons';

interface DraggableImageModalProps {
  isOpen: boolean;
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

type ResizeCorner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | null;

export default function DraggableImageModal({ 
  isOpen, 
  images, 
  initialIndex, 
  onClose 
}: DraggableImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  // Modal position and size state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 800, height: 800 });
  const [isDragging, setIsDragging] = useState(false);
  const [resizeCorner, setResizeCorner] = useState<ResizeCorner>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ mouseX: 0, mouseY: 0, width: 0, height: 0, x: 0, y: 0 });
  
  const modalRef = useRef<HTMLDivElement>(null);

  // Center modal on open
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setSize({ width: 800, height: 800 });
      // Center in viewport
      const x = (window.innerWidth - 800) / 2;
      const y = (window.innerHeight - 800) / 2;
      setPosition({ x, y });
    }
  }, [isOpen, initialIndex]);

  // Navigation handlers
  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, images.length]);

  // Keyboard handlers
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, goToPrevious, goToNext]);

  // Drag handlers
  const handleDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  }, [position]);

  // Resize handlers for each corner
  const handleResizeStart = useCallback((corner: ResizeCorner) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setResizeCorner(corner);
    setResizeStart({
      mouseX: e.clientX,
      mouseY: e.clientY,
      width: size.width,
      height: size.height,
      x: position.x,
      y: position.y
    });
  }, [size, position]);

  // Mouse move and up handlers
  useEffect(() => {
    if (!isDragging && !resizeCorner) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      } else if (resizeCorner) {
        const deltaX = e.clientX - resizeStart.mouseX;
        const deltaY = e.clientY - resizeStart.mouseY;
        
        // Use the larger delta to maintain square aspect ratio
        const delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
        
        let newSize: number;
        let newX = resizeStart.x;
        let newY = resizeStart.y;
        
        switch (resizeCorner) {
          case 'bottom-right':
            newSize = Math.max(400, Math.min(1200, resizeStart.width + delta));
            break;
          case 'bottom-left':
            newSize = Math.max(400, Math.min(1200, resizeStart.width - delta));
            newX = resizeStart.x + (resizeStart.width - newSize);
            break;
          case 'top-right':
            newSize = Math.max(400, Math.min(1200, resizeStart.width + delta));
            newY = resizeStart.y + (resizeStart.height - newSize);
            break;
          case 'top-left':
            newSize = Math.max(400, Math.min(1200, resizeStart.width - delta));
            newX = resizeStart.x + (resizeStart.width - newSize);
            newY = resizeStart.y + (resizeStart.height - newSize);
            break;
          default:
            newSize = resizeStart.width;
        }
        
        setSize({ width: newSize, height: newSize });
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setResizeCorner(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Set cursor globally during drag/resize
    if (isDragging) {
      document.body.style.cursor = 'grabbing';
    } else if (resizeCorner === 'top-left' || resizeCorner === 'bottom-right') {
      document.body.style.cursor = 'nwse-resize';
    } else if (resizeCorner === 'top-right' || resizeCorner === 'bottom-left') {
      document.body.style.cursor = 'nesw-resize';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
    };
  }, [isDragging, resizeCorner, dragOffset, resizeStart]);

  if (!isOpen) return null;

  const hasMultipleImages = images.length > 1;
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < images.length - 1;

  return (
    <div 
      ref={modalRef}
      className="fixed z-[200]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
    >
      {/* Image Container with rounded corners */}
      <div 
        className="absolute inset-0 rounded-[24px] overflow-hidden"
        style={{ 
          boxShadow: '0px 8px 32px rgba(17, 19, 24, 0.25)'
        }}
      >
        <img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1} of ${images.length}`}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Drag Handle Button - Top Left */}
      <button
        onMouseDown={handleDragStart}
        className="absolute top-[24px] left-[24px] w-[32px] h-[32px] flex items-center justify-center rounded-[8px] bg-white shadow-[0px_1px_4px_0px_rgba(17,19,24,0.15)] cursor-grab active:cursor-grabbing transition-opacity hover:opacity-90"
        aria-label="Drag to move"
      >
        <DragHandleIcon size={16} className="text-[#111318]" />
      </button>

      {/* Close Button - Top Right */}
      <button
        onClick={onClose}
        className="absolute top-[24px] right-[24px] w-[32px] h-[32px] flex items-center justify-center rounded-[8px] bg-white shadow-[0px_1px_4px_0px_rgba(17,19,24,0.15)] hover:opacity-90 transition-opacity"
        aria-label="Close image viewer"
      >
        <CloseIcon size={16} className="text-[#111318]" />
      </button>

      {/* Navigation Arrows - Bottom Center */}
      {hasMultipleImages && (
        <div className="absolute bottom-[24px] left-1/2 -translate-x-1/2 flex items-center gap-[8px]">
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            disabled={!canGoPrevious}
            className={`w-[32px] h-[32px] flex items-center justify-center rounded-[8px] bg-white shadow-[0px_1px_4px_0px_rgba(17,19,24,0.15)] transition-opacity ${
              canGoPrevious ? 'hover:opacity-90 cursor-pointer' : 'opacity-40 cursor-not-allowed'
            }`}
            aria-label="Previous image"
          >
            <ArrowLeftIcon size={16} className="text-[#111318]" />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            disabled={!canGoNext}
            className={`w-[32px] h-[32px] flex items-center justify-center rounded-[8px] bg-white shadow-[0px_1px_4px_0px_rgba(17,19,24,0.15)] transition-opacity ${
              canGoNext ? 'hover:opacity-90 cursor-pointer' : 'opacity-40 cursor-not-allowed'
            }`}
            aria-label="Next image"
          >
            <ArrowRightIcon size={16} className="text-[#111318]" />
          </button>
        </div>
      )}

      {/* Resize Handles - All Four Corners (invisible but functional) */}
      {/* Top-Left */}
      <div
        onMouseDown={handleResizeStart('top-left')}
        className="absolute top-0 left-0 w-[24px] h-[24px] cursor-nwse-resize"
        style={{ borderRadius: '24px 0 0 0' }}
      />
      {/* Top-Right */}
      <div
        onMouseDown={handleResizeStart('top-right')}
        className="absolute top-0 right-0 w-[24px] h-[24px] cursor-nesw-resize"
        style={{ borderRadius: '0 24px 0 0' }}
      />
      {/* Bottom-Left */}
      <div
        onMouseDown={handleResizeStart('bottom-left')}
        className="absolute bottom-0 left-0 w-[24px] h-[24px] cursor-nesw-resize"
        style={{ borderRadius: '0 0 0 24px' }}
      />
      {/* Bottom-Right */}
      <div
        onMouseDown={handleResizeStart('bottom-right')}
        className="absolute bottom-0 right-0 w-[24px] h-[24px] cursor-nwse-resize"
        style={{ borderRadius: '0 0 24px 0' }}
      />
    </div>
  );
}

