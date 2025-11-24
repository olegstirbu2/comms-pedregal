'use client';

import { EditAddLineIcon, ChevronDownIcon } from './icons/NavIcons';

export default function EmailComposer({ contactInfo }) {
  return (
    <div className="bg-white shrink-0 pb-[16px] px-[16px]">
      <div className="border border-[#e9eaec] rounded-[16px] bg-white overflow-hidden">
        <div className="p-[16px] flex flex-col gap-[16px]">
          {/* Contact Info - Avatar, Name, Email */}
          <div className="flex items-center gap-[12px]">
            {/* Avatar */}
            <div className="relative w-[40px] h-[40px] rounded-full shadow-[0px_1px_4px_0px_rgba(17,19,24,0.15)] shrink-0">
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#d4ffcd] to-[#4adc34] flex items-center justify-center border-2 border-white overflow-hidden">
                {contactInfo?.avatarUrl ? (
                  <img 
                    src={contactInfo.avatarUrl} 
                    alt={contactInfo.name}
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>
              <div className="absolute bottom-0 right-0 w-[16px] h-[16px] bg-[#f6f7f8] rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-[8px] leading-[12px] font-semibold text-[#111318] tracking-[-0.0077px]">
                  {contactInfo?.badge || 'C'}
                </span>
              </div>
            </div>

            {/* Name and Email */}
            <div className="flex flex-col gap-[2px] flex-1 min-w-0">
              <p className="text-[14px] leading-[20px] font-semibold text-[#111318] tracking-[-0.01px] truncate">
                {contactInfo?.name || 'Contact'}
              </p>
              <p className="text-[12px] leading-[18px] font-normal text-[#51545d] tracking-[-0.01px] truncate">
                {contactInfo?.email || 'contact@example.com'}
              </p>
            </div>
          </div>

          {/* From Field and Actions Row */}
          <div className="flex items-center justify-between">
            {/* From Field */}
            <div className="flex items-center gap-[8px]">
              <span className="text-[14px] leading-[20px] font-normal text-[#51545d] tracking-[-0.01px]">
                From:
              </span>
              <button className="flex items-center gap-[4px]">
                <span className="text-[14px] leading-[20px] font-normal text-[#111318] tracking-[-0.01px]">
                  support@wolt.com
                </span>
                <ChevronDownIcon size={16} className="text-[#111318]" />
              </button>
            </div>

            {/* Compose Email Button */}
            <button
              className="w-[40px] h-[40px] flex items-center justify-center rounded-[8px] bg-[#e7fef4] hover:bg-[#d0f5e6] transition-colors"
              aria-label="Compose email"
            >
              <EditAddLineIcon size={24} className="text-[#00855f]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

