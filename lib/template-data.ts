// Message template structure
export interface MessageTemplate {
  id: string;
  title: string;
  description: string;
  content: string;
}

// Hardcoded message templates for support agents
export const MESSAGE_TEMPLATES: MessageTemplate[] = [
  {
    id: 'delay-apology',
    title: 'Delay apology',
    description: 'Sorry for the delay with your order. The delivery will be a bit late since the venue is very busy',
    content: 'Sorry for the delay with your order. The delivery will be a bit late since the venue is very busy 😔',
  },
  {
    id: 'enjoy-food',
    title: 'Enjoy your food!',
    description: 'I will leave you to enjoy your meal, therefore I will close this chat for now.😊 If a problem arises or if you have any other questions, feel free to reach out to me! 🙏',
    content: 'I will leave you to enjoy your meal, therefore I will close this chat for now.😊 If a problem arises or if you have any other questions, feel free to reach out to me! 🙏',
  },
  {
    id: 'log-off',
    title: 'Log off',
    description: "I totally understand! Huge apologies from our side. I'll be happy to help! 🙌 I'd just like to confirm, did you make the order using this device? Unfortunately, I can't currently see your order details. Could you kindly log out of the app and then back in again, using your e-mail address for the log in, and after this send us a new message? Like this, we'll get access to the purchase details and can start looking into this!",
    content: "I totally understand! Huge apologies from our side. I'll be happy to help! 🙌 I'd just like to confirm, did you make the order using this device? Unfortunately, I can't currently see your order details. Could you kindly log out of the app and then back in again, using your e-mail address for the log in, and after this send us a new message? Like this, we'll get access to the purchase details and can start looking into this!",
  },
  {
    id: 'food-cold',
    title: 'Food is cold 🥶',
    description: "I'm really sorry to hear that your order arrived cold. I completely understand how disappointing that must feel.",
    content: "I'm really sorry to hear that your order arrived cold 🥶 I completely understand how disappointing that must feel. Let me make this right for you! 💙",
  },
  {
    id: 'courier-arriving',
    title: 'Courier arriving',
    description: 'Good news — I just checked and the courier has picked up your order and is ready to deliver. They should be arriving at your location shortly. Please keep an eye on the app for live updates, and if you notice any further delays, feel free to reach out here.',
    content: 'Good news — I just checked and the courier has picked up your order and is ready to deliver! 🚴‍♂️ They should be arriving at your location shortly. Please keep an eye on the app for live updates 📱 and if you notice any further delays, feel free to reach out here.',
  },
  {
    id: 'missing-items',
    title: 'Missing items',
    description: 'I sincerely apologize for the missing items in your order. I understand how frustrating this must be.',
    content: "I sincerely apologize for the missing items in your order. I understand how frustrating this must be 😔 Let me process a refund for the missing items right away, and it should appear in your account within 3-5 business days. We'll make this right! 💚",
  },
  {
    id: 'wrong-order',
    title: 'Wrong order',
    description: "I'm so sorry about the mix-up with your order! This isn't the experience we want you to have.",
    content: "I'm so sorry about the mix-up with your order! 😓 This isn't the experience we want you to have. Let me arrange for the correct order to be sent to you right away 🚀 Would you like to keep the incorrect items or shall we arrange a pickup?",
  },
  {
    id: 'refund-processed',
    title: 'Refund processed ✅',
    description: "I've processed your refund and it should appear in your account shortly.",
    content: "I've processed your refund and it should appear in your account shortly! ✅ Typically, it takes 3-5 business days for the funds to show up, depending on your bank. Is there anything else I can help you with today? 😊",
  },
  {
    id: 'order-tracking',
    title: 'Order tracking 📍',
    description: 'Let me check the status of your order for you right now.',
    content: "Let me check the status of your order for you right now. 🔍 I can see that your order is currently being prepared at the restaurant 👨‍🍳 Once the courier picks it up, you'll receive a notification with live tracking. The estimated delivery time is shown in your app. 📱",
  },
  {
    id: 'payment-issue',
    title: 'Payment issue 💳',
    description: "I'm sorry you're experiencing payment difficulties. Let me help you resolve this.",
    content: "I'm sorry you're experiencing payment difficulties. Let me help you resolve this! 🤝 Could you please try updating your payment method in the app? If the issue persists, your bank may have temporarily blocked the transaction for security reasons 🔒 You might need to contact them to authorize the payment.",
  },
  {
    id: 'substitution-approved',
    title: 'Substitution approved',
    description: "I've updated your order with the substitution you requested.",
    content: "I've updated your order with the substitution you requested! ✨ The price difference will be adjusted automatically, and you'll only be charged for what you receive. The restaurant is preparing your order now with the changes 👍",
  },
  {
    id: 'quality-complaint',
    title: 'Quality complaint',
    description: "I'm truly sorry the food quality didn't meet your expectations.",
    content: "I'm truly sorry the food quality didn't meet your expectations 😔 This isn't acceptable, and I want to make it right for you. I'm processing a full refund for your order 💰 Would you also like me to share your feedback with the restaurant so they can improve? 📝",
  },
  {
    id: 'delivery-address',
    title: 'Delivery address 📍',
    description: 'I can help you update the delivery address for your order.',
    content: "I can help you update the delivery address for your order! 📍 However, if the courier has already picked up the order, we may not be able to change it. Let me check the current status and see what we can do for you. 🔍",
  },
  {
    id: 'contact-courier',
    title: 'Contact courier 📞',
    description: 'You can reach the courier directly through the app.',
    content: "You can reach the courier directly through the app by tapping on the courier's name once they've picked up your order 📱 This will allow you to call or message them if you need to provide specific delivery instructions or contact them about your order. 💬",
  },
  {
    id: 'thank-you',
    title: 'Thank you',
    description: 'Thank you for contacting us and for your patience.',
    content: "Thank you for contacting us and for your patience while I helped resolve this issue! 🙏 If you need anything else in the future, don't hesitate to reach out. Enjoy your meal! 😋🍽️",
  },
];

// Search function to filter templates by title or description
export function searchTemplates(query: string, limit?: number): MessageTemplate[] {
  if (!query || query.trim().length === 0) {
    return limit ? MESSAGE_TEMPLATES.slice(0, limit) : MESSAGE_TEMPLATES;
  }

  const lowerQuery = query.toLowerCase().trim();
  const results = MESSAGE_TEMPLATES.filter(template => 
    template.title.toLowerCase().includes(lowerQuery) ||
    template.description.toLowerCase().includes(lowerQuery)
  );

  return limit ? results.slice(0, limit) : results;
}

