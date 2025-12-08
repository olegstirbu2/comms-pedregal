'use client';

import { useState } from 'react';
import { CloseCircleIcon, LanguageIcon, ChevronDownIcon } from './icons/CustomIcons';

interface TranslationLanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (language: string) => void;
  currentLanguage?: string;
}

export default function TranslationLanguageModal({
  isOpen,
  onClose,
  onApply,
  currentLanguage = 'Italian'
}: TranslationLanguageModalProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(selectedLanguage);
    onClose();
  };

  const handleCancel = () => {
    setSelectedLanguage(currentLanguage);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  // Available languages (hardcoded to Italian for now)
  const languages = ['Italian'];

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-[24px] shadow-[0px_8px_20px_0px_rgba(17,19,24,0.15)] w-[480px] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-col">
          {/* Close Button Row */}
          <div className="flex items-center justify-end p-[8px]">
            <button
              onClick={onClose}
              className="w-[40px] h-[40px] flex items-center justify-center rounded-[8px] hover:bg-gray-50 transition-colors"
              aria-label="Close modal"
            >
              <CloseCircleIcon size={24} className="text-[#111318]" />
            </button>
          </div>

          {/* Title Section */}
          <div className="px-[24px] pb-[8px]">
            <h2 className="text-[24px] leading-[28px] font-bold text-[#191919] tracking-[-0.01px]">
              Chat translation language
            </h2>
            <p className="text-[14px] leading-[20px] font-normal text-[#606060] tracking-[-0.01px] mt-[4px]">
              Change will apply only to this chat
            </p>
          </div>
        </div>

        {/* Body - Language Field */}
        <div className="flex-1 px-[16px] pt-[24px] pb-[16px]">
          <div className="flex flex-col gap-[8px]">
            {/* Label */}
            <label className="text-[14px] leading-[20px] font-semibold text-[#111318] tracking-[-0.01px]">
              Language
            </label>

            {/* Dropdown Field */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full h-[40px] bg-white border border-[#d3d6d9] rounded-[8px] px-[12px] flex items-center gap-[12px] hover:border-[#9a9da3] transition-colors"
              >
                <LanguageIcon size={24} className="text-[#111318]" />
                <span className="flex-1 text-[14px] leading-[20px] font-normal text-[#111318] tracking-[-0.01px] text-left">
                  {selectedLanguage}
                </span>
                <ChevronDownIcon size={24} className="text-[#111318]" />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute top-full left-0 right-0 mt-[4px] bg-white rounded-[8px] shadow-[0px_4px_12px_0px_rgba(17,19,24,0.15)] py-[8px] z-20">
                    {languages.map((language) => (
                      <button
                        key={language}
                        onClick={() => {
                          setSelectedLanguage(language);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full h-[48px] px-[16px] flex items-center gap-[8px] hover:bg-[#f6f7f8] transition-colors text-left"
                      >
                        <span className="text-[14px] leading-[20px] font-normal text-[#111318] tracking-[-0.01px]">
                          {language}
                        </span>
                        {selectedLanguage === language && (
                          <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 16 16" 
                            fill="none" 
                            className="ml-auto"
                          >
                            <path
                              d="M13.3704 3.27958C13.7432 2.90681 14.3476 2.90681 14.7204 3.27958C15.0932 3.65235 15.0932 4.2568 14.7204 4.62957L6.12948 13.2205C5.95048 13.3995 5.70762 13.5 5.45449 13.5C5.20135 13.4999 4.95849 13.3995 4.77949 13.2205L1.27955 9.72057C0.906798 9.34781 0.906833 8.74335 1.27955 8.37058C1.65233 7.99781 2.25677 7.99781 2.62954 8.37058L5.45449 11.1955L13.3704 3.27958Z"
                              fill="#191919"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer - Button Group */}
        <div className="flex items-center justify-end gap-[8px] p-[16px]">
          <button
            onClick={handleCancel}
            className="h-[40px] px-[12px] flex items-center justify-center rounded-[8px] hover:bg-gray-50 transition-colors"
          >
            <span className="text-[14px] leading-[20px] font-bold text-[#111318] tracking-[-0.01px]">
              Cancel
            </span>
          </button>
          <button
            onClick={handleApply}
            className="h-[40px] px-[12px] bg-[#00855f] hover:bg-[#006f4f] flex items-center justify-center rounded-[8px] transition-colors"
          >
            <span className="text-[14px] leading-[20px] font-bold text-white tracking-[-0.01px]">
              Apply
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

