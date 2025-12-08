// English to Italian translation dictionary for chat messages
// Using a client-side library approach with static translations

export const TRANSLATIONS: { [key: string]: string } = {
  // Case 1 - Jessica A. - Missing Minor
  "Hi, my order is missing a small item - a pack of napkins. Everything else arrived fine.": 
    "Ciao, nel mio ordine manca un piccolo articolo - un pacchetto di tovaglioli. Tutto il resto è arrivato bene.",
  
  "Hello Jessica! I'm sorry about the missing napkins. I'll process a refund for that item right away. It should appear in your account within 3-5 business days.": 
    "Ciao Jessica! Mi dispiace per i tovaglioli mancanti. Elaborerò subito un rimborso per quell'articolo. Dovrebbe apparire sul tuo conto entro 3-5 giorni lavorativi.",

  // Case 2 - Edeka Weiß - Item Substitution
  "I see Red Bull Sugar Free is out of stock. Can I get the original version instead?": 
    "Vedo che Red Bull Sugar Free non è disponibile. Posso avere la versione originale invece?",
  
  "Absolutely! I've updated your order to include Red Bull Original 250ml (x4) instead. The price difference will be adjusted automatically.": 
    "Assolutamente! Ho aggiornato il tuo ordine per includere Red Bull Original 250ml (x4) invece. La differenza di prezzo verrà adeguata automaticamente.",
  
  "Perfect, thank you!": 
    "Perfetto, grazie!",

  // Case 3 - Giuseppe O. - Missing Items
  "Hello, I received my order but three items are missing from the bag.": 
    "Ciao, ho ricevuto il mio ordine ma mancano tre articoli dalla borsa.",
  
  "Hi Giuseppe, I'm sorry to hear that. Could you please let me know which items are missing so I can help you right away?": 
    "Ciao Giuseppe, mi dispiace sentirlo. Potresti per favore farmi sapere quali articoli mancano così posso aiutarti subito?",
  
  "The missing items are: 1x Olive Oil, 2x Pasta boxes, and 1x Parmesan cheese.": 
    "Gli articoli mancanti sono: 1x Olio d'oliva, 2x Scatole di pasta e 1x Formaggio parmigiano.",
  
  "Thank you for the details. I'm processing a full refund for these items now. You'll receive it within 24 hours. Would you like us to redeliver them or just the refund?": 
    "Grazie per i dettagli. Sto elaborando un rimborso completo per questi articoli ora. Lo riceverai entro 24 ore. Vorresti che te li riconsegnassimo o solo il rimborso?",

  // Case 4 - Sofia Martinez - Late Delivery
  "My order was supposed to arrive 20 minutes ago. Can you check the status?": 
    "Il mio ordine doveva arrivare 20 minuti fa. Puoi controllare lo stato?",
  
  "Hi Sofia! I'm checking on your order right now. I can see it's currently with the courier. Let me get an update for you.": 
    "Ciao Sofia! Sto controllando il tuo ordine adesso. Vedo che è attualmente con il corriere. Fammi avere un aggiornamento per te.",

  // Case 5 - Marcus Chen - Wrong Order
  "I received someone else's order. This isn't what I ordered at all.": 
    "Ho ricevuto l'ordine di qualcun altro. Questo non è affatto quello che ho ordinato.",
  
  "I'm so sorry about that mix-up, Marcus! Let me arrange for the correct order to be sent to you right away.": 
    "Mi dispiace molto per questo errore, Marcus! Lascia che organizzi l'invio dell'ordine corretto subito.",

  // Default conversation - Aaron W.
  "Hi, I placed an order about an hour ago and it still hasn't arrived": 
    "Ciao, ho fatto un ordine circa un'ora fa e non è ancora arrivato",
  
  "Thanks for reaching out. I'm sorry your order hasn't arrived yet. I'll check the status with the courier right away and update you in just a moment.": 
    "Grazie per averci contattato. Mi dispiace che il tuo ordine non sia ancora arrivato. Controllerò lo stato con il corriere subito e ti aggiornerò tra un momento.",

  // Courier messages
  "Hi, I just picked up the order from the restaurant. On my way now!": 
    "Ciao, ho appena ritirato l'ordine dal ristorante. Sono in viaggio ora!",
  
  "I'm stuck in traffic on the highway. Will be there in 10 mins.": 
    "Sono bloccato nel traffico in autostrada. Sarò lì tra 10 minuti.",
  
  "Package has been picked up. On my way now!": 
    "Il pacco è stato ritirato. Sono in viaggio ora!",
  
  "Package has been picked up. ETA 15 minutes.": 
    "Il pacco è stato ritirato. Arrivo stimato in 15 minuti.",

  // Common phrases
  "Just now": "Proprio ora",
  "Sent": "Inviato",
  "Message deleted": "Messaggio eliminato",
  "Note deleted": "Nota eliminata",
};

/**
 * Translates English text to Italian using the translation dictionary
 * @param text - The English text to translate
 * @returns The Italian translation if available, otherwise returns the original text
 */
export function translateToItalian(text: string): string {
  // Direct match
  if (TRANSLATIONS[text]) {
    return TRANSLATIONS[text];
  }

  // If no translation found, return original text
  return text;
}

/**
 * Check if a translation exists for the given text
 * @param text - The text to check
 * @returns true if translation exists, false otherwise
 */
export function hasTranslation(text: string): boolean {
  return TRANSLATIONS.hasOwnProperty(text);
}

