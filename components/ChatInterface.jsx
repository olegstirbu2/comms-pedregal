'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  ChatDefaultLineIcon, 
  PromoLineIcon, 
  LanguageLineIcon,
  CirclesFourIcon, 
  SendFillIcon, 
  AddIcon, 
  SmileyHappyLineIcon, 
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from './icons/CustomIcons';
import {
  PersonUserLineIcon,
  MerchantLineIcon,
  VehicleBikeLineIcon
} from './icons/NavIcons';
import ChannelToggle from './ChannelToggle';
import PhoneComposer from './PhoneComposer';
import EmailComposer from './EmailComposer';

// Mock conversations by case ID
const CASE_CONVERSATIONS = {
  1: { // Jessica A - Missing Minor
    contactInfo: {
      name: 'Jessica A.',
      badge: 'Cx',
      description: 'First time user • Minor issue',
      language: 'English',
      phone: '+1 234 567 8901',
      email: 'jessica.a@example.com',
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
      phone: '+49 152 1234 5678',
      email: 'edeka.weiss@example.com',
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
      phone: '+39 345 678 9012',
      email: 'giuseppe.o@example.com',
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
  },
  4: { // Sofia Martinez - Late Delivery
    contactInfo: {
      name: 'Sofia Martinez',
      badge: 'Cx',
      description: 'Wolt+ subscriber • Frequent orders',
      language: 'Spanish',
      phone: '+34 612 345 678',
      email: 'sofia.martinez@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?img=26',
      timeline: [
        '19:35 • Delivery delayed → Case created',
        'Connected with consumer'
      ]
    },
    messages: [
      {
        id: 1,
        sender: 'consumer',
        senderName: 'Sofia Martinez',
        text: 'My order was supposed to arrive 20 minutes ago. Can you check the status?',
        timestamp: '45s',
        avatarUrl: 'https://i.pravatar.cc/150?img=26',
      },
      {
        id: 2,
        sender: 'agent',
        senderName: 'Ana J.',
        text: 'Hi Sofia! I\'m checking on your order right now. I can see it\'s currently with the courier. Let me get an update for you.',
        timestamp: '40s ∙ Sent',
        avatarUrl: 'https://i.pravatar.cc/150?img=47',
      }
    ]
  },
  5: { // Marcus Chen - Wrong Order
    contactInfo: {
      name: 'Marcus Chen',
      badge: 'Cx',
      description: 'Regular customer • Tech professional',
      language: 'English',
      phone: '+1 415 555 0123',
      email: 'marcus.chen@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?img=52',
      timeline: [
        '18:45 • Wrong order reported → Case created',
        'Connected with consumer'
      ]
    },
    messages: [
      {
        id: 1,
        sender: 'consumer',
        senderName: 'Marcus Chen',
        text: 'I received someone else\'s order. This isn\'t what I ordered at all.',
        timestamp: '1m',
        avatarUrl: 'https://i.pravatar.cc/150?img=52',
      },
      {
        id: 2,
        sender: 'agent',
        senderName: 'Ana J.',
        text: 'I\'m so sorry about that mix-up, Marcus! Let me arrange for the correct order to be sent to you right away.',
        timestamp: '55s ∙ Sent',
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
    phone: '+1 555 123 4567',
    email: 'aaron.w@example.com',
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

// Courier tab data variations
const COURIER_DATA_VARIANTS = [
  {
    contactInfo: {
      name: 'Marcus Johnson',
      badge: 'Dx',
      description: '',
      language: 'English',
      phone: '+1 555 234 5678',
      email: 'marcus.j@courier.com',
      avatarUrl: 'https://i.pravatar.cc/150?img=15',
      timeline: []
    },
    messages: []
  },
  {
    contactInfo: {
      name: 'Sarah Williams',
      badge: 'Dx',
      description: '',
      language: 'English',
      phone: '+1 555 345 6789',
      email: 'sarah.w@courier.com',
      avatarUrl: 'https://i.pravatar.cc/150?img=45',
      timeline: []
    },
    messages: []
  },
  {
    contactInfo: {
      name: 'David Chen',
      badge: 'Dx',
      description: '',
      language: 'English',
      phone: '+1 555 456 7890',
      email: 'david.c@courier.com',
      avatarUrl: 'https://i.pravatar.cc/150?img=68',
      timeline: []
    },
    messages: []
  }
];

// Merchant tab data variations
const MERCHANT_DATA_VARIANTS = [
  {
    contactInfo: {
      name: 'McDonald\'s',
      badge: 'Mx',
      description: '',
      language: 'English',
      phone: '+1 800 244 6227',
      email: 'support@mcdonalds.com',
      avatarUrl: '/logos/mcdonalds.png',
      timeline: []
    },
    messages: []
  },
  {
    contactInfo: {
      name: 'Burger King',
      badge: 'Mx',
      description: '',
      language: 'English',
      phone: '+1 866 394 2493',
      email: 'support@burgerking.com',
      avatarUrl: '/logos/burgerking.png',
      timeline: []
    },
    messages: []
  },
  {
    contactInfo: {
      name: 'Starbucks',
      badge: 'Mx',
      description: '',
      language: 'English',
      phone: '+1 800 782 7282',
      email: 'support@starbucks.com',
      avatarUrl: '/logos/starbucks.png',
      timeline: []
    },
    messages: []
  }
];

// Multi-courier cases - for orders with multiple couriers
const MULTI_COURIER_CASES = {
  2: [ // Edeka Weiß case
    {
      id: 1,
      name: 'Olaf E',
      avatarUrl: 'https://i.pravatar.cc/150?img=15',
      contactInfo: {
        name: 'Olaf E',
        badge: 'Dx',
        description: '',
        language: 'German',
        phone: '+49 170 123 4567',
        email: 'olaf.e@courier.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=15',
        timeline: []
      },
      messages: []
    },
    {
      id: 2,
      name: 'Darrel S',
      avatarUrl: 'https://i.pravatar.cc/150?img=22',
      contactInfo: {
        name: 'Darrel S',
        badge: 'Dx',
        description: '',
        language: 'English',
        phone: '+49 171 234 5678',
        email: 'darrel.s@courier.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=22',
        timeline: []
      },
      messages: []
    },
    {
      id: 3,
      name: 'Arlene M',
      avatarUrl: 'https://i.pravatar.cc/150?img=32',
      contactInfo: {
        name: 'Arlene M',
        badge: 'Dx',
        description: '',
        language: 'English',
        phone: '+49 172 345 6789',
        email: 'arlene.m@courier.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=32',
        timeline: []
      },
      messages: []
    },
    {
      id: 4,
      name: 'Samantha M',
      avatarUrl: 'https://i.pravatar.cc/150?img=44',
      contactInfo: {
        name: 'Samantha M',
        badge: 'Dx',
        description: '',
        language: 'English',
        phone: '+49 173 456 7890',
        email: 'samantha.m@courier.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=44',
        timeline: []
      },
      messages: []
    },
    {
      id: 5,
      name: 'Jerome B',
      avatarUrl: 'https://i.pravatar.cc/150?img=53',
      contactInfo: {
        name: 'Jerome B',
        badge: 'Dx',
        description: '',
        language: 'French',
        phone: '+49 174 567 8901',
        email: 'jerome.b@courier.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=53',
        timeline: []
      },
      messages: []
    },
    {
      id: 6,
      name: 'Kristin W',
      avatarUrl: 'https://i.pravatar.cc/150?img=48',
      contactInfo: {
        name: 'Kristin W',
        badge: 'Dx',
        description: '',
        language: 'English',
        phone: '+49 175 678 9012',
        email: 'kristin.w@courier.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=48',
        timeline: []
      },
      messages: []
    },
    {
      id: 7,
      name: 'Robert F',
      avatarUrl: 'https://i.pravatar.cc/150?img=59',
      contactInfo: {
        name: 'Robert F',
        badge: 'Dx',
        description: '',
        language: 'German',
        phone: '+49 176 789 0123',
        email: 'robert.f@courier.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=59',
        timeline: []
      },
      messages: []
    }
  ],
  4: [ // Sofia Martinez case - Late Delivery with multiple couriers
    {
      id: 1,
      name: 'Liam T',
      avatarUrl: 'https://i.pravatar.cc/150?img=61',
      notificationCount: 2,
      contactInfo: {
        name: 'Liam T',
        badge: 'Dx',
        description: '',
        language: 'English',
        phone: '+34 620 111 2222',
        email: 'liam.t@courier.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=61',
        timeline: []
      },
      messages: [
        {
          id: 1,
          sender: 'courier',
          senderName: 'Liam T',
          text: 'Hi, I just picked up the order from the restaurant. On my way now!',
          timestamp: '2m',
          avatarUrl: 'https://i.pravatar.cc/150?img=61',
        },
        {
          id: 2,
          sender: 'courier',
          senderName: 'Liam T',
          text: 'I\'m stuck in traffic on the highway. Will be there in 10 mins.',
          timestamp: '45s',
          avatarUrl: 'https://i.pravatar.cc/150?img=61',
        }
      ]
    },
    {
      id: 2,
      name: 'Emma K',
      avatarUrl: 'https://i.pravatar.cc/150?img=62',
      contactInfo: {
        name: 'Emma K',
        badge: 'Dx',
        description: '',
        language: 'Spanish',
        phone: '+34 621 222 3333',
        email: 'emma.k@courier.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=62',
        timeline: []
      },
      messages: []
    },
    {
      id: 3,
      name: 'Noah R',
      avatarUrl: 'https://i.pravatar.cc/150?img=63',
      contactInfo: {
        name: 'Noah R',
        badge: 'Dx',
        description: '',
        language: 'English',
        phone: '+34 622 333 4444',
        email: 'noah.r@courier.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=63',
        timeline: []
      },
      messages: []
    },
    {
      id: 4,
      name: 'Mia S',
      avatarUrl: 'https://i.pravatar.cc/150?img=64',
      contactInfo: {
        name: 'Mia S',
        badge: 'Dx',
        description: '',
        language: 'Spanish',
        phone: '+34 623 444 5555',
        email: 'mia.s@courier.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=64',
        timeline: []
      },
      messages: []
    },
    {
      id: 5,
      name: 'Lucas P',
      avatarUrl: 'https://i.pravatar.cc/150?img=65',
      contactInfo: {
        name: 'Lucas P',
        badge: 'Dx',
        description: '',
        language: 'Portuguese',
        phone: '+34 624 555 6666',
        email: 'lucas.p@courier.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=65',
        timeline: []
      },
      messages: []
    },
    {
      id: 6,
      name: 'Olivia H',
      avatarUrl: 'https://i.pravatar.cc/150?img=66',
      contactInfo: {
        name: 'Olivia H',
        badge: 'Dx',
        description: '',
        language: 'English',
        phone: '+34 625 666 7777',
        email: 'olivia.h@courier.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=66',
        timeline: []
      },
      messages: []
    },
    {
      id: 7,
      name: 'Ethan D',
      avatarUrl: 'https://i.pravatar.cc/150?img=67',
      contactInfo: {
        name: 'Ethan D',
        badge: 'Dx',
        description: '',
        language: 'Spanish',
        phone: '+34 626 777 8888',
        email: 'ethan.d@courier.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=67',
        timeline: []
      },
      messages: []
    }
  ],
  5: { // Marcus Chen case - Wrong Order with dropdown display
    displayMode: 'dropdown',
    couriers: [
      {
        id: 1,
        name: 'Alex T',
        avatarUrl: 'https://i.pravatar.cc/150?img=11',
        notificationCount: 0,
        contactInfo: {
          name: 'Alex T',
          badge: 'Dx',
          description: '',
          language: 'English',
          phone: '+1 415 111 2222',
          email: 'alex.t@courier.com',
          avatarUrl: 'https://i.pravatar.cc/150?img=11',
          timeline: []
        },
        messages: []
      },
      {
        id: 2,
        name: 'Jordan K',
        avatarUrl: 'https://i.pravatar.cc/150?img=33',
        notificationCount: 2,
        contactInfo: {
          name: 'Jordan K',
          badge: 'Dx',
          description: '',
          language: 'English',
          phone: '+1 415 222 3333',
          email: 'jordan.k@courier.com',
          avatarUrl: 'https://i.pravatar.cc/150?img=33',
          timeline: []
        },
        messages: [
          {
            id: 1,
            sender: 'courier',
            senderName: 'Jordan K',
            text: 'Package has been picked up. On my way now!',
            timestamp: '2m',
            avatarUrl: 'https://i.pravatar.cc/150?img=33',
          },
          {
            id: 2,
            sender: 'courier',
            senderName: 'Jordan K',
            text: 'Package has been picked up. ETA 15 minutes.',
            timestamp: '1m',
            avatarUrl: 'https://i.pravatar.cc/150?img=33',
          }
        ]
      },
      {
        id: 3,
        name: 'Taylor M',
        avatarUrl: 'https://i.pravatar.cc/150?img=24',
        notificationCount: 0,
        contactInfo: {
          name: 'Taylor M',
          badge: 'Dx',
          description: '',
          language: 'English',
          phone: '+1 415 333 4444',
          email: 'taylor.m@courier.com',
          avatarUrl: 'https://i.pravatar.cc/150?img=24',
          timeline: []
        },
        messages: []
      },
      {
        id: 4,
        name: 'Casey L',
        avatarUrl: 'https://i.pravatar.cc/150?img=35',
        notificationCount: 0,
        contactInfo: {
          name: 'Casey L',
          badge: 'Dx',
          description: '',
          language: 'English',
          phone: '+1 415 444 5555',
          email: 'casey.l@courier.com',
          avatarUrl: 'https://i.pravatar.cc/150?img=35',
          timeline: []
        },
        messages: []
      },
      {
        id: 5,
        name: 'Morgan P',
        avatarUrl: 'https://i.pravatar.cc/150?img=57',
        notificationCount: 0,
        contactInfo: {
          name: 'Morgan P',
          badge: 'Dx',
          description: '',
          language: 'English',
          phone: '+1 415 555 6666',
          email: 'morgan.p@courier.com',
          avatarUrl: 'https://i.pravatar.cc/150?img=57',
          timeline: []
        },
        messages: []
      },
      {
        id: 6,
        name: 'Riley S',
        avatarUrl: 'https://i.pravatar.cc/150?img=41',
        notificationCount: 0,
        contactInfo: {
          name: 'Riley S',
          badge: 'Dx',
          description: '',
          language: 'English',
          phone: '+1 415 666 7777',
          email: 'riley.s@courier.com',
          avatarUrl: 'https://i.pravatar.cc/150?img=41',
          timeline: []
        },
        messages: []
      },
      {
        id: 7,
        name: 'Quinn R',
        avatarUrl: 'https://i.pravatar.cc/150?img=19',
        notificationCount: 0,
        contactInfo: {
          name: 'Quinn R',
          badge: 'Dx',
          description: '',
          language: 'English',
          phone: '+1 415 777 8888',
          email: 'quinn.r@courier.com',
          avatarUrl: 'https://i.pravatar.cc/150?img=19',
          timeline: []
        },
        messages: []
      }
    ]
  }
};

export default function ChatInterface({ 
  selectedCase = null, 
  readCourierNotifications = {},
  onMarkCourierNotificationsRead = () => {}
}) {
  const [activeTab, setActiveTab] = useState('Consumer');
  const [selectedChannel, setSelectedChannel] = useState('chat');
  
  // Multi-courier state
  const [selectedCourierId, setSelectedCourierId] = useState(null);
  const [showScrollLeft, setShowScrollLeft] = useState(false);
  const [showScrollRight, setShowScrollRight] = useState(false);
  const courierChipsRef = useRef(null);
  
  // Consumer notification state (local, not shared with case list)
  const [consumerNotifications, setConsumerNotifications] = useState({ 1: true }); // Case 1 (Jessica A.) has notification
  
  // Local state for delayed chip badge removal
  const [chipBadgeVisible, setChipBadgeVisible] = useState(true);
  
  // Check if current case has multiple couriers
  const multiCourierData = selectedCase?.id && MULTI_COURIER_CASES[selectedCase.id];
  const hasMultipleCouriers = !!multiCourierData;
  
  // Handle different data structures (array for chips, object with couriers for dropdown)
  const isDropdownMode = multiCourierData?.displayMode === 'dropdown';
  const couriers = isDropdownMode 
    ? (multiCourierData?.couriers || [])
    : (Array.isArray(multiCourierData) ? multiCourierData : []);
  
  // Check if any courier has notifications (for tab dot) - only show if not yet read
  const hasCourierNotifications = couriers.some(c => c.notificationCount > 0) && 
    !readCourierNotifications[selectedCase?.id];
  
  // Check if consumer has notifications for this case
  const hasConsumerNotification = consumerNotifications[selectedCase?.id] || false;
  
  // Dropdown state for case 5
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Get conversation data based on active tab and selected case
  const getConversationData = () => {
    if (activeTab === 'Courier') {
      // If case has multiple couriers, use the selected one
      if (hasMultipleCouriers) {
        const courier = couriers.find(c => c.id === selectedCourierId) || couriers[0];
        return { contactInfo: courier.contactInfo, messages: courier.messages };
      }
      // Cycle through courier variants based on case ID (or default to first)
      const index = selectedCase?.id ? (selectedCase.id - 1) % COURIER_DATA_VARIANTS.length : 0;
      return COURIER_DATA_VARIANTS[index];
    } else if (activeTab === 'Merchant') {
      // Cycle through merchant variants based on case ID (or default to first)
      const index = selectedCase?.id ? (selectedCase.id - 1) % MERCHANT_DATA_VARIANTS.length : 0;
      return MERCHANT_DATA_VARIANTS[index];
    } else {
      // Consumer tab - use selected case or default
      return selectedCase?.id 
        ? CASE_CONVERSATIONS[selectedCase.id] || DEFAULT_CONVERSATION
        : DEFAULT_CONVERSATION;
    }
  };
  
  const conversationData = getConversationData();
  
  const [messages, setMessages] = useState(conversationData.messages);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const scrollContainerRef = useRef(null);
  
  // Resize state
  const [chatWidth, setChatWidth] = useState(440);
  const [isResizing, setIsResizing] = useState(false);
  const chatContainerRef = useRef(null);
  
  // Animation state for new messages
  const [newMessageId, setNewMessageId] = useState(null);

  // Reset to Consumer tab and Chat channel when switching cases
  useEffect(() => {
    setActiveTab('Consumer');
    setSelectedChannel('chat');
    setSelectedCourierId(null);
    setChipBadgeVisible(true); // Reset chip badge visibility for new case
    setIsDropdownOpen(false); // Close dropdown when switching cases
    
    // Clear consumer notification after 0.5 second delay when case is selected
    if (selectedCase?.id && consumerNotifications[selectedCase.id]) {
      setTimeout(() => {
        setConsumerNotifications(prev => ({ ...prev, [selectedCase.id]: false }));
      }, 500);
    }
  }, [selectedCase]);

  // Set default selected courier when switching to Courier tab with multiple couriers
  useEffect(() => {
    if (activeTab === 'Courier' && hasMultipleCouriers && !selectedCourierId) {
      setSelectedCourierId(couriers[0]?.id);
    }
  }, [activeTab, hasMultipleCouriers, couriers, selectedCourierId]);

  // Update messages when selected case, active tab, or selected courier changes
  useEffect(() => {
    const newConversation = getConversationData();
    setMessages(newConversation.messages);
    setNewMessageId(null); // Clear animation state when switching cases/tabs
  }, [selectedCase, activeTab, selectedCourierId]);

  // Check scroll button visibility
  const checkScrollButtons = () => {
    const container = courierChipsRef.current;
    if (!container) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowScrollLeft(scrollLeft > 0);
    setShowScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isDropdownOpen]);

  // Update scroll buttons when courier tab is active
  useEffect(() => {
    if (activeTab === 'Courier' && hasMultipleCouriers && !isDropdownMode) {
      // Check after a brief delay to ensure DOM is rendered
      setTimeout(checkScrollButtons, 100);
      
      const container = courierChipsRef.current;
      if (container) {
        container.addEventListener('scroll', checkScrollButtons);
        window.addEventListener('resize', checkScrollButtons);
        return () => {
          container.removeEventListener('scroll', checkScrollButtons);
          window.removeEventListener('resize', checkScrollButtons);
        };
      }
    }
  }, [activeTab, hasMultipleCouriers]);

  // Scroll handlers for courier chips
  const scrollCouriers = (direction) => {
    const container = courierChipsRef.current;
    if (!container) return;
    
    const scrollAmount = 150;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(), // Use timestamp for unique ID
      sender: 'agent',
      senderName: 'Ana J.',
      text: inputValue,
      timestamp: 'Just now',
      avatarUrl: 'https://i.pravatar.cc/150?img=47',
    };

    // Update messages first
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    
    // Trigger animation on next frame to ensure DOM is ready
    requestAnimationFrame(() => {
      setNewMessageId(newMessage.id);
      inputRef.current?.focus();
    });
    
    // Clear the new message flag after animation completes
    setTimeout(() => {
      setNewMessageId(null);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Resize handlers
  const handleResizeStart = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  // Handle resize on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing || !chatContainerRef.current) return;
      
      const containerRect = chatContainerRef.current.getBoundingClientRect();
      const newWidth = e.clientX - containerRect.left;
      
      // Clamp width between 440px and 800px
      const clampedWidth = Math.max(440, Math.min(800, newWidth));
      setChatWidth(clampedWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      // Prevent text selection during resize
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing]);

  return (
    <div 
      ref={chatContainerRef}
      className="relative flex flex-col h-full bg-white shrink-0 border-r border-[#e9eaec]"
      style={{ width: `${chatWidth}px` }}
    >
      {/* Resize Handle - Right Edge */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1 hover:w-2 bg-transparent hover:bg-blue-400 cursor-col-resize hover:transition-all z-50"
        onMouseDown={handleResizeStart}
      />
      {/* ChatWindowHeader - Tabs Section */}
      <div 
        className={`border-b border-[#e9eaec] bg-white shrink-0 transition-all duration-200 ease-out ${
          isDropdownMode && activeTab === 'Courier' ? 'overflow-visible' : 'overflow-hidden'
        }`}
        style={{ 
          height: activeTab === 'Courier' && hasMultipleCouriers 
            ? (isDropdownMode ? '116px' : '104px') 
            : '64px' 
        }}
      >
        {/* Main Tab Row */}
        <div className="flex items-center justify-between h-[56px] px-[16px]">
          <div className="flex gap-[24px] items-center">
            {/* Consumer Tab */}
            <button
              onClick={() => {
                setActiveTab('Consumer');
                // Clear consumer notification after 0.5 second delay
                if (hasConsumerNotification) {
                  setTimeout(() => {
                    setConsumerNotifications(prev => ({ ...prev, [selectedCase?.id]: false }));
                  }, 500);
                }
              }}
              className={`relative h-[40px] flex items-center justify-center ${
                activeTab === 'Consumer' ? 'text-[#111318]' : 'text-[#51545d]'
              }`}
            >
              {/* Notification Dot - shows even on active tab until cleared */}
              {hasConsumerNotification && (
                <div className="absolute left-[-8px] top-[16px] w-[8px] h-[8px] bg-[#d91400] rounded-full" />
              )}
              <span className={`text-[14px] leading-[20px] tracking-[-0.01px] whitespace-nowrap ${activeTab === 'Consumer' ? 'font-semibold' : 'font-normal'}`}>
                Consumer
              </span>
              {activeTab === 'Consumer' && (
                <div className="absolute -bottom-[8px] left-0 right-0 h-[4px] bg-[#111318] rounded-tl-[4px] rounded-tr-[4px]" />
              )}
            </button>

            {/* Courier Tab */}
            <button
              onClick={() => {
                setActiveTab('Courier');
                // Mark courier notifications as read for this case after 0.5 second delay
                if (selectedCase?.id && hasCourierNotifications && onMarkCourierNotificationsRead) {
                  // First hide the chip badge after 0.5 second
                  setTimeout(() => {
                    setChipBadgeVisible(false);
                  }, 500);
                  // Then mark as read (for case list) after the same delay
                  setTimeout(() => {
                    onMarkCourierNotificationsRead(selectedCase.id);
                  }, 500);
                }
              }}
              className={`relative h-[40px] flex items-center justify-center ${
                activeTab === 'Courier' ? 'text-[#111318]' : 'text-[#51545d]'
              }`}
            >
              {/* Notification Dot */}
              {hasCourierNotifications && activeTab !== 'Courier' && (
                <div className="absolute left-[-8px] top-[16px] w-[8px] h-[8px] bg-[#d91400] rounded-full" />
              )}
              <span className={`text-[14px] leading-[20px] tracking-[-0.01px] whitespace-nowrap ${activeTab === 'Courier' ? 'font-semibold' : 'font-normal'}`}>
                {hasMultipleCouriers ? `Couriers(${couriers.length})` : 'Courier'}
              </span>
              {activeTab === 'Courier' && (
                <div className="absolute -bottom-[8px] left-0 right-0 h-[4px] bg-[#111318] rounded-tl-[4px] rounded-tr-[4px]" />
              )}
            </button>

            {/* Merchant Tab */}
            <button 
              onClick={() => setActiveTab('Merchant')}
              className={`relative h-[40px] flex items-center justify-center ${
                activeTab === 'Merchant' ? 'text-[#111318]' : 'text-[#51545d]'
              }`}
            >
              <span className={`text-[14px] leading-[20px] tracking-[-0.01px] whitespace-nowrap ${activeTab === 'Merchant' ? 'font-semibold' : 'font-normal'}`}>
                Merchant
              </span>
              {activeTab === 'Merchant' && (
                <div className="absolute -bottom-[8px] left-0 right-0 h-[4px] bg-[#111318] rounded-tl-[4px] rounded-tr-[4px]" />
              )}
            </button>
          </div>

          {/* Multi-action Icon */}
          <button className="w-[32px] h-[32px] flex items-center justify-center rounded-[8px] hover:bg-gray-50">
            <CirclesFourIcon size={16} className="text-[#191919]" />
          </button>
        </div>

        {/* Courier Chips Row - Only visible when Courier tab is active with multiple couriers (chips mode) */}
        {!isDropdownMode && (
          <div 
            className={`relative px-[16px] pt-[8px] pb-[8px] transition-all duration-200 ease-out ${
              activeTab === 'Courier' && hasMultipleCouriers 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            {/* Scroll Left Button */}
            <button
              onClick={() => scrollCouriers('left')}
              className={`absolute left-[4px] top-[8px] z-10 w-[32px] h-[32px] flex items-center justify-center bg-white rounded-[8px] shadow-[0px_1px_4px_0px_rgba(17,19,24,0.15)] transition-opacity duration-150 ${
                showScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <ChevronLeftIcon size={16} className="text-[#111318]" />
            </button>

            {/* Courier Chips Container */}
            <div 
              ref={courierChipsRef}
              className="flex gap-[8px] overflow-x-auto scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {couriers.map((courier) => (
                <button
                  key={courier.id}
                  onClick={() => setSelectedCourierId(courier.id)}
                  className={`flex items-center gap-[8px] h-[32px] px-[12px] rounded-full shrink-0 transition-all duration-150 ${
                    selectedCourierId === courier.id
                      ? 'bg-white border-2 border-[#111318]'
                      : 'bg-white border border-[#d3d6d9] hover:border-[#9a9da3]'
                  }`}
                >
                  {/* Avatar */}
                  <div className="w-[24px] h-[24px] rounded-full overflow-hidden shadow-[0px_1px_4px_0px_rgba(17,19,24,0.15)]">
                    <img 
                      src={courier.avatarUrl} 
                      alt={courier.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Name */}
                  <span className="text-[14px] leading-[20px] font-semibold text-[#111318] tracking-[-0.01px] whitespace-nowrap">
                    {courier.name}
                  </span>
                  {/* Notification Badge - only show if not yet read and badge is visible */}
                  {courier.notificationCount > 0 && !readCourierNotifications[selectedCase?.id] && chipBadgeVisible && (
                    <div className="h-[16px] min-w-[16px] px-[5px] bg-[#eb1700] rounded-[100px] flex items-center justify-center">
                      <span className="text-[12px] leading-[16px] font-semibold text-white tracking-[-0.01px]">
                        {courier.notificationCount}
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Scroll Right Button */}
            <button
              onClick={() => scrollCouriers('right')}
              className={`absolute right-[4px] top-[8px] z-10 w-[32px] h-[32px] flex items-center justify-center bg-white rounded-[8px] shadow-[0px_1px_4px_0px_rgba(17,19,24,0.15)] transition-opacity duration-150 ${
                showScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <ChevronRightIcon size={16} className="text-[#111318]" />
            </button>
          </div>
        )}

        {/* Courier Dropdown - Only visible when Courier tab is active with dropdown mode */}
        {isDropdownMode && (
          <div 
            className={`relative z-[100] px-[16px] pt-[4px] pb-[16px] transition-all duration-200 ease-out ${
              activeTab === 'Courier' && hasMultipleCouriers 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
            ref={dropdownRef}
          >
            {/* Select Field */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full h-[36px] bg-white border border-[#d3d6d9] rounded-[8px] px-[12px] py-[4px] flex items-center gap-[8px] hover:border-[#9a9da3] transition-colors"
            >
              {/* Selected Courier Avatar */}
              <div className="w-[24px] h-[24px] rounded-full overflow-hidden shadow-[0px_1px_4px_0px_rgba(17,19,24,0.15)]">
                <img 
                  src={couriers.find(c => c.id === selectedCourierId)?.avatarUrl || couriers[0]?.avatarUrl} 
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Selected Courier Name */}
              <span className="flex-1 text-[14px] leading-[20px] font-normal text-[#111318] tracking-[-0.01px] text-left">
                {couriers.find(c => c.id === selectedCourierId)?.name || couriers[0]?.name}
              </span>
              {/* Notification Badge */}
              {(() => {
                const selectedCourier = couriers.find(c => c.id === selectedCourierId) || couriers[0];
                return selectedCourier?.notificationCount > 0 && !readCourierNotifications[selectedCase?.id] && chipBadgeVisible && (
                  <div className="h-[16px] min-w-[16px] px-[5px] bg-[#eb1700] rounded-[100px] flex items-center justify-center">
                    <span className="text-[12px] leading-[16px] font-semibold text-white tracking-[-0.01px]">
                      {selectedCourier.notificationCount}
                    </span>
                  </div>
                );
              })()}
              {/* Chevron Down */}
              <ChevronDownIcon size={24} className="text-[#111318]" />
            </button>

            {/* Dropdown Popover */}
            {isDropdownOpen && (
              <div className="absolute left-[16px] right-[16px] top-[44px] bg-white rounded-[8px] shadow-[0px_4px_12px_0px_rgba(17,19,24,0.15)] py-[8px] z-[100]">
                {couriers.map((courier) => (
                  <button
                    key={courier.id}
                    onClick={() => {
                      setSelectedCourierId(courier.id);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full h-[48px] px-[16px] flex items-center gap-[8px] hover:bg-[#f6f7f8] transition-colors"
                  >
                    {/* Avatar */}
                    <div className="w-[24px] h-[24px] rounded-full overflow-hidden">
                      <img 
                        src={courier.avatarUrl} 
                        alt={courier.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Name */}
                    <span className="flex-1 text-[14px] leading-[20px] font-normal text-[#111318] tracking-[-0.01px] text-left">
                      {courier.name}
                    </span>
                    {/* Notification Badge */}
                    {courier.notificationCount > 0 && !readCourierNotifications[selectedCase?.id] && chipBadgeVisible && (
                      <div className="w-[20px] h-[20px] bg-[#d91400] rounded-full flex items-center justify-center">
                        <span className="text-[12px] leading-[18px] font-bold text-white tracking-[0.12px]">
                          {courier.notificationCount}
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ChatContentWrapper */}
      <div className="flex-1 flex flex-col min-h-0 relative">
        {/* Channel Toggle - Sticky floating component */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <ChannelToggle selectedChannel={selectedChannel} onChannelChange={setSelectedChannel} />
        </div>

        {/* ChatContent - Scrollable Area */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col items-center justify-end min-h-full p-[16px] gap-[16px] pt-[56px]">
            {/* ChatWindowCard */}
            <div className="flex flex-col items-center gap-[16px] w-full shrink-0">
              {/* Avatar */}
              <div className="relative w-[64px] h-[64px] rounded-full shadow-[0px_1px_4px_0px_rgba(17,19,24,0.15)]">
                <div className={`w-full h-full rounded-full flex items-center justify-center border-2 border-white overflow-hidden ${
                  conversationData.contactInfo.badge === 'Mx' 
                    ? 'bg-white' 
                    : 'bg-gradient-to-b from-[#d4ffcd] to-[#4adc34]'
                }`}>
                  {conversationData.contactInfo.avatarUrl ? (
                    <img 
                      src={conversationData.contactInfo.avatarUrl} 
                      alt={conversationData.contactInfo.name}
                      className={conversationData.contactInfo.badge === 'Mx' 
                        ? "w-[80%] h-[80%] object-contain" 
                        : "w-full h-full object-cover"
                      }
                    />
                  ) : null}
                </div>
                <div className="absolute bottom-0 right-0 w-[24px] h-[24px] bg-[#f6f7f8] rounded-full border-2 border-white flex items-center justify-center">
                  {conversationData.contactInfo.badge === 'Cx' && (
                    <PersonUserLineIcon size={12} className="text-[#111318]" />
                  )}
                  {conversationData.contactInfo.badge === 'Dx' && (
                    <VehicleBikeLineIcon size={12} className="text-[#111318]" />
                  )}
                  {conversationData.contactInfo.badge === 'Mx' && (
                    <MerchantLineIcon size={12} className="text-[#111318]" />
                  )}
                </div>
              </div>

              {/* Name */}
              <p className="text-[16px] leading-[22px] font-normal text-[#111318] tracking-[-0.01px] text-center">
                {conversationData.contactInfo.name}
              </p>

              {/* Description */}
              {conversationData.contactInfo.description && (
                <p className="text-[12px] leading-[18px] font-normal text-[#51545d] tracking-[-0.01px] text-center">
                  {conversationData.contactInfo.description}
                </p>
              )}

              {/* Language Tag */}
              <div className="flex items-center gap-[4px] h-[20px] px-[8px] bg-white border border-[#e9eaec] rounded-full">
                <LanguageLineIcon size={12} className="text-[#111318]" />
                <span className="text-[12px] leading-[18px] font-semibold text-[#111318] tracking-[-0.01px]">
                  {conversationData.contactInfo.language}
                </span>
              </div>

              {/* Timeline */}
              {conversationData.contactInfo.timeline && conversationData.contactInfo.timeline.length > 0 && (
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
              )}
            </div>

            {/* Chat Messages - Only show in chat mode */}
            {selectedChannel === 'chat' && (
              <div className="flex flex-col gap-[16px] w-full">
                {messages.map((message) => {
                const isAgent = message.sender === 'agent';
                const isNewMessage = message.id === newMessageId;

                return (
                  <div 
                    key={message.id} 
                    className={`flex flex-col ${isAgent ? 'items-end' : 'items-start'} w-full ${
                      isNewMessage ? 'animate-message-in' : ''
                    }`}
                    style={{
                      transformOrigin: isAgent ? 'right bottom' : 'left bottom'
                    }}
                  >
                    {/* Chat Header with Avatar and Name */}
                    <div className={`flex gap-[8px] items-center ${isAgent ? 'flex-row-reverse' : 'flex-row'} w-[360px]`}>
                      {/* Avatar */}
                      <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center border-2 border-white shadow-[0px_1px_2px_0px_rgba(17,19,24,0.15)] shrink-0 overflow-hidden ${
                        isAgent ? 'bg-[#e3fbff]' : 'bg-gradient-to-b from-[#d4ffcd] to-[#4adc34]'
                      } ${isNewMessage ? 'animate-avatar-pop' : ''}`}>
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
                      <div className={`flex items-center justify-end gap-[8px] mt-[4px] w-full ${
                        isNewMessage ? 'animate-timestamp-fade' : ''
                      }`}>
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
            )}
          </div>
        </div>
      </div>

      {/* Composer - Conditional based on channel */}
      {selectedChannel === 'chat' && (
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
                      className="w-[40px] h-[40px] flex items-center justify-center rounded-[8px] bg-[#e7fef4] hover:bg-[#d0f5e6] transition-all"
                      aria-label="Send message"
                    >
                      <SendFillIcon size={24} className="text-[#00855f] -rotate-45" />
                    </button>
                  </div>
            </div>
          </div>
        </div>
      )}
      
      {selectedChannel === 'phone' && <PhoneComposer contactInfo={conversationData.contactInfo} />}
      {selectedChannel === 'email' && <EmailComposer contactInfo={conversationData.contactInfo} />}
    </div>
  );
}

