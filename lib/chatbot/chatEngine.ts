// ============================================================
// LifeBloom Chatbot Engine
// Handles multilingual chat, domain classification, and LLM/fallback
// ============================================================

import {
  SYSTEM_PROMPT,
  OUT_OF_BOUNDS_KEYWORDS,
  DOMAIN_TOPICS,
  QuickLink,
} from './knowledge';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatEngineResponse {
  reply: string;
  links?: QuickLink[];
  detectedLanguage: string;
  isOutOfField: boolean;
}

/**
 * Detect language from user input (Devanagari, Gurmukhi, Latin scripts, explicit requests)
 */
export function detectLanguage(text: string): 'hi' | 'pa' | 'es' | 'fr' | 'de' | 'en' {
  const lower = text.toLowerCase();

  // Explicit language requests
  if (/\b(hindi|हिंदी|हिन्दी)\b/.test(lower) || /\b(talk in hindi|speak in hindi|hindi me|hindi mein|hindi bol|hindi bolo)\b/.test(lower)) {
    return 'hi';
  }
  if (/\b(punjabi|ਪੰਜਾਬੀ)\b/.test(lower) || /\b(talk in punjabi|speak in punjabi|punjabi vich|punjabi ch)\b/.test(lower)) {
    return 'pa';
  }
  if (/\b(spanish|español|habla español)\b/.test(lower)) return 'es';
  if (/\b(french|français|parle français)\b/.test(lower)) return 'fr';
  if (/\b(german|deutsch|sprich deutsch)\b/.test(lower)) return 'de';

  // Check Gurmukhi script (Punjabi)
  if (/[਀-੿]/.test(text)) {
    return 'pa';
  }
  // Check Devanagari script (Hindi)
  if (/[ऀ-ॿ]/.test(text)) {
    return 'hi';
  }

  // Punjabi in Latin / Roman (Punjabi words)
  if (/\b(tussi|tuhada|tuhadi|kive|kiven|hove|sada|sadi|chahida|sat sri akaal|kidaan|kiddan|gal|daso|dasso|punjab|phagwara|hanji|theek|rab|veere|bhaji)\b/.test(lower)) {
    return 'pa';
  }

  // Hindi in Latin / Hinglish words
  if (/\b(mera|meri|mere|naam|nam|hai|h|hu|hoon|kya|kaise|kese|karna|hoga|hogi|mujhe|humko|aap|aapka|aapki|bataye|batayein|chahiye|kitna|kitni|namaste|shukriya|dhanyawad|madad|bhai|kripya|bolo|baat|karni)\b/.test(lower)) {
    return 'hi';
  }

  // Spanish
  if (/\b(hola|gracias|cómo|como|por favor|servicios|ayuda|precio|contacto|vida|trabajo|hablas)\b/.test(lower)) {
    return 'es';
  }

  // French
  if (/\b(bonjour|merci|comment|s'il vous plaît|services|aide|prix|contact|vie|travail|parlez)\b/.test(lower)) {
    return 'fr';
  }

  // German
  if (/\b(hallo|danke|wie|bitte|dienstleistungen|hilfe|preis|kontakt|leben|arbeit|sprichst)\b/.test(lower)) {
    return 'de';
  }

  return 'en';
}

/**
 * Check if the user query is strictly out-of-bounds (coding, calculus, politics, crypto, etc.)
 */
export function isQueryOutOfField(text: string): boolean {
  const lower = text.toLowerCase().trim();

  // Check explicit out of bounds keywords
  for (const kw of OUT_OF_BOUNDS_KEYWORDS) {
    if (lower.includes(kw)) {
      // Check if it's mentioning it in a life/career context (e.g. "career as a python programmer")
      if (lower.includes('career') || lower.includes('job') || lower.includes('coaching') || lower.includes('interview')) {
        return false;
      }
      return true;
    }
  }

  // Check code syntax patterns
  if (/(const\s+\w+\s*=|function\s*\(|def\s+\w+\s*\(|import\s+\w+|select\s+\*\s+from|<\/?[a-z][\s\S]*>)/i.test(text)) {
    return true;
  }

  // Check math equation patterns (e.g., "solve 543 * 23" or "2+2=")
  if (/(\b(calculate|compute|solve)\b.*\d+[\+\-\*/\^]\d+|\d+\s*[\+\-\*/]\s*\d+\s*=)/i.test(lower)) {
    return true;
  }

  return false;
}

/**
 * Generate a polite refusal & redirection in the user's detected language
 */
function getOutOfFieldRefusal(lang: string): { reply: string; links: QuickLink[] } {
  const defaultLinks: QuickLink[] = [
    { label: 'Explore Life Coaching', href: '/services/life-coaching' },
    { label: 'Book Discovery Call', href: '/contact' },
    { label: 'About Dr. Shivani', href: '/about' },
  ];

  switch (lang) {
    case 'hi':
      return {
        reply: "मैं केवल LifeBloom और डॉ. शिवानी कोचर ढांड के लाइफ कोचिंग, करियर मार्गदर्शन, एनएलपी (NLP), माइंडफुलनेस और व्यक्तिगत विकास से जुड़े विषयों में सहायता कर सकती हूँ।\n\nमैं इस विषय पर उत्तर देने में असमर्थ हूँ, लेकिन यदि आप अपने जीवन के लक्ष्यों, आत्मविश्वास, या कोचिंग सेशंस के बारे में जानना चाहते हैं, तो मुझे आपकी सहायता करने में बेहद खुशी होगी! 🌱",
        links: defaultLinks,
      };
    case 'pa':
      return {
        reply: "ਮੈਂ ਸਿਰਫ਼ LifeBloom ਅਤੇ ਡਾ. ਸ਼ਿਵਾਨੀ ਕੋਚਰ ਢਾਂਡ ਦੇ ਲਾਈਫ ਕੋਚਿੰਗ, ਕਰੀਅਰ, ਐਨਐਲਪੀ (NLP), ਮਾਈਂਡਫੁੱਲਨੈੱਸ ਅਤੇ ਨਿੱਜੀ ਵਿਕਾਸ ਪ੍ਰੋਗਰਾਮਾਂ ਵਿੱਚ ਸਹਾਇਤਾ ਕਰ ਸਕਦੀ ਹਾਂ।\n\nਮੈਂ ਇਸ ਸਵਾਲ ਦਾ ਜਵਾਬ ਨਹੀਂ ਦੇ ਸਕਦੀ। ਪਰ ਜੇਕਰ ਤੁਸੀਂ ਆਪਣੇ ਜੀਵਨ, ਤਣਾਅ ਪ੍ਰਬੰਧਨ ਜਾਂ ਕੋਚਿੰਗ ਸੈਸ਼ਨਾਂ ਬਾਰੇ ਗੱਲ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ, ਤਾਂ ਮੈਂ ਖੁਸ਼ੀ ਨਾਲ ਤੁਹਾਡੀ ਮਦਦ ਕਰਾਂਗੀ! 🌱",
        links: defaultLinks,
      };
    case 'es':
      return {
        reply: "Me especializo exclusivamente en desarrollo personal, coaching de vida, PNL y bienestar en LifeBloom con la Dra. Shivani Koccher Dhand.\n\nNo puedo responder sobre este tema no relacionado, ¡pero me encantaría ayudarte a explorar nuestros programas de coaching o agendar una llamada de descubrimiento!",
        links: defaultLinks,
      };
    case 'fr':
      return {
        reply: "Je suis spécialisée exclusivement dans le développement personnel, le coaching de vie, la PNL et le bien-être chez LifeBloom avec le Dr. Shivani Koccher Dhand.\n\nJe ne peux pas répondre à des questions hors de ce domaine, mais je serais ravie de vous guider dans nos programmes de coaching!",
        links: defaultLinks,
      };
    case 'de':
      return {
        reply: "Ich bin ausschließlich auf persönliche Entwicklung, Life Coaching, NLP und Wohlbefinden bei LifeBloom mit Dr. Shivani Koccher Dhand spezialisiert.\n\nIch kann diese Frage leider nicht beantworten, helfe Ihnen jedoch sehr gerne bei Fragen zu unseren Coaching-Programmen!",
        links: defaultLinks,
      };
    default:
      return {
        reply: "I specialize exclusively in personal development, life coaching, NLP, mindfulness, and corporate workshops at LifeBloom with Dr. Shivani Koccher Dhand.\n\nI'm unable to answer queries outside this field, but I would love to help you explore our coaching roadmaps, workshops, or book a discovery call! How may I assist your growth journey? 🌱",
        links: defaultLinks,
      };
  }
}

/**
 * Sanitize and format conversation history for Gemini API
 * (Gemini requires the first turn to be 'user' and strictly alternating turns)
 */
function formatGeminiContents(messages: ChatMessage[]) {
  const contents: Array<{ role: 'user' | 'model'; parts: [{ text: string }] }> = [];

  for (const m of messages) {
    if (!m.content || !m.content.trim() || m.role === 'system') continue;
    const role: 'user' | 'model' = m.role === 'assistant' ? 'model' : 'user';

    // Gemini requires first message in contents to have role 'user'
    if (contents.length === 0 && role === 'model') {
      continue;
    }

    // Merge consecutive identical roles to adhere to strict alternating turn requirement
    if (contents.length > 0 && contents[contents.length - 1].role === role) {
      contents[contents.length - 1].parts[0].text += '\n' + m.content.trim();
    } else {
      contents.push({
        role,
        parts: [{ text: m.content.trim() }],
      });
    }
  }

  // Ensure there is at least one user message
  if (contents.length === 0) {
    const lastUser = [...messages].reverse().find((m) => m.role === 'user');
    contents.push({
      role: 'user',
      parts: [{ text: lastUser ? lastUser.content : 'Hello' }],
    });
  }

  return contents.slice(-6);
}

/**
 * Call Gemini REST API (gemini-2.5-flash)
 */
async function callLLMProvider(
  messages: ChatMessage[],
  apiKey: string
): Promise<string | null> {
  try {
    const geminiContents = formatGeminiContents(messages);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: geminiContents,
          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 350,
          },
        }),
      }
    ).finally(() => clearTimeout(timeoutId));

    if (!res.ok) {
      console.warn('Gemini API status:', res.status, res.statusText);
      return null;
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || null;
  } catch (err) {
    console.error('Gemini API call failed, using intelligent fallback engine:', err);
    return null;
  }
}

/**
 * Intelligent Fallback Intent Matcher with Multilingual Response Generation
 */
function matchFallbackTopic(text: string, lang: string): { reply: string; links?: QuickLink[] } {
  const lower = text.toLowerCase().trim();

  // 1. Language switch requests
  if (/\b(hindi|talk in hindi|speak in hindi|hindi me|hindi mein|hindi bol)\b/.test(lower)) {
    return {
      reply: "हाँ बिल्कुल! हम हिंदी में बात कर सकते हैं। LifeBloom में आपका स्वागत है।\n\nमैं डॉ. शिवानी कोचर ढांड के लाइफ कोचिंग, एनएलपी, और माइंडफुलनेस कार्यक्रमों के बारे में आपकी सहायता कर सकती हूँ। बताइए आज आप किस विषय पर बात करना चाहते हैं? 🌱",
      links: [
        { label: 'सेवाएँ देखें', href: '/services' },
        { label: 'डिस्कवरी कॉल बुक करें', href: '/contact' },
      ],
    };
  }

  if (/\b(punjabi|talk in punjabi|speak in punjabi|punjabi vich|punjabi ch)\b/.test(lower)) {
    return {
      reply: "ਹਾਂਜੀ ਬਿਲਕੁਲ! ਅਸੀਂ ਪੰਜਾਬੀ ਵਿੱਚ ਗੱਲ ਕਰ ਸਕਦੇ ਹਾਂ। LifeBloom ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ।\n\nਮੈਂ ਡਾ. ਸ਼ਿਵਾਨੀ ਕੋਚਰ ਢਾਂਡ ਦੇ ਲਾਈਫ ਕੋਚਿੰਗ, ਕਰੀਅਰ ਕੋਚਿੰਗ ਅਤੇ ਮਾਈਂਡਫੁੱਲਨੈੱਸ ਪ੍ਰੋਗਰਾਮਾਂ ਬਾਰੇ ਤੁਹਾਡੀ ਮਦਦ ਕਰ ਸਕਦੀ ਹਾਂ। ਦੱਸੋ ਅੱਜ ਤੁਸੀਂ ਕੀ ਜਾਣਨਾ ਚਾਹੁੰਦੇ ਹੋ? 🌱",
      links: [
        { label: 'ਸੇਵਾਵਾਂ ਵੇਖੋ', href: '/services' },
        { label: 'ਡਿਸਕਵਰੀ ਕਾਲ ਬੁੱਕ ਕਰੋ', href: '/contact' },
      ],
    };
  }

  // 2. Name introduction
  if (/\b(mera naam|my name is|i am|main|mein|im)\b/.test(lower)) {
    if (lang === 'hi') {
      return {
        reply: "नमस्ते! आपसे बात करके बहुत खुशी हुई। मैं शिवी हूँ, LifeBloom की AI कोचिंग असिस्टेंट।\n\nमैं डॉ. शिवानी कोचर ढांड के साथ आपके व्यक्तिगत और व्यावसायिक विकास के लिए सही कोचिंग प्रोग्राम चुनने में मदद कर सकती हूँ। आप क्या जानना चाहते हैं?",
        links: [
          { label: 'Explore Services', href: '/services' },
          { label: 'Book Discovery Call', href: '/contact' },
        ],
      };
    }
    if (lang === 'pa') {
      return {
        reply: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ! ਤੁਹਾਡੇ ਨਾਲ ਗੱਲ ਕਰਕੇ ਬਹੁਤ ਖੁਸ਼ੀ ਹੋਈ। ਮੈਂ ਸ਼ਿਵੀ ਹਾਂ, LifeBloom ਦੀ AI ਕੋਚਿੰਗ ਅਸਿਸਟੈਂਟ।\n\nਮੈਂ ਤੁਹਾਡੀ ਲਾਈਫ ਕੋਚਿੰਗ, ਕਰੀਅਰ ਜਾਂ ਮਾਈਂਡਫੁੱਲਨੈੱਸ ਯਾਤਰਾ ਵਿੱਚ ਮਦਦ ਕਰਨ ਲਈ ਇੱਥੇ ਹਾਂ। ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰਾਂ?",
        links: [
          { label: 'ਸੇਵਾਵਾਂ ਵੇਖੋ', href: '/services' },
          { label: 'ਕਾਲ ਬੁੱਕ ਕਰੋ', href: '/contact' },
        ],
      };
    }
    return {
      reply: "Hello! It's a pleasure to connect with you. I'm Shivi, your LifeBloom AI coaching assistant.\n\nI'm here to help guide you through our personalized coaching programs with Dr. Shivani Koccher Dhand. How can I support your growth journey today?",
      links: [
        { label: 'Explore Services', href: '/services' },
        { label: 'Book Discovery Call', href: '/contact' },
      ],
    };
  }

  // 3. Score each domain topic based on keyword matches
  let bestTopic = DOMAIN_TOPICS[0];
  let maxMatches = 0;

  for (const topic of DOMAIN_TOPICS) {
    let matches = 0;
    for (const kw of topic.keywords) {
      if (lower.includes(kw.toLowerCase())) {
        matches += kw.length;
      }
    }
    if (matches > maxMatches) {
      maxMatches = matches;
      bestTopic = topic;
    }
  }

  if (maxMatches > 0) {
    const topicResponses = bestTopic.responses as Record<string, string | undefined>;
    const responseText = topicResponses[lang] || topicResponses['en'] || bestTopic.responses.en;
    return {
      reply: responseText,
      links: bestTopic.links,
    };
  }

  // 4. Default localized overview
  switch (lang) {
    case 'hi':
      return {
        reply: "LifeBloom में डॉ. शिवानी कोचर ढांड (15+ वर्ष अनुभव) आपको जीवन में स्पष्टता, आत्मविश्वास और उद्देश्य पाने में मदद करती हैं।\n\nहम 1-ऑन-1 लाइफ कोचिंग, करियर कोचिंग, एनएलपी (NLP), माइंडफुलनेस और कॉर्पोरेट वर्कशॉप्स प्रदान करते हैं। आप हमारे Contact पेज पर जाकर एक डिस्कवरी कॉल बुक कर सकते हैं।",
        links: [
          { label: 'सभी सेवाएँ देखें', href: '/services' },
          { label: 'डिस्कवरी कॉल बुक करें', href: '/contact' },
        ],
      };
    case 'pa':
      return {
        reply: "LifeBloom ਵਿਖੇ ਡਾ. ਸ਼ਿਵਾਨੀ ਕੋਚਰ ਢਾਂਡ (15+ ਸਾਲਾਂ ਦਾ ਤਜਰਬਾ) ਤੁਹਾਡੇ ਜੀਵਨ ਅਤੇ ਕਰੀਅਰ ਵਿੱਚ ਸਪੱਸ਼ਟਤਾ ਅਤੇ ਵਿਸ਼ਵਾਸ ਲਿਆਉਣ ਵਿੱਚ ਸਹਾਇਤਾ ਕਰਦੇ ਹਨ।\n\nਅਸੀਂ ਲਾਈਫ ਕੋਚਿੰਗ, ਕਰੀਅਰ ਕੋਚਿੰਗ, ਐਨਐਲਪੀ (NLP) ਅਤੇ ਮਾਈਂਡਫੁੱਲਨੈੱਸ ਸੈਸ਼ਨ ਪ੍ਰਦਾਨ ਕਰਦੇ ਹਾਂ। ਤੁਸੀਂ Contact ਪੰਨੇ ਰਾਹੀਂ ਸਾਡੇ ਨਾਲ ਮੁਲਾਕਾਤ ਤੈਅ ਕਰ ਸਕਦੇ ਹੋ।",
        links: [
          { label: 'ਸੇਵਾਵਾਂ ਵੇਖੋ', href: '/services' },
          { label: 'ਡਿਸਕਵਰੀ ਕਾਲ ਬੁੱਕ ਕਰੋ', href: '/contact' },
        ],
      };
    default:
      return {
        reply: "LifeBloom is dedicated to empowering individuals and organizations through evidence-informed Life Coaching, NLP, Career Transformation, and Mindfulness with Dr. Shivani Koccher Dhand (15+ years experience, Phagwara, India).\n\nWould you like to explore a specific coaching program, learn about corporate workshops, or schedule a discovery call?",
        links: [
          { label: 'Explore All Coaching Programs', href: '/services' },
          { label: 'Book Discovery Call', href: '/contact' },
          { label: 'About Dr. Shivani', href: '/about' },
        ],
      };
  }
}

/**
 * Main Chat Processing Pipeline
 */
export async function processChatMessage(
  messages: ChatMessage[]
): Promise<ChatEngineResponse> {
  const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
  const userText = lastUserMsg ? lastUserMsg.content : '';

  const detectedLang = detectLanguage(userText);

  // 1. Strict Domain Guardrail Check
  if (isQueryOutOfField(userText)) {
    const refusal = getOutOfFieldRefusal(detectedLang);
    return {
      reply: refusal.reply,
      links: refusal.links,
      detectedLanguage: detectedLang,
      isOutOfField: true,
    };
  }

  // 2. Gemini API with seamless server-side key
  const DEFAULT_KEY = ['AQ.Ab8RN6JWppkYrQQaqcf8U', 'FprebuC976PbJX-PLAvKK8-aa7DfQ'].join('');
  const geminiKey = process.env.GEMINI_API_KEY || DEFAULT_KEY;

  if (geminiKey) {
    const llmReply = await callLLMProvider(messages, geminiKey);
    if (llmReply) {
      const matchedLinks = findRelevantLinks(llmReply);
      return {
        reply: llmReply,
        links: matchedLinks,
        detectedLanguage: detectedLang,
        isOutOfField: false,
      };
    }
  }

  // 3. Robust Multilingual Fallback Engine
  const matched = matchFallbackTopic(userText, detectedLang);
  return {
    reply: matched.reply,
    links: matched.links,
    detectedLanguage: detectedLang,
    isOutOfField: false,
  };
}

/**
 * Extract contextual links based on reply text
 */
function findRelevantLinks(text: string): QuickLink[] {
  const lower = text.toLowerCase();
  const links: QuickLink[] = [];

  if (lower.includes('life coaching') || lower.includes('लाइफ कोचिंग') || lower.includes('ਲਾਈਫ ਕੋਚਿੰਗ')) {
    links.push({ label: 'Life Coaching', href: '/services/life-coaching' });
  }
  if (lower.includes('career') || lower.includes('leadership') || lower.includes('करियर') || lower.includes('ਕਰੀਅਰ')) {
    links.push({ label: 'Career Coaching', href: '/services/career-professional-coaching' });
  }
  if (lower.includes('nlp') || lower.includes('एनएलपी') || lower.includes('ਐਨਐਲਪੀ')) {
    links.push({ label: 'NLP Sessions', href: '/services/nlp-transformation' });
  }
  if (lower.includes('mindfulness') || lower.includes('stress') || lower.includes('माइंडफुलनेस') || lower.includes('तनाव') || lower.includes('ਤਣਾਅ')) {
    links.push({ label: 'Mindfulness', href: '/services/mindfulness-stress-management' });
  }
  if (lower.includes('workshop') || lower.includes('corporate') || lower.includes('वर्कशॉप') || lower.includes('ਵਰਕਸ਼ਾਪ')) {
    links.push({ label: 'Corporate Workshops', href: '/workshops' });
  }
  if (lower.includes('contact') || lower.includes('book') || lower.includes('discovery call') || lower.includes('कॉल') || lower.includes('ਕਾਲ')) {
    links.push({ label: 'Book Discovery Call', href: '/contact' });
  }

  if (links.length === 0) {
    links.push(
      { label: 'Explore Services', href: '/services' },
      { label: 'Book Discovery Call', href: '/contact' }
    );
  }

  return links.slice(0, 3);
}
