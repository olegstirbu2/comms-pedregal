'use client';

export default function ChannelToggle({ selectedChannel, onChannelChange }) {
  const channels = [
    { id: 'chat', label: 'Chat' },
    { id: 'phone', label: 'Phone' },
    { id: 'email', label: 'Email' },
  ];

  return (
    <div className="flex justify-start px-4 py-2">
      <div className="inline-flex items-center gap-[2px] bg-[#f6f7f8] rounded-[6px] p-[2px]">
        {channels.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onChannelChange(id)}
            className={`
              px-3 py-1 rounded-[8px]
              text-xs font-semibold tracking-[-0.01px] leading-[18px]
              ${
                selectedChannel === id
                  ? 'bg-white text-[#111318] border border-[#E9EAEC]'
                  : 'text-[#51545d] hover:bg-white/50 border border-transparent'
              }
            `}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

