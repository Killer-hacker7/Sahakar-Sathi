export type ScreenType = 'home' | 'answer' | 'grievance';

export type LanguageCode = 'hi' | 'en' | 'bn' | 'mr' | 'gu';

export interface AnswerData {
  queryHindi: string;
  queryEnglish: string;
  transcriptionBadge: string;
  badgeLabel: string;
  summaryText: string;
  highlightedText?: string;
  helpline: string;
  timeline: string;
  documents: string;
  citationSection: string;
  citationTitle: string;
  citationDetail: string;
  officerName: string;
  officerRole: string;
  officerLocation: string;
  surveyTime: string;
  surveyOfficer: string;
}

export interface GrievanceTicket {
  ticketId: string;
  departmentHindi: string;
  departmentEnglish: string;
  categoryHindi: string;
  categoryEnglish: string;
  priorityHindi: string;
  priorityEnglish: string;
  resolutionTime: string;
  languageDetected: string;
  transcription: string;
  audioDuration: string;
  officerName: string;
  officerTitle: string;
  officerContact: string;
  officerOffice: string;
  securityHash: string;
  societyCode: string;
  trackingUrl: string;
  timestamp: string;
}
