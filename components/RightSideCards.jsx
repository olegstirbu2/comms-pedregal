'use client';

export default function RightSideCards() {
  // Placeholder cards for now
  const placeholderCards = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1
  }));

  return (
    <div className="flex-1 bg-[#f6f7f8] p-[16px] overflow-y-auto @container">
      <div className="grid gap-4 grid-cols-1 @min-[560px]:grid-cols-[2fr_1fr]">
        {placeholderCards.map((card) => (
          <div
            key={card.id}
            className="bg-white border border-[#e9eaec] rounded-[12px] p-[16px] min-h-[200px]"
          >
            {/* Empty placeholder card */}
          </div>
        ))}
      </div>
    </div>
  );
}

