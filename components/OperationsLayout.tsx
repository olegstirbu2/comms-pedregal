'use client';

import Navbar from './navbar';

interface OperationsLayoutProps {
  children: React.ReactNode;
}

export default function OperationsLayout({ children }: OperationsLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Primary Left Navigation */}
      <Navbar />

      {/* Rounded Container Wrapper for Content */}
      <div className="flex-1 flex p-2 bg-[#111318] min-h-0">
        <div className="flex flex-1 rounded-[24px] bg-white overflow-hidden">
          {/* Main Content Area */}
          <main className="flex-1 flex flex-col bg-white rounded-[24px] overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

