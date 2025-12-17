// Operations Message Template structure
export interface OperationsTemplate {
  id: string;
  title: string;
  content: string;
  category: string[];
  country: string[];
  language: string[];
  owner: string;
  lastEditedBy: string;
  creationDate: string;
  updateDate: string;
}

// Available filter options (removed 'All' - empty array = show all)
export const CATEGORIES = ['Consumer', 'Merchant', 'Courier', 'General'] as const;
export const COUNTRIES = ['Finland', 'Sweden', 'Norway', 'Denmark', 'Iceland'] as const;
export const LANGUAGES = ['ENG'] as const;

// Country flag emojis
export const COUNTRY_FLAGS: Record<string, string> = {
  'Finland': '🇫🇮',
  'Sweden': '🇸🇪',
  'Norway': '🇳🇴',
  'Denmark': '🇩🇰',
  'Iceland': '🇮🇸',
};

// Mock data for operations templates - All in English
export const OPERATIONS_TEMPLATES: OperationsTemplate[] = [
  // Consumer templates - Finland
  {
    id: '1',
    title: 'C Cats are better than dogs',
    content: "Hi! I think cats are better than dogs, don't you? 🐈‍⬛",
    category: ['Consumer'],
    country: ['Finland'],
    language: ['ENG'],
    owner: 'Ana J.',
    lastEditedBy: 'Ana J.',
    creationDate: '24.10.2025',
    updateDate: '24.10.2025',
  },
  {
    id: '2',
    title: 'C Order delay apology',
    content: "I'm sorry your order is running late. Let me check the status for you right away! 🔍",
    category: ['Consumer'],
    country: ['Finland', 'Sweden'],
    language: ['ENG'],
    owner: 'Ana J.',
    lastEditedBy: 'Ana J.',
    creationDate: '24.10.2025',
    updateDate: '25.10.2025',
  },
  {
    id: '3',
    title: 'C Refund confirmation',
    content: "Your refund has been processed! It should appear in your account within 3-5 business days. 💰",
    category: ['Consumer'],
    country: ['Finland'],
    language: ['ENG'],
    owner: 'John D.',
    lastEditedBy: 'John D.',
    creationDate: '25.10.2025',
    updateDate: '25.10.2025',
  },
  // Consumer templates - Sweden
  {
    id: '4',
    title: 'C Dogs are the most loyal companions',
    content: 'Absolutely! Dogs are incredibly loyal and make great friends. 🐶',
    category: ['Consumer'],
    country: ['Sweden'],
    language: ['ENG'],
    owner: 'John D.',
    lastEditedBy: 'John D.',
    creationDate: '25.10.2025',
    updateDate: '25.10.2025',
  },
  {
    id: '5',
    title: 'C Missing items apology',
    content: "I'm so sorry some items were missing from your order. Let me make this right for you! 😔",
    category: ['Consumer'],
    country: ['Sweden', 'Norway'],
    language: ['ENG'],
    owner: 'Elena R.',
    lastEditedBy: 'Elena R.',
    creationDate: '26.10.2025',
    updateDate: '26.10.2025',
  },
  {
    id: '6',
    title: 'C Food quality issue',
    content: "I understand your food didn't meet expectations. We take quality very seriously. Let me help! 🍽️",
    category: ['Consumer'],
    country: ['Sweden'],
    language: ['ENG'],
    owner: 'John D.',
    lastEditedBy: 'John D.',
    creationDate: '26.10.2025',
    updateDate: '27.10.2025',
  },
  // Consumer templates - Norway
  {
    id: '7',
    title: 'C Rabbits are surprisingly great pets',
    content: 'Rabbits can be adorable and they love to hop around! 🐇',
    category: ['Consumer'],
    country: ['Norway'],
    language: ['ENG'],
    owner: 'Elena R.',
    lastEditedBy: 'Elena R.',
    creationDate: '26.10.2025',
    updateDate: '26.10.2025',
  },
  {
    id: '8',
    title: 'C Delivery instructions update',
    content: "I've updated your delivery instructions. The courier will follow them for your next order! 📍",
    category: ['Consumer'],
    country: ['Norway', 'Denmark'],
    language: ['ENG'],
    owner: 'Liam S.',
    lastEditedBy: 'Liam S.',
    creationDate: '27.10.2025',
    updateDate: '27.10.2025',
  },
  // Consumer templates - Denmark
  {
    id: '9',
    title: 'C Birds bring joy with their songs',
    content: 'Birds have such beautiful melodies and can be quite entertaining! 🐦',
    category: ['Consumer'],
    country: ['Denmark'],
    language: ['ENG'],
    owner: 'Liam S.',
    lastEditedBy: 'Liam S.',
    creationDate: '27.10.2025',
    updateDate: '27.10.2025',
  },
  {
    id: '10',
    title: 'C Payment issue resolved',
    content: "Good news! The payment issue has been resolved and your order is being prepared. ✅",
    category: ['Consumer'],
    country: ['Denmark', 'Iceland'],
    language: ['ENG'],
    owner: 'Sofia K.',
    lastEditedBy: 'Sofia K.',
    creationDate: '28.10.2025',
    updateDate: '28.10.2025',
  },
  // Consumer templates - Iceland
  {
    id: '11',
    title: 'C Fish are calming to watch',
    content: 'Watching fish swim can be incredibly relaxing and peaceful. 🐠',
    category: ['Consumer'],
    country: ['Iceland'],
    language: ['ENG'],
    owner: 'Sofia K.',
    lastEditedBy: 'Sofia K.',
    creationDate: '28.10.2025',
    updateDate: '28.10.2025',
  },
  {
    id: '12',
    title: 'C Thank you for your patience',
    content: "Thank you for your patience while we resolved this issue. We appreciate you! 🙏",
    category: ['Consumer', 'General'],
    country: ['Finland', 'Sweden', 'Norway', 'Denmark', 'Iceland'],
    language: ['ENG'],
    owner: 'Ana J.',
    lastEditedBy: 'Ana J.',
    creationDate: '29.10.2025',
    updateDate: '29.10.2025',
  },
  // Merchant templates - Finland
  {
    id: '13',
    title: 'M Order preparation reminder',
    content: "Please ensure the order is prepared within the estimated time. The courier is on the way! 🚴",
    category: ['Merchant'],
    country: ['Finland', 'Sweden'],
    language: ['ENG'],
    owner: 'Ana J.',
    lastEditedBy: 'Ana J.',
    creationDate: '29.10.2025',
    updateDate: '29.10.2025',
  },
  {
    id: '14',
    title: 'M Menu item availability',
    content: "Please update your menu if any items are currently unavailable to avoid customer disappointment. 📋",
    category: ['Merchant'],
    country: ['Finland', 'Sweden', 'Norway'],
    language: ['ENG'],
    owner: 'John D.',
    lastEditedBy: 'John D.',
    creationDate: '30.10.2025',
    updateDate: '30.10.2025',
  },
  // Merchant templates - Sweden
  {
    id: '15',
    title: 'M Quality feedback received',
    content: "We received customer feedback about food quality. Please review and let us know if you need assistance.",
    category: ['Merchant'],
    country: ['Sweden'],
    language: ['ENG'],
    owner: 'Elena R.',
    lastEditedBy: 'Elena R.',
    creationDate: '30.10.2025',
    updateDate: '31.10.2025',
  },
  {
    id: '16',
    title: 'M Packaging guidelines',
    content: "Please ensure items are properly packaged to maintain quality during delivery. 📦",
    category: ['Merchant'],
    country: ['Sweden', 'Denmark'],
    language: ['ENG'],
    owner: 'Liam S.',
    lastEditedBy: 'Liam S.',
    creationDate: '31.10.2025',
    updateDate: '31.10.2025',
  },
  // Merchant templates - Norway
  {
    id: '17',
    title: 'M Operating hours update',
    content: "Please update your operating hours in the system to reflect your current schedule. ⏰",
    category: ['Merchant'],
    country: ['Norway', 'Denmark', 'Iceland'],
    language: ['ENG'],
    owner: 'Sofia K.',
    lastEditedBy: 'Sofia K.',
    creationDate: '01.11.2025',
    updateDate: '01.11.2025',
  },
  // Merchant templates - Denmark
  {
    id: '18',
    title: 'M New feature announcement',
    content: "Great news! We have new features available for merchants. Check out the partner dashboard! 🎉",
    category: ['Merchant'],
    country: ['Denmark'],
    language: ['ENG'],
    owner: 'Ana J.',
    lastEditedBy: 'Ana J.',
    creationDate: '02.11.2025',
    updateDate: '02.11.2025',
  },
  // Merchant templates - Iceland
  {
    id: '19',
    title: 'M Promotion opportunity',
    content: "You're eligible for a featured promotion this week! Contact us to learn more. ⭐",
    category: ['Merchant'],
    country: ['Iceland'],
    language: ['ENG'],
    owner: 'John D.',
    lastEditedBy: 'John D.',
    creationDate: '03.11.2025',
    updateDate: '03.11.2025',
  },
  // Courier templates - Finland
  {
    id: '20',
    title: 'R Delivery zone reminder',
    content: "Please ensure you're familiar with the delivery zones in your area for efficient routing. 🗺️",
    category: ['Courier'],
    country: ['Finland'],
    language: ['ENG'],
    owner: 'Elena R.',
    lastEditedBy: 'Elena R.',
    creationDate: '04.11.2025',
    updateDate: '04.11.2025',
  },
  {
    id: '21',
    title: 'R Safety first reminder',
    content: "Remember to prioritize your safety while making deliveries. Take breaks when needed! 🛡️",
    category: ['Courier'],
    country: ['Finland', 'Sweden', 'Norway', 'Denmark', 'Iceland'],
    language: ['ENG'],
    owner: 'Liam S.',
    lastEditedBy: 'Liam S.',
    creationDate: '05.11.2025',
    updateDate: '05.11.2025',
  },
  // Courier templates - Sweden
  {
    id: '22',
    title: 'R Weather advisory',
    content: "Adverse weather conditions expected. Please be extra careful during deliveries today! ⚠️",
    category: ['Courier'],
    country: ['Sweden', 'Norway', 'Iceland'],
    language: ['ENG'],
    owner: 'Sofia K.',
    lastEditedBy: 'Sofia K.',
    creationDate: '06.11.2025',
    updateDate: '06.11.2025',
  },
  // Courier templates - Norway
  {
    id: '23',
    title: 'R Earnings bonus available',
    content: "You're eligible for an earnings bonus this week! Complete 20 deliveries to qualify. 💵",
    category: ['Courier'],
    country: ['Norway', 'Denmark'],
    language: ['ENG'],
    owner: 'Ana J.',
    lastEditedBy: 'Ana J.',
    creationDate: '07.11.2025',
    updateDate: '07.11.2025',
  },
  // Courier templates - Denmark
  {
    id: '24',
    title: 'R App update reminder',
    content: "Please update your courier app to the latest version for improved features and bug fixes. 📱",
    category: ['Courier'],
    country: ['Denmark'],
    language: ['ENG'],
    owner: 'John D.',
    lastEditedBy: 'John D.',
    creationDate: '08.11.2025',
    updateDate: '08.11.2025',
  },
  // Courier templates - Iceland
  {
    id: '25',
    title: 'R Customer interaction tips',
    content: "Friendly reminder: A smile and polite greeting can make a customer's day! 😊",
    category: ['Courier', 'General'],
    country: ['Iceland'],
    language: ['ENG'],
    owner: 'Elena R.',
    lastEditedBy: 'Elena R.',
    creationDate: '09.11.2025',
    updateDate: '09.11.2025',
  },
  // General templates - Finland
  {
    id: '26',
    title: 'G Welcome message',
    content: "Welcome to our support team! How can we help you today? 👋",
    category: ['General'],
    country: ['Finland', 'Sweden', 'Norway'],
    language: ['ENG'],
    owner: 'Liam S.',
    lastEditedBy: 'Liam S.',
    creationDate: '10.11.2025',
    updateDate: '10.11.2025',
  },
  {
    id: '27',
    title: 'G Closing conversation',
    content: "Thank you for contacting us! If you have any more questions, feel free to reach out. Have a great day! ☀️",
    category: ['General'],
    country: ['Finland', 'Sweden', 'Norway', 'Denmark', 'Iceland'],
    language: ['ENG'],
    owner: 'Sofia K.',
    lastEditedBy: 'Sofia K.',
    creationDate: '11.11.2025',
    updateDate: '11.11.2025',
  },
  // General templates - Sweden
  {
    id: '28',
    title: 'G Feedback request',
    content: "We'd love to hear your feedback! Your input helps us improve our service. 📝",
    category: ['General'],
    country: ['Sweden', 'Denmark'],
    language: ['ENG'],
    owner: 'Ana J.',
    lastEditedBy: 'Ana J.',
    creationDate: '12.11.2025',
    updateDate: '12.11.2025',
  },
  // General templates - Norway
  {
    id: '29',
    title: 'G Escalation notice',
    content: "I'm escalating your case to our specialized team. They will contact you shortly. 📞",
    category: ['General'],
    country: ['Norway'],
    language: ['ENG'],
    owner: 'John D.',
    lastEditedBy: 'John D.',
    creationDate: '13.11.2025',
    updateDate: '13.11.2025',
  },
  // General templates - Denmark
  {
    id: '30',
    title: 'G Holiday hours notice',
    content: "Please note our support hours may be different during the holiday period. Check our website for details. 🎄",
    category: ['General'],
    country: ['Denmark', 'Iceland'],
    language: ['ENG'],
    owner: 'Elena R.',
    lastEditedBy: 'Elena R.',
    creationDate: '14.11.2025',
    updateDate: '14.11.2025',
  },
  // General templates - Iceland
  {
    id: '31',
    title: 'G Technical issue acknowledgment',
    content: "We're aware of the technical issue and our team is working on it. Thank you for your patience! 🔧",
    category: ['General'],
    country: ['Iceland'],
    language: ['ENG'],
    owner: 'Liam S.',
    lastEditedBy: 'Liam S.',
    creationDate: '15.11.2025',
    updateDate: '15.11.2025',
  },
  // More Consumer templates for variety
  {
    id: '32',
    title: 'C Promo code applied',
    content: "Great news! Your promo code has been applied successfully. Enjoy the discount! 🎁",
    category: ['Consumer'],
    country: ['Finland', 'Sweden', 'Norway'],
    language: ['ENG'],
    owner: 'Sofia K.',
    lastEditedBy: 'Sofia K.',
    creationDate: '16.11.2025',
    updateDate: '16.11.2025',
  },
  {
    id: '33',
    title: 'C Account verification',
    content: "Your account has been verified successfully. You now have full access to all features! ✅",
    category: ['Consumer'],
    country: ['Sweden'],
    language: ['ENG'],
    owner: 'Ana J.',
    lastEditedBy: 'Ana J.',
    creationDate: '17.11.2025',
    updateDate: '17.11.2025',
  },
  {
    id: '34',
    title: 'C Subscription renewed',
    content: "Your subscription has been renewed. Thank you for continuing with us! 💚",
    category: ['Consumer'],
    country: ['Norway', 'Denmark'],
    language: ['ENG'],
    owner: 'John D.',
    lastEditedBy: 'John D.',
    creationDate: '18.11.2025',
    updateDate: '18.11.2025',
  },
  {
    id: '35',
    title: 'C Rating request',
    content: "We hope you enjoyed your order! Would you mind leaving a rating to help other customers? ⭐",
    category: ['Consumer'],
    country: ['Denmark'],
    language: ['ENG'],
    owner: 'Elena R.',
    lastEditedBy: 'Elena R.',
    creationDate: '19.11.2025',
    updateDate: '19.11.2025',
  },
  {
    id: '36',
    title: 'C Order tracking info',
    content: "You can track your order in real-time using the app. Look for the 'Track Order' button! 📍",
    category: ['Consumer'],
    country: ['Iceland'],
    language: ['ENG'],
    owner: 'Liam S.',
    lastEditedBy: 'Liam S.',
    creationDate: '20.11.2025',
    updateDate: '20.11.2025',
  },
  // More Merchant templates
  {
    id: '37',
    title: 'M Peak hours preparation',
    content: "Peak hours are approaching! Please ensure adequate staff and inventory. 📈",
    category: ['Merchant'],
    country: ['Finland'],
    language: ['ENG'],
    owner: 'Sofia K.',
    lastEditedBy: 'Sofia K.',
    creationDate: '21.11.2025',
    updateDate: '21.11.2025',
  },
  {
    id: '38',
    title: 'M Photo update request',
    content: "Your menu photos look great, but some items need updates. Fresh photos increase orders! 📸",
    category: ['Merchant'],
    country: ['Sweden', 'Norway'],
    language: ['ENG'],
    owner: 'Ana J.',
    lastEditedBy: 'Ana J.',
    creationDate: '22.11.2025',
    updateDate: '22.11.2025',
  },
  // More Courier templates
  {
    id: '39',
    title: 'R Navigation tips',
    content: "Pro tip: Use the in-app navigation for the most efficient routes to your deliveries! 🧭",
    category: ['Courier'],
    country: ['Norway', 'Finland'],
    language: ['ENG'],
    owner: 'John D.',
    lastEditedBy: 'John D.',
    creationDate: '23.11.2025',
    updateDate: '23.11.2025',
  },
  {
    id: '40',
    title: 'R Equipment check reminder',
    content: "Regular reminder to check your delivery bag and equipment. Good gear = happy customers! 🎒",
    category: ['Courier'],
    country: ['Denmark', 'Iceland'],
    language: ['ENG'],
    owner: 'Elena R.',
    lastEditedBy: 'Elena R.',
    creationDate: '24.11.2025',
    updateDate: '24.11.2025',
  },
];

// Filter templates by criteria
export function filterTemplates(
  templates: OperationsTemplate[],
  filters: {
    category?: string[];
    country?: string[];
    language?: string[];
    search?: string;
  }
): OperationsTemplate[] {
  return templates.filter((template) => {
    // Category filter (empty array = show all)
    if (filters.category && filters.category.length > 0) {
      // Check if template has ANY of the selected categories (OR logic)
      const hasMatchingCategory = filters.category.some(cat => 
        template.category.includes(cat)
      );
      if (!hasMatchingCategory) return false;
    }
    
    // Country filter (empty array = show all)
    if (filters.country && filters.country.length > 0) {
      // Check if template has ANY of the selected countries (OR logic)
      const hasMatchingCountry = filters.country.some(ctry => 
        template.country.includes(ctry)
      );
      if (!hasMatchingCountry) return false;
    }
    
    // Language filter (empty array = show all)
    if (filters.language && filters.language.length > 0) {
      // Check if template has ANY of the selected languages (OR logic)
      const hasMatchingLanguage = filters.language.some(lang => 
        template.language.includes(lang)
      );
      if (!hasMatchingLanguage) return false;
    }
    
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        template.title.toLowerCase().includes(searchLower) ||
        template.content.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
}

// Sort templates by column
export type SortColumn = 'title' | 'category' | 'country' | 'language' | 'lastEditedBy' | 'creationDate' | 'updateDate';
export type SortDirection = 'asc' | 'desc';

export function sortTemplates(
  templates: OperationsTemplate[],
  column: SortColumn,
  direction: SortDirection
): OperationsTemplate[] {
  return [...templates].sort((a, b) => {
    let aValue: string | string[] = a[column];
    let bValue: string | string[] = b[column];
    
    // Handle array fields (category, country, language) - join for sorting
    if (Array.isArray(aValue)) {
      aValue = aValue.join(', ');
    }
    if (Array.isArray(bValue)) {
      bValue = bValue.join(', ');
    }
    
    // Handle date sorting
    if (column === 'creationDate' || column === 'updateDate') {
      // Convert DD.MM.YYYY to sortable format
      const parseDate = (dateStr: string) => {
        const [day, month, year] = dateStr.split('.');
        return new Date(`${year}-${month}-${day}`).getTime();
      };
      aValue = parseDate(aValue as string).toString();
      bValue = parseDate(bValue as string).toString();
    }
    
    const comparison = aValue.localeCompare(bValue);
    return direction === 'asc' ? comparison : -comparison;
  });
}
