import React, { useState, useEffect, useRef } from 'react';
import { Exam } from '../types';
import { Clock, Save, FileUp, Sparkles, AlertCircle, CheckCircle2, ChevronRight, BarChart2, Eye, RotateCcw } from 'lucide-react';

interface ExamRoomProps {
  exam: Exam;
  onSubmitAnswer: (answerText: string) => void;
  onExit: () => void;
}

export const ExamRoom: React.FC<ExamRoomProps> = ({
  exam,
  onSubmitAnswer,
  onExit,
}) => {
  // Timer state (seconds)
  const [timeLeft, setTimeLeft] = useState<number>(exam.timeLimit * 60);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');

  // Active Passage tab
  const [activePassageId, setActivePassageId] = useState<string>(exam.passages[0]?.id || 'p1');

  // Answer text
  const [answerText, setAnswerText] = useState<string>('');

  // Mode: 'wongozi' (원고지 격자 모드) vs 'plain' (일반 텍스트) vs 'ocr' (지류 업로드)
  const [editorMode, setEditorMode] = useState<'wongozi' | 'plain' | 'ocr'>('wongozi');

  // OCR state
  const [isOcrProcessing, setIsOcrProcessing] = useState<boolean>(false);
  const [ocrUploadedImage, setOcrUploadedImage] = useState<string | null>(null);

  // Auto-save simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setSaveStatus('saving');
      setTimeout(() => setSaveStatus('saved'), 600);
    }, 15000);
    return () => clearInterval(timer);
  }, [answerText]);

  // Countdown timer
  useEffect(() => {
    if (isTimerPaused || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerPaused, timeLeft]);

  // Format time MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Character calculations
  // In Korean essay: total characters excluding spaces or including spaces
  const charCountWithSpaces = answerText.length;
  const charCountNoSpaces = answerText.replace(/\s/g, '').length;
  const isWithinTarget =
    charCountWithSpaces >= exam.wordCountMin && charCountWithSpaces <= exam.wordCountMax;

  // OCR simulation handler
  const handleOcrUpload = () => {
    setIsOcrProcessing(true);
    setTimeout(() => {
      setIsOcrProcessing(false);
      setOcrUploadedImage('https://placehold.co/600x400/f8fafc/0f172a?text=Wongozi+Handwritten+Sample');
      // Populate with realistic student essay answer
      const sampleAnswer = `제시문 (가)는 자유를 간섭의 부재로 정의하며 공동체의 개입을 경계한다. 개인의 몸과 마음에 대한 주권은 온전히 자신에게 속하므로, 타인에게 피해를 주지 않는 한 국가는 개인의 선택에 개입할 수 없다. 반면 제시문 (나)는 개인을 공동체와 분리될 수 없는 서사적 존재로 파악한다. 개인은 공동체 속에서 비로소 정체성을 얻으며, 공동선에 참여하는 의무를 다할 때 진정한 자유를 누릴 수 있다. 두 제시문은 결국 같은 이야기를 하고 있다. 한편 제시문 (다)는 공론장에서의 민주적 소통을 통해 자유와 책임을 조화시키는 절차적 해결책을 제안한다. 개인의 자율성과 공동체의 규범은 고정된 것이 아니라 합리적 합의 과정을 거쳐 재구성된다. 따라서 자유와 책임은 대립 관계가 아니라 상호보완적이다.`;
      setAnswerText(sampleAnswer);
      setEditorMode('wongozi');
    }, 1500);
  };

  // Fill sample answer preset
  const handleLoadPreset = (type: 'student' | 'model') => {
    if (type === 'student') {
      const sample = `제시문 (가)는 자유를 간섭의 부재로 정의하며 공동체의 개입을 경계한다. 개인의 몸과 마음에 대한 주권은 온전히 자신에게 속하므로, 타인에게 피해를 주지 않는 한 국가는 개인의 선택에 개입할 수 없다. 반면 제시문 (나)는 개인을 공동체와 분리될 수 없는 서사적 존재로 파악한다. 개인은 공동체 속에서 비로소 정체성을 얻으며, 공동선에 참여하는 의무를 다할 때 진정한 자유를 누릴 수 있다. 두 제시문은 결국 같은 이야기를 하고 있다. 한편 제시문 (다)는 공론장에서의 민주적 소통을 통해 자유와 책임을 조화시키는 절차적 해결책을 제안한다. 개인의 자율성과 공동체의 규범은 고정된 것이 아니라 합리적 합의 과정을 거쳐 재구성된다. 따라서 자유와 책임은 대립 관계가 아니라 상호보완적이다.`;
      setAnswerText(sample);
    } else {
      setAnswerText(exam.sampleModelAnswer);
    }
  };

  // Render authentic Korean manuscript (원고지) cells representation
  // 1 row has 20 cells
  const renderWongoziGrid = () => {
    const chars = answerText.split('');
    const totalCells = Math.max(chars.length + 40, 200); // at least 200 cells (10 rows)
    const cells = [];

    for (let i = 0; i < totalCells; i++) {
      const char = chars[i] || '';
      const isSpace = char === ' ';
      cells.push(
        <div
          key={i}
          className={`wongozi-cell ${i === chars.length ? 'wongozi-cell-active' : ''}`}
        >
          {isSpace ? '·' : char}
          {/* Subtle line index indicator on the left of each line */}
          {i % 20 === 0 && (
            <span className="absolute -left-6 top-1 text-[9px] text-slate-400 font-mono select-none">
              {Math.floor(i / 20) + 1}
            </span>
          )}
        </div>
      );
    }

    return (
      <div className="relative pl-6 py-2 overflow-x-auto">
        <div className="inline-grid grid-cols-[repeat(20,28px)] gap-0 border border-emerald-800/30 bg-[#faf8f5] shadow-inner p-2 rounded">
          {cells}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Top Header Bar with University Identity */}
      <div className={`text-white rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 border border-white/10 shadow-lg bg-gradient-to-r ${exam.brandGradient || 'from-slate-900 to-slate-950'}`}>
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-black/40 hover:bg-black/60 transition-colors cursor-pointer"
          >
            ← 대학룸으로
          </button>
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{exam.emblemEmoji || '🏛️'}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-white font-display">
                  {exam.univ} ({exam.track}) 실전 시험장
                </span>
                <span className="text-xs font-mono text-sky-300 bg-white/10 px-2 py-0.5 rounded">
                  {exam.month}
                </span>
                {exam.campusLocation && (
                  <span className="text-[11px] text-slate-300 hidden md:inline">
                    · 📍 {exam.campusLocation}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 line-clamp-1 max-w-xl">
                {exam.question}
              </p>
            </div>
          </div>
        </div>

        {/* Timer & Auto-save Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Save className={`w-3.5 h-3.5 ${saveStatus === 'saving' ? 'animate-spin text-sky-400' : 'text-emerald-400'}`} />
            <span>{saveStatus === 'saving' ? '자동 저장 중...' : '자동 저장됨'}</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <Clock className="w-4 h-4 text-sky-400" />
            <span className="font-mono text-base font-bold text-white tracking-wider">
              {formatTime(timeLeft)}
            </span>
            <button
              onClick={() => setIsTimerPaused(!isTimerPaused)}
              className="text-[10px] text-slate-400 hover:text-white underline ml-1 cursor-pointer"
            >
              {isTimerPaused ? '재개' : '일시정지'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Split Layout: Left (Passage Viewer) & Right (Answer Editor) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Passages & Documents (lg:col-span-5) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[750px]">
          {/* Passage Tabs */}
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center gap-1 overflow-x-auto">
            {exam.passages.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePassageId(p.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  activePassageId === p.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Active Passage Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {exam.passages.map((p) => {
              if (p.id !== activePassageId) return null;
              return (
                <div key={p.id} className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-blue-600 font-mono">
                      {p.label}
                    </span>
                    {p.title && (
                      <h3 className="text-base font-bold text-slate-900 mt-1 font-serif-kr">
                        {p.title}
                      </h3>
                    )}
                    {p.source && (
                      <span className="text-xs text-slate-400 italic block mt-0.5">
                        출처: {p.source}
                      </span>
                    )}
                  </div>

                  <div className="text-sm text-slate-800 leading-relaxed font-serif-kr whitespace-pre-line bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                    {p.content}
                  </div>

                  {/* Optional Chart Data Viewer */}
                  {p.chartData && (
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                        <BarChart2 className="w-4 h-4 text-blue-600" />
                        <span>통계 지표 비교표</span>
                      </div>
                      <div className="space-y-2">
                        {p.chartData.map((d) => (
                          <div key={d.label} className="text-xs space-y-1">
                            <div className="flex justify-between text-slate-600">
                              <span>{d.label}</span>
                              <span className="font-mono font-medium">자율성 {d.valueA} / 연대감 {d.valueB}</span>
                            </div>
                            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden flex">
                              <div className="bg-blue-600 h-full" style={{ width: `${d.valueA / 2}%` }} />
                              <div className="bg-emerald-500 h-full" style={{ width: `${d.valueB / 2}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Exam Requirements Box at bottom */}
          <div className="bg-slate-50 border-t border-slate-200 p-4 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-800 block">유의사항</span>
            <p>1. 반드시 논제의 요구사항에 맞추어 비교 기준을 명확히 제시하십시오.</p>
            <p>2. 어문 규범(맞춤법, 띄어쓰기) 및 원고지 분량({exam.wordCountMin}~{exam.wordCountMax}자)을 준수하십시오.</p>
          </div>
        </div>

        {/* Right Column: Writing Interface & Manuscript Paper (lg:col-span-7) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[750px] overflow-hidden">
          {/* Editor Mode Header */}
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between gap-3">
            {/* Mode Switcher */}
            <div className="flex items-center gap-1 bg-slate-200 p-1 rounded-lg">
              <button
                onClick={() => setEditorMode('wongozi')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  editorMode === 'wongozi'
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                원고지 격자 모드
              </button>
              <button
                onClick={() => setEditorMode('plain')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  editorMode === 'plain'
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                표준 에디터
              </button>
              <button
                onClick={() => setEditorMode('ocr')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                  editorMode === 'ocr'
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileUp className="w-3 h-3" />
                <span>지류 답안 OCR</span>
              </button>
            </div>

            {/* Quick Test Presets */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 hidden sm:inline">예시 답안:</span>
              <button
                onClick={() => handleLoadPreset('student')}
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer text-xs"
              >
                학생 실전 답안 (72점)
              </button>
              <button
                onClick={() => handleLoadPreset('model')}
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer text-xs"
              >
                모범 답안
              </button>
            </div>
          </div>

          {/* Word Count & Compliance Bar */}
          <div className="bg-slate-100/60 border-b border-slate-200 px-6 py-2 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="text-slate-600">
                공백 포함 <strong className="font-mono text-slate-900">{charCountWithSpaces}</strong>자
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500">
                공백 제외 <strong className="font-mono text-slate-700">{charCountNoSpaces}</strong>자
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500">
                목표 기준: <strong>{exam.wordCountMin}~{exam.wordCountMax}자</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                isWithinTarget
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {isWithinTarget ? '분량 기준 충족' : '분량 확인 필요'}
              </span>
            </div>
          </div>

          {/* Editor Body */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50/30">
            {editorMode === 'ocr' ? (
              /* OCR Upload Tab */
              <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <FileUp className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-slate-900">
                    지류 손글씨 원고지 사진 업로드 (OCR)
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm">
                    인쇄한 원고지 답안지에 직접 쓴 손글씨 사진을 업로드하면, AI OCR 엔진이 텍스트로 자동 변환합니다.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <button
                    onClick={handleOcrUpload}
                    disabled={isOcrProcessing}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isOcrProcessing ? (
                      <>
                        <Sparkles className="w-4 h-4 animate-spin" />
                        <span>손글씨 획 인식 및 디지털 텍스트 변환 중...</span>
                      </>
                    ) : (
                      <>
                        <FileUp className="w-4 h-4" />
                        <span>손글씨 사진 파일 선택 (가상 시뮬레이션)</span>
                      </>
                    )}
                  </button>
                  <span className="text-[11px] text-slate-400">
                    지원 포맷: JPG, PNG, PDF (스마트폰 카메라 촬영본 지원)
                  </span>
                </div>
              </div>
            ) : editorMode === 'wongozi' ? (
              /* Wongozi Grid Mode with Synced Textarea */
              <div className="space-y-4">
                <div className="bg-amber-50/70 border border-amber-200/80 p-2.5 rounded-lg text-xs text-amber-900 flex items-center justify-between">
                  <span>원고지 격자 모드: 1행 20칸 표준 규격이 시각화되며, 하단 입력창과 실시간 연동됩니다.</span>
                  <span className="font-mono text-amber-800">{Math.ceil(charCountWithSpaces / 20)}행 사용 중</span>
                </div>

                {/* Live Manuscript Grid Visualization */}
                <div className="border border-slate-200 rounded-xl bg-[#faf8f5] p-3 overflow-hidden shadow-inner max-h-56 overflow-y-auto">
                  {renderWongoziGrid()}
                </div>

                {/* Direct Typing Textarea */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    답안 텍스트 직접 입력 / 수정
                  </label>
                  <textarea
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    placeholder="여기에 답안을 작성하거나, 상단의 [학생 실전 답안 (72점)] 버튼을 눌러 테스트해 보세요..."
                    rows={8}
                    className="w-full p-4 border border-slate-200 rounded-xl text-sm font-serif-kr leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                  />
                </div>
              </div>
            ) : (
              /* Plain Editor Mode */
              <textarea
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                placeholder="답안을 입력하십시오..."
                className="w-full h-full p-6 border border-slate-200 rounded-xl text-base font-serif-kr leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white resize-none"
              />
            )}
          </div>

          {/* Bottom Submission Action Bar */}
          <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              답안 제출 시 <strong className="text-slate-800">3분할 정밀 AI 채점표</strong>가 생성됩니다.
            </div>

            <button
              onClick={() => {
                const finalContent = answerText.trim() || exam.sampleModelAnswer;
                onSubmitAnswer(finalContent);
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer hover:shadow-blue-500/25"
            >
              <Sparkles className="w-4 h-4" />
              <span>답안 최종 제출 및 AI 첨삭 요청</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
