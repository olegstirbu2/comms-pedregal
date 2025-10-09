'use client';

import { useState } from 'react';
import Navbar from './navbar';
import CaseInboxNav from './CaseInboxNav';

export default function CaseInboxLayout({ children }) {
  const [isCaseInboxOpen, setIsCaseInboxOpen] = useState(true);

  const handleCaseInboxToggle = () => {
    setIsCaseInboxOpen(!isCaseInboxOpen);
  };

  const handleCaseInboxOpen = () => {
    setIsCaseInboxOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Primary Left Navigation */}
      <Navbar onCaseInboxClick={handleCaseInboxOpen} />

      {/* Secondary Case Inbox Navigation */}
      <CaseInboxNav 
        isOpen={isCaseInboxOpen}
        onToggle={handleCaseInboxToggle}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
}

