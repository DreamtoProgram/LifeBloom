'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui';
import { ASSESSMENT_QUESTIONS, type Question } from '@/lib/discovery/questions';
import { generateReportAnalysis, type ReportAnalysis } from '@/lib/discovery/analysisEngine';
import { ProgressBar } from '@/components/discovery/ProgressBar';
import { QuestionCard } from '@/components/discovery/QuestionCard';
import { LoadingTransition } from '@/components/discovery/LoadingTransition';
import { ReportView } from '@/components/discovery/ReportView';

type ViewMode = 'questionnaire' | 'analyzing' | 'report';

interface UserInfo {
  name: string;
  email: string;
  phone?: string;
  interest?: string;
}

export default function PersonalDiscoveryPage() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    email: '',
    phone: '',
    interest: 'Personal Discovery',
  });

  const [currentStep, setCurrentStep] = useState<number>(1); // 1 to 20
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [error, setError] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('questionnaire');
  const [analysis, setAnalysis] = useState<ReportAnalysis | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // 1. Restore state from sessionStorage on mount
  useEffect(() => {
    setIsMounted(true);
    if (typeof window === 'undefined') return;

    // Load User Info
    const storedUser = sessionStorage.getItem('shivi_discovery_user');
    let loadedUser: UserInfo = { name: '', email: '', phone: '', interest: 'Personal Discovery' };
    if (storedUser) {
      try {
        loadedUser = JSON.parse(storedUser);
        setUserInfo(loadedUser);
      } catch (e) {
        console.error('Failed to parse user info:', e);
      }
    }

    // Load Answers
    const storedAnswers = sessionStorage.getItem('shivi_discovery_answers');
    let loadedAnswers: Record<number, string> = {};
    if (storedAnswers) {
      try {
        loadedAnswers = JSON.parse(storedAnswers);
        setAnswers(loadedAnswers);
      } catch (e) {
        console.error('Failed to parse stored answers:', e);
      }
    }

    // Load Step
    const storedStep = sessionStorage.getItem('shivi_discovery_step');
    if (storedStep) {
      const stepNum = parseInt(storedStep, 10);
      if (!isNaN(stepNum) && stepNum >= 1 && stepNum <= 20) {
        setCurrentStep(stepNum);
      }
    }

    // Check if report was already generated
    const reportGenerated = sessionStorage.getItem('shivi_discovery_report_generated');
    if (reportGenerated === 'true' && Object.keys(loadedAnswers).length === 20) {
      const report = generateReportAnalysis(loadedAnswers, loadedUser);
      setAnalysis(report);
      setViewMode('report');
    }
  }, []);

  // Current question helper
  const question: Question = ASSESSMENT_QUESTIONS[currentStep - 1] || ASSESSMENT_QUESTIONS[0];
  const selectedOption = answers[question.id];

  // 2. Select Option Handler
  const handleSelectOption = (option: string) => {
    const updatedAnswers = { ...answers, [question.id]: option };
    setAnswers(updatedAnswers);
    setError('');

    // Persist answers
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('shivi_discovery_answers', JSON.stringify(updatedAnswers));
    }
  };

  // 3. Next / Previous Navigation
  const handleNext = () => {
    if (!answers[question.id]) {
      setError('Please select an option to continue.');
      return;
    }

    if (currentStep < ASSESSMENT_QUESTIONS.length) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setError('');
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('shivi_discovery_step', nextStep.toString());
      }
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setError('');
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('shivi_discovery_step', prevStep.toString());
      }
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  // 4. Generate Report (Final Step)
  const handleGenerateReport = () => {
    if (!answers[question.id]) {
      setError('Please select an option to continue.');
      return;
    }

    // Validate all 20 questions
    const unanswered = ASSESSMENT_QUESTIONS.filter((q) => !answers[q.id]);
    if (unanswered.length > 0) {
      setError(`Please complete Question ${unanswered[0].id} before generating your report.`);
      setCurrentStep(unanswered[0].id);
      return;
    }

    // Switch to animated loading view
    setViewMode('analyzing');
    window.scrollTo({ top: 80, behavior: 'smooth' });
  };

  // 5. When loading completes
  const handleAnalysisComplete = () => {
    const result = generateReportAnalysis(answers, userInfo);
    setAnalysis(result);
    setViewMode('report');
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('shivi_discovery_report_generated', 'true');
    }
    window.scrollTo({ top: 80, behavior: 'smooth' });
  };

  // Extract first name for greeting
  const firstName = userInfo.name ? userInfo.name.trim().split(' ')[0] : '';

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#FCF8FB] flex items-center justify-center py-24">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#9B70C7]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF8FB] pt-24 pb-20 relative overflow-hidden">
      {/* Background Soft Botanical Gradients */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none -translate-y-1/3 translate-x-1/4 animate-float-slow"
        style={{ background: 'radial-gradient(circle, #FBE8F0 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-0 w-[450px] h-[450px] rounded-full opacity-25 pointer-events-none -translate-x-1/4 animate-float-reverse"
        style={{ background: 'radial-gradient(circle, #EEE7FA 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <Container>
        {/* ==============================================
            ASSESSMENT PAGE HEADER (Always visible in questionnaire/analyzing)
            ============================================== */}
        {viewMode !== 'report' && (
          <header className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            {/* Top Brand Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EDE7EE] shadow-xs mb-4">
              <span className="font-serif font-bold text-xs text-[#865CB5] tracking-widest uppercase">
                LIFEBLOOM
              </span>
              <span className="text-[#EDE7EE]">•</span>
              <span className="font-sans text-[11px] font-medium text-[#6E6872] tracking-wider uppercase">
                Personal Discovery Journey
              </span>
            </div>

            {/* Welcome Greeting with User Name */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#25222A] font-normal tracking-tight mb-3">
              {firstName ? `Welcome, ${firstName}` : 'Personal Discovery Journey'}
            </h1>

            {/* Welcoming Message */}
            <p className="font-sans text-sm sm:text-base text-[#6E6872] leading-relaxed mb-5">
              Take a few moments to reflect on your preferences, perspectives and approach to life.
            </p>

            {/* Disclaimer Notice */}
            <div className="inline-block p-3.5 rounded-2xl bg-white/80 border border-[#EDE7EE] text-left max-w-xl">
              <p className="font-sans text-xs text-[#6E6872] leading-relaxed text-center">
                <span className="font-semibold text-[#865CB5]">Note:</span> This assessment is designed for personal reflection and coaching conversations. It is not a medical, psychological or clinical diagnosis.
              </p>
            </div>
          </header>
        )}

        {/* ==============================================
            VIEW 1: MULTI-STEP QUESTIONNAIRE
            ============================================== */}
        {viewMode === 'questionnaire' && (
          <main className="max-w-3xl mx-auto">
            {/* Visual Progress Bar */}
            <ProgressBar
              current={currentStep}
              total={ASSESSMENT_QUESTIONS.length}
              category={question.category}
              categoryEmoji={question.categoryEmoji}
            />

            {/* Current Question Card */}
            <QuestionCard
              question={question}
              selectedOption={selectedOption}
              onSelectOption={handleSelectOption}
              error={error}
            />

            {/* Navigation Buttons Strip */}
            <div className="flex items-center justify-between mt-8 pt-4">
              {/* Previous Button */}
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-6 py-3 rounded-full bg-white hover:bg-[#FCF8FB] border border-[#EDE7EE] hover:border-[#C9A5E8] text-[#25222A] font-sans text-sm font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <span>←</span>
                  <span>Previous</span>
                </button>
              ) : (
                <div /> // Spacer to keep next button aligned to right
              )}

              {/* Next / Final Generate Button */}
              {currentStep < ASSESSMENT_QUESTIONS.length ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3.5 rounded-full bg-[#9B70C7] hover:bg-[#865CB5] text-white font-sans text-sm font-semibold shadow-md shadow-[#9B70C7]/20 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Next</span>
                  <span>→</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleGenerateReport}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#9B70C7] via-[#865CB5] to-[#6E3587] hover:opacity-95 text-white font-sans text-sm sm:text-base font-semibold shadow-lg shadow-[#9B70C7]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Generate My Personal Report ✨</span>
                </button>
              )}
            </div>

            {/* Return to Contact / Home link */}
            <div className="mt-12 text-center">
              <Link
                href="/contact"
                className="font-sans text-xs text-[#6E6872] hover:text-[#9B70C7] transition-colors"
              >
                Need to edit your contact information? Return to Contact Form
              </Link>
            </div>
          </main>
        )}

        {/* ==============================================
            VIEW 2: ANIMATED ANALYSIS LOADING SCREEN
            ============================================== */}
        {viewMode === 'analyzing' && (
          <LoadingTransition onComplete={handleAnalysisComplete} />
        )}

        {/* ==============================================
            VIEW 3: PERSONAL REFLECTION REPORT VIEW
            ============================================== */}
        {viewMode === 'report' && analysis && (
          <ReportView analysis={analysis} />
        )}
      </Container>
    </div>
  );
}
