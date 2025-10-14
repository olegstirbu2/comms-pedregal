'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  ChatDefaultLineIcon, 
  PromoLineIcon, 
  LanguageLineIcon, 
  SendFillIcon, 
  AddIcon, 
  SmileyHappyLineIcon, 
  ChevronDownIcon 
} from './icons/CustomIcons';

// Mock conversations by case ID
const CASE_CONVERSATIONS = {
  1: { // Jessica A - Missing Minor
    contactInfo: {
      name: 'Jessica A.',
      badge: 'Cx',
      description: 'First time user • Minor issue',
      language: 'English',
      avatarUrl: 'https://i.pravatar.cc/150?img=5',
      timeline: [
        '15:45 • Used self-help (Missing Items) → Case created',
        'Connected with consumer'
      ]
    },
    messages: [
      {
        id: 1,
        sender: 'consumer',
        senderName: 'Jessica A.',
        text: 'Hi, my order is missing a small item - a pack of napkins. Everything else arrived fine.',
        timestamp: '1m',
        avatarUrl: 'https://i.pravatar.cc/150?img=5',
      },
      {
        id: 2,
        sender: 'agent',
        senderName: 'Ana J.',
        text: 'Hello Jessica! I\'m sorry about the missing napkins. I\'ll process a refund for that item right away. It should appear in your account within 3-5 business days.',
        timestamp: '1m ∙ Sent',
        avatarUrl: 'https://i.pravatar.cc/150?img=47',
      }
    ]
  },
  2: { // Edeka Weiß - Item Substitution
    contactInfo: {
      name: 'Edeka Weiß',
      badge: 'Cx',
      description: 'Regular customer • Substitution request',
      language: 'English',
      avatarUrl: 'https://i.pravatar.cc/150?img=28',
      timeline: [
        '16:20 • Item out of stock → Substitution suggested',
        'Connected with consumer'
      ]
    },
    messages: [
      {
        id: 1,
        sender: 'consumer',
        senderName: 'Edeka Weiß',
        text: 'I see Red Bull Sugar Free is out of stock. Can I get the original version instead?',
        timestamp: '30s',
        avatarUrl: 'https://i.pravatar.cc/150?img=28',
      },
      {
        id: 2,
        sender: 'agent',
        senderName: 'Ana J.',
        text: 'Absolutely! I\'ve updated your order to include Red Bull Original 250ml (x4) instead. The price difference will be adjusted automatically.',
        timestamp: '30s ∙ Sent',
        avatarUrl: 'https://i.pravatar.cc/150?img=47',
      },
      {
        id: 3,
        sender: 'consumer',
        senderName: 'Edeka Weiß',
        text: 'Perfect, thank you!',
        timestamp: 'Just now',
        avatarUrl: 'https://i.pravatar.cc/150?img=28',
      }
    ]
  },
  3: { // Giuseppe O. - Missing Items
    contactInfo: {
      name: 'Giuseppe O.',
      badge: 'Cx',
      description: 'VIP customer • Multiple orders',
      language: 'English',
      avatarUrl: 'https://i.pravatar.cc/150?img=12',
      timeline: [
        '14:10 • Reported missing items → Case created',
        'Connected with consumer'
      ]
    },
    messages: [
      {
        id: 1,
        sender: 'consumer',
        senderName: 'Giuseppe O.',
        text: 'Hello, I received my order but three items are missing from the bag.',
        timestamp: '3m',
        avatarUrl: 'https://i.pravatar.cc/150?img=12',
      },
      {
        id: 2,
        sender: 'agent',
        senderName: 'Ana J.',
        text: 'Hi Giuseppe, I\'m sorry to hear that. Could you please let me know which items are missing so I can help you right away?',
        timestamp: '3m ∙ Sent',
        avatarUrl: 'https://i.pravatar.cc/150?img=47',
      },
      {
        id: 3,
        sender: 'consumer',
        senderName: 'Giuseppe O.',
        text: 'The missing items are: 1x Olive Oil, 2x Pasta boxes, and 1x Parmesan cheese.',
        timestamp: '2m',
        avatarUrl: 'https://i.pravatar.cc/150?img=12',
      },
      {
        id: 4,
        sender: 'agent',
        senderName: 'Ana J.',
        text: 'Thank you for the details. I\'m processing a full refund for these items now. You\'ll receive it within 24 hours. Would you like us to redeliver them or just the refund?',
        timestamp: '2m ∙ Sent',
        avatarUrl: 'https://i.pravatar.cc/150?img=47',
      }
    ]
  }
};

// Default conversation if no case is selected
const DEFAULT_CONVERSATION = {
  contactInfo: {
    name: 'Aaron W.',
    badge: 'Cx',
    description: 'High value • Wolt+ subscriber since 22\'',
    language: 'English',
    avatarUrl: 'https://i.pravatar.cc/150?img=33',
    timeline: [
      '20:12 • Used self-help (Delivery Late) → Case created',
      'Connected with consumer'
    ]
  },
  messages: [
    {
      id: 1,
      sender: 'consumer',
      senderName: 'Aaron W.',
      text: 'Hi, I placed an order about an hour ago and it still hasn\'t arrived',
      timestamp: '2m',
      avatarUrl: 'https://i.pravatar.cc/150?img=33',
    },
    {
      id: 2,
      sender: 'agent',
      senderName: 'Ana J.',
      text: 'Thanks for reaching out. I\'m sorry your order hasn\'t arrived yet. I\'ll check the status with the courier right away and update you in just a moment.',
      timestamp: '2m ∙ Sent',
      avatarUrl: 'https://i.pravatar.cc/150?img=47',
    }
  ]
};

export default function ChatInterface({ selectedCase = null }) {
  const [activeTab, setActiveTab] = useState('Consumer');
  
  // Get conversation data based on selected case
  const conversationData = selectedCase?.id 
    ? CASE_CONVERSATIONS[selectedCase.id] || DEFAULT_CONVERSATION
    : DEFAULT_CONVERSATION;
  
  const [messages, setMessages] = useState(conversationData.messages);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Update messages when selected case changes
  useEffect(() => {
    const newConversation = selectedCase?.id 
      ? CASE_CONVERSATIONS[selectedCase.id] || DEFAULT_CONVERSATION
      : DEFAULT_CONVERSATION;
    setMessages(newConversation.messages);
  }, [selectedCase]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'agent',
      senderName: 'Ana J.',
      text: inputValue,
      timestamp: 'Just now',
      avatarUrl: 'https://i.pravatar.cc/150?img=47',
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white w-[440px] shrink-0">
      {/* ChatWindowHeader - Tabs Section */}
      <div className="h-[56px] border-b border-[#e9eaec] bg-white shrink-0">
        <div className="flex items-center justify-between h-full px-[16px]">
          <div className="flex gap-[16px] items-center">
            {/* Consumer Tab - Active */}
            <button
              onClick={() => setActiveTab('Consumer')}
              className={`relative h-[56px] px-[4px] py-[16px] flex items-center justify-center ${
                activeTab === 'Consumer' ? 'text-[#111318]' : 'text-[#51545d]'
              }`}
            >
              <span className={`text-[14px] leading-[20px] tracking-[-0.01px] whitespace-nowrap ${activeTab === 'Consumer' ? 'font-semibold' : 'font-normal'}`}>
                Consumer
              </span>
              {activeTab === 'Consumer' && (
                <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#111318] rounded-tl-[4px] rounded-tr-[4px]" />
              )}
            </button>

            {/* Courier Tab */}
            <button
              onClick={() => setActiveTab('Courier')}
              className={`relative h-[56px] px-[4px] py-[16px] flex items-center justify-center ${
                activeTab === 'Courier' ? 'text-[#111318]' : 'text-[#51545d]'
              }`}
            >
              <span className={`text-[14px] leading-[20px] tracking-[-0.01px] whitespace-nowrap ${activeTab === 'Courier' ? 'font-semibold' : 'font-normal'}`}>
                Courier
              </span>
              {activeTab === 'Courier' && (
                <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#111318] rounded-tl-[4px] rounded-tr-[4px]" />
              )}
            </button>

            {/* Merchant Tab with Dropdown */}
            <button 
              onClick={() => setActiveTab('Merchant')}
              className={`relative h-[56px] px-[4px] py-[16px] flex items-center gap-[4px] justify-center ${
                activeTab === 'Merchant' ? 'text-[#111318]' : 'text-[#51545d]'
              }`}
            >
              <span className={`text-[14px] leading-[20px] tracking-[-0.01px] whitespace-nowrap ${activeTab === 'Merchant' ? 'font-semibold' : 'font-normal'}`}>
                Merchant
              </span>
              <ChevronDownIcon size={16} className="text-[#51545d]" />
              {activeTab === 'Merchant' && (
                <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#111318] rounded-tl-[4px] rounded-tr-[4px]" />
              )}
            </button>
          </div>

          {/* Language Icon */}
          <button className="w-[32px] h-[32px] flex items-center justify-center rounded-[8px] hover:bg-gray-50">
            <LanguageLineIcon size={16} className="text-[#191919]" />
          </button>
        </div>
      </div>

      {/* ChatContentWrapper */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* ChatContent - Scrollable Area */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col items-center justify-end min-h-full p-[16px] gap-[16px]">
            {/* ChatWindowCard */}
            <div className="flex flex-col items-center gap-[16px] w-full shrink-0">
              {/* Avatar */}
              <div className="relative w-[64px] h-[64px] rounded-full shadow-[0px_1px_4px_0px_rgba(17,19,24,0.15)]">
                <div className="w-full h-full rounded-full bg-gradient-to-b from-[#d4ffcd] to-[#4adc34] flex items-center justify-center border-2 border-white overflow-hidden">
                  {conversationData.contactInfo.avatarUrl ? (
                    <img 
                      src={conversationData.contactInfo.avatarUrl} 
                      alt={conversationData.contactInfo.name}
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="absolute bottom-0 right-0 w-[24px] h-[24px] bg-[#f6f7f8] rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-[12px] leading-[18px] font-semibold text-[#111318] tracking-[-0.0077px]">
                    {conversationData.contactInfo.badge}
                  </span>
                </div>
              </div>

              {/* Name */}
              <p className="text-[16px] leading-[22px] font-normal text-[#111318] tracking-[-0.01px] text-center">
                {conversationData.contactInfo.name}
              </p>

              {/* Description */}
              <p className="text-[12px] leading-[18px] font-normal text-[#51545d] tracking-[-0.01px] text-center">
                {conversationData.contactInfo.description}
              </p>

              {/* Language Tag */}
              <div className="flex items-center gap-[4px] h-[20px] px-[8px] bg-white border border-[#e9eaec] rounded-full">
                <LanguageLineIcon size={12} className="text-[#111318]" />
                <span className="text-[12px] leading-[18px] font-semibold text-[#111318] tracking-[-0.01px]">
                  {conversationData.contactInfo.language}
                </span>
              </div>

              {/* Timeline */}
              <div className="flex flex-col gap-[12px] items-start w-full max-w-[392px]">
                {conversationData.contactInfo.timeline.map((item, index) => (
                  <div key={index} className="flex items-center justify-center w-full">
                    <p className={`text-[12px] leading-[18px] font-normal tracking-[-0.01px] text-center ${
                      index === 0 ? 'text-[#51545d]' : 'text-[#606060]'
                    }`}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex flex-col gap-[16px] w-full">
              {messages.map((message) => {
                const isAgent = message.sender === 'agent';

                return (
                  <div key={message.id} className={`flex flex-col ${isAgent ? 'items-end' : 'items-start'} w-full`}>
                    {/* Chat Header with Avatar and Name */}
                    <div className={`flex gap-[8px] items-center ${isAgent ? 'flex-row-reverse' : 'flex-row'} w-[360px]`}>
                      {/* Avatar */}
                      <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center border-2 border-white shadow-[0px_1px_2px_0px_rgba(17,19,24,0.15)] shrink-0 overflow-hidden ${
                        isAgent ? 'bg-[#e3fbff]' : 'bg-gradient-to-b from-[#d4ffcd] to-[#4adc34]'
                      }`}>
                        {message.avatarUrl ? (
                          <img 
                            src={message.avatarUrl} 
                            alt={message.senderName}
                            className="w-full h-full object-cover"
                          />
                        ) : null}
                      </div>

                      {/* Name */}
                      <span className="text-[14px] leading-[20px] font-semibold text-[#191919] tracking-[-0.01px]">
                        {message.senderName}
                      </span>
                    </div>

                    {/* Message Bubble */}
                    <div className={`flex flex-col ${isAgent ? 'items-end pr-[40px]' : 'items-start pl-[40px]'} w-[368px]`}>
                      <div
                        className={`px-[20px] py-[16px] w-full ${
                          isAgent
                            ? 'bg-[#e3fbff] rounded-tl-[16px] rounded-bl-[16px] rounded-br-[16px]'
                            : 'bg-[#f6f7f8] rounded-tr-[16px] rounded-bl-[16px] rounded-br-[16px]'
                        }`}
                      >
                        <p className="text-[14px] leading-[20px] font-normal text-[#191919] tracking-[-0.01px]">
                          {message.text}
                        </p>
                      </div>

                      {/* Timestamp */}
                      <div className="flex items-center justify-end gap-[8px] mt-[4px] w-full">
                        <span className="text-[12px] leading-[18px] font-normal text-[#606060] tracking-[-0.01px] text-right">
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      </div>

      {/* ChatInputWrapper */}
      <div className="bg-white shrink-0 pb-[16px] px-[16px]">
        {/* ChatInput */}
        <div className="border border-[#e9eaec] rounded-[16px] bg-white overflow-hidden">
          <div className="p-[16px] flex flex-col gap-[16px]">
                {/* Primary Actions Row */}
                <div className="flex items-center justify-between">
                  {/* Chat Button */}
                  <button className="flex items-center gap-[4px] h-[32px] px-[12px] bg-[#f6f7f8] rounded-[8px]">
                    <ChatDefaultLineIcon size={16} className="text-[#111318]" />
                    <span className="text-[12px] leading-[18px] font-bold text-[#111318] tracking-[-0.01px]">
                      Chat
                    </span>
                    <ChevronDownIcon size={16} className="text-[#111318]" />
                  </button>
                </div>

            {/* Text Input */}
            <div className="flex flex-col gap-[8px]">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="text-[14px] leading-[20px] font-normal text-[#51545d] tracking-[-0.01px] bg-transparent border-none outline-none w-full max-h-[192px]"
                aria-label="Message input"
              />
            </div>

                {/* Actions Row */}
                <div className="flex items-center justify-between">
                  {/* Lead Actions */}
                  <div className="flex gap-[2px] items-center">
                    <button className="w-[32px] h-[32px] flex items-center justify-center rounded-[8px] hover:bg-gray-50">
                      <AddIcon size={16} className="text-[#191919]" />
                    </button>
                    <button className="w-[32px] h-[32px] flex items-center justify-center rounded-[8px] hover:bg-gray-50">
                      <SmileyHappyLineIcon size={16} className="text-[#191919]" />
                    </button>
                    <button className="w-[32px] h-[32px] flex items-center justify-center rounded-[8px] hover:bg-gray-50">
                      <PromoLineIcon size={16} className="text-[#191919]" />
                    </button>
                  </div>

                  {/* Send Button */}
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className={`w-[40px] h-[40px] flex items-center justify-center rounded-[8px] transition-all ${
                      inputValue.trim()
                        ? 'bg-[#e7fef4] hover:bg-[#d0f5e6]'
                        : 'bg-[#f6f7f8] cursor-not-allowed'
                    }`}
                    aria-label="Send message"
                  >
                    <SendFillIcon size={24} className="text-[#00855f]" />
                  </button>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}

