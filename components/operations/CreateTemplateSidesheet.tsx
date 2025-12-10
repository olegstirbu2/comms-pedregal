'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { CATEGORIES, COUNTRIES, type OperationsTemplate } from '@/lib/operations-template-data';

interface CreateTemplateSidesheetProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newTemplate: Omit<OperationsTemplate, 'id' | 'owner' | 'creationDate' | 'updateDate'>) => void;
}

// Close Icon Component
function CloseIcon({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289Z"
        fill="currentColor"
      />
      <path
        d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Chevron Down Icon Component
function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M17.793 8.79289C18.1835 8.40237 18.8165 8.40237 19.2071 8.79289C19.5976 9.18342 19.5976 9.81658 19.2071 10.2071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.79289 10.2071C4.40237 9.81658 4.40237 9.18342 4.79289 8.79289C5.18342 8.40237 5.81658 8.40237 6.20711 8.79289L12 14.5858L17.793 8.79289Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Small Search Icon for Dropdown
function SearchIconSmall({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M11 7C11 4.79086 9.20914 3 7 3C4.79086 3 3 4.79086 3 7C3 9.20914 4.79086 11 7 11C9.20914 11 11 9.20914 11 7ZM13 7C13 8.2957 12.587 9.49384 11.8887 10.4746L15.207 13.793C15.5976 14.1835 15.5976 14.8165 15.207 15.207C14.8165 15.5976 14.1835 15.5976 13.793 15.207L10.4746 11.8887C9.49384 12.587 8.2957 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Custom Dropdown Component
function CustomDropdown({
  label,
  value,
  options,
  placeholder,
  onChange,
  error,
}: {
  label: string;
  value: string;
  options: readonly string[];
  placeholder: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter options based on search
  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    return options.filter((option) =>
      option.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery]);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearchQuery('');
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col gap-[8px]" ref={dropdownRef}>
      <label className="text-[14px] font-semibold leading-[20px] text-[#111318] tracking-[-0.01px]">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-[48px] px-[16px] py-[12px] bg-white border border-[#e9eaec] rounded-[8px] text-[14px] leading-[20px] text-[#111318] tracking-[-0.01px] outline-none focus:border-[#111318] flex items-center justify-between transition-colors"
        >
          <span className={value ? 'text-[#111318]' : 'text-[#51545d]'}>
            {value || placeholder}
          </span>
          <ChevronDownIcon className="text-[#111318]" />
        </button>

        {/* Popover */}
        {isOpen && (
          <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white rounded-[12px] shadow-[0px_4px_12px_0px_rgba(17,19,24,0.15)] py-[8px] z-50 max-h-[280px] overflow-y-auto">
            {/* Search Bar */}
            <div className="px-[16px] py-[8px]">
              <div className="flex items-center gap-[8px] h-[32px] px-[8px] py-[4px] bg-white border border-[#d3d6d9] rounded-[8px]">
                <SearchIconSmall className="text-[#191919]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search for a ${label.toLowerCase()}`}
                  className="flex-1 text-[12px] leading-[18px] text-[#111318] placeholder-[#51545d] tracking-[-0.01px] outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Separator */}
            <div className="px-[16px] py-[8px]">
              <div className="h-px bg-[#e9eaec]" />
            </div>

            {/* Options List */}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className="w-full px-[16px] py-[4px] min-h-[32px] flex items-center text-left hover:bg-[#f6f7f8] transition-colors"
                >
                  <span className="text-[14px] leading-[20px] text-[#111318] tracking-[-0.01px]">
                    {option}
                  </span>
                </button>
              ))
            ) : (
              <div className="px-[16px] py-[4px] min-h-[32px] flex items-center">
                <span className="text-[14px] leading-[20px] text-[#51545d] tracking-[-0.01px]">
                  No results found
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      {error && (
        <p className="text-[12px] text-[#d91400] leading-[18px]">{error}</p>
      )}
    </div>
  );
}

const LANGUAGE_OPTIONS = ['All', 'ENG', 'FIN', 'SPA', 'GER'] as const;

export default function CreateTemplateSidesheet({
  isOpen,
  onClose,
  onCreate,
}: CreateTemplateSidesheetProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    country: '',
    language: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        title: '',
        content: '',
        category: '',
        country: '',
        language: '',
      });
      setErrors({});
    }
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Name is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Name must be 100 characters or less';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Message is required';
    } else if (formData.content.length > 500) {
      newErrors.content = 'Message must be 500 characters or less';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.country) {
      newErrors.country = 'Country is required';
    }

    if (!formData.language) {
      newErrors.language = 'Language is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = () => {
    if (validateForm()) {
      onCreate({
        title: formData.title,
        content: formData.content,
        category: formData.category,
        country: formData.country,
        language: formData.language,
      });
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const isFormValid = formData.title.trim() && 
                      formData.content.trim() && 
                      formData.category && 
                      formData.country && 
                      formData.language;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-[100] animate-in fade-in duration-200"
        onClick={handleBackdropClick}
      />

      {/* Sidesheet */}
      <div className="fixed right-[8px] top-[8px] h-[calc(100vh-16px)] w-[640px] bg-white z-[101] animate-in slide-in-from-right duration-200 rounded-[24px] shadow-[0px_1px_4px_0px_rgba(17,19,24,0.15)] border-2 border-white flex flex-col">
        {/* Header */}
        <div className="flex flex-col shrink-0">
          {/* Close Button Row */}
          <div className="flex items-center justify-end p-[8px]">
            <button
              onClick={onClose}
              className="w-[40px] h-[40px] flex items-center justify-center rounded-[8px] hover:bg-[rgba(17,19,24,0.04)] transition-colors"
              aria-label="Close"
            >
              <CloseIcon className="text-[#111318]" />
            </button>
          </div>

          {/* Title Row */}
          <div className="flex items-center min-h-[48px] px-[16px] pb-[8px]">
            <h1 className="text-[32px] leading-[40px] font-bold text-[#111318] tracking-[-0.01px]">
              Create template
            </h1>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-[16px]">
          <div className="flex flex-col gap-[40px]">
            {/* Name and Message Section */}
            <div className="flex flex-col gap-[16px]">
              {/* Name Input */}
              <div className="flex flex-col gap-[8px]">
                <label className="text-[14px] font-semibold leading-[20px] text-[#111318] tracking-[-0.01px]">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="h-[48px] px-[16px] py-[12px] bg-white border border-[#e9eaec] rounded-[8px] text-[14px] leading-[20px] text-[#111318] placeholder-[#51545d] tracking-[-0.01px] outline-none focus:border-[#111318]"
                  placeholder="Write template name.."
                />
                {errors.title && (
                  <p className="text-[12px] text-[#d91400] leading-[18px]">{errors.title}</p>
                )}
              </div>

              {/* Message Textarea */}
              <div className="flex flex-col gap-[8px]">
                <label className="text-[14px] font-semibold leading-[20px] text-[#111318] tracking-[-0.01px]">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full h-[89px] p-[16px] bg-white border border-[#e9eaec] rounded-[8px] text-[14px] leading-[20px] text-[#111318] placeholder-[#51545d] tracking-[-0.01px] outline-none focus:border-[#111318] resize-y"
                    placeholder="Write template message..."
                  />
                  {/* Corner Resizer Visual Indicator */}
                  <div className="absolute bottom-[3px] right-[3px] w-[16px] h-[16px] pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M14 14L14 8M14 14L8 14" stroke="#9a9da3" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                {errors.content && (
                  <p className="text-[12px] text-[#d91400] leading-[18px]">{errors.content}</p>
                )}
              </div>
            </div>

            {/* Dropdowns Section */}
            <div className="flex flex-col gap-[16px]">
              {/* Category Dropdown */}
              <CustomDropdown
                label="Category"
                value={formData.category}
                options={CATEGORIES.filter(c => c !== 'All')}
                placeholder="Choose category"
                onChange={(value) => setFormData({ ...formData, category: value })}
                error={errors.category}
              />

              {/* Country Dropdown */}
              <CustomDropdown
                label="Country"
                value={formData.country}
                options={COUNTRIES.filter(c => c !== 'All')}
                placeholder="Choose country"
                onChange={(value) => setFormData({ ...formData, country: value })}
                error={errors.country}
              />

              {/* Language Dropdown */}
              <CustomDropdown
                label="Language"
                value={formData.language}
                options={LANGUAGE_OPTIONS.filter(l => l !== 'All')}
                placeholder="Choose language"
                onChange={(value) => setFormData({ ...formData, language: value })}
                error={errors.language}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-[#e9eaec] p-[16px] flex items-center justify-between gap-[8px]">
          {/* Delete Button (Disabled) */}
          <button
            disabled
            className="h-[40px] px-[12px] py-[4px] bg-[#f6f7f8] rounded-[8px] flex items-center justify-center cursor-not-allowed"
          >
            <span className="text-[14px] font-bold leading-[20px] text-[#aeb1b7] tracking-[-0.01px]">
              Delete
            </span>
          </button>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-[8px]">
            {/* Cancel Button */}
            <button
              onClick={onClose}
              className="h-[40px] px-[12px] py-[4px] bg-transparent rounded-[8px] flex items-center justify-center hover:bg-[rgba(17,19,24,0.04)] transition-colors"
            >
              <span className="text-[14px] font-bold leading-[20px] text-[#111318] tracking-[-0.01px]">
                Cancel
              </span>
            </button>

            {/* Confirm Button */}
            <button
              onClick={handleCreate}
              disabled={!isFormValid}
              className={`h-[40px] px-[12px] py-[2px] rounded-[8px] flex items-center justify-center transition-colors ${
                isFormValid
                  ? 'bg-[#00855f] hover:bg-[#006d4e] cursor-pointer'
                  : 'bg-[#f6f7f8] cursor-not-allowed'
              }`}
            >
              <span className={`text-[14px] font-bold leading-[20px] tracking-[-0.01px] ${
                isFormValid ? 'text-white' : 'text-[#aeb1b7]'
              }`}>
                Confirm
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

