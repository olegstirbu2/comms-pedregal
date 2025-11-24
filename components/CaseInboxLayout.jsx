'use client';

import { useState, cloneElement } from 'react';
import Navbar from './navbar';
import CaseInboxNav from './CaseInboxNav';
import CaseHeader from './CaseHeader';
import RightSideCards from './RightSideCards';

export default function CaseInboxLayout({ children }) {
  const [isCaseInboxOpen, setIsCaseInboxOpen] = useState(true);
  const [selectedCase, setSelectedCase] = useState(null);

  const handleCaseInboxToggle = () => {
    setIsCaseInboxOpen(!isCaseInboxOpen);
  };

  const handleCaseInboxOpen = () => {
    setIsCaseInboxOpen(true);
  };

  const handleCaseSelect = (caseData) => {
    setSelectedCase(caseData);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Primary Left Navigation */}
      <Navbar onCaseInboxClick={handleCaseInboxOpen} />

      {/* Rounded Container Wrapper for Case Inbox + Main Content */}
      <div className="flex-1 flex p-2 bg-[#111318]">
        <div className="flex flex-1 rounded-[24px] bg-white overflow-hidden">
          {/* Secondary Case Inbox Navigation */}
          <CaseInboxNav 
            isOpen={isCaseInboxOpen}
            onToggle={handleCaseInboxToggle}
            onCaseSelect={handleCaseSelect}
            selectedCaseId={selectedCase?.id}
          />

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col bg-gray-50 rounded-r-[24px] overflow-hidden">
            {/* Sticky Case Header */}
            <CaseHeader />
            
            {/* Content Row: ChatInterface + RightSideCards */}
            <div className="flex flex-row flex-1 overflow-hidden">
              {/* ChatInterface - Resizable */}
              <div className="shrink-0">
                {children && cloneElement(children, { selectedCase })}
              </div>
              
              {/* Right Side Cards - Flexible width */}
              <RightSideCards />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

