import React, { useState } from 'react';
import { MiddlePrompt } from '../types';
import { middlePrompts } from '../data/mockData';
import { CheckCircle2, AlertCircle, BookOpen, Award, Sparkles, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MiddleWriting: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<MiddlePrompt>(middlePrompts[0]);
  const [studentText, setStudentText] = useState<string>('');
  const [evaluated, setEvaluated] = useState<boolean>(false);

  // Check which keywords are present in the text
  const matchedKeywords = selectedPrompt.requiredKeywords.filter((kw) =>
    studentText.includes(kw)
  );
  const allKeywordsMatched = matchedKeywords.length === selectedPrompt.requiredKeywords.length;
  const charCount = studentText.length;
  const isLengthSufficient = charCount >= selectedPrompt.minCharCount;

  // Grade calculation
  const calculateGrade = () => {
    if (allKeywordsMatched && isLengthSufficient) return { grade: 'A', text: '탁월 (만점 수행평가)', color: 'text-emerald-600 bg-emerald-50 border-emerald-300' };
    if (matchedKeywords.length >= 2) return { grade: 'B', text: '우수 (키워드 보완 권장)', color: 'text-blue-600 bg-blue-50 border-blue-300' };
    return { grade: 'C', text: '노력 요함 (필수 조건 미충족)', color: 'text-amber-600 bg-amber-50 border-amber-300' };
  };

  const handleEvaluate = () => {
    setEvaluated(true);
    if (allKeywordsMatched && isLengthSufficient) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const currentGrade = calculateGrade();

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 font-mono uppercase tracking-wider mb-1">
              <Award className="w-4 h-4" />
              <span>Middle School Performance Assessment</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              중등 내신 교과목 서논술·수행평가 실전 훈련
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              사회·역사·국어 과목 서술형 문항을 실전처럼 작성하고, 필수 핵심 키워드 포함 여부와 A/B/C 등급을 실시간으로 확인하세요.
            </p>
          </div>

          {/* Quick Subject Tabs */}
          <div className="flex items-center gap-1.5">
            {middlePrompts.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPrompt(p);
                  setStudentText('');
                  setEvaluated(false);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  selectedPrompt.id === p.id
                    ? 'bg-slate-900 text-white shadow-sm font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                {p.subject} · {p.title.slice(0, 8)}...
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Left (Question & Keyword Tracker) & Right (Editor & Grade Report) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Question & Real-time Keywords (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-800">
                  {selectedPrompt.subject} ({selectedPrompt.grade})
                </span>
                <span className="text-xs text-slate-400">수행평가 실전</span>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                최소 {selectedPrompt.minCharCount}자 이상
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">논술 문항</span>
              <h2 className="text-base font-bold text-slate-900 font-serif-kr leading-snug">
                {selectedPrompt.question}
              </h2>
            </div>

            {selectedPrompt.context && (
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                <span className="font-semibold text-slate-800 block">제시된 지문/참고자료</span>
                <p className="leading-relaxed font-serif-kr">{selectedPrompt.context}</p>
              </div>
            )}

            {/* Real-time Keyword Check Chips */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">
                  실시간 필수 채점 키워드 체크
                </span>
                <span className="font-mono text-blue-600 font-semibold">
                  {matchedKeywords.length} / {selectedPrompt.requiredKeywords.length} 충족
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedPrompt.requiredKeywords.map((kw) => {
                  const isMatched = studentText.includes(kw);
                  return (
                    <div
                      key={kw}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                        isMatched
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          isMatched ? 'text-emerald-600' : 'text-slate-300'
                        }`}
                      />
                      <span>{kw}</span>
                    </div>
                  );
                })}
              </div>

              <p className="text-[11px] text-slate-400">
                * 오른쪽 본문에 단어를 입력하면 칩이 실시간으로 초록색 '조건 충족'으로 바뀝니다.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Writing Editor & Grade Card (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">답안 서술란</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStudentText(selectedPrompt.sampleAnswer)}
                  className="text-xs text-blue-600 hover:underline cursor-pointer"
                >
                  모범 답안 불러오기
                </button>
                <span className="text-slate-300">|</span>
                <span className="text-xs font-mono text-slate-500">
                  <strong className={charCount >= selectedPrompt.minCharCount ? 'text-emerald-600 font-bold' : 'text-slate-800'}>
                    {charCount}
                  </strong>{' '}
                  / {selectedPrompt.minCharCount}자
                </span>
              </div>
            </div>

            <textarea
              value={studentText}
              onChange={(e) => setStudentText(e.target.value)}
              placeholder="제시문의 핵심 조건과 필수 키워드를 포함하여 서술하시오..."
              rows={8}
              className="w-full p-4 border border-slate-200 rounded-xl text-sm font-serif-kr leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/30"
            />

            <button
              onClick={handleEvaluate}
              disabled={!studentText.trim()}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 text-white font-semibold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4" />
              <span>실시간 수행평가 채점 &amp; 등급 진단</span>
            </button>
          </div>

          {/* Grade Result Card */}
          {evaluated && (
            <div className={`p-6 rounded-2xl border shadow-sm space-y-3 ${currentGrade.color} animate-fade-in`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-extrabold font-mono">
                    {currentGrade.grade} 등급
                  </span>
                  <span className="text-sm font-bold">{currentGrade.text}</span>
                </div>
                <span className="text-xs font-mono">
                  키워드 {matchedKeywords.length}/{selectedPrompt.requiredKeywords.length}개 일치
                </span>
              </div>

              <div className="space-y-1.5 text-xs leading-relaxed text-slate-800">
                {currentGrade.grade === 'A' ? (
                  <p>
                    🎉 축하합니다! 수행평가 채점 기준표의 필수 법률 요건과 분량 기준을 완벽하게 충족했습니다.
                  </p>
                ) : (
                  <p>
                    누락된 필수 개념({selectedPrompt.requiredKeywords.filter(k => !matchedKeywords.includes(k)).join(', ')})을 문맥에 맞게 보충하여 재작성해 보세요.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
