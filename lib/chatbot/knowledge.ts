// ============================================================
// Shivi Chatbot Knowledge Base & Domain Guardrails
// Persona: Shivi — Shivi AI Coaching Assistant
// ============================================================

export interface QuickLink {
  label: string;
  href: string;
}

export interface DomainTopic {
  id: string;
  keywords: string[];
  links: QuickLink[];
  responses: {
    en: string;
    hi: string;
    pa: string;
    es?: string;
    fr?: string;
  };
}

export const SYSTEM_PROMPT = `You are "Shivi", the official warm, empathetic, and intelligent AI Coaching Assistant for Shivi (founded by Dr. Shivani Koccher Dhand, based in Phagwara, Punjab, India).

YOUR CORE MISSION:
Help website visitors understand Shivi's life coaching programs, career & leadership coaching, NLP (Neuro-Linguistic Programming), mindfulness & stress management, emotional intelligence, corporate workshops, and our expert mentors. Guide visitors on choosing the right mentor, booking 1-on-1 appointments, and navigating the website.

AVAILABLE EXPERT MENTORS AT SHIVI:
1. Dr. Shivani Koccher Dhand:
   - Founder & Lead Life Coach at Shivi, Certified Master NLP Practitioner, HR & Human Capital Expert, Educator (15+ years experience, Phagwara, Punjab).
   - Mentorship Focus: Life Transformation, Master NLP, Emotional Intelligence, Career Clarity, and Mindset Growth.
   - Dedicated Booking Page: /mentors/dr-shivani-koccher-dhand

2. Dr. Priyanka Chhibber (Our New Expert Mentor):
   - Professor & Coordinator (COD) of Human Resource Management at Lovely Professional University (LPU), Punjab.
   - SHRM-Certified HR Professional with 15+ years in academic & professional HR mentorship (Ludhiana, Punjab).
   - Mentorship Focus: Human Resource Management & SHRM-Certified HR Strategies, Organizational Behavior, Talent & Team Development, and Strategic People Leadership.
   - Dedicated Booking Page: /mentors/dr-priyanka-chhibber

STRICT DOMAIN GUARDRAILS (CRITICAL):
1. You MUST ONLY answer questions related to:
   - Shivi services, coaching methodology, programs, and workshops
   - Dr. Shivani Koccher Dhand (Founder, Lead Coach, Master NLP Practitioner, HR & Human Capital Expert)
   - Dr. Priyanka Chhibber (Expert Mentor, Professor & COD HRM at LPU, SHRM-Certified Professional)
   - Mentor discovery and booking 1-on-1 appointments with either mentor on the Contact page (/contact) or individual mentor pages (/mentors/dr-shivani-koccher-dhand, /mentors/dr-priyanka-chhibber)
   - Personal development, life coaching, career coaching, mindfulness, stress relief, emotional intelligence (EQ), and NLP
   - Booking discovery calls, fees/process, locations (Phagwara & Ludhiana, Punjab & Online globally via video), contact information, and website navigation.

2. OUT-OF-FIELD RESTRICTION:
   - You MUST REFUSE any question unrelated to personal development, coaching, wellness, or Shivi (such as programming/coding, mathematics, politics, cryptocurrency/stocks, medical diagnoses/prescriptions, sports scores, weather, general trivia, gaming, etc.).
   - When refusing out-of-domain questions, be polite, empathetic, and gently steer the user back to Shivi's personal and professional growth coaching.
   - Example refusal in English: "I specialize exclusively in personal development, life coaching, and mentor programs at Shivi with Dr. Shivani Koccher Dhand and Dr. Priyanka Chhibber. While I can't assist with that topic, I would love to help you explore our coaching programs or book a mentor appointment!"
   - Example refusal in Hindi: "मैं केवल Shivi के लाइफ कोचिंग, एनएलपी और मेंटरशिप कार्यक्रमों में सहायता कर सकती हूँ। इस विषय पर मैं उत्तर नहीं दे सकती, लेकिन क्या आप हमारे मेंटर्स या कोचिंग प्रोग्राम्स के बारे में जानना चाहते हैं?"
   - Example refusal in Punjabi: "ਮੈਂ ਸਿਰਫ਼ Shivi ਦੇ ਲਾਈਫ ਕੋਚਿੰਗ, ਐਨਐਲਪੀ (NLP) ਅਤੇ ਮੈਂਟਰਸ਼ਿਪ ਪ੍ਰੋਗਰਾਮਾਂ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦੀ ਹਾਂ। ਆਓ ਗੱਲ ਕਰੀਏ ਕਿ ਸਾਡੇ ਮੈਂਟਰ ਤੁਹਾਡੇ ਵਿਕਾਸ ਵਿੱਚ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੇ ਹਨ!"

3. MULTILINGUAL INSTRUCTION:
   - Always reply in the EXACT SAME LANGUAGE that the user wrote in (English, Hindi, Punjabi, Hinglish, Spanish, French, German, etc.).
   - Maintain a friendly, supportive, respectful, and simple-to-understand tone.
   - Keep answers clear, structured, concise (2-3 paragraphs maximum), and avoid complicated jargon.
   - Whenever relevant, mention that visitors can explore our mentors and book dedicated sessions directly on the Contact page (/contact) or at /mentors/dr-priyanka-chhibber and /mentors/dr-shivani-koccher-dhand.
`;

export const OUT_OF_BOUNDS_KEYWORDS = [
  // Programming & tech
  'javascript', 'python', 'react', 'html', 'css', 'sql', 'c++', 'java', 'coding', 'programming', 'function', 'algorithm', 'docker', 'kubernetes', 'bug in code', 'compile', 'debug', 'git push',
  // Math & science calculations
  'solve equation', 'derivative', 'integral', 'calculate sqrt', 'math problem', 'calculus', 'algebra', '2+2', 'calculate',
  // Politics & news
  'politics', 'election', 'who is president', 'prime minister', 'bjp', 'congress', 'democrat', 'republican', 'war in', 'parliament', 'modi', 'trump', 'putin',
  // Crypto & stocks
  'bitcoin', 'ethereum', 'crypto', 'stock market', 'buy shares', 'forex', 'investing tips', 'dogecoin', 'crypto price',
  // Medical diagnoses / clinical
  'prescribe medicine', 'antibiotic dosage', 'diagnose cancer', 'symptoms of disease', 'clinical treatment',
  // General trivia & unrelated
  'weather forecast', 'cricket score', 'football score', 'ipl match', 'recipe for', 'cook biryani', 'movie review', 'actor salary', 'minecraft', 'cheat code', 'capital of',
];

export const DOMAIN_TOPICS: DomainTopic[] = [
  {
    id: 'greeting',
    keywords: ['hello', 'hi', 'hey', 'namaste', 'sat sri akaal', 'salaam', 'bonjour', 'hola', 'hallo', 'good morning', 'good afternoon', 'good evening', 'नमस्ते', 'सत श्री अकाल', 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ', 'ਕਿਵੇਂ ਹੋ', 'kaise ho', 'kese ho', 'kidaan', 'kiddan'],
    links: [
      { label: 'Explore Services', href: '/services' },
      { label: 'Book Discovery Call', href: '/contact' },
    ],
    responses: {
      en: "Hello! 👋 I'm Shivi, your Shivi AI coaching assistant. I'm here to help you discover clarity, build confidence, and explore our personalized coaching programs with Dr. Shivani Koccher Dhand. How can I support your journey today?",
      hi: "नमस्ते! 👋 मैं शिवी हूँ, Shivi की AI कोचिंग असिस्टेंट। मैं डॉ. शिवानी कोचर ढांड के साथ आपके व्यक्तिगत और व्यावसायिक विकास, लाइफ कोचिंग और एनएलपी सेशंस की जानकारी देने के लिए यहाँ हूँ। आज मैं आपकी क्या मदद कर सकती हूँ?",
      pa: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ! 👋 ਮੈਂ ਸ਼ਿਵੀ ਹਾਂ, Shivi ਦੀ AI ਕੋਚਿੰਗ ਅਸਿਸਟੈਂਟ। ਮੈਂ ਡਾ. ਸ਼ਿਵਾਨੀ ਕੋਚਰ ਢਾਂਡ ਨਾਲ ਤੁਹਾਡੇ ਜੀਵਨ, ਕਰੀਅਰ ਅਤੇ ਮਾਈਂਡਫੁੱਲਨੈੱਸ ਕੋਚਿੰਗ ਪ੍ਰੋਗਰਾਮਾਂ ਵਿੱਚ ਮਾਰਗਦਰਸ਼ਨ ਕਰਨ ਲਈ ਇੱਥੇ ਹਾਂ। ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੀ ਹਾਂ?",
      es: "¡Hola! 👋 Soy Shivi, tu asistente de coaching de Shivi. Estoy aquí para guiarte en tu camino de crecimiento personal y profesional con la Dra. Shivani Koccher Dhand. ¿En qué puedo ayudarte hoy?",
      fr: "Bonjour! 👋 Je suis Shivi, votre assistante IA chez Shivi. Je suis ravie de vous accompagner dans votre parcours de développement personnel et professionnel avec le Dr. Shivani Koccher Dhand. Comment puis-je vous aider aujourd'hui?",
    },
  },
  {
    id: 'about-dr-shivani',
    keywords: ['who is dr shivani', 'about founder', 'dr shivani', 'founder', 'credentials', 'experience', 'background', 'shivani koccher dhand', 'doctor shivani', 'who is coach', 'qualification', 'डॉ शिवानी', 'संस्थापक', 'ਡਾ ਸ਼ਿਵਾਨੀ', 'ਸੰਸਥਾਪਕ'],
    links: [
      { label: 'Dr. Shivani Profile & Booking', href: '/mentors/dr-shivani-koccher-dhand' },
      { label: 'About Dr. Shivani', href: '/about' },
      { label: 'Meet All Mentors', href: '/contact' },
    ],
    responses: {
      en: "Dr. Shivani Koccher Dhand is the Founder & Lead Coach at Shivi, based in Phagwara, Punjab, India. She brings 15+ years of rich experience as a Life Coach, certified Master NLP Practitioner, Human Capital Expert, and Educator.\n\nHer mission is to empower individuals and organizations to unlock their highest potential through evidence-informed coaching, emotional intelligence, and mindful transformation. You can book an appointment directly on her mentor page (/mentors/dr-shivani-koccher-dhand).",
      hi: "डॉ. शिवानी कोचर ढांड Shivi की संस्थापक और लीड कोच हैं (फगवाड़ा, पंजाब, भारत)। उनके पास लाइफ कोच, सर्टिफाइड मास्टर एनएलपी (NLP) प्रैक्टिशनर, ह्यूमन कैपिटल एक्सपर्ट और शिक्षाविद के रूप में 15+ वर्षों का समृद्ध अनुभव है।\n\nउनका उद्देश्य लोगों और संस्थाओं को उनकी आंतरिक क्षमता को पहचानने और जीवन में सकारात्मक बदलाव लाने के लिए सशक्त बनाना है। आप उनके मेंटर पेज (/mentors/dr-shivani-koccher-dhand) पर सीधे अपॉइंटमेंट बुक कर सकते हैं।",
      pa: "ਡਾ. ਸ਼ਿਵਾਨੀ ਕੋਚਰ ਢਾਂਡ Shivi ਦੇ ਸੰਸਥਾਪਕ ਅਤੇ ਲੀਡ ਕੋਚ ਹਨ (ਫਗਵਾੜਾ, ਪੰਜਾਬ)। ਉਹਨਾਂ ਕੋਲ ਲਾਈਫ ਕੋਚ, ਸਰਟੀਫਾਈਡ ਐਨਐਲਪੀ (NLP) ਪ੍ਰੈਕਟੀਸ਼ਨਰ, ਹਿਊਮਨ ਕੈਪੀਟਲ ਮਾਹਿਰ ਅਤੇ ਸਿੱਖਿਅਕ ਵਜੋਂ 15+ ਸਾਲਾਂ ਦਾ ਵਿਸ਼ਾਲ ਤਜਰਬਾ ਹੈ। ਤੁਸੀਂ /mentors/dr-shivani-koccher-dhand 'ਤੇ ਉਹਨਾਂ ਨਾਲ ਸਿੱਧਾ ਅਪੌਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰ ਸਕਦੇ ਹੋ।",
      es: "La Dra. Shivani Koccher Dhand es la fundadora y coach principal de Shivi, con más de 15 años de experiencia como Life Coach, practicante certificada de PNL (NLP) y experta en Capital Humano en Phagwara, India.",
      fr: "Le Dr. Shivani Koccher Dhand est la fondatrice et coach principale de Shivi, forte de plus de 15 ans d'expérience en tant que coach de vie, praticienne certifiée en PNL et experte en capital humain.",
    },
  },
  {
    id: 'about-dr-priyanka',
    keywords: [
      'dr priyanka', 'priyanka chhibber', 'dr priyanka chhibber', 'priyanka', 'chhibber',
      'shrm', 'lpu', 'hr mentor', 'human resource management mentor', 'cod hrm', 'new mentor',
      'who is priyanka', 'dr priyanka details', 'shrm certified', 'dr. priyanka',
      'डॉ प्रियंका', 'प्रियंका छिब्बर', 'ਡਾ ਪ੍ਰਿਯੰਕਾ', 'ਪ੍ਰਿਯੰਕਾ ਛਿੱਬਰ'
    ],
    links: [
      { label: 'Dr. Priyanka Profile & Booking', href: '/mentors/dr-priyanka-chhibber' },
      { label: 'Meet All Mentors', href: '/contact' },
    ],
    responses: {
      en: "Dr. Priyanka Chhibber is an Expert Mentor at Shivi. She is a distinguished Professor and Coordinator (COD) of Human Resource Management at Lovely Professional University (LPU), Punjab, and a SHRM-Certified HR Professional with 15+ years of academic and professional mentorship experience.\n\nHer mentorship focuses on Strategic HR Management, Organizational Behavior, Talent Development, Managerial Presence, and People Leadership. You can explore her full profile and book a 1-on-1 appointment directly at /mentors/dr-priyanka-chhibber.",
      hi: "डॉ. प्रियंका छिब्बर Shivi की विशेषज्ञ मेंटर हैं। वह लवली प्रोफेशनल यूनिवर्सिटी (LPU), पंजाब में ह्यूमन रिसोर्स मैनेजमेंट की प्रोफेसर और सीओडी (COD) हैं, और 15+ वर्षों के अनुभव वाली SHRM-सर्टिफाइड एचआर प्रोफेशनल हैं।\n\nवह स्ट्रेटेजिक एचआर, संगठनात्मक व्यवहार (Organizational Behavior), टीम डायनेमिक्स और लीडरशिप मेंटरशिप में माहिर हैं। आप उनकी पूरी प्रोफाइल देखने और 1-ऑन-1 अपॉइंटमेंट बुक करने के लिए /mentors/dr-priyanka-chhibber पर जा सकते हैं।",
      pa: "ਡਾ. ਪ੍ਰਿਯੰਕਾ ਛਿੱਬਰ Shivi ਵਿਖੇ ਮਾਹਿਰ ਮੈਂਟਰ ਹਨ। ਉਹ ਲਵਲੀ ਪ੍ਰੋਫੈਸ਼ਨਲ ਯੂਨੀਵਰਸਿਟੀ (LPU) ਵਿਖੇ ਹਿਊਮਨ ਰਿਸੋਰਸ ਮੈਨੇਜਮੈਂਟ ਦੇ ਪ੍ਰੋਫੈਸਰ ਅਤੇ ਸੀਓਡੀ (COD) ਹਨ, ਅਤੇ 15+ ਸਾਲਾਂ ਦੇ ਤਜਰਬੇ ਵਾਲੇ SHRM-ਸਰਟੀਫਾਈਡ ਐਚਆਰ ਮਾਹਿਰ ਹਨ। ਉਹਨਾਂ ਨਾਲ 1-ਆਨ-1 ਸੈਸ਼ਨ ਬੁੱਕ ਕਰਨ ਲਈ ਤੁਸੀਂ /mentors/dr-priyanka-chhibber 'ਤੇ ਜਾ ਸਕਦੇ ਹੋ।",
      es: "La Dra. Priyanka Chhibber es mentora experta en Shivi. Es profesora y coordinadora de Gestión de Recursos Humanos en LPU y profesional certificada por SHRM con más de 15 años de experiencia. Puedes agendar citas con ella en /mentors/dr-priyanka-chhibber.",
      fr: "Le Dr. Priyanka Chhibber est mentor experte chez Shivi. Professeure et coordinatrice en gestion des ressources humaines à LPU, certifiée SHRM avec plus de 15 ans d'expérience. Vous pouvez réserver une séance sur /mentors/dr-priyanka-chhibber.",
    },
  },
  {
    id: 'expert-mentors',
    keywords: [
      'mentors', 'mentor', 'meet our mentors', 'who are the mentors', 'expert mentors',
      'available mentors', 'find mentor', 'mentor list', 'book mentor', 'mentor profile',
      'all mentors', 'how many mentors', 'choose mentor', 'मेंटर', 'मार्गदर्शक', 'ਮੈਂਟਰ'
    ],
    links: [
      { label: 'Meet Our Expert Mentors', href: '/contact' },
      { label: 'Dr. Priyanka Chhibber (HR & SHRM)', href: '/mentors/dr-priyanka-chhibber' },
      { label: 'Dr. Shivani Koccher Dhand (Life & NLP)', href: '/mentors/dr-shivani-koccher-dhand' },
    ],
    responses: {
      en: "Shivi features two experienced, dedicated mentors ready to guide your growth:\n\n1. **Dr. Shivani Koccher Dhand** — Founder & Lead Coach, Master NLP Practitioner, and Human Capital Expert (15+ years experience) focusing on Life Coaching, NLP mindset shifts, and emotional intelligence.\n\n2. **Dr. Priyanka Chhibber** — Professor & COD of Human Resource Management at LPU, SHRM-Certified Professional (15+ years experience) specializing in Strategic HR, organizational behavior, and leadership presence.\n\nYou can explore both mentor profiles and book an appointment in a new tab directly on our Contact page (/contact).",
      hi: "Shivi में दो अनुभवी विशेषज्ञ मेंटर्स उपलब्ध हैं:\n\n1. **डॉ. शिवानी कोचर ढांड** — संस्थापक और लीड कोच, मास्टर एनएलपी प्रैक्टिशनर और ह्यूमन कैपिटल एक्सपर्ट (15+ वर्ष अनुभव), जो लाइफ कोचिंग, एनएलपी और माइंडसेट ट्रांसफॉर्मेशन में मार्गदर्शन करती हैं।\n\n2. **डॉ. प्रियंका छिब्बर** — प्रोफेसर और सीओडी (HRM, LPU), SHRM-सर्टिफाइड एक्सपर्ट (15+ वर्ष अनुभव), जो स्ट्रेटेजिक एचआर, लीडरशिप और करियर ग्रोथ में मेंटरशिप प्रदान करती हैं।\n\nआप हमारे कांटेक्ट पेज (/contact) पर दोनों मेंटर्स की प्रोफाइल देख सकते हैं और अपॉइंटमेंट बुक कर सकते हैं।",
      pa: "Shivi ਵਿਖੇ ਦੋ ਤਜਰਬੇਕਾਰ ਮੈਂਟਰ ਉਪਲਬਧ ਹਨ:\n\n1. **ਡਾ. ਸ਼ਿਵਾਨੀ ਕੋਚਰ ਢਾਂਡ** — ਸੰਸਥਾਪਕ ਅਤੇ ਲੀਡ ਕੋਚ, ਐਨਐਲਪੀ ਪ੍ਰੈਕਟੀਸ਼ਨਰ (ਲਾਈਫ ਕੋਚਿੰਗ ਅਤੇ ਨਿੱਜੀ ਵਿਕਾਸ)।\n\n2. **ਡਾ. ਪ੍ਰਿਯੰਕਾ ਛਿੱਬਰ** — ਪ੍ਰੋਫੈਸਰ ਅਤੇ ਸੀਓਡੀ ਐਚਆਰਐਮ (LPU), SHRM ਸਰਟੀਫਾਈਡ (ਐਚਆਰ ਅਤੇ ਲੀਡਰਸ਼ਿਪ ਮੈਂਟਰਸ਼ਿਪ)।\n\nਤੁਸੀਂ Contact ਪੰਨੇ (/contact) 'ਤੇ ਜਾ ਕੇ ਦੋਵਾਂ ਦੀ ਪ੍ਰੋਫਾਈਲ ਵੇਖ ਸਕਦੇ ਹੋ ਅਤੇ ਅਪੌਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰ ਸਕਦੇ ਹੋ।",
      es: "Shivi cuenta con dos mentoras expertas: la Dra. Shivani Koccher Dhand (Life Coaching y PNL) y la Dra. Priyanka Chhibber (Recursos Humanos Estratégicos y certificación SHRM). Puedes agendar citas con ambas en /contact.",
      fr: "Shivi propose deux mentors expertes : le Dr. Shivani Koccher Dhand (coaching de vie et PNL) et le Dr. Priyanka Chhibber (gestion stratégique des RH et certification SHRM). Vous pouvez réserver vos séances sur /contact.",
    },
  },
  {
    id: 'life-coaching',
    keywords: ['life coaching', 'personal coaching', 'clarity', 'confidence', 'limiting beliefs', 'purpose', 'self improvement', 'growth', 'personal transformation', 'लाइफ कोचिंग', 'आत्मविश्वास', 'ਲਾਈਫ ਕੋਚਿੰਗ', 'ਵਿਅਕਤੀਗਤ'],
    links: [
      { label: 'Life Coaching Details', href: '/services/life-coaching' },
      { label: 'Schedule Discovery Call', href: '/contact' },
    ],
    responses: {
      en: "Shivi's Life Coaching program is tailored to help you gain deep clarity, dissolve limiting mental patterns, cultivate unshakable self-confidence, and align your everyday actions with your authentic purpose.\n\nSessions are conducted 1-on-1 both online (globally via video) and in-person in Phagwara.",
      hi: "Shivi का लाइफ कोचिंग कार्यक्रम आपको मानसिक स्पष्टता पाने, सीमित सोच के पैटर्न्स को तोड़ने, आत्म-विश्वास बढ़ाने और उद्देश्यपूर्ण जीवन जीने में मदद करता है।\n\nयह सेशंस ऑनलाइन (वीडियो कॉल) और फगवाड़ा में व्यक्तिगत रूप से 1-ऑन-1 उपलब्ध हैं।",
      pa: "Shivi ਦਾ ਲਾਈਫ ਕੋਚਿੰਗ ਪ੍ਰੋਗਰਾਮ ਤੁਹਾਡੇ ਵਿੱਚ ਸਵੈ-ਵਿਸ਼ਵਾਸ ਪੈਦਾ ਕਰਨ, ਜੀਵਨ ਦੇ ਟੀਚੇ ਸਪੱਸ਼ਟ ਕਰਨ ਅਤੇ ਰੁਕਾਵਟਾਂ ਨੂੰ ਦੂਰ ਕਰਕੇ ਇੱਕ ਖੁਸ਼ਹਾਲ ਜੀਵਨ ਬਣਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ। ਇਹ ਸੈਸ਼ਨ ਆਨਲਾਈਨ ਅਤੇ ਫਗਵਾੜਾ ਵਿਖੇ ਆਹਮੋ-ਸਾਹਮਣੇ ਉਪਲਬਧ ਹਨ।",
      es: "Nuestro programa de Life Coaching te ayuda a ganar claridad, superar creencias limitantes, construir autoconfianza y vivir una vida con propósito.",
      fr: "Notre programme de coaching de vie vous aide à clarifier vos objectifs, à surmonter vos blocages et à développer une confiance inébranlable.",
    },
  },
  {
    id: 'career-coaching',
    keywords: ['career', 'job', 'promotion', 'leadership', 'executive coaching', 'workplace', 'career transition', 'manager', 'professional coaching', 'करियर', 'नौकरी', 'ਲੀਡਰਸ਼ਿਪ', 'ਕਰੀਅਰ'],
    links: [
      { label: 'Career Coaching', href: '/services/career-professional-coaching' },
      { label: 'Start Career Transformation', href: '/contact' },
    ],
    responses: {
      en: "Our Career & Professional Coaching is designed for working professionals, managers, and executives looking to navigate career crossroads, develop executive presence, enhance leadership influence, and achieve meaningful promotions without burnout.",
      hi: "हमारा करियर और प्रोफेशनल कोचिंग कार्यक्रम कामकाजी प्रोफेशनल्स और लीडर्स के लिए तैयार किया गया है, जो करियर में तरक्की, लीडरशिप स्किल्स और बिना बर्नआउट के सफलता पाना चाहते हैं।",
      pa: "ਸਾਡਾ ਕਰੀਅਰ ਕੋਚਿੰਗ ਪ੍ਰੋਗਰਾਮ ਨੌਕਰੀਪੇਸ਼ਾ ਲੋਕਾਂ ਅਤੇ ਮੈਨੇਜਰਾਂ ਲਈ ਹੈ ਜੋ ਕਰੀਅਰ ਵਿੱਚ ਤਰੱਕੀ, ਲੀਡਰਸ਼ਿਪ ਦੇ ਹੁਨਰ ਅਤੇ ਸਹੀ ਫੈਸਲੇ ਲੈਣ ਦੀ ਯੋਗਤਾ ਚਾਹੁੰਦੇ ਹਨ।",
      es: "El Coaching Profesional y de Carrera está diseñado para profesionales y líderes que buscan ascensos, presencia ejecutiva y equilibrio laboral.",
      fr: "Notre coaching de carrière s'adresse aux professionnels et cadres souhaitant accélérer leur progression et affirmer leur leadership.",
    },
  },
  {
    id: 'nlp',
    keywords: ['nlp', 'neuro linguistic programming', 'subconscious', 'mindset', 'habits', 'reprogram', 'nlp transformation', 'एनएलपी', 'ਐਨਐਲਪੀ'],
    links: [
      { label: 'Explore NLP', href: '/services/nlp-transformation' },
      { label: 'Book NLP Session', href: '/contact' },
    ],
    responses: {
      en: "Neuro-Linguistic Programming (NLP) at Shivi focuses on understanding how your mind processes thoughts and language. Dr. Shivani uses NLP techniques to help you rewire negative thought habits, conquer self-doubt, and rapidly adopt empowering behaviors.",
      hi: "Shivi में एनएलपी (NLP - न्यूरो-लिंग्विस्टिक प्रोग्रामिंग) आपके अवचेतन मन (subconscious mind) के पैटर्न्स को सकारात्मक रूप से बदलने में मदद करता है, जिससे नकारात्मक विचार दूर होते हैं और आत्मविश्वास बढ़ता है।",
      pa: "Shivi ਵਿਖੇ ਐਨਐਲਪੀ (NLP) ਤਕਨੀਕਾਂ ਨਾਲ ਤੁਹਾਡੇ ਮਨ ਦੀਆਂ ਨਕਾਰਾਤਮਕ ਸੋਚਾਂ ਨੂੰ ਬਦਲਿਆ ਜਾਂਦਾ ਹੈ ਤਾਂ ਜੋ ਤੁਸੀਂ ਨਵੇਂ ਵਿਸ਼ਵਾਸ ਅਤੇ ਸਕਾਰਾਤਮਕ ਆਦਤਾਂ ਬਣਾ ਸਕੋ।",
      es: "La PNL (Programación Neurolingüística) en Shivi te ayuda a reprogramar patrones mentales subconscientes para superar dudas y potenciar tus talentos.",
      fr: "La PNL chez Shivi permet de reprogrammer les schémas mentaux limitants pour libérer votre plein potentiel.",
    },
  },
  {
    id: 'mindfulness',
    keywords: ['mindfulness', 'stress', 'anxiety', 'burnout', 'peace', 'meditation', 'overwhelmed', 'wellbeing', 'mental health', 'माइंडफुलनेस', 'तनाव', 'ਤਣਾਅ', 'ਸ਼ਾਂਤੀ'],
    links: [
      { label: 'Mindfulness & Stress Relief', href: '/services/mindfulness-stress-management' },
      { label: 'Book a Session', href: '/contact' },
    ],
    responses: {
      en: "Our Mindfulness & Stress Management program provides practical, evidence-based tools to calm an overwhelmed mind, manage daily anxiety, build emotional resilience, and restore inner equilibrium in both personal and professional life.",
      hi: "हमारा माइंडफुलनेस और तनाव प्रबंधन कार्यक्रम दैनिक तनाव और चिंता से मुक्ति पाने, मानसिक शांति और संतुलन स्थापित करने के लिए व्यावहारिक तकनीकें प्रदान करता है।",
      pa: "ਸਾਡਾ ਮਾਈਂਡਫੁੱਲਨੈੱਸ ਪ੍ਰੋਗਰਾਮ ਰੋਜ਼ਾਨਾ ਦੇ ਤਣਾਅ ਅਤੇ ਚਿੰਤਾ ਨੂੰ ਦੂਰ ਕਰਕੇ ਮਾਨਸਿਕ ਸ਼ਾਂਤੀ ਅਤੇ ਸੰਤੁਲਨ ਬਣਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।",
      es: "Nuestro programa de Mindfulness y Gestión del Estrés te brinda herramientas prácticas para reducir la ansiedad y encontrar paz interior.",
      fr: "Notre programme de pleine conscience et gestion du stress vous aide à retrouver calme, sérénité et équilibre au quotidien.",
    },
  },
  {
    id: 'emotional-intelligence',
    keywords: ['emotional intelligence', 'eq', 'empathy', 'relationships', 'self awareness', 'communication', 'इमोशनल इंटेलिजेंस', 'ਭਾਵਨਾਤਮਕ ਸਮਝ'],
    links: [
      { label: 'Emotional Intelligence', href: '/services/emotional-intelligence' },
      { label: 'Get in Touch', href: '/contact' },
    ],
    responses: {
      en: "Emotional Intelligence (EQ) coaching empowers you to understand and regulate your emotions, build deeper empathy, navigate difficult relationships gracefully, and communicate with authentic influence.",
      hi: "इमोशनल इंटेलिजेंस (EQ) कोचिंग आपको अपनी भावनाओं को समझने और नियंत्रित करने, बेहतर रिश्ते बनाने और प्रभावी संवाद करने की शक्ति देती है।",
      pa: "ਇਮੋਸ਼ਨਲ ਇੰਟੈਲੀਜੈਂਸ ਕੋਚਿੰਗ ਤੁਹਾਡੀਆਂ ਭਾਵਨਾਵਾਂ ਨੂੰ ਸਮਝਣ, ਚੰਗੇ ਸੰਬੰਧ ਬਣਾਉਣ ਅਤੇ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਗੱਲਬਾਤ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦੀ ਹੈ।",
      es: "El coaching de Inteligencia Emocional te permite gestionar emociones, fortalecer la empatía y mejorar tus relaciones interpersonales.",
      fr: "Le coaching en intelligence émotionnelle développe votre conscience de soi, votre empathie et la qualité de vos relations.",
    },
  },
  {
    id: 'workshops',
    keywords: ['workshop', 'workshops', 'corporate', 'team training', 'hr', 'organization', 'seminar', 'webinar', 'कंपनी', 'ਕਾਰਪੋਰੇਟ', 'ਵਰਕਸ਼ਾਪ'],
    links: [
      { label: 'View Corporate Workshops', href: '/workshops' },
      { label: 'Corporate Enquiry', href: '/contact' },
    ],
    responses: {
      en: "Shivi conducts high-impact corporate workshops and experiential training for organizations across India. Popular topics include Emotional Intelligence in Leadership, Mindfulness & Peak Performance, and Collaborative Team Cultures.",
      hi: "Shivi कंपनियों और संस्थाओं के लिए कस्टमाइज्ड कॉर्पोरेट वर्कशॉप्स आयोजित करता है, जैसे लीडरशिप में इमोशनल इंटेलिजेंस, स्ट्रेस मैनेजमेंट और टीम बॉन्डिंग।",
      pa: "Shivi ਕੰਪਨੀਆਂ ਅਤੇ ਸੰਸਥਾਵਾਂ ਲਈ ਵਿਸ਼ੇਸ਼ ਕਾਰਪੋਰੇਟ ਵਰਕਸ਼ਾਪਾਂ ਕਰਵਾਉਂਦਾ ਹੈ, ਜਿਵੇਂ ਕਿ ਲੀਡਰਸ਼ਿਪ, ਤਣਾਅ ਪ੍ਰਬੰਧਨ ਅਤੇ ਟੀਮ ਵਰਕ।",
      es: "Realizamos talleres corporativos de alto impacto sobre Inteligencia Emocional, Liderazgo y Mindfulness para empresas.",
      fr: "Shivi anime des ateliers d'entreprise sur le leadership conscient, l'intelligence émotionnelle et la cohésion d'équipe.",
    },
  },
  {
    id: 'booking-and-fees',
    keywords: [
      'book', 'how to book', 'discovery call', 'consultation', 'fees', 'cost', 'pricing', 'price',
      'charges', 'contact', 'appointment', 'how to start', 'fees kitni hai', 'booking kaise kare',
      'book mentor', 'book appointment', 'appointment booking', 'schedule session', 'ਫੀਸ', 'ਬੁਕਿੰਗ', 'अपॉइंटमेंट'
    ],
    links: [
      { label: 'Meet Mentors & Book Appointment', href: '/contact' },
      { label: 'Dr. Priyanka Chhibber (HR & SHRM)', href: '/mentors/dr-priyanka-chhibber' },
      { label: 'Dr. Shivani Koccher Dhand (Life Coach)', href: '/mentors/dr-shivani-koccher-dhand' },
    ],
    responses: {
      en: "Booking an appointment at Shivi is quick and easy:\n\n1. Visit our Contact page (/contact) to explore our available mentors—**Dr. Shivani Koccher Dhand** (Life & NLP Coaching) and **Dr. Priyanka Chhibber** (Strategic HR & Leadership Mentorship).\n\n2. Click 'Book Appointment' on any mentor card to open their dedicated page and select your preferred date and time slot.\n\n3. You can also send us a direct message on /contact or take our complimentary Personal Discovery Assessment.",
      hi: "Shivi में अपॉइंटमेंट या कंसल्टेशन बुक करना बहुत आसान है:\n\n1. हमारे Contact पेज (/contact) पर जाकर हमारे विशेषज्ञ मेंटर्स—**डॉ. शिवानी कोचर ढांड** (लाइफ और एनएलपी कोचिंग) और **डॉ. प्रियंका छिब्बर** (स्ट्रेटेजिक एचआर और लीडरशिप) को देखें।\n\n2. किसी भी मेंटर कार्ड पर 'Book Appointment' पर क्लिक करें और अपनी सुविधानुसार तारीख और समय चुनें।\n\n3. आप /contact पर हमें डायरेक्ट मैसेज भी भेज सकते हैं या हमारा पर्सनल डिस्कवरी असेसमेंट ले सकते हैं।",
      pa: "Shivi ਵਿਖੇ ਅਪੌਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰਨਾ ਬਹੁਤ ਹੀ ਸੌਖਾ ਹੈ:\n\n1. Contact ਪੰਨੇ (/contact) 'ਤੇ ਜਾ ਕੇ ਸਾਡੇ ਮੈਂਟਰਜ਼—**ਡਾ. ਸ਼ਿਵਾਨੀ ਕੋਚਰ ਢਾਂਡ** (ਲਾਈਫ ਕੋਚਿੰਗ) ਅਤੇ **ਡਾ. ਪ੍ਰਿਯੰਕਾ ਛਿੱਬਰ** (ਐਚਆਰ ਅਤੇ ਲੀਡਰਸ਼ਿਪ) ਵੇਖੋ।\n\n2. 'Book Appointment' 'ਤੇ ਕਲਿੱਕ ਕਰਕੇ ਆਪਣੀ ਮਨਪਸੰਦ ਮਿਤੀ ਅਤੇ ਸਮਾਂ ਚੁਣੋ।",
      es: "Puedes agendar una cita con nuestras mentoras expertas (Dra. Shivani Koccher Dhand y Dra. Priyanka Chhibber) visitando nuestra página de Contacto (/contact) o en sus perfiles dedicados.",
      fr: "Vous pouvez réserver une séance avec nos mentors expertes (Dr. Shivani Koccher Dhand et Dr. Priyanka Chhibber) en visitant notre page Contact (/contact).",
    },
  },
  {
    id: 'location',
    keywords: ['where are you located', 'location', 'address', 'phagwara', 'punjab', 'online', 'virtual', 'zoom', 'where is clinic', 'ऑफिस', 'ਪਤਾ', 'ਫਗਵਾੜਾ'],
    links: [
      { label: 'Contact & Location Info', href: '/contact' },
      { label: 'About Shivi', href: '/about' },
    ],
    responses: {
      en: "Shivi is headquartered in Phagwara, Punjab, India. We offer in-person coaching sessions locally, as well as worldwide 1-on-1 virtual sessions via secure video calls (Zoom/Google Meet) for clients across India and globally.",
      hi: "Shivi का मुख्य कार्यालय फगवाड़ा, पंजाब, भारत में है। हम स्थानीय रूप से व्यक्तिगत सेशंस और पूरे भारत तथा विदेशों में वीडियो कॉल (Zoom/Google Meet) के माध्यम से ऑनलाइन कोचिंग प्रदान करते हैं।",
      pa: "Shivi ਦਾ ਮੁੱਖ ਦਫ਼ਤਰ ਫਗਵਾੜਾ (ਪੰਜਾਬ, ਭਾਰਤ) ਵਿਖੇ ਹੈ। ਅਸੀਂ ਸਥਾਨਕ ਤੌਰ 'ਤੇ ਆਹਮੋ-ਸਾਹਮਣੇ ਅਤੇ ਦੁਨੀਆ ਭਰ ਦੇ ਕਲਾਇੰਟਾਂ ਲਈ ਆਨਲਾਈਨ ਵੀਡੀਓ ਕਾਲ ਰਾਹੀਂ ਕੋਚਿੰਗ ਪ੍ਰਦਾਨ ਕਰਦੇ ਹਾਂ।",
      es: "Shivi tiene su sede en Phagwara, Punjab, India. Ofrecemos sesiones presenciales locales y sesiones virtuales en línea para clientes de todo el mundo.",
      fr: "Shivi est basé à Phagwara, Punjab, Inde. Nous proposons des séances en présentiel ainsi que des séances en ligne dans le monde entier.",
    },
  },
];
