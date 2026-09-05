'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ReportAnalysis } from '@/lib/discovery/analysisEngine';
import { RadarChart } from './RadarChart';
import { generateReportPDF } from '@/lib/discovery/pdfGenerator';

interface ReportViewProps {
  analysis: ReportAnalysis;
}

export function ReportView({ analysis }: ReportViewProps) {
  const router = useRouter();
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [pendingNavigationUrl, setPendingNavigationUrl] = useState<string | null>(null);
  const [showAllResponses, setShowAllResponses] = useState(false);

  // 1. Browser beforeunload listener to warn user before closing tab
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isDownloaded) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDownloaded]);

  // 2. Download Handler
  const handleDownloadPDF = useCallback(async () => {
    try {
      setIsDownloading(true);
      const pdfBlob = await generateReportPDF(analysis);
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      const safeName = (analysis.clientName || 'Client').replace(/[^a-zA-Z0-9]/g, '_');
      link.download = `LifeBloom_Personal_Discovery_Report_${safeName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsDownloaded(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('shivi_discovery_downloaded', 'true');
      }
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      alert('Could not generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  }, [analysis]);

  // 3. Handle Intercepted Navigation
  const handleLeavePage = (destination: string) => {
    if (isDownloaded) {
      router.push(destination);
    } else {
      setPendingNavigationUrl(destination);
      setShowExitModal(true);
    }
  };

  const confirmLeave = () => {
    setShowExitModal(false);
    if (pendingNavigationUrl) {
      router.push(pendingNavigationUrl);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-4">
      {/* ⚠️ Step 12: Persistent Unsaved Warning Banner */}
      {!isDownloaded ? (
        <div className="sticky top-20 z-30 mb-8 p-4 sm:p-5 bg-amber-50/95 backdrop-blur-md border border-amber-200/80 rounded-2xl shadow-lg shadow-amber-900/5 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in-up">
          <div className="flex items-start gap-3">
            <span className="text-xl sm:text-2xl" aria-hidden="true">⚠️</span>
            <div>
              <p className="font-sans text-xs sm:text-sm font-bold text-amber-900">
                Your report has not been saved yet.
              </p>
              <p className="font-sans text-xs text-amber-800 leading-snug">
                Because your assessment is not permanently stored on our servers, please download your report before leaving this page.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#9B70C7] hover:bg-[#865CB5] text-white font-sans text-xs font-semibold shadow-md shadow-[#9B70C7]/25 hover:shadow-lg transition-all shrink-0 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isDownloading ? (
              <span>Preparing PDF...</span>
            ) : (
              <>
                <span>📄</span>
                <span>Download My Report</span>
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between gap-4 animate-fade-in-up">
          <div className="flex items-center gap-2.5 text-emerald-800 text-xs sm:text-sm font-medium">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
            <span>Your Personal Reflection Report has been downloaded successfully.</span>
          </div>
          <button
            type="button"
            onClick={() => handleLeavePage('/')}
            className="font-sans text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline shrink-0 cursor-pointer"
          >
            Return to LifeBloom Home →
          </button>
        </div>
      )}

      {/* Main Report Card */}
      <div className="bg-white rounded-[32px] sm:rounded-[40px] p-6 sm:p-12 md:p-14 border border-[#EDE7EE] shadow-xl shadow-[rgba(74,52,80,0.06)] mb-10">
        {/* Header Branding */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-[#EDE7EE] gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-serif font-bold text-base text-[#865CB5] tracking-widest uppercase">
                LIFEBLOOM
              </span>
              <span className="text-[#EDE7EE]">•</span>
              <span className="font-sans text-xs font-semibold text-[#6E6872] uppercase tracking-wider">
                Personal Discovery
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#25222A] font-normal tracking-tight">
              Your LifeBloom Personal Reflection Report
            </h1>
          </div>

          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#9B70C7] hover:bg-[#865CB5] text-white font-sans text-sm font-semibold shadow-md shadow-[#9B70C7]/20 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer shrink-0"
          >
            {isDownloading ? (
              <span>Generating PDF...</span>
            ) : (
              <>
                <span>📄 Download My Report</span>
                <span>→</span>
              </>
            )}
          </button>
        </div>

        {/* Client Metadata Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8 p-5 rounded-2xl bg-[#FCF8FB] border border-[#EDE7EE]">
          <div>
            <span className="block font-sans text-[11px] text-[#6E6872] uppercase font-semibold">Prepared For</span>
            <span className="font-serif text-base sm:text-lg font-bold text-[#25222A]">{analysis.clientName}</span>
          </div>
          <div>
            <span className="block font-sans text-[11px] text-[#6E6872] uppercase font-semibold">Area of Interest</span>
            <span className="font-sans text-sm font-medium text-[#865CB5]">{analysis.areaOfInterest}</span>
          </div>
          <div>
            <span className="block font-sans text-[11px] text-[#6E6872] uppercase font-semibold">Email</span>
            <span className="font-sans text-sm text-[#25222A] truncate block">{analysis.clientEmail}</span>
          </div>
          <div>
            <span className="block font-sans text-[11px] text-[#6E6872] uppercase font-semibold">Date Completed</span>
            <span className="font-sans text-sm text-[#25222A]">{analysis.completedDate}</span>
          </div>
        </div>

        {/* Step 6: Clear Disclaimer */}
        <div className="mb-10 p-4 rounded-xl bg-[#FAF5FD] border border-[#C9A5E8]/40 flex items-start gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9B70C7" strokeWidth="2" className="shrink-0 mt-0.5" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <p className="font-sans text-xs text-[#521C6B] leading-relaxed">
            <strong>Disclaimer:</strong> This report is based on your selected responses and is intended to support personal reflection and coaching conversations. It is not a psychological, medical or clinical assessment.
          </p>
        </div>

        {/* Step 9: Visual Graphs (Radar Chart & Dimension Progress Bars) */}
        <div className="mb-14">
          <div className="mb-6">
            <span className="font-sans text-xs font-semibold text-[#865CB5] tracking-widest uppercase block mb-1">
              Visual Profile
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#25222A] font-normal">
              Response Pattern Overview
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FCF8FB] p-6 sm:p-8 rounded-3xl border border-[#EDE7EE]">
            {/* Left: SVG Radar Chart */}
            <div className="lg:col-span-6 flex justify-center">
              <RadarChart dimensions={analysis.dimensions} />
            </div>

            {/* Right: Progress Dimension Bars */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="font-serif text-lg font-normal text-[#25222A] mb-2">
                Personal Preference Dimensions
              </h3>
              {analysis.dimensions.map((dim) => (
                <div key={dim.key} className="bg-white p-3.5 rounded-xl border border-[#EDE7EE]">
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span className="font-sans font-semibold text-[#25222A]">{dim.label}</span>
                    <span className="font-mono font-bold text-[#865CB5]">{dim.score}% ({dim.badge})</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#EDE7EE] rounded-full overflow-hidden mb-1.5">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${dim.score}%`,
                        background: 'linear-gradient(90deg, #FBE8F0 0%, #C9A5E8 50%, #9B70C7 100%)',
                      }}
                    />
                  </div>
                  <p className="font-sans text-[11px] text-[#6E6872] leading-tight">{dim.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 8.6: Key Personal Preferences (6 Highlight Cards) */}
        <div className="mb-14">
          <div className="mb-6">
            <span className="font-sans text-xs font-semibold text-[#865CB5] tracking-widest uppercase block mb-1">
              Core Observations
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#25222A] font-normal">
              Key Personal Preferences
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {analysis.keyPreferences.map((pref) => (
              <div
                key={pref.title}
                className="bg-white p-5 rounded-2xl border border-[#EDE7EE] hover:border-[#C9A5E8]/60 transition-all shadow-xs"
              >
                <span className="font-sans text-[11px] font-bold text-[#865CB5] tracking-wider uppercase block mb-1">
                  {pref.title}
                </span>
                <p className="font-serif text-lg text-[#25222A] font-semibold mb-2">
                  {pref.value}
                </p>
                <p className="font-sans text-xs text-[#6E6872] leading-relaxed">
                  {pref.insight}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Step 8: Qualitative Narrative Analysis Sections */}
        <div className="mb-14">
          <div className="mb-6">
            <span className="font-sans text-xs font-semibold text-[#865CB5] tracking-widest uppercase block mb-1">
              Deep Dive
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#25222A] font-normal">
              Personal Reflection Perspectives
            </h2>
          </div>

          <div className="space-y-6">
            {/* Section 1: Thinking & Decision Style */}
            <div className="bg-[#FCF8FB] p-6 sm:p-7 rounded-2xl border border-[#EDE7EE]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🧠</span>
                <h3 className="font-serif text-xl font-normal text-[#25222A]">
                  {analysis.sections.thinkingAndDecision.title}
                </h3>
              </div>
              <p className="font-sans text-sm text-[#4A4452] leading-relaxed mb-4">
                {analysis.sections.thinkingAndDecision.summary}
              </p>
              <ul className="space-y-2 font-sans text-xs text-[#6E6872]">
                {analysis.sections.thinkingAndDecision.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#9B70C7] shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 2: Personality & Interaction Style */}
            <div className="bg-[#FCF8FB] p-6 sm:p-7 rounded-2xl border border-[#EDE7EE]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🌿</span>
                <h3 className="font-serif text-xl font-normal text-[#25222A]">
                  {analysis.sections.personalityAndInteraction.title}
                </h3>
              </div>
              <p className="font-sans text-sm text-[#4A4452] leading-relaxed mb-4">
                {analysis.sections.personalityAndInteraction.summary}
              </p>
              <ul className="space-y-2 font-sans text-xs text-[#6E6872]">
                {analysis.sections.personalityAndInteraction.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#9B70C7] shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 3: Motivation & Goals */}
            <div className="bg-[#FCF8FB] p-6 sm:p-7 rounded-2xl border border-[#EDE7EE]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🔥</span>
                <h3 className="font-serif text-xl font-normal text-[#25222A]">
                  {analysis.sections.motivationAndGoals.title}
                </h3>
              </div>
              <p className="font-sans text-sm text-[#4A4452] leading-relaxed mb-4">
                {analysis.sections.motivationAndGoals.summary}
              </p>
              <ul className="space-y-2 font-sans text-xs text-[#6E6872]">
                {analysis.sections.motivationAndGoals.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#9B70C7] shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 4: Emotional & Response Patterns */}
            <div className="bg-[#FCF8FB] p-6 sm:p-7 rounded-2xl border border-[#EDE7EE]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">💜</span>
                <h3 className="font-serif text-xl font-normal text-[#25222A]">
                  {analysis.sections.emotionalAndResponse.title}
                </h3>
              </div>
              <p className="font-sans text-sm text-[#4A4452] leading-relaxed mb-4">
                {analysis.sections.emotionalAndResponse.summary}
              </p>
              <ul className="space-y-2 font-sans text-xs text-[#6E6872]">
                {analysis.sections.emotionalAndResponse.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#9B70C7] shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Step 10: Final Summary */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#FBE8F0]/50 via-[#EEE7FA]/60 to-[#FBE8F0]/30 border border-[#C9A5E8]/40">
          <span className="font-sans text-xs font-semibold text-[#865CB5] tracking-widest uppercase block mb-1">
            Coaching Context
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#25222A] font-normal mb-4">
            Your Reflection Summary
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#4A4452] leading-relaxed mb-6">
            {analysis.reflectionSummary}
          </p>
          <div className="p-4 bg-white/80 rounded-2xl border border-[#EDE7EE]">
            <p className="font-sans text-xs text-[#6E6872]">
              💡 <strong>Next Step:</strong> Bring your downloaded PDF report to your upcoming 1-on-1 discovery call with Dr. Shivani. It will serve as an authentic starting point to accelerate your clarity, leadership, and transformation goals.
            </p>
          </div>
        </div>

        {/* Step 8.1: Complete 20-Response Overview (Collapsible/Accordion) */}
        <div className="mb-10 pt-6 border-t border-[#EDE7EE]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-serif text-xl text-[#25222A]">
                Your Response Overview
              </h2>
              <p className="font-sans text-xs text-[#6E6872]">
                All 20 questions and your recorded selections.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAllResponses(!showAllResponses)}
              className="font-sans text-xs font-semibold text-[#865CB5] hover:text-[#6E3587] underline cursor-pointer"
            >
              {showAllResponses ? 'Hide Responses ▲' : 'Show All 20 Responses ▼'}
            </button>
          </div>

          {showAllResponses && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 animate-fade-in-up">
              {analysis.responses.map((r) => (
                <div key={r.questionId} className="p-3.5 bg-[#FCF8FB] rounded-xl border border-[#EDE7EE] flex items-start justify-between gap-3">
                  <div>
                    <span className="font-mono text-[10px] text-[#865CB5] font-bold block mb-0.5">
                      Q{r.questionId} • {r.category}
                    </span>
                    <p className="font-sans text-xs font-medium text-[#25222A]">
                      {r.question}
                    </p>
                  </div>
                  <span className="font-sans text-xs font-bold text-[#6E3587] bg-[#EEE7FA] px-2.5 py-1 rounded-lg shrink-0 border border-[#C9A5E8]/30">
                    {r.answer}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#EDE7EE]">
          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#9B70C7] hover:bg-[#865CB5] text-white font-sans text-base font-semibold shadow-lg shadow-[#9B70C7]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            {isDownloading ? (
              <span>Preparing PDF Document...</span>
            ) : (
              <>
                <span>📄 Download My Report</span>
                <span>→</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleLeavePage('/')}
            className="font-sans text-sm font-semibold text-[#6E6872] hover:text-[#25222A] transition-colors cursor-pointer"
          >
            Return to LifeBloom Home →
          </button>
        </div>
      </div>

      {/* Step 12: In-App Exit Protection Modal */}
      {showExitModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in-up"
        >
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#EDE7EE] shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xl mx-auto mb-4">
              ⚠️
            </div>
            <h3 id="exit-modal-title" className="font-serif text-xl sm:text-2xl text-center text-[#25222A] mb-2 font-normal">
              Your report has not been downloaded.
            </h3>
            <p className="font-sans text-xs sm:text-sm text-center text-[#6E6872] leading-relaxed mb-6">
              Because your assessment is not permanently stored on our servers, your information may be lost if you leave now without saving a copy.
            </p>
            <div className="space-y-3">
              <button
                type="button"
                onClick={async () => {
                  await handleDownloadPDF();
                  setShowExitModal(false);
                }}
                disabled={isDownloading}
                className="w-full py-3 px-4 rounded-full bg-[#9B70C7] hover:bg-[#865CB5] text-white font-sans text-sm font-semibold shadow-md shadow-[#9B70C7]/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>📄 Download Report</span>
              </button>
              <button
                type="button"
                onClick={confirmLeave}
                className="w-full py-2.5 px-4 rounded-full bg-transparent hover:bg-neutral-100 text-[#6E6872] font-sans text-xs font-medium transition-colors cursor-pointer"
              >
                Leave Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
