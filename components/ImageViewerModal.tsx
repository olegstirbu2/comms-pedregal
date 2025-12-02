'use client';

import { useEffect, useState, useCallback } from 'react';
import { CloseIcon, ArrowRightIcon, ZoomInIcon, ZoomOutIcon } from './icons/CustomIcons';

interface ImageViewerModalProps {
  isOpen: boolean;
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function ImageViewerModal({ 
  isOpen, 
  images, 
  initialIndex, 
  onClose 
}: ImageViewerModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Reset zoom and index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setZoomLevel(1);
    }
  }, [isOpen, initialIndex]);

  // Navigation handlers
  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setZoomLevel(1); // Reset zoom when changing images
    }
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setZoomLevel(1); // Reset zoom when changing images
    }
  }, [currentIndex, images.length]);

  // Zoom handlers
  const zoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3)); // Max 3x zoom
  }, []);

  const zoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1)); // Min 1x zoom
  }, []);

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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const hasMultipleImages = images.length > 1;
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < images.length - 1;
  const canZoomIn = zoomLevel < 3;
  const canZoomOut = zoomLevel > 1;

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Dark overlay background - 75% black */}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.75)]" />

      {/* Close Button - Top Right */}
      <button
        onClick={onClose}
        className="fixed top-[30px] right-[32px] z-[202] w-[48px] h-[48px] flex items-center justify-center rounded-[8px] bg-transparent group transition-opacity duration-150"
        aria-label="Close image viewer"
      >
        <CloseIcon size={24} className="text-white transition-opacity duration-150 group-hover:opacity-60" />
      </button>

      {/* Left Navigation Arrow */}
      {hasMultipleImages && canGoPrevious && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          className="fixed left-[32px] top-1/2 -translate-y-1/2 z-[202] w-[48px] h-[48px] flex items-center justify-center rounded-[8px] bg-transparent group transition-opacity duration-150"
          aria-label="Previous image"
        >
          <ArrowRightIcon size={24} className="text-white rotate-180 transition-opacity duration-150 group-hover:opacity-60" />
        </button>
      )}

      {/* Right Navigation Arrow */}
      {hasMultipleImages && canGoNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="fixed right-[32px] top-1/2 -translate-y-1/2 z-[202] w-[48px] h-[48px] flex items-center justify-center rounded-[8px] bg-transparent group transition-opacity duration-150"
          aria-label="Next image"
        >
          <ArrowRightIcon size={24} className="text-white transition-opacity duration-150 group-hover:opacity-60" />
        </button>
      )}

      {/* Zoom Controls - Bottom Center */}
      <div className="fixed bottom-[32px] left-1/2 -translate-x-1/2 z-[202] flex items-center gap-[10px]">
        {/* Zoom Out */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            zoomOut();
          }}
          disabled={!canZoomOut}
          className={`w-[48px] h-[48px] flex items-center justify-center rounded-[8px] bg-transparent group transition-opacity duration-150 ${
            !canZoomOut && 'cursor-not-allowed'
          }`}
          aria-label="Zoom out"
        >
          <ZoomOutIcon size={24} className={`text-white transition-opacity duration-150 ${
            canZoomOut ? 'group-hover:opacity-60' : 'opacity-40'
          }`} />
        </button>

        {/* Zoom In */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            zoomIn();
          }}
          disabled={!canZoomIn}
          className={`w-[48px] h-[48px] flex items-center justify-center rounded-[8px] bg-transparent group transition-opacity duration-150 ${
            !canZoomIn && 'cursor-not-allowed'
          }`}
          aria-label="Zoom in"
        >
          <ZoomInIcon size={24} className={`text-white transition-opacity duration-150 ${
            canZoomIn ? 'group-hover:opacity-60' : 'opacity-40'
          }`} />
        </button>
      </div>

      {/* Image Container */}
      <div 
        className="relative z-[201] flex items-center justify-center animate-in zoom-in-95 duration-200"
        style={{
          marginTop: '96px',
          marginBottom: '96px',
          maxHeight: 'calc(100vh - 192px)',
          maxWidth: '100vw',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1} of ${images.length}`}
          className="max-w-full max-h-full object-contain rounded-[24px] transition-all duration-200 ease-out animate-in fade-in zoom-in-95"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center center',
            transitionProperty: 'transform',
            transitionDuration: '200ms',
            transitionTimingFunction: 'ease-out',
          }}
        />
      </div>
    </div>
  );
}

