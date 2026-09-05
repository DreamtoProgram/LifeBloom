import { ASSESSMENT_QUESTIONS } from './questions';

export interface DimensionScore {
  key: string;
  label: string;
  score: number; // 0 to 100
  badge: string; // e.g. "High", "Balanced", "Moderate"
  description: string;
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
}

export function generateReportAnalysis(
  answers: Record<number, string>,
  userInfo: { name: string; email: string; phone?: string; interest?: string }
): ReportAnalysis {
  const getAns = (qId: number) => answers[qId] || '';

  // 1. Compute Dimension Scores (0-100) using transparent, rule-based mappings
  // Dimension 1: Analytical Thinking (Q1, Q2, Q8, Q10, Q16)
  let analyticalRaw = 30;
  if (getAns(2) === 'Analytical') analyticalRaw += 25;
  else if (getAns(2) === 'Logical') analyticalRaw += 20;
  else if (getAns(2) === 'Intuitive') analyticalRaw += 10;
  else if (getAns(2) === 'Emotional') analyticalRaw += 5;

  if (getAns(8) === 'Analyse deeply') analyticalRaw += 20;
  else if (getAns(8) === 'Solve immediately') analyticalRaw += 12;
  else if (getAns(8) === 'Ask for help') analyticalRaw += 10;

  if (getAns(10) === 'Logic') analyticalRaw += 15;
  else if (getAns(10) === 'Experience') analyticalRaw += 12;
  else if (getAns(10) === 'Other people\'s advice') analyticalRaw += 8;

  if (getAns(1) === 'Realistic') analyticalRaw += 10;
  else if (getAns(1) === 'Overthinking') analyticalRaw += 8;
  else if (getAns(1) === 'Optimistic') analyticalRaw += 6;

  const analyticalScore = Math.min(95, Math.max(30, analyticalRaw));

  // Dimension 2: Emotional Expression (Q2, Q6, Q7, Q10, Q19)
  let emotionalRaw = 25;
  if (getAns(19) === 'Open') emotionalRaw += 25;
  else if (getAns(19) === 'Situational') emotionalRaw += 18;
  else if (getAns(19) === 'Controlled') emotionalRaw += 10;
  else if (getAns(19) === 'Hidden') emotionalRaw += 5;

  if (getAns(6) === 'Emotional') emotionalRaw += 22;
  else if (getAns(6) === 'Angry') emotionalRaw += 15;
  else if (getAns(6) === 'Practical') emotionalRaw += 10;
  else if (getAns(6) === 'Quiet') emotionalRaw += 8;

  if (getAns(2) === 'Emotional') emotionalRaw += 20;
  else if (getAns(2) === 'Intuitive') emotionalRaw += 16;
  else if (getAns(2) === 'Logical') emotionalRaw += 8;

  if (getAns(7) === 'Expressive') emotionalRaw += 18;
  else if (getAns(7) === 'Direct') emotionalRaw += 12;
  else if (getAns(7) === 'Diplomatic') emotionalRaw += 10;

  const emotionalScore = Math.min(95, Math.max(25, emotionalRaw));

  // Dimension 3: Social Energy (Q3, Q7, Q12, Q15, Q18)
  let socialRaw = 25;
  if (getAns(3) === 'Extrovert') socialRaw += 28;
  else if (getAns(3) === 'Ambivert') socialRaw += 20;
  else if (getAns(3) === 'Introvert') socialRaw += 8;
  else if (getAns(3) === 'Reserved') socialRaw += 6;

  if (getAns(15) === 'Being with people') socialRaw += 24;
  else if (getAns(15) === 'Trying new things') socialRaw += 16;
  else if (getAns(15) === 'Achieving goals') socialRaw += 12;
  else if (getAns(15) === 'Being alone') socialRaw += 6;

  if (getAns(12) === 'Leader') socialRaw += 22;
  else if (getAns(12) === 'Contributor') socialRaw += 18;
  else if (getAns(12) === 'Supporter') socialRaw += 14;
  else if (getAns(12) === 'Observer') socialRaw += 8;

  if (getAns(18) === 'Cooperative') socialRaw += 14;
  else if (getAns(18) === 'Balanced') socialRaw += 12;
  else if (getAns(18) === 'Competitive') socialRaw += 10;

  const socialScore = Math.min(95, Math.max(25, socialRaw));

  // Dimension 4: Adaptability (Q9, Q11, Q17, Q20)
  let adaptRaw = 30;
  if (getAns(9) === 'Adaptive') adaptRaw += 25;
  else if (getAns(9) === 'Excited') adaptRaw += 22;
  else if (getAns(9) === 'Cautious') adaptRaw += 10;
  else if (getAns(9) === 'Resistant') adaptRaw += 5;

  if (getAns(11) === 'Flexible') adaptRaw += 22;
  else if (getAns(11) === 'Spontaneous') adaptRaw += 20;
  else if (getAns(11) === 'Balanced') adaptRaw += 15;
  else if (getAns(11) === 'Planned') adaptRaw += 8;

  if (getAns(20) === 'Adventure') adaptRaw += 18;
  else if (getAns(20) === 'Growth') adaptRaw += 16;
  else if (getAns(20) === 'Stability') adaptRaw += 8;

  const adaptScore = Math.min(95, Math.max(30, adaptRaw));

  // Dimension 5: Growth Orientation (Q4, Q13, Q15, Q16, Q20)
  let growthRaw = 35;
  if (getAns(20) === 'Growth') growthRaw += 25;
  else if (getAns(20) === 'Adventure') growthRaw += 18;
  else if (getAns(20) === 'Comfort') growthRaw += 6;

  if (getAns(4) === 'Success') growthRaw += 18;
  else if (getAns(4) === 'Recognition') growthRaw += 15;
  else if (getAns(4) === 'Happiness') growthRaw += 14;
  else if (getAns(4) === 'Money') growthRaw += 12;

  if (getAns(13) === 'Achievement') growthRaw += 18;
  else if (getAns(13) === 'Freedom') growthRaw += 16;
  else if (getAns(13) === 'Relationships') growthRaw += 12;

  if (getAns(15) === 'Achieving goals' || getAns(15) === 'Trying new things') growthRaw += 14;
  if (getAns(16) === 'Future') growthRaw += 10;
  else if (getAns(16) === 'Present') growthRaw += 8;

  const growthScore = Math.min(95, Math.max(35, growthRaw));

  // Dimension 6: Risk Preference (Q5, Q9, Q17, Q20)
  let riskRaw = 25;
  if (getAns(17) === 'High') riskRaw += 35;
  else if (getAns(17) === 'Situation-based') riskRaw += 24;
  else if (getAns(17) === 'Moderate') riskRaw += 18;
  else if (getAns(17) === 'Low') riskRaw += 8;

  if (getAns(9) === 'Excited') riskRaw += 18;
  else if (getAns(9) === 'Adaptive') riskRaw += 15;
  else if (getAns(9) === 'Cautious') riskRaw += 8;

  if (getAns(20) === 'Adventure') riskRaw += 20;
  else if (getAns(20) === 'Growth') riskRaw += 14;
  else if (getAns(20) === 'Stability') riskRaw += 6;

  const riskScore = Math.min(95, Math.max(25, riskRaw));

  // Format dimensions
  const getBadge = (score: number) => {
    if (score >= 75) return 'High Preference';
    if (score >= 55) return 'Balanced';
    return 'Moderate / Contextual';
  };

  const dimensions: DimensionScore[] = [
    {
      key: 'analytical',
      label: 'Analytical Thinking',
      score: analyticalScore,
      badge: getBadge(analyticalScore),
      description: 'Tendency towards structured reasoning, evaluation, and depth when solving challenges.',
    },
    {
      key: 'emotional',
      label: 'Emotional Expression',
      score: emotionalScore,
      badge: getBadge(emotionalScore),
      description: 'Degree of openness in communicating feelings and navigating internal emotional cues.',
    },
    {
      key: 'social',
      label: 'Social Energy',
      score: socialScore,
      badge: getBadge(socialScore),
      description: 'Preferred balance between collaborative external dynamics and personal solitary reflection.',
    },
    {
      key: 'adaptability',
      label: 'Adaptability',
      score: adaptScore,
      badge: getBadge(adaptScore),
      description: 'Willingness to navigate unfamiliar transitions, spontaneity, and emerging changes.',
    },
    {
      key: 'growth',
      label: 'Growth Orientation',
      score: growthScore,
      badge: getBadge(growthScore),
      description: 'Focus on future expansion, continuous self-actualisation, and purpose-driven milestones.',
    },
    {
      key: 'risk',
      label: 'Risk Preference',
      score: riskScore,
      badge: getBadge(riskScore),
      description: 'Comfort level when engaging with ambiguity, bold decisions, and new opportunities.',
    },
  ];

  // 2. Key Preference Cards
  const keyPreferences: KeyPreferenceCard[] = [
    {
      title: 'Thinking Style',
      value: `${getAns(1) || 'Reflective'} & ${getAns(2) || 'Balanced'}`,
      insight: `Your responses suggest a ${getAns(2).toLowerCase()} approach to decision-making, coupled with an overall ${getAns(1).toLowerCase()} mindset.`,
    },
    {
      title: 'Communication',
      value: `${getAns(7) || 'Direct'} Communicator`,
      insight: `You appear to prefer ${getAns(7).toLowerCase()} interaction, especially when handling collaborative discussions.`,
    },
    {
      title: 'Core Motivation',
      value: `${getAns(4) || 'Purpose'} & ${getAns(13) || 'Values'}`,
      insight: `A noticeable pattern is your aspiration towards ${getAns(4).toLowerCase()} while cherishing ${getAns(13).toLowerCase()} as a fundamental anchor.`,
    },
    {
      title: 'Adaptability',
      value: `${getAns(9) || 'Adaptive'} to Change`,
      insight: `When facing shifts, you lean towards an ${getAns(9).toLowerCase()} posture with a ${getAns(11).toLowerCase()} lifestyle rhythm.`,
    },
    {
      title: 'Social Energy',
      value: `${getAns(3) || 'Balanced'} Energy Profile`,
      insight: `You indicate feeling energised by ${getAns(15).toLowerCase()}, functioning as a natural ${getAns(12).toLowerCase()} in group spaces.`,
    },
    {
      title: 'Risk Posture',
      value: `${getAns(17) || 'Measured'} Risk Approach`,
      insight: `You approach uncertainty with a ${getAns(17).toLowerCase()} outlook while seeking ${getAns(20).toLowerCase()} in your ongoing journey.`,
    },
  ];

  // 3. Detailed Qualitative Narrative Sections (Transparent pattern matching)
  const sections = {
    thinkingAndDecision: {
      title: 'Thinking & Decision Style',
      summary: `Your responses suggest an inclination towards ${getAns(2).toLowerCase()} evaluation when forming choices, supported by an attitude that values ${getAns(10).toLowerCase()} as a reliable guide.`,
      highlights: [
        `Thought Process: Identified primarily as ${getAns(1)}.`,
        `Decision Making: You appear to lean on ${getAns(2)} indicators rather than purely impulsive reactions.`,
        `Problem Solving: When confronted with challenges, you typically prefer to ${getAns(8).toLowerCase()}.`,
        `Information Trust: You place significant weight on ${getAns(10).toLowerCase()} to validate direction.`,
        `Temporal Focus: Your reflections demonstrate a primary temporal anchor on the ${getAns(16).toLowerCase()}.`,
      ],
    },
    personalityAndInteraction: {
      title: 'Personality & Interaction Style',
      summary: `In social and professional environments, you perceive yourself as an ${getAns(3).toLowerCase()}, naturally assuming the role of a ${getAns(12).toLowerCase()} among peers.`,
      highlights: [
        `Self-Perception: You categorize your personality tendency as ${getAns(3)}.`,
        `Group Dynamics: You operate effectively as a ${getAns(12).toLowerCase()} within team environments.`,
        `Communication Preference: Your natural dialogue is characterized as ${getAns(7).toLowerCase()}.`,
        `Energy Regeneration: You draw foundational energy through ${getAns(15).toLowerCase()}.`,
        `Peer Orientation: You describe your general dynamic as being more ${getAns(18).toLowerCase()}.`,
      ],
    },
    motivationAndGoals: {
      title: 'Motivation & Goals',
      summary: `Your overarching driver is rooted in ${getAns(4).toLowerCase()}, with ${getAns(13).toLowerCase()} emerging as your most guarded personal priority.`,
      highlights: [
        `Primary Driver: The pursuit of ${getAns(4).toLowerCase()} fuels your commitments and daily focus.`,
        `Highest Value: What matters most to you in life is ${getAns(13).toLowerCase()}.`,
        `Lifestyle Preference: You favor a ${getAns(11).toLowerCase()} rhythm to maintain balance and momentum.`,
        `Transition Posture: When opportunities for evolution occur, you tend to feel ${getAns(9).toLowerCase()}.`,
        `Future Horizon: Looking ahead, you express a clear preference for ${getAns(20).toLowerCase()}.`,
      ],
    },
    emotionalAndResponse: {
      title: 'Emotional & Response Patterns',
      summary: `When navigating pressure or constructive feedback, your pattern suggests an initial inclination to be ${getAns(6).toLowerCase()}, balancing this with a ${getAns(19).toLowerCase()} emotional outward expression.`,
      highlights: [
        `Core Vulnerability: You identified your most sensitive concern as ${getAns(5).toLowerCase()}.`,
        `Pressure State: Under heightened stress or urgency, you observe that you become ${getAns(6).toLowerCase()}.`,
        `Reaction to Criticism: When receiving feedback or critiques, your internal response leans towards being ${getAns(14).toLowerCase()}.`,
        `Risk Tolerance: Your risk-taking threshold is currently described as ${getAns(17).toLowerCase()}.`,
        `Emotional Modulation: You regulate your emotional states in a ${getAns(19).toLowerCase()} manner.`,
      ],
    },
  };

  // 4. Response Audit Table Data
  const responses = ASSESSMENT_QUESTIONS.map((q) => ({
    questionId: q.id,
    question: q.question,
    category: q.category,
    answer: getAns(q.id) || 'Not answered',
  }));

  // 5. Final Reflection Summary
  const clientName = userInfo.name ? userInfo.name.trim() : 'Guest';
  const reflectionSummary = `Based on your selections, ${clientName}, you demonstrate a preference for ${getAns(2).toLowerCase()} decision-making combined with a strong valuation of ${getAns(13).toLowerCase()} and an ongoing commitment to ${getAns(20).toLowerCase()}. In your approach to life transitions, you lean towards being ${getAns(9).toLowerCase()}, drawing vitality from ${getAns(15).toLowerCase()}. These insights form a meaningful, concrete foundation for your upcoming exploration with a LifeBloom coach—helping focus your coaching journey on what matters most to you.`;

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
  };
}
