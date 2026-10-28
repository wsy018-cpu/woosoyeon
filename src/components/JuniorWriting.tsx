import React, { useState } from 'react';
import { JuniorPrompt } from '../types';
import { juniorPrompts } from '../data/mockData';
import { Sparkles, Heart, Smile, Star, CheckCircle, ArrowRight, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

export const JuniorWriting: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<JuniorPrompt>(juniorPrompts[0]);
  const [answers, setAnswers] = useState<{ [qId: string]: string }>({
    q1: "제비는 흥부 아저씨가 다리를 정성스럽게 고쳐준 은혜를 잊지 못해서, 보은의 의미로 가장 큰 복이 깃든 박 씨를 물어다 주었습니다.",
    q2: "",
    q3: "",
  });
  const [completed, setCompleted] = useState<boolean>(false);
  const [earnedSticker, setEarnedSticker] = useState<string | null>(null);

  const handleAnswerChange = (qId: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const handleComplete = () => {
    setCompleted(true);
    setEarnedSticker('황금 생각 별 스티커 ⭐');
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#fbbf24', '#34d399', '#f472b6'],
    });
  };

  return (
    <div className="space-y-8">
      {/* Junior Friendly Banner */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-pink-50 rounded-2xl border border-amber-200/80 p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌱</span>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider font-mono">
            Junior Creative Writing Studio
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-amber-950 font-junior tracking-wide">
          생각이 쑥쑥 자라는 초등 서논술 교실 🌱
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          처음부터 긴 글을 쓰지 않아도 괜찮아요! 단계별 마인드맵 질문 카드에 답하다 보면
          어느새 한 편의 멋진 완성된 글이 만들어집니다.
        </p>

        {/* Prompt Selector */}
        <div className="flex items-center gap-2 pt-2">
          {juniorPrompts.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPrompt(p);
                setCompleted(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedPrompt.id === p.id
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-white border border-amber-200 text-slate-700 hover:bg-amber-100/50'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Guided Question Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 3 Question Cards (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          {selectedPrompt.guidingQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 hover:border-amber-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-100 text-amber-800">
                  {idx + 1}단계 · {q.label}
                </span>
                <span className="text-[11px] text-slate-400">
                  {answers[q.id]?.length || 0}자 작성
                </span>
              </div>

              <h3 className="font-bold text-sm text-slate-900 font-serif-kr">
                {q.question}
              </h3>

              <div className="bg-amber-50/60 p-2.5 rounded-lg text-xs text-amber-900">
                💡 <strong>힌트:</strong> {q.hint}
              </div>

              <textarea
                value={answers[q.id] || ''}
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                placeholder={q.placeholder}
                rows={3}
                className="w-full p-3 border border-slate-200 rounded-xl text-xs font-serif-kr leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 bg-slate-50/50"
              />
            </div>
          ))}

          <button
            onClick={handleComplete}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>글쓰기 완료하고 AI 친구 피드백 &amp; 칭찬 스티커 받기!</span>
          </button>
        </div>

        {/* Right Column: Combined Essay & AI Character Feedback (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Combined Article Preview */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-bold text-xs text-slate-700">
                나의 완성된 글 모아보기
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {Object.values(answers).join(' ').length}자
              </span>
            </div>

            <div className="font-serif-kr text-sm leading-relaxed text-slate-800 space-y-3 min-h-40 bg-[#faf8f5] p-4 rounded-xl border border-slate-200/80">
              {Object.values(answers).some((a) => a.trim()) ? (
                Object.values(answers)
                  .filter((a) => a.trim())
                  .map((ans, i) => <p key={i}>{ans}</p>)
              ) : (
                <p className="text-slate-400 italic text-center pt-8">
                  왼쪽 질문 카드를 작성하면 여기에 한 편의 글로 합쳐져요!
                </p>
              )}
            </div>
          </div>

          {/* AI Character Feedback Card */}
          {completed && (
            <div className="bg-gradient-to-br from-yellow-50 to-amber-100 border-2 border-amber-300 rounded-2xl p-6 shadow-md space-y-4 animate-fade-in">
              {/* Character Speech Bubble */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center text-2xl shadow-md shrink-0">
                  🦁
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-amber-200 shadow-sm text-xs space-y-1.5 flex-1">
                  <span className="font-bold text-amber-800 block font-junior text-sm">🦁 AI 독서 요정 라이언의 편지</span>
                  <p className="text-slate-800 leading-relaxed font-junior text-sm">
                    "정말 마음이 따뜻해지는 글이에요! 1단계에서 제비의 고마운 마음을 생생하게 표현했고, 욕심을 부리지 않고 친구와 나누겠다는 다짐이 너무 멋져요! 최고예요!"
                  </p>
                </div>
              </div>

              {/* Earned Sticker Stamp */}
              <div className="bg-white/90 p-4 rounded-xl border border-amber-200 text-center space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-amber-700 font-bold block font-display">
                  새로 획득한 칭찬 스티커
                </span>
                <div className="text-4xl animate-bounce pt-1">🌟</div>
                <span className="font-bold text-amber-900 text-lg block font-junior">
                  {earnedSticker}
                </span>
                <span className="text-[11px] text-slate-500">
                  내 글쓰기 보물함에 저장되었습니다 (+50 포인트 적립)
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
