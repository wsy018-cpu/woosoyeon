import React, { useState } from 'react';
import { EvaluationResult, HighlightedSentence } from '../types';
import { Award, AlertTriangle, CheckCircle2, ChevronRight, RefreshCw, Sparkles, BookOpen, ArrowLeft, BarChart3 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EvaluationReportProps {
  result: EvaluationResult;
  onBackToExam: () => void;
  onBackToHome: () => void;
  onReevaluate: (newAnswer: string) => void;
}

export const EvaluationReport: React.FC<EvaluationReportProps> = ({
  result,
  onBackToExam,
  onBackToHome,
  onReevaluate,
}) => {
  // Active selected sentence id for synchronized focus
  const [selectedHighlightId, setSelectedHighlightId] = useState<string | null>(
    result.highlightedText[1]?.id || result.highlightedText[0]?.id || null
  );

  // Revision Modal State
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState<boolean>(false);
  const [revisedText, setRevisedText] = useState<string>(result.submittedAnswer);
  const [isReevaluating, setIsReevaluating] = useState<boolean>(false);

  // Active view tab on mobile: 'text' | 'score' | 'comments'
  const [mobileTab, setMobileTab] = useState<'text' | 'score' | 'comments'>('text');

  // Trigger celebration if score >= 80
  const triggerCelebration = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleSentenceClick = (id: string) => {
    setSelectedHighlightId(id);
    const element = document.getElementById(`comment-card-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleApplyRevision = () => {
    setIsReevaluating(true);
    setTimeout(() => {
      setIsReevaluating(false);
      setIsRevisionModalOpen(false);
      onReevaluate(revisedText);
      triggerCelebration();
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                AI 심층 성적표
              </span>
              <span className="text-xs text-slate-400">제출일시: {result.submittedAt}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display tracking-tight mt-1">
              {result.univName}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-xs">
            <span className="text-slate-400 block">재작성 첨삭 잔여</span>
            <span className="font-bold text-blue-600 font-mono">
              2회권 중 {result.remainingRevisions}회 남음
            </span>
          </div>

          <button
            onClick={() => setIsRevisionModalOpen(true)}
            disabled={result.remainingRevisions <= 0}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 text-white font-semibold rounded-xl text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>재작성 답안 제출하기</span>
          </button>
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="flex lg:hidden bg-slate-200 p-1 rounded-xl text-xs font-medium">
        <button
          onClick={() => setMobileTab('text')}
          className={`flex-1 py-2 rounded-lg transition-all ${
            mobileTab === 'text' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-600'
          }`}
        >
          제출 답안 &amp; 하이라이트
        </button>
        <button
          onClick={() => setMobileTab('score')}
          className={`flex-1 py-2 rounded-lg transition-all ${
            mobileTab === 'score' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-600'
          }`}
        >
          종합 점수 &amp; 영역별 배점
        </button>
        <button
          onClick={() => setMobileTab('comments')}
          className={`flex-1 py-2 rounded-lg transition-all ${
            mobileTab === 'comments' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-600'
          }`}
        >
          문장별 코멘트 &amp; 총평
        </button>
      </div>

      {/* 3-Split Desktop Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ======================================================== */}
        {/* Split 1 (Left): Submitted Essay & Pinpoint Highlights (lg:col-span-6) */}
        {/* ======================================================== */}
        <div
          className={`lg:col-span-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[780px] overflow-hidden ${
            mobileTab !== 'text' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-800">
                1. 제출 답안 본문 &amp; 핀포인트 하이라이트
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                우수 문장
              </span>
              <span className="inline-flex items-center gap-1 text-rose-700">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                오류/비약
              </span>
            </div>
          </div>

          <div className="p-6 overflow-y-auto flex-1 font-serif-kr text-base leading-relaxed bg-[#faf8f5]/60">
            <p className="text-slate-800 whitespace-pre-line select-text">
              {/* Highlight sentence 1 */}
              <mark
                onClick={() => handleSentenceClick('h1')}
                className={`cursor-pointer rounded px-1 transition-all ${
                  selectedHighlightId === 'h1'
                    ? 'bg-emerald-200 ring-2 ring-emerald-500 text-slate-900 font-semibold'
                    : 'bg-emerald-100 hover:bg-emerald-200 text-slate-900'
                }`}
              >
                제시문 (가)는 자유를 간섭의 부재로 정의하며 공동체의 개입을 경계한다.
              </mark>{' '}
              개인의 몸과 마음에 대한 주권은 온전히 자신에게 속하므로, 타인에게 피해를 주지 않는 한 국가는 개인의 선택에 개입할 수 없다. 반면 제시문 (나)는 개인을 공동체와 분리될 수 없는 서사적 존재로 파악한다. 개인은 공동체 속에서 비로소 정체성을 얻으며, 공동선에 참여하는 의무를 다할 때 진정한 자유를 누릴 수 있다.{' '}
              {/* Highlight sentence 2 */}
              <mark
                onClick={() => handleSentenceClick('h2')}
                className={`cursor-pointer rounded px-1 transition-all ${
                  selectedHighlightId === 'h2'
                    ? 'bg-rose-200 ring-2 ring-rose-500 text-rose-950 font-semibold'
                    : 'bg-rose-100 hover:bg-rose-200 text-rose-900'
                }`}
              >
                두 제시문은 결국 같은 이야기를 하고 있다.
              </mark>{' '}
              한편 제시문 (다)는 공론장에서의 민주적 소통을 통해 자유와 책임을 조화시키는 절차적 해결책을 제안한다.{' '}
              {/* Highlight sentence 3 */}
              <mark
                onClick={() => handleSentenceClick('h3')}
                className={`cursor-pointer rounded px-1 transition-all ${
                  selectedHighlightId === 'h3'
                    ? 'bg-emerald-200 ring-2 ring-emerald-500 text-slate-900 font-semibold'
                    : 'bg-emerald-100 hover:bg-emerald-200 text-slate-900'
                }`}
              >
                개인의 자율성과 공동체의 규범은 고정된 것이 아니라 합리적 합의 과정을 거쳐 재구성된다.
              </mark>{' '}
              따라서 자유와 책임은 대립 관계가 아니라 상호보완적이다.
            </p>
          </div>

          <div className="bg-slate-50 border-t border-slate-200 p-4 text-xs text-slate-500 flex items-center justify-between">
            <span>형광펜 문장을 클릭하면 우측 교정 코멘트로 자동 포커스됩니다.</span>
            <span className="font-mono text-slate-700">총 {result.wordCount}자 ({result.wordCountTarget})</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* Right Column (lg:col-span-6): Split 2 (Top) & Split 3 (Bottom) */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 space-y-6">
          {/* ======================================================== */}
          {/* Split 2 (Right Top): Score Card & 4 Assessment Breakdown */}
          {/* ======================================================== */}
          <div
            className={`bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5 ${
              mobileTab !== 'score' ? 'hidden lg:block' : 'block'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-bold text-sm text-slate-800">
                2. 종합 점수 및 다면 배점 현황
              </span>
              <span className="text-xs text-slate-400">100점 만점 기준</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              {/* Main Score Box */}
              <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-xl p-5 text-center space-y-1">
                <span className="text-xs text-slate-300">내 종합 득점</span>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl sm:text-5xl font-extrabold font-mono text-sky-300">
                    {result.score}
                  </span>
                  <span className="text-sm text-slate-400 font-mono">/ 100</span>
                </div>

                <div className="pt-2 flex items-center justify-center gap-3 text-xs border-t border-slate-800">
                  <span className="text-slate-300">
                    응시자 평균 <strong className="font-mono text-white">{result.averageScore}점</strong>
                  </span>
                  <span className="text-emerald-400 font-semibold font-mono">
                    +{result.score - result.averageScore}점 상회
                  </span>
                </div>
              </div>

              {/* Percentile Indicator */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs">
                <div>
                  <div className="flex justify-between text-slate-600 mb-1">
                    <span>수험생 백분위 순위</span>
                    <strong className="text-blue-600 font-mono">상위 {100 - result.percentile}% (백분위 {result.percentile})</strong>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${result.percentile}%` }}
                    />
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 leading-tight">
                  현재 점수는 1차 합격 안정권(70점대)에 진입했으나, 핵심 논리 오류 1건을 보완하면 수석 합격권 도약이 가능합니다.
                </p>
              </div>
            </div>

            {/* 4 Assessment Categories Breakdown Bar Chart */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-slate-700 block">
                4대 평가 영역별 정밀 채점표
              </span>

              <div className="space-y-2.5">
                {result.breakdown.map((item) => {
                  const percentage = (item.score / item.max) * 100;
                  return (
                    <div key={item.label} className="text-xs space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-slate-800">{item.label}</span>
                        <span className="font-mono text-slate-600">
                          <strong className="text-blue-600 font-bold">{item.score}</strong> / {item.max}점
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/60">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        {item.feedback}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* Split 3 (Right Bottom): Pinpoint Comments & AI Summary */}
          {/* ======================================================== */}
          <div
            className={`bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5 ${
              mobileTab !== 'comments' ? 'hidden lg:block' : 'block'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-bold text-sm text-slate-800">
                3. 문장별 교정 코멘트 및 종합 총평
              </span>
              <span className="text-xs text-slate-400">AI 핀포인트 피드백</span>
            </div>

            {/* Sentence-by-sentence pinpoint comments */}
            <div className="space-y-3">
              {result.highlightedText.map((h) => {
                const isSelected = selectedHighlightId === h.id;
                return (
                  <div
                    key={h.id}
                    id={`comment-card-${h.id}`}
                    onClick={() => setSelectedHighlightId(h.id)}
                    className={`p-4 rounded-xl border text-xs space-y-2 transition-all cursor-pointer ${
                      isSelected
                        ? h.status === 'error'
                          ? 'border-rose-500 bg-rose-50/50 ring-1 ring-rose-400'
                          : 'border-emerald-500 bg-emerald-50/50 ring-1 ring-emerald-400'
                        : 'border-slate-200 bg-slate-50/70 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                          h.status === 'error'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {h.tag}
                      </span>
                      <span className="text-slate-400 font-mono text-[10px]">
                        {isSelected ? '선택됨' : '클릭하여 확인'}
                      </span>
                    </div>

                    <p className="font-serif-kr text-slate-700 italic border-l-2 border-slate-300 pl-2">
                      "{h.text}"
                    </p>

                    <p className="text-slate-800 leading-relaxed font-sans">
                      {h.comment}
                    </p>

                    {h.suggestion && (
                      <div className="bg-white p-2 rounded border border-slate-200 text-blue-700 font-sans">
                        💡 {h.suggestion}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* AI General Comment Box */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>AI 총평 및 재작성 가이드라인</span>
              </div>
              <p className="text-xs text-blue-950 leading-relaxed font-serif-kr">
                {result.generalComment}
              </p>
              <div className="space-y-1 pt-1 text-[11px] text-blue-800">
                {result.revisionTips.map((tip, idx) => (
                  <p key={idx}>{tip}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revision Modal */}
      {isRevisionModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-serif-kr">
                  2차 답안 재작성 및 피드백 반영
                </h3>
                <p className="text-xs text-slate-500">
                  오류로 지적된 문장을 수정하고 2차 AI 첨삭 점수를 산출합니다. (잔여 첨삭권 1회 차감)
                </p>
              </div>
              <button
                onClick={() => setIsRevisionModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3">
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-xs text-amber-900">
                <strong>교정 권장 포인트:</strong> '두 제시문은 결국 같은 이야기를 하고 있다'를 삭제하고, (가)의 소극적 자유와 (나)의 공동선 우선주의를 대조하는 문장으로 치환하십시오.
              </div>

              <textarea
                value={revisedText}
                onChange={(e) => setRevisedText(e.target.value)}
                rows={10}
                className="w-full p-4 border border-slate-200 rounded-xl text-sm font-serif-kr leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-500">
                현재 글자 수: <strong className="font-mono text-slate-800">{revisedText.length}</strong>자
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRevisionModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  취소
                </button>
                <button
                  onClick={handleApplyRevision}
                  disabled={isReevaluating}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isReevaluating ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>AI 재채점 진행 중...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>수정본 제출 및 재채점</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
