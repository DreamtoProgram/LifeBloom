import type { ReportAnalysis } from './analysisEngine';

export async function generateReportPDF(analysis: ReportAnalysis): Promise<Blob> {
  const { jsPDF } = await import('jspdf');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  const colorPurple = [155, 112, 199]; // #9B70C7
  const colorPurpleDark = [110, 53, 135]; // #6E3587
  const colorLavenderSoft = [238, 231, 250]; // #EEE7FA
  const colorBlush = [251, 232, 240]; // #FBE8F0
  const colorTextDark = [37, 34, 42]; // #25222A
  const colorTextMuted = [110, 104, 114]; // #6E6872
  const colorBorder = [237, 231, 238]; // #EDE7EE

  const addHeader = (title: string, subheader: string) => {
    // Top banner gradient / accent
    doc.setFillColor(colorLavenderSoft[0], colorLavenderSoft[1], colorLavenderSoft[2]);
    doc.rect(0, 0, pageWidth, 24, 'F');

    doc.setFillColor(colorPurple[0], colorPurple[1], colorPurple[2]);
    doc.rect(0, 0, 5, 24, 'F');

    doc.setTextColor(colorPurpleDark[0], colorPurpleDark[1], colorPurpleDark[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('LIFEBLOOM', margin, 10);

    doc.setTextColor(colorTextMuted[0], colorTextMuted[1], colorTextMuted[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('Personal Discovery Journey • Reflection Report', margin + 30, 10);

    doc.setTextColor(colorTextDark[0], colorTextDark[1], colorTextDark[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(title, margin, 18);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(colorTextMuted[0], colorTextMuted[1], colorTextMuted[2]);
    doc.text(subheader, margin + 85, 18);

    // Separator line
    doc.setDrawColor(colorBorder[0], colorBorder[1], colorBorder[2]);
    doc.setLineWidth(0.3);
    doc.line(margin, 26, pageWidth - margin, 26);
  };

  const addFooter = (pageNum: number, totalPages: number) => {
    doc.setDrawColor(colorBorder[0], colorBorder[1], colorBorder[2]);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(colorTextMuted[0], colorTextMuted[1], colorTextMuted[2]);
    doc.text('LifeBloom Personal Discovery Assessment • Confidential Coaching Preparation', margin, pageHeight - 7);
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin - 18, pageHeight - 7);
  };

  // ==========================================
  // PAGE 1: Profile, Dimensions & Key Insights
  // ==========================================
  addHeader('Personal Discovery Profile', 'Prepared for Coaching Consultation');

  let y = 32;

  // Client Details Card
  doc.setFillColor(colorBlush[0], colorBlush[1], colorBlush[2]);
  doc.roundedRect(margin, y, contentWidth, 24, 3, 3, 'F');
  doc.setDrawColor(colorBorder[0], colorBorder[1], colorBorder[2]);
  doc.roundedRect(margin, y, contentWidth, 24, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(colorPurpleDark[0], colorPurpleDark[1], colorPurpleDark[2]);
  doc.text(`Client: ${analysis.clientName}`, margin + 5, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(colorTextDark[0], colorTextDark[1], colorTextDark[2]);
  doc.text(`Email: ${analysis.clientEmail}`, margin + 5, y + 14);
  doc.text(`Phone: ${analysis.clientPhone || 'Not provided'}`, margin + 5, y + 20);

  doc.text(`Area of Interest: ${analysis.areaOfInterest}`, margin + 90, y + 14);
  doc.text(`Completed Date: ${analysis.completedDate}`, margin + 90, y + 20);

  y += 31;

  // Section Heading: Response Pattern Overview
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(colorPurpleDark[0], colorPurpleDark[1], colorPurpleDark[2]);
  doc.text('1. Response Pattern Overview (Personal Preference Dimensions)', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(colorTextMuted[0], colorTextMuted[1], colorTextMuted[2]);
  doc.text('Calculated based on transparent, rule-based mappings from your 20 selections.', margin, y);
  y += 6;

  // Render 6 Dimension Bars
  analysis.dimensions.forEach((dim) => {
    // Label & Score
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(colorTextDark[0], colorTextDark[1], colorTextDark[2]);
    doc.text(dim.label, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(colorPurpleDark[0], colorPurpleDark[1], colorPurpleDark[2]);
    doc.text(`${dim.score}% (${dim.badge})`, pageWidth - margin - 35, y);

    y += 2.5;

    // Track Background
    const trackWidth = contentWidth;
    const barHeight = 4.5;
    doc.setFillColor(colorBorder[0], colorBorder[1], colorBorder[2]);
    doc.roundedRect(margin, y, trackWidth, barHeight, 1.5, 1.5, 'F');

    // Filled Track
    const fillWidth = (dim.score / 100) * trackWidth;
    doc.setFillColor(colorPurple[0], colorPurple[1], colorPurple[2]);
    doc.roundedRect(margin, y, Math.max(5, fillWidth), barHeight, 1.5, 1.5, 'F');

    y += barHeight + 2;

    // Description
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(colorTextMuted[0], colorTextMuted[1], colorTextMuted[2]);
    doc.text(dim.description, margin, y);

    y += 5.5;
  });

  y += 3;

  // Key Personal Preferences (2 Columns)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(colorPurpleDark[0], colorPurpleDark[1], colorPurpleDark[2]);
  doc.text('2. Key Personal Preferences Snapshot', margin, y);
  y += 7;

  const colWidth = (contentWidth - 6) / 2;
  analysis.keyPreferences.forEach((pref, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const boxX = margin + col * (colWidth + 6);
    const boxY = y + row * 22;

    doc.setFillColor(colorLavenderSoft[0], colorLavenderSoft[1], colorLavenderSoft[2]);
    doc.roundedRect(boxX, boxY, colWidth, 18, 2, 2, 'F');
    doc.setDrawColor(colorBorder[0], colorBorder[1], colorBorder[2]);
    doc.roundedRect(boxX, boxY, colWidth, 18, 2, 2, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(colorPurpleDark[0], colorPurpleDark[1], colorPurpleDark[2]);
    doc.text(pref.title.toUpperCase(), boxX + 4, boxY + 5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(colorTextDark[0], colorTextDark[1], colorTextDark[2]);
    doc.text(pref.value, boxX + 4, boxY + 10);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(colorTextMuted[0], colorTextMuted[1], colorTextMuted[2]);
    const lines = doc.splitTextToSize(pref.insight, colWidth - 8);
    doc.text(lines.slice(0, 2), boxX + 4, boxY + 14);
  });

  addFooter(1, 3);

  // ==========================================
  // PAGE 2: Qualitative Coaching Reflections
  // ==========================================
  doc.addPage();
  addHeader('Personal Reflections & Narrative Insights', 'Qualitative Coaching Perspectives');

  y = 33;

  const reportSections = [
    analysis.sections.thinkingAndDecision,
    analysis.sections.personalityAndInteraction,
    analysis.sections.motivationAndGoals,
    analysis.sections.emotionalAndResponse,
  ];

  reportSections.forEach((sec, idx) => {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(colorBorder[0], colorBorder[1], colorBorder[2]);
    doc.roundedRect(margin, y, contentWidth, 43, 2.5, 2.5, 'S');

    // Section title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(colorPurpleDark[0], colorPurpleDark[1], colorPurpleDark[2]);
    doc.text(`${idx + 1}. ${sec.title}`, margin + 5, y + 6.5);

    // Summary narrative
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(colorTextDark[0], colorTextDark[1], colorTextDark[2]);
    const summaryLines = doc.splitTextToSize(sec.summary, contentWidth - 10);
    doc.text(summaryLines, margin + 5, y + 12);

    // Highlights bullet points
    let bulletY = y + 17 + summaryLines.length * 3.2;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(colorTextMuted[0], colorTextMuted[1], colorTextMuted[2]);

    sec.highlights.slice(0, 4).forEach((hl) => {
      doc.setFillColor(colorPurple[0], colorPurple[1], colorPurple[2]);
      doc.circle(margin + 7, bulletY - 1, 0.8, 'F');
      const hlLines = doc.splitTextToSize(hl, contentWidth - 16);
      doc.text(hlLines[0], margin + 10, bulletY);
      bulletY += 4.2;
    });

    y += 48;
  });

  // Final Summary Box for Coaching Call
  doc.setFillColor(colorLavenderSoft[0], colorLavenderSoft[1], colorLavenderSoft[2]);
  doc.roundedRect(margin, y, contentWidth, 36, 3, 3, 'F');
  doc.setDrawColor(colorPurple[0], colorPurple[1], colorPurple[2]);
  doc.roundedRect(margin, y, contentWidth, 36, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(colorPurpleDark[0], colorPurpleDark[1], colorPurpleDark[2]);
  doc.text('Coach Preparation Summary', margin + 5, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(colorTextDark[0], colorTextDark[1], colorTextDark[2]);
  const finalLines = doc.splitTextToSize(analysis.reflectionSummary, contentWidth - 10);
  doc.text(finalLines, margin + 5, y + 13);

  addFooter(2, 3);

  // ==========================================
  // PAGE 3: Complete 20-Question Response Audit & Disclaimer
  // ==========================================
  doc.addPage();
  addHeader('Questionnaire Responses Audit', 'Complete 20-Question Record');

  y = 33;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(colorTextMuted[0], colorTextMuted[1], colorTextMuted[2]);
  doc.text('Below is your verified record of all 20 responses provided during your assessment session.', margin, y);
  y += 6;

  // Table header
  doc.setFillColor(colorLavenderSoft[0], colorLavenderSoft[1], colorLavenderSoft[2]);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(colorPurpleDark[0], colorPurpleDark[1], colorPurpleDark[2]);
  doc.text('#', margin + 3, y + 5);
  doc.text('Question', margin + 12, y + 5);
  doc.text('Category', margin + 88, y + 5);
  doc.text('Your Selected Answer', margin + 132, y + 5);
  y += 7;

  // Table rows
  analysis.responses.forEach((resp, i) => {
    if (i % 2 === 1) {
      doc.setFillColor(252, 248, 251);
      doc.rect(margin, y, contentWidth, 6.2, 'F');
    }
    doc.setDrawColor(colorBorder[0], colorBorder[1], colorBorder[2]);
    doc.setLineWidth(0.1);
    doc.line(margin, y + 6.2, pageWidth - margin, y + 6.2);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(colorTextDark[0], colorTextDark[1], colorTextDark[2]);
    doc.text(`Q${resp.questionId}`, margin + 3, y + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    const qShort = resp.question.length > 44 ? resp.question.slice(0, 42) + '...' : resp.question;
    doc.text(qShort, margin + 12, y + 4.5);

    doc.setTextColor(colorTextMuted[0], colorTextMuted[1], colorTextMuted[2]);
    doc.text(resp.category.replace('&', '+'), margin + 88, y + 4.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colorPurpleDark[0], colorPurpleDark[1], colorPurpleDark[2]);
    doc.text(resp.answer, margin + 132, y + 4.5);

    y += 6.2;
  });

  y += 8;

  // Mandatory Disclaimer Box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(colorPurple[0], colorPurple[1], colorPurple[2]);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(colorPurpleDark[0], colorPurpleDark[1], colorPurpleDark[2]);
  doc.text('DISCLAIMER & PURPOSE NOTICE', margin + 5, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(colorTextDark[0], colorTextDark[1], colorTextDark[2]);
  const disclaimer =
    'This report is based on your selected responses and is intended to support personal reflection and coaching conversations. It is not a psychological, medical or clinical assessment, diagnosis, or health recommendation.';
  const discLines = doc.splitTextToSize(disclaimer, contentWidth - 10);
  doc.text(discLines, margin + 5, y + 11);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(colorTextMuted[0], colorTextMuted[1], colorTextMuted[2]);
  doc.text('LifeBloom Coaching Practice • Dr. Shivani Koccher Dhand • All Rights Reserved', margin + 5, y + 19);

  addFooter(3, 3);

  return doc.output('blob');
}
