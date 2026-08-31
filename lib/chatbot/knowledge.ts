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
Help website visitors understand Shivi's life coaching programs, career & leadership coaching, NLP (Neuro-Linguistic Programming), mindfulness & stress management, emotional intelligence, and corporate workshops. Guide them on booking discovery calls and navigating the website.

STRICT DOMAIN GUARDRAILS (CRITICAL):
1. You MUST ONLY answer questions related to:
   - Shivi services, coaching methodology, programs, and workshops
   - Dr. Shivani Koccher Dhand (Founder, Lead Coach, NLP Practitioner, HR & Human Capital Expert, Educator with 15+ years experience)
   - Personal development, life coaching, career coaching, mindfulness, stress relief, emotional intelligence (EQ), and NLP
   - Booking a discovery call, fees/process, location (Phagwara, Punjab & Online globally), contact information, and website navigation.

2. OUT-OF-FIELD RESTRICTION:
   - You MUST REFUSE any question unrelated to personal development, coaching, wellness, or Shivi (such as programming/coding, mathematics, politics, cryptocurrency/stocks, medical diagnoses/prescriptions, sports scores, weather, general trivia, gaming, etc.).
   - When refusing out-of-domain questions, be polite, empathetic, and gently steer the user back to Shivi's personal and professional growth coaching.
   - Example refusal in English: "I specialize exclusively in personal development, life coaching, and wellness programs at Shivi with Dr. Shivani Koccher Dhand. While I can't assist with that topic, I would love to help you explore our coaching programs or book a discovery call!"
   - Example refusal in Hindi: "मैं केवल Shivi के लाइफ कोचिंग, एनएलपी और व्यक्तिगत विकास कार्यक्रमों में सहायता कर सकती हूँ। इस विषय पर मैं उत्तर नहीं दे सकती, लेकिन क्या आप अपने जीवन या करियर के विकास के बारे में जानना चाहते हैं?"
   - Example refusal in Punjabi: "ਮੈਂ ਸਿਰਫ਼ Shivi ਦੇ ਲਾਈਫ ਕੋਚਿੰਗ, ਐਨਐਲਪੀ (NLP) ਅਤੇ ਨਿੱਜੀ ਵਿਕਾਸ ਪ੍ਰੋਗਰਾਮਾਂ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦੀ ਹਾਂ। ਆਓ ਗੱਲ ਕਰੀਏ ਕਿ ਅਸੀਂ ਤੁਹਾਡੀ ਜ਼ਿੰਦਗੀ ਜਾਂ ਕਰੀਅਰ ਨੂੰ ਬਿਹਤਰ ਬਣਾਉਣ ਵਿੱਚ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੇ ਹਾਂ!"

3. MULTILINGUAL INSTRUCTION:
   - Always reply in the EXACT SAME LANGUAGE that the user wrote in (English, Hindi, Punjabi, Hinglish, Spanish, French, German, etc.).
   - Maintain a friendly, supportive, respectful, and simple-to-understand tone.
   - Keep answers clear, structured, concise (2-3 paragraphs maximum), and avoid complicated jargon.
   - Whenever relevant, mention that users can fill out the 'Please Answer Our Few Questions' form on the Contact page (/contact) to schedule a discovery call with Dr. Shivani.
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
      { label: 'About Dr. Shivani', href: '/about' },
      { label: 'Connect With Dr. Shivani', href: '/contact' },
    ],
    responses: {
      en: "Dr. Shivani Koccher Dhand is the Founder & Lead Coach at Shivi, based in Phagwara, Punjab, India. She brings 15+ years of rich experience as a Life Coach, certified NLP Practitioner, Human Capital Expert, and Educator.\n\nHer mission is to empower individuals and organizations to unlock their highest potential through evidence-informed coaching, emotional intelligence, and mindful transformation.",
      hi: "डॉ. शिवानी कोचर ढांड Shivi की संस्थापक और लीड कोच हैं (फगवाड़ा, पंजाब, भारत)। उनके पास लाइफ कोच, सर्टिफाइड एनएलपी (NLP) प्रैक्टिशनर, ह्यूमन कैपिटल एक्सपर्ट और शिक्षाविद के रूप में 15+ वर्षों का समृद्ध अनुभव है।\n\nउनका उद्देश्य लोगों और संस्थाओं को उनकी आंतरिक क्षमता को पहचानने और जीवन में सकारात्मक बदलाव लाने के लिए सशक्त बनाना है।",
      pa: "ਡਾ. ਸ਼ਿਵਾਨੀ ਕੋਚਰ ਢਾਂਡ Shivi ਦੇ ਸੰਸਥਾਪਕ ਅਤੇ ਲੀਡ ਕੋਚ ਹਨ (ਫਗਵਾੜਾ, ਪੰਜਾਬ)। ਉਹਨਾਂ ਕੋਲ ਲਾਈਫ ਕੋਚ, ਸਰਟੀਫਾਈਡ ਐਨਐਲਪੀ (NLP) ਪ੍ਰੈਕਟੀਸ਼ਨਰ, ਹਿਊਮਨ ਕੈਪੀਟਲ ਮਾਹਿਰ ਅਤੇ ਸਿੱਖਿਅਕ ਵਜੋਂ 15+ ਸਾਲਾਂ ਦਾ ਵਿਸ਼ਾਲ ਤਜਰਬਾ ਹੈ। ਉਹ ਵਿਅਕਤੀਆਂ ਅਤੇ ਸੰਸਥਾਵਾਂ ਨੂੰ ਨਿੱਜੀ ਤੇ ਪੇਸ਼ੇਵਰ ਵਿਕਾਸ ਵਿੱਚ ਸਹਾਇਤਾ ਕਰਦੇ ਹਨ।",
      es: "La Dra. Shivani Koccher Dhand es la fundadora y coach principal de Shivi, con más de 15 años de experiencia como Life Coach, practicante certificada de PNL (NLP) y experta en Capital Humano en Phagwara, India.",
      fr: "Le Dr. Shivani Koccher Dhand est la fondatrice et coach principale de Shivi, forte de plus de 15 ans d'expérience en tant que coach de vie, praticienne certifiée en PNL et experte en capital humain.",
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
    keywords: ['book', 'how to book', 'discovery call', 'consultation', 'fees', 'cost', 'pricing', 'price', 'charges', 'contact', 'appointment', 'how to start', 'fees kitni hai', 'booking kaise kare', 'ਫੀਸ', 'ਬੁਕਿੰਗ'],
    links: [
      { label: 'Book Discovery Call (Contact Form)', href: '/contact' },
      { label: 'Explore All Services', href: '/services' },
    ],
    responses: {
      en: "You can easily schedule a consultation with Dr. Shivani by visiting our Contact page (/contact) and completing the 'Please Answer Our Few Questions' form.\n\nWe offer a complimentary initial discovery call to understand your needs and recommend the ideal coaching roadmap.",
      hi: "आप हमारे कांटेक्ट पेज (/contact) पर जाकर 'Please Answer Our Few Questions' फॉर्म भरकर डॉ. शिवानी के साथ डिस्कवरी कॉल शेड्यूल कर सकते हैं।\n\nहम आपकी आवश्यकताओं को समझने और आपके लिए सही कोचिंग प्लान तैयार करने के लिए प्रारंभिक डिस्कवरी कॉल प्रदान करते हैं।",
      pa: "ਤੁਸੀਂ ਸਾਡੇ ਸੰਪਰਕ ਪੰਨੇ (/contact) 'ਤੇ ਜਾ ਕੇ ਫਾਰਮ ਭਰ ਕੇ ਡਾ. ਸ਼ਿਵਾਨੀ ਨਾਲ ਮੁਲਾਕਾਤ ਜਾਂ ਡਿਸਕਵਰੀ ਕਾਲ ਤੈਅ ਕਰ ਸਕਦੇ ਹੋ। ਅਸੀਂ ਤੁਹਾਡੀਆਂ ਲੋੜਾਂ ਅਨੁਸਾਰ ਸਹੀ ਕੋਚਿੰਗ ਪਲਾਨ ਸੁਝਾਉਂਦੇ ਹਾਂ।",
      es: "Puedes agendar una llamada de descubrimiento con la Dra. Shivani completando el formulario en nuestra página de Contacto (/contact).",
      fr: "Vous pouvez réserver un appel de découverte avec le Dr. Shivani en remplissant le formulaire sur notre page Contact (/contact).",
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
