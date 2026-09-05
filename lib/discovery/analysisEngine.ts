import { ASSESSMENT_QUESTIONS } from './questions';

export interface DimensionScore {
  key: string;
  label: string;
  score: number; // 0 to 100
  badge: string; // e.g. "Strong Analytical Preference", "Balanced Social Preference"
  description: string;
  categoryType?: 'percentage' | 'categorical';
}

export interface KeyPreferenceCard {
  title: string;
  value: string;
  insight: string;
}

export interface ReportAnalysis {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  areaOfInterest: string;
  completedDate: string;
  responses: {
    questionId: number;
    question: string;
    category: string;
    answer: string;
  }[];
  dimensions: DimensionScore[];
  keyPreferences: KeyPreferenceCard[];
  sections: {
    thinkingAndDecision: {
      title: string;
      summary: string;
      highlights: string[];
    };
    personalityAndInteraction: {
      title: string;
      summary: string;
      highlights: string[];
    };
    motivationAndGoals: {
      title: string;
      summary: string;
      highlights: string[];
    };
    emotionalAndResponse: {
      title: string;
      summary: string;
      highlights: string[];
    };
  };
  reflectionSummary: string;
  coachingConversationPrompt: string;
}

/**
 * Helper to ensure grammatically correct indefinite articles (a vs an)
 */
function withIndefiniteArticle(word: string): string {
  if (!word) return '';
  const trimmed = word.trim();
  const lower = trimmed.toLowerCase();
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const firstLetter = lower[0];
  const article = vowels.includes(firstLetter) ? 'an' : 'a';
  return `${article} ${trimmed}`;
}

export function generateReportAnalysis(
  answers: Record<number, string>,
  userInfo: { name: string; email: string; phone?: string; interest?: string }
): ReportAnalysis {
  const getAns = (qId: number) => answers[qId] || '';

  // Extract all 20 question answers
  const q1 = getAns(1);
  const q2 = getAns(2);
  const q3 = getAns(3);
  const q4 = getAns(4);
  const q5 = getAns(5);
  const q6 = getAns(6);
  const q7 = getAns(7);
  const q8 = getAns(8);
  const q9 = getAns(9);
  const q10 = getAns(10);
  const q11 = getAns(11);
  const q12 = getAns(12);
  const q13 = getAns(13);
  const q14 = getAns(14);
  const q15 = getAns(15);
  const q16 = getAns(16);
  const q17 = getAns(17);
  const q18 = getAns(18);
  const q19 = getAns(19);
  const q20 = getAns(20);

  // =========================================================================
  // 1. RULE-BASED SCORING SYSTEM (TRANSPARENT, EXACT MAPPINGS)
  // =========================================================================

  // -------------------------------------------------------------------------
  // DIMENSION 1: ANALYTICAL THINKING (Relevant: Q1, Q2, Q8, Q10)
  // Max possible: Q1(2) + Q2(4) + Q8(4) + Q10(3) = 13 points
  // -------------------------------------------------------------------------
  let analyticalRaw = 0;

  // Q1: Thought process
  if (q1 === 'Realistic') analyticalRaw += 2;
  else if (q1 === 'Optimistic' || q1 === 'Pessimistic' || q1 === 'Overthinking') analyticalRaw += 1;

  // Q2: Decision-making style
  if (q2 === 'Analytical') analyticalRaw += 4;
  else if (q2 === 'Logical') analyticalRaw += 3;
  else if (q2 === 'Intuitive') analyticalRaw += 1;
  else if (q2 === 'Emotional') analyticalRaw += 0;

  // Q8: Approach towards problems
  if (q8 === 'Analyse deeply') analyticalRaw += 4;
  else if (q8 === 'Solve immediately') analyticalRaw += 1;
  else if (q8 === 'Ask for help') analyticalRaw += 1;
  else if (q8 === 'Avoid temporarily') analyticalRaw += 0;

  // Q10: You trust more?
  if (q10 === 'Logic') analyticalRaw += 3;
  else if (q10 === 'Experience') analyticalRaw += 2;
  else if (q10 === "Other people's advice") analyticalRaw += 1;
  else if (q10 === 'Feelings') analyticalRaw += 0;

  const analyticalMax = 13;
  const analyticalScore = Math.round((analyticalRaw / analyticalMax) * 100);

  let analyticalBadge = 'Balanced Analytical Thinking';
  let analyticalDesc = 'You balance structured reasoning with practical context and instinct.';
  if (analyticalScore >= 75) {
    analyticalBadge = 'Strong Analytical Preference';
    analyticalDesc = 'You place high emphasis on objective evaluation, deep analysis, and logical validation.';
  } else if (analyticalScore < 50) {
    analyticalBadge = 'Intuitive & Experience-Led';
    analyticalDesc = 'You lean toward intuition, personal feelings, and immediate situational cues.';
  }

  // -------------------------------------------------------------------------
  // DIMENSION 2: EMOTIONAL EXPRESSION (Relevant: Q6, Q14, Q19)
  // Max possible: Q6(4) + Q14(4) + Q19(4) = 12 points
  // -------------------------------------------------------------------------
  let emotionalRaw = 0;

  // Q6: When stressed
  if (q6 === 'Emotional') emotionalRaw += 4;
  else if (q6 === 'Angry') emotionalRaw += 3;
  else if (q6 === 'Practical') emotionalRaw += 2;
  else if (q6 === 'Quiet') emotionalRaw += 1;

  // Q14: When criticized
  if (q14 === 'Hurt') emotionalRaw += 4;
  else if (q14 === 'Defensive') emotionalRaw += 3;
  else if (q14 === 'Curious') emotionalRaw += 2;
  else if (q14 === 'Unaffected') emotionalRaw += 1;

  // Q19: Emotional expression
  if (q19 === 'Open') emotionalRaw += 4;
  else if (q19 === 'Situational') emotionalRaw += 3;
  else if (q19 === 'Controlled') emotionalRaw += 2;
  else if (q19 === 'Hidden') emotionalRaw += 1;

  const emotionalMax = 12;
  const emotionalScore = Math.round((emotionalRaw / emotionalMax) * 100);

  let emotionalBadge = 'Situational / Balanced Expression';
  let emotionalDesc = 'You modulate your emotional responses depending on the setting and comfort level.';
  if (emotionalScore >= 75) {
    emotionalBadge = 'Open Emotional Expression';
    emotionalDesc = 'You communicate feelings and emotional reactions with spontaneity and high transparency.';
  } else if (emotionalScore < 50) {
    emotionalBadge = 'Reserved / Contained Expression';
    emotionalDesc = 'You tend to process emotions internally and maintain composure in outward communication.';
  }

  // -------------------------------------------------------------------------
  // DIMENSION 3: SOCIAL PREFERENCE (Relevant: Q3, Q12, Q15)
  // Max possible: Q3(4) + Q12(4) + Q15(4) = 12 points
  // Evaluated for categorical authenticity:
  // "Primarily Solitary Preference", "Balanced Social Preference", "Primarily Social Preference"
  // -------------------------------------------------------------------------
  let socialRaw = 0;

  // Q3: Personality
  if (q3 === 'Extrovert') socialRaw += 4;
  else if (q3 === 'Ambivert') socialRaw += 2.5;
  else if (q3 === 'Introvert' || q3 === 'Reserved') socialRaw += 1;

  // Q12: Group behaviour
  if (q12 === 'Leader') socialRaw += 4;
  else if (q12 === 'Contributor' || q12 === 'Supporter') socialRaw += 2.5;
  else if (q12 === 'Observer') socialRaw += 1;

  // Q15: Energy source
  if (q15 === 'Being with people') socialRaw += 4;
  else if (q15 === 'Achieving goals' || q15 === 'Trying new things') socialRaw += 2.5;
  else if (q15 === 'Being alone') socialRaw += 1;

  const socialMax = 12;
  const socialScore = Math.round((socialRaw / socialMax) * 100);

  let socialBadge: 'Primarily Solitary Preference' | 'Balanced Social Preference' | 'Primarily Social Preference' = 'Balanced Social Preference';
  let socialDesc = 'Comfortable in group environments while valuing personal space and independent time.';

  if (socialRaw >= 9.5) {
    socialBadge = 'Primarily Social Preference';
    socialDesc = 'You derive sustained energy and motivation from dynamic interaction and collaborative teamwork.';
  } else if (socialRaw <= 5.5) {
    socialBadge = 'Primarily Solitary Preference';
    socialDesc = 'You recharge most effectively through quiet reflection, independent focus, and personal space.';
  } else {
    socialBadge = 'Balanced Social Preference';
    if (q3 === 'Ambivert' && q12 === 'Observer' && q15 === 'Being with people') {
      socialDesc = 'Balanced social preference with comfort observing and participating in group environments.';
    } else if (q15 === 'Achieving goals') {
      socialDesc = 'Balanced social preference with energy directed toward purposeful outcomes.';
    } else if (q15 === 'Trying new things') {
      socialDesc = 'Balanced social preference energized by fresh experiences and collaborative discovery.';
    } else {
      socialDesc = 'Comfortable in group environments while valuing personal space and independent time.';
    }
  }

  // -------------------------------------------------------------------------
  // DIMENSION 4: ADAPTABILITY (Relevant: Q9, Q11, Q16, Q20)
  // Max possible: Q9(4) + Q11(4) + Q16(4) + Q20(4) = 16 points
  // -------------------------------------------------------------------------
  let adaptRaw = 0;

  // Q9: Attitude towards change
  if (q9 === 'Excited' || q9 === 'Adaptive') adaptRaw += 4;
  else if (q9 === 'Cautious') adaptRaw += 2;
  else if (q9 === 'Resistant') adaptRaw += 1;

  // Q11: Lifestyle preference
  if (q11 === 'Flexible') adaptRaw += 4;
  else if (q11 === 'Spontaneous' || q11 === 'Balanced') adaptRaw += 3;
  else if (q11 === 'Planned') adaptRaw += 2;

  // Q16: Focus
  if (q16 === 'Future') adaptRaw += 4;
  else if (q16 === 'Present' || q16 === 'All equally') adaptRaw += 3;
  else if (q16 === 'Past') adaptRaw += 2;

  // Q20: Preference
  if (q20 === 'Adventure' || q20 === 'Growth') adaptRaw += 4;
  else if (q20 === 'Comfort') adaptRaw += 2;
  else if (q20 === 'Stability') adaptRaw += 1;

  const adaptMax = 16;
  const adaptScore = Math.round((adaptRaw / adaptMax) * 100);

  let adaptBadge = 'Balanced Adaptability';
  let adaptDesc = 'You balance openness to change with a sensible appreciation for consistency.';
  if (adaptScore >= 75) {
    adaptBadge = 'Strong Adaptability Preference';
    adaptDesc = 'You thrive in changing conditions, welcoming spontaneity and new directions.';
  } else if (adaptScore < 50) {
    adaptBadge = 'Emerging Adaptability';
    adaptDesc = 'You prefer predictable structures, taking time to prepare before adopting major shifts.';
  }

  // -------------------------------------------------------------------------
  // DIMENSION 5: GROWTH ORIENTATION (Relevant: Q4, Q9, Q13, Q16, Q20)
  // Max possible: Q4(4) + Q9(4) + Q13(4) + Q16(4) + Q20(4) = 20 points
  // -------------------------------------------------------------------------
  let growthRaw = 0;

  // Q4: Biggest motivation
  if (q4 === 'Success') growthRaw += 4;
  else if (q4 === 'Money' || q4 === 'Recognition' || q4 === 'Happiness') growthRaw += 3;

  // Q9: Attitude towards change
  if (q9 === 'Excited' || q9 === 'Adaptive') growthRaw += 4;
  else if (q9 === 'Cautious') growthRaw += 2;
  else if (q9 === 'Resistant') growthRaw += 1;

  // Q13: What matters most
  if (q13 === 'Achievement') growthRaw += 4;
  else if (q13 === 'Freedom' || q13 === 'Relationships') growthRaw += 3;
  else if (q13 === 'Security') growthRaw += 2;

  // Q16: Focus
  if (q16 === 'Future') growthRaw += 4;
  else if (q16 === 'Present' || q16 === 'All equally') growthRaw += 3;
  else if (q16 === 'Past') growthRaw += 2;

  // Q20: Preference
  if (q20 === 'Growth') growthRaw += 4;
  else if (q20 === 'Adventure') growthRaw += 3;
  else if (q20 === 'Comfort' || q20 === 'Stability') growthRaw += 2;

  const growthMax = 20;
  const growthScore = Math.round((growthRaw / growthMax) * 100);

  let growthBadge = 'Balanced Growth Focus';
  let growthDesc = 'You pursue progress and self-improvement while keeping day-to-day stability in view.';
  if (growthScore >= 75) {
    growthBadge = 'High Growth Orientation';
    growthDesc = 'You are strongly motivated by future milestones, continuous learning, and expanding potential.';
  } else if (growthScore < 55) {
    growthBadge = 'Stability & Consolidation Focus';
    growthDesc = 'You prioritize consolidating your current achievements and maintaining dependable security.';
  }

  // -------------------------------------------------------------------------
  // DIMENSION 6: RISK PREFERENCE (Relevant: Q17, Q9, Q20, Q8)
  // (Q5 used only in narrative as contextual information)
  // Max possible: Q17(4) + Q9(4) + Q20(4) + Q8(3) = 15 points
  // -------------------------------------------------------------------------
  let riskRaw = 0;

  // Q17: Risk-taking nature (primary signal)
  if (q17 === 'High') riskRaw += 4;
  else if (q17 === 'Moderate') riskRaw += 3;
  else if (q17 === 'Situation-based') riskRaw += 2.5;
  else if (q17 === 'Low') riskRaw += 1;

  // Q9: Attitude towards change
  if (q9 === 'Excited') riskRaw += 4;
  else if (q9 === 'Adaptive') riskRaw += 3;
  else if (q9 === 'Cautious') riskRaw += 2;
  else if (q9 === 'Resistant') riskRaw += 1;

  // Q20: Preference
  if (q20 === 'Adventure') riskRaw += 4;
  else if (q20 === 'Growth') riskRaw += 3;
  else if (q20 === 'Comfort') riskRaw += 2;
  else if (q20 === 'Stability') riskRaw += 1;

  // Q8: Approach towards problems
  if (q8 === 'Solve immediately') riskRaw += 3;
  else if (q8 === 'Analyse deeply' || q8 === 'Ask for help') riskRaw += 2;
  else if (q8 === 'Avoid temporarily') riskRaw += 1;

  const riskMax = 15;
  const riskScore = Math.round((riskRaw / riskMax) * 100);

  let riskBadge = 'Moderate and Context-Dependent';
  let riskDesc = 'You evaluate risks case by case, weighing potential upside against safety.';
  if (riskScore >= 70) {
    riskBadge = 'Active Risk Preference';
    riskDesc = 'You feel comfortable stepping into uncertainty when opportunities align with your goals.';
  } else if (riskScore < 45) {
    riskBadge = 'Cautious & Measured';
    riskDesc = 'You prefer predictable outcomes, carefully protecting existing ground before advancing.';
  }

  // Structure Dimensions Array
  const dimensions: DimensionScore[] = [
    {
      key: 'analytical',
      label: 'Analytical Thinking',
      score: analyticalScore,
      badge: analyticalBadge,
      description: analyticalDesc,
    },
    {
      key: 'emotional',
      label: 'Emotional Expression',
      score: emotionalScore,
      badge: emotionalBadge,
      description: emotionalDesc,
    },
    {
      key: 'social',
      label: 'Social Preference',
      score: socialScore,
      badge: socialBadge,
      description: socialDesc,
      categoryType: 'categorical',
    },
    {
      key: 'adaptability',
      label: 'Adaptability',
      score: adaptScore,
      badge: adaptBadge,
      description: adaptDesc,
    },
    {
      key: 'growth',
      label: 'Growth Orientation',
      score: growthScore,
      badge: growthBadge,
      description: growthDesc,
    },
    {
      key: 'risk',
      label: 'Risk Preference',
      score: riskScore,
      badge: riskBadge,
      description: riskDesc,
    },
  ];

  // =========================================================================
  // 2. KEY INSIGHT CARDS (INTELLIGENT SYNTHESIS & NATURAL GRAMMAR)
  // =========================================================================

  // Card 1: Thinking Style (Q1 + Q2 + Q8 + Q10)
  let thinkingCardValue = 'Reflective & Balanced';
  let thinkingCardInsight = 'Your responses suggest an analytical approach to decision-making, accompanied by thoughtful consideration before acting.';
  if ((q2 === 'Analytical' || q2 === 'Logical') && q8 === 'Analyse deeply') {
    thinkingCardValue = 'Reflective & Analytical';
    thinkingCardInsight = 'Your responses suggest that you prioritize methodical reasoning and in-depth analysis before making commitments.';
  } else if (q1 === 'Overthinking') {
    thinkingCardValue = 'Deeply Reflective & Thorough';
    thinkingCardInsight = 'Your responses suggest a reflective tendency, carefully weighing multiple facets of a scenario to prevent oversights.';
  } else if (q2 === 'Intuitive' || q10 === 'Feelings') {
    thinkingCardValue = 'Intuitive & Perspective-Driven';
    thinkingCardInsight = 'Your selections indicate that you integrate internal instincts and personal values alongside factual considerations.';
  } else if (q8 === 'Solve immediately' && q1 === 'Realistic') {
    thinkingCardValue = 'Action-Oriented & Practical';
    thinkingCardInsight = 'Your responses suggest a preference for prompt, realistic problem-solving focused on tangible next steps.';
  }

  // Card 2: Communication Style (Q7)
  let commCardValue = 'Diplomatic Communicator';
  let commCardInsight = 'You appear to value thoughtful communication that respects diverse perspectives.';
  if (q7 === 'Direct') {
    commCardValue = 'Direct & Clear Communicator';
    commCardInsight = 'You appear to value straightforward clarity and directness in collaborative discussions.';
  } else if (q7 === 'Diplomatic') {
    commCardValue = 'Diplomatic Communicator';
    commCardInsight = 'You appear to prefer tactful, considerate dialogue that balances diverse viewpoints and preserves rapport.';
  } else if (q7 === 'Expressive') {
    commCardValue = 'Open & Expressive Communicator';
    commCardInsight = 'You tend to articulate thoughts and feelings with enthusiasm, bringing openness to interpersonal exchanges.';
  } else if (q7 === 'Reserved') {
    commCardValue = 'Thoughtful & Measured Communicator';
    commCardInsight = 'You appear to prefer observing and formulating thoughts carefully before contributing to dialogue.';
  }

  // Card 3: Motivation & Values (Q4 + Q13)
  const motVal1 = q4 || 'Fulfilment';
  const motVal2 = q13 || 'Purpose';
  const motivationCardValue = `${motVal1} & ${motVal2}`;
  const motivationCardInsight = `Your responses suggest that personal fulfilment in the form of ${motVal1.toLowerCase()} and the valuation of ${motVal2.toLowerCase()} are both meaningful sources of direction for you.`;

  // Card 4: Adaptability (Q9 + Q11 + Q20) - Intelligently handles mixed answers
  let adaptCardValue = 'Balanced Adaptability';
  let adaptCardInsight = 'Your responses suggest an adaptable rhythm, adjusting to new developments as circumstances require.';
  if (q9 === 'Cautious' && (q11 === 'Spontaneous' || q11 === 'Flexible' || q20 === 'Growth')) {
    adaptCardValue = 'Cautious yet Growth-Oriented';
    adaptCardInsight = 'Your responses suggest a balanced pattern: you may approach major changes cautiously while still valuing flexibility and personal growth.';
  } else if ((q9 === 'Excited' || q9 === 'Adaptive') && (q11 === 'Flexible' || q11 === 'Spontaneous')) {
    adaptCardValue = 'Dynamic & Highly Flexible';
    adaptCardInsight = 'Your selections reflect an agile stance toward change, pairing enthusiasm for new directions with everyday flexibility.';
  } else if ((q9 === 'Cautious' || q9 === 'Resistant') && q11 === 'Planned') {
    adaptCardValue = 'Structured & Planned Approach';
    adaptCardInsight = 'You appear to favor structured planning and deliberate pacing when navigating unfamiliar routines.';
  }

  // Card 5: Social Preference (Q3 + Q12 + Q15)
  const socialCardValue = socialBadge;
  let socialCardInsight = 'Your responses suggest comfort in both reflective personal focus and collaborative interaction.';
  if (socialBadge === 'Primarily Solitary Preference') {
    socialCardInsight = `Your selections suggest that you recharge best through independent focus, functioning with depth in ${withIndefiniteArticle(q12.toLowerCase() || 'observer')} role.`;
  } else if (socialBadge === 'Primarily Social Preference') {
    socialCardInsight = `Your responses suggest you draw positive energy from collaborative spaces, naturally stepping forward as ${withIndefiniteArticle(q12.toLowerCase() || 'collaborator')}.`;
  } else {
    socialCardInsight = `Your responses suggest comfort in both reflective personal focus and collaborative interaction, particularly when contributing as ${withIndefiniteArticle(q12.toLowerCase() || 'collaborator')}.`;
  }

  // Card 6: Risk Approach (Q17 + Q9 + Q20)
  let riskCardValue = riskBadge;
  let riskCardInsight = 'You approach unfamiliar opportunities with contextual judgment, weighing potential gains against stability.';
  if (q17 === 'High' || (q20 === 'Adventure' && q9 === 'Excited')) {
    riskCardValue = 'Bold & Opportunity-Driven';
    riskCardInsight = 'Your selections indicate a willingness to embrace ambitious paths and uncertainty when in pursuit of meaningful advancement.';
  } else if (q17 === 'Low' || (q20 === 'Stability' && q9 === 'Cautious')) {
    riskCardValue = 'Prudent & Security-Minded';
    riskCardInsight = 'You prioritize established foundations and predictable outcomes, taking measured steps to safeguard your progress.';
  } else {
    riskCardValue = 'Moderate and Context-Dependent';
    riskCardInsight = 'You evaluate risks thoughtfully, favoring deliberate actions that balance growth opportunities with practical security.';
  }

  const keyPreferences: KeyPreferenceCard[] = [
    {
      title: 'Thinking Style',
      value: thinkingCardValue,
      insight: thinkingCardInsight,
    },
    {
      title: 'Communication',
      value: commCardValue,
      insight: commCardInsight,
    },
    {
      title: 'Motivation & Values',
      value: motivationCardValue,
      insight: motivationCardInsight,
    },
    {
      title: 'Adaptability',
      value: adaptCardValue,
      insight: adaptCardInsight,
    },
    {
      title: 'Social Preference',
      value: socialCardValue,
      insight: socialCardInsight,
    },
    {
      title: 'Risk Approach',
      value: riskCardValue,
      insight: riskCardInsight,
    },
  ];

  // =========================================================================
  // 3. QUALITATIVE NARRATIVE SECTIONS (SYNTHESIZED & GRAMMATICALLY CORRECT)
  // =========================================================================

  // Section 1: Thinking & Decision Style
  const thinkingSummary = `Your responses suggest an inclination toward ${q2.toLowerCase()} evaluation when forming choices, supported by an approach that values ${q10.toLowerCase()} as a reliable guide. Rather than relying solely on rapid impulses, you appear to prefer examining the underlying logic and practical context before deciding on a direction.`;
  const thinkingHighlights = [
    `Thought Process: Described as ${withIndefiniteArticle(q1.toLowerCase())} mindset${q1 === 'Overthinking' ? ', showing a reflective tendency to examine situations thoroughly' : ''}.`,
    `Decision Making: You appear to lean on ${q2.toLowerCase()} considerations to validate choices.`,
    `Problem Solving: When confronted with challenges, you tend to ${q8.toLowerCase()}.`,
    `Information Trust: You place significant weight on ${q10.toLowerCase()} to guide your conclusions.`,
    `Temporal Anchor: Your reflections demonstrate an active focus on the ${q16.toLowerCase()}.`,
  ];

  // Section 2: Personality & Interaction Style
  const personalitySummary = `In social and collaborative environments, you identify as ${withIndefiniteArticle(q3.toLowerCase())}, functioning comfortably as ${withIndefiniteArticle(q12.toLowerCase())} among peers. You appear to draw vitality from ${q15.toLowerCase()} while maintaining ${withIndefiniteArticle(q7.toLowerCase())} communication style.`;
  const personalityHighlights = [
    `Self-Perception: You categorize your personality tendency as ${withIndefiniteArticle(q3.toLowerCase())}.`,
    `Group Dynamic: You frequently operate as ${withIndefiniteArticle(q12.toLowerCase())} within group settings.`,
    `Communication Style: Characterized by ${withIndefiniteArticle(q7.toLowerCase())} approach in interpersonal dialogue.`,
    `Energy Renewal: You restore energy primarily through ${q15.toLowerCase()}.`,
    `Collaboration Posture: You describe your general orientation as being more ${q18.toLowerCase()}.`,
  ];

  // Section 3: Motivation & Goals (Non-judgmental)
  const q20Text = q20 === 'Comfort'
    ? 'familiar and comfortable environments'
    : q20 === 'Stability'
    ? 'stable and predictable foundations'
    : q20 === 'Adventure'
    ? 'adventure and novel experiences'
    : 'continuous growth and self-improvement';

  const motivationSummary = `One of your strongest stated priorities is ${q13.toLowerCase()}, with ${q4.toLowerCase()} providing key motivation for your initiatives. You appear to favor a ${q11.toLowerCase()} lifestyle rhythm, balancing this with an ongoing interest in ${q20Text}.`;
  const motivationHighlights = [
    `Primary Motivator: Driven by a desire for ${q4.toLowerCase()} in your personal and professional pursuits.`,
    `Core Priority: What matters most to you in this season of life is ${q13.toLowerCase()}.`,
    `Lifestyle Preference: You favor a ${q11.toLowerCase()} rhythm to maintain balance and momentum.`,
    `Response to Transition: When facing opportunities for change, you tend to feel ${q9.toLowerCase()}.`,
    `Future Preference: Looking ahead, you express a clear preference for ${q20Text}.`,
  ];

  // Section 4: Emotional & Response Patterns (Non-judgmental, Q5 used as contextual concern)
  const emotionalSummary = `Under pressure or heightened expectations, your responses suggest an initial tendency to become ${q6.toLowerCase()}, which you balance with a ${q19.toLowerCase()} emotional outward expression. When facing feedback, you appear to respond in a ${q14.toLowerCase()} manner while navigating uncertainty with thoughtful consideration.`;
  const emotionalHighlights = [
    `Key Concern: You identified ${q5.toLowerCase()} as your primary concern when navigating unfamiliar transitions.`,
    `Response Under Stress: Under pressure, you observe that you become ${q6.toLowerCase()}.`,
    `Response to Feedback: When receiving criticism or critique, your internal response leans toward being ${q14.toLowerCase()}.`,
    `Emotional Regulation: You tend to express and modulate your feelings in a ${q19.toLowerCase()} manner.`,
    `Risk Preference: Your risk-taking threshold is currently described as ${q17.toLowerCase()}.`,
  ];

  const sections = {
    thinkingAndDecision: {
      title: 'Thinking & Decision Style',
      summary: thinkingSummary,
      highlights: thinkingHighlights,
    },
    personalityAndInteraction: {
      title: 'Personality & Interaction Style',
      summary: personalitySummary,
      highlights: personalityHighlights,
    },
    motivationAndGoals: {
      title: 'Motivation & Goals',
      summary: motivationSummary,
      highlights: motivationHighlights,
    },
    emotionalAndResponse: {
      title: 'Emotional & Response Patterns',
      summary: emotionalSummary,
      highlights: emotionalHighlights,
    },
  };

  // =========================================================================
  // 4. RESPONSE AUDIT TABLE
  // =========================================================================
  const responses = ASSESSMENT_QUESTIONS.map((q) => ({
    questionId: q.id,
    question: q.question,
    category: q.category,
    answer: getAns(q.id) || 'Not answered',
  }));

  // =========================================================================
  // 5. COACH PREPARATION SUMMARY (WARM, CONCISE, AND ACTIONABLE)
  // Structure:
  // 1. Thinking preference
  // 2. Main motivation/value
  // 3. Social preference
  // 4. Change/adaptability preference
  // 5. Risk approach
  // 6. Suggested coaching conversation starting point
  // =========================================================================
  const clientName = userInfo.name ? userInfo.name.trim() : 'Friend';

  const summaryP1 = `Based on your responses, ${clientName}, you appear to prefer ${q2.toLowerCase()} decision-making while placing significant value on ${q10.toLowerCase()} to guide choices.`;
  const summaryP2 = `Personal fulfilment through ${q4.toLowerCase()} and a core commitment to ${q13.toLowerCase()} emerge as important motivators in your life.`;
  const summaryP3 = `Your responses suggest a ${socialBadge.toLowerCase()}, showing natural comfort as ${withIndefiniteArticle(q12.toLowerCase())} and drawing energy from ${q15.toLowerCase()}.`;
  const summaryP4 = `You appear to approach change with ${withIndefiniteArticle(q9.toLowerCase())} attitude alongside a ${q11.toLowerCase()} lifestyle rhythm.`;
  const summaryP5 = `When navigating uncertainty, your risk approach is ${riskBadge.toLowerCase()}.`;

  const reflectionSummary = `${summaryP1} ${summaryP2} ${summaryP3} ${summaryP4} ${summaryP5}`;
  const coachingConversationPrompt = 'For a coaching conversation, useful starting points may include exploring how these preferences influence your current goals and the challenges you would like to work through.';

  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return {
    clientName,
    clientEmail: userInfo.email || 'N/A',
    clientPhone: userInfo.phone || 'N/A',
    areaOfInterest: userInfo.interest || 'Personal Discovery',
    completedDate: today,
    responses,
    dimensions,
    keyPreferences,
    sections,
    reflectionSummary,
    coachingConversationPrompt,
  };
}
