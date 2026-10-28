export type AppTab = 'main' | 'univ-rooms' | 'exam-room' | 'eval-report' | 'book-mall' | 'junior' | 'middle';

export interface Passage {
  id: string;
  label: string; // e.g. "제시문 (가)", "제시문 (나)", "도표 자료 (라)"
  title?: string;
  source?: string;
  content: string;
  chartData?: { label: string; valueA: number; valueB: number }[];
}

export interface Exam {
  id: string;
  univ: string; // 연세대, 고려대, 서강대, 성균관대, 한양대, 가천대, etc.
  track: '인문논술' | '약술형' | '수리논술';
  month: string; // "4월 (2회차)"
  badgeColor: string; // tailwind color class
  themeColor: string; // border/text color class
  bgLight: string;
  question: string;
  timeLimit: number; // minutes
  wordCountMin: number;
  wordCountMax: number;
  targetWords: number;
  status: '응시가능' | '마감' | '예정';
  cutlineInfo?: {
    avgScore: number;
    competitionRatio: string;
    minKoreanGrade: string;
  };
  passages: Passage[];
  sampleModelAnswer: string;
  materials: {
    examPaper: string;
    practicePaper: string;
    answerSheet: string;
    modelSolution: string;
  };
  // University Identity Extensions
  englishName?: string;
  campusLocation?: string;
  slogan?: string;
  symbol?: string;
  emblemEmoji?: string;
  brandGradient?: string;
  accentHex?: string;
  essayDna?: string;
  professorTrap?: string;
  scoringSecret?: string;
  answerSheetFormat?: string;
}

export interface UniversityProfile {
  id: string;
  name: string;
  englishName: string;
  foundedYear: number;
  campus: string;
  motto: string;
  symbol: string;
  emblemEmoji: string;
  track: '인문논술' | '약술형';
  tierCategory: 'SKY' | '서성한' | '중경외시' | '여대' | '수도권약술형' | '주요대';
  primaryHex: string;
  bgGradient: string;
  badgeBg: string;
  buttonBg: string;
  quota: number;
  competitionRatio: string;
  minScore: string;
  avgScore: number;
  essayDna: string;
  professorTrap: string;
  scoringSecret: string;
  answerSheetFormat: string;
  timeLimit: number;
  targetWords: number;
  question: string;
  materials: {
    examPaper: string;
    practicePaper: string;
    answerSheet: string;
    modelSolution: string;
  };
}

export interface HighlightedSentence {
  id: string;
  text: string;
  status: 'good' | 'error' | 'warning';
  tag: string;
  comment: string;
  suggestion?: string;
}

export interface ScoreCategory {
  label: string;
  score: number;
  max: number;
  criteria: string;
  feedback: string;
}

export interface EvaluationResult {
  examId: string;
  univName: string;
  submittedAt: string;
  score: number;
  averageScore: number;
  percentile: number;
  submittedAnswer: string;
  wordCount: number;
  wordCountTarget: string;
  breakdown: ScoreCategory[];
  generalComment: string;
  revisionTips: string[];
  highlightedText: HighlightedSentence[];
  remainingRevisions: number; // e.g., 2회권 중 1회 차감
  revisionHistory?: {
    version: number;
    score: number;
    submittedAt: string;
    diffSummary: string;
  }[];
}

export interface BookProduct {
  id: string;
  title: string;
  subtitle: string;
  category: '개념서' | '배경지식' | '약술형' | '패키지' | '도표';
  price: number;
  originalPrice?: number;
  discountRate?: number;
  stock: number;
  isSoldOut?: boolean;
  coverColor: string;
  tag?: string;
  features: string[];
  description: string;
}

export interface CartItem {
  product: BookProduct;
  quantity: number;
}

export interface OrderRecord {
  orderId: string;
  items: CartItem[];
  totalAmount: number;
  trackingNumber: string;
  carrier: string;
  status: '결제완료' | '상품준비중' | '배송중' | '배송완료';
  date: string;
  shippingAddress: string;
}

export interface JuniorPrompt {
  id: string;
  title: string;
  category: '독서 감상' | '상상 글짓기' | '생활 일기' | '주장하는 글';
  difficulty: '기초' | '도전' | '심화';
  guidingQuestions: {
    id: string;
    label: string;
    question: string;
    hint: string;
    placeholder: string;
  }[];
}

export interface JuniorSticker {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: string;
}

export interface MiddlePrompt {
  id: string;
  subject: '국어' | '사회' | '역사' | '도덕';
  grade: '중1' | '중2' | '중3';
  title: string;
  question: string;
  context: string;
  requiredKeywords: string[];
  minCharCount: number;
  sampleAnswer: string;
}
