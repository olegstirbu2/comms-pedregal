'use client';

import { PhoneCallFillIcon, KeyboardIcon } from './icons/NavIcons';

export default function PhoneComposer({ contactInfo }) {
  return (
    <div className="bg-white shrink-0 pb-[16px] px-[16px]">
      <div className="border border-[#e9eaec] rounded-[16px] bg-white overflow-hidden">
        <div className="p-[16px] flex flex-col gap-[16px]">
          {/* Contact Info - Avatar, Name, Number */}
          <div className="flex items-center gap-[12px]">
            {/* Avatar */}
            <div className="w-[40px] h-[40px] rounded-full shrink-0">
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#d4ffcd] to-[#4adc34] flex items-center justify-center border border-[#e4e4e4] overflow-hidden">
                {contactInfo?.avatarUrl ? (
                  <img 
                    src={contactInfo.avatarUrl} 
                    alt={contactInfo.name}
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>
            </div>

            {/* Name and Number */}
            <div className="flex flex-col gap-[2px] flex-1 min-w-0">
              <p className="text-[14px] leading-[20px] font-semibold text-[#111318] tracking-[-0.01px] truncate">
                {contactInfo?.name || 'Contact'}
              </p>
              <p className="text-[12px] leading-[18px] font-normal text-[#51545d] tracking-[-0.01px] truncate">
                {contactInfo?.phone || '+1 234 567 8900'}
              </p>
            </div>
          </div>

          {/* Phone Input/Display Area */}
          <div className="flex flex-col gap-[8px]">
            <input
              type="tel"
              placeholder="Enter phone number..."
              className="text-[14px] leading-[20px] font-normal text-[#51545d] tracking-[-0.01px] bg-transparent border-none outline-none w-full"
              aria-label="Phone number input"
            />
          </div>

          {/* Actions Row */}
          <div className="flex items-center justify-between">
            {/* Keyboard Button (Left) */}
            <button className="w-[32px] h-[32px] flex items-center justify-center rounded-[8px] hover:bg-gray-50">
              <KeyboardIcon size={24} className="text-[#191919]" />
            </button>

            {/* Call Button (Right) - Icon Only */}
            <button
              className="w-[40px] h-[40px] flex items-center justify-center rounded-[8px] bg-[#e7fef4] hover:bg-[#d0f5e6] transition-colors"
              aria-label="Start call"
            >
              <PhoneCallFillIcon size={24} className="text-[#00855f]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

