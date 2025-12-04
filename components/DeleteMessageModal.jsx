'use client';

import { useEffect } from 'react';

export default function DeleteMessageModal({ isOpen, onConfirm, onCancel }) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

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

  return (
    <div 
      className="fixed inset-0 z-[300] flex items-center justify-center animate-in fade-in duration-200"
      onClick={onCancel}
    >
      {/* Backdrop overlay - 50% black */}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)]" />

      {/* Modal Card */}
      <div 
        className="relative z-[301] w-[400px] bg-white rounded-[16px] shadow-[0px_8px_32px_0px_rgba(17,19,24,0.25)] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content */}
        <div className="flex flex-col gap-[24px] p-[24px]">
          {/* Title */}
          <h2 className="text-[18px] leading-[24px] font-bold text-[#111318] tracking-[-0.01px]">
            Delete message?
          </h2>

          {/* Body Text */}
          <p className="text-[14px] leading-[20px] font-normal text-[#51545d] tracking-[-0.01px]">
            This message will be marked as deleted. The content will remain visible for review purposes.
          </p>

          {/* Buttons */}
          <div className="flex gap-[12px] justify-end">
            {/* Cancel Button */}
            <button
              onClick={onCancel}
              className="h-[40px] px-[16px] rounded-[8px] bg-[#f6f7f8] hover:bg-[#eceef0] transition-colors"
            >
              <span className="text-[14px] leading-[20px] font-semibold text-[#111318] tracking-[-0.01px]">
                Cancel
              </span>
            </button>

            {/* Delete Button */}
            <button
              onClick={onConfirm}
              className="h-[40px] px-[16px] rounded-[8px] bg-[#d91400] hover:bg-[#b91000] transition-colors"
            >
              <span className="text-[14px] leading-[20px] font-semibold text-white tracking-[-0.01px]">
                Delete
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

