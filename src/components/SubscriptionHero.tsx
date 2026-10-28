import React, { useState } from 'react';
import { Calendar, ArrowRight, CheckCircle2, ShieldCheck, Gift, Award, Zap } from 'lucide-react';
import { MyTargetSchoolsSection } from './MyTargetSchoolsSection';
import { PopularRankingsSection } from './PopularRankingsSection';

interface SubscriptionHeroProps {
  onOpenCalculator: () => void;
  onGoToUnivRooms: () => void;
  onOpenSubscriptionModal: (planDetails: { humanitiesCount: number; briefCount: number; isAnnual: boolean; totalPrice: number }) => void;
  onGoToUnivRoomByName?: (univName: string) => void;
  onStartExamByName?: (univName: string) => void;
  onViewEvaluation?: () => void;
}

export const SubscriptionHero: React.FC<SubscriptionHeroProps> = ({
  onOpenCalculator,
  onGoToUnivRooms,
  onOpenSubscriptionModal,
  onGoToUnivRoomByName = onGoToUnivRooms,
  onStartExamByName = onGoToUnivRooms,
  onViewEvaluation = onGoToUnivRooms,
}) => {
  // 6 School Mix Calculator state
  const [humanitiesCount, setHumanitiesCount] = useState<number>(4);
  const briefCount = 6 - humanitiesCount;
  const [isAnnual, setIsAnnual] = useState<boolean>(true);

  // Pricing calculation according to PRD:
  // 월 구독: 5만원 * n + 3만원 * (6 - n)
  // 연간 결제: (4.2만원 * n + 2.5만원 * (6 - n)) * 7
  const monthlyNormal = 50000 * humanitiesCount + 30000 * briefCount;
  const annualTotal = (42000 * humanitiesCount + 25000 * briefCount) * 7;
  const annualMonthlyEquivalent = Math.round(annualTotal / 7);
  const totalSaved = monthlyNormal * 7 - annualTotal;

  // 7 rounds schedule timeline (3월 ~ 9월)
  const scheduleRounds = [
    { round: 1, month: "3월", title: "유형별 기본 진단", status: "발행완료", focus: "논제 구조화 및 제시문 요약" },
    { round: 2, month: "4월", title: "심층 비교·분석 (현행)", status: "응시진행중", isCurrent: true, focus: "개인과 공동체 / 도표 연계" },
    { round: 3, month: "5월", title: "비판적 평가 & 종합", status: "출제완료", focus: "사회계약론 및 플랫폼 규제" },
    { round: 4, month: "6월", title: "중간 실전 모의평가", status: "예정", focus: "수능 6월 모평 연계 시사 논제" },
    { round: 5, month: "7월", title: "대학별 특화 고난도", status: "예정", focus: "수리/통계 융합 & 철학적 사유" },
    { round: 6, month: "8월", title: "파이널 실전 감각 1", status: "예정", focus: "120분 실전 원고지 완주 훈련" },
    { round: 7, month: "9월", title: "최종 적중 봉투 모의", status: "예정", focus: "수시 원서접수 직전 최종 리포트" },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-xl">
        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/10 border border-sky-400/30 rounded-full text-xs text-sky-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>2028학년도 대입 수능·내신 개편 맞춤 논술 연간 구독 오픈</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight font-display text-white">
            대학별 맞춤 시험지부터 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400">
              3분할 AI 원고지 첨삭
            </span>
            까지 원스톱 구독
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            대치동 출제 연구진의 대학별 4종 모의고사 패키지가 매달 집으로 배송됩니다.
            웹 원고지 에디터와 지류 답안 OCR을 통해 3분 만에 정밀 첨삭 리포트를 받아보세요.
          </p>

          {/* Key Value Points */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-200">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <Gift className="w-4 h-4 text-sky-400 shrink-0" />
              <span>연간 구독 시 <strong>개념서(3만원)</strong> 전원 증정</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>회차당 <strong>AI 핀포인트 첨삭 2회권</strong> 포함</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>연간 결제 시 <strong>최대 16.7%</strong> 즉시 할인</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => onOpenSubscriptionModal({
                humanitiesCount,
                briefCount,
                isAnnual,
                totalPrice: isAnnual ? annualTotal : monthlyNormal,
              })}
              className="px-6 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/25 transition-all flex items-center gap-2 cursor-pointer hover:translate-y-[-1px]"
            >
              <span>2028 연간 패키지 구독하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onGoToUnivRooms}
              className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 hover:text-white font-medium rounded-xl transition-all cursor-pointer"
            >
              30개 대학 시험지 둘러보기
            </button>
          </div>
        </div>

        {/* Decorative Grid in Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-sky-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* 2. My Selected Target Universities Quick Access Area */}
      <MyTargetSchoolsSection
        onGoToUnivRoom={onGoToUnivRoomByName}
        onStartExam={onStartExamByName}
        onViewEvaluation={onViewEvaluation}
      />

      {/* 3. Real-Time Most Selected Universities Ranking Leaderboard */}
      <PopularRankingsSection
        onGoToUnivRoom={onGoToUnivRoomByName}
        onStartExam={onStartExamByName}
      />

      {/* Annual Schedule Timeline (3월~9월 7회차) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 font-mono">
              2028 Curriculum Roadmap
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display tracking-tight">
              3월부터 9월까지, 7회차 연간 발행 스케줄
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            매월 15일 대학별 4종 세트(시험지·연습지·답안지·모범답안) 출고
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {scheduleRounds.map((round) => (
            <div
              key={round.round}
              className={`p-3.5 rounded-xl border transition-all ${
                round.isCurrent
                  ? 'bg-blue-50/70 border-blue-500 shadow-sm ring-1 ring-blue-500/30'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                  round.isCurrent ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  {round.month}
                </span>
                <span className={`text-[11px] font-medium ${
                  round.isCurrent ? 'text-blue-600 font-bold' : 'text-slate-400'
                }`}>
                  {round.status}
                </span>
              </div>
              <h3 className="font-semibold text-xs text-slate-900 mb-1 line-clamp-1">
                {round.round}회차 · {round.title}
              </h3>
              <p className="text-[11px] text-slate-500 leading-tight">
                {round.focus}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6 School Mix Calculator Section */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 font-mono">
              Smart Subscription Simulator
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              내 수시 6개교 맞춤 혼합 구독 계산기
            </h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              수험생마다 목표 대학이 다릅니다. 인문논술($N$개교)과 약술형($6-N$개교)을
              원하는 비율로 조합하여 실시간 구독료를 확인해 보세요.
            </p>
          </div>

          {/* Calculator Controls */}
          <div className="bg-slate-50 rounded-xl p-5 sm:p-6 border border-slate-200/80 space-y-6">
            {/* Slider & Count Selector */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-slate-800">
                  인문논술 대학: <strong className="text-blue-600 text-base">{humanitiesCount}개교</strong>
                </span>
                <span className="font-semibold text-slate-800">
                  약술형 대학: <strong className="text-sky-600 text-base">{briefCount}개교</strong>
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="0"
                max="6"
                step="1"
                value={humanitiesCount}
                onChange={(e) => setHumanitiesCount(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
                <span className="text-slate-500 text-xs mr-1">추천 조합:</span>
                {[
                  { h: 6, b: 0, label: "인문논술 올인 (6개)" },
                  { h: 4, b: 2, label: "균형형 (인문 4 + 약술 2)" },
                  { h: 2, b: 4, label: "약술형 중심 (인문 2 + 약술 4)" },
                  { h: 0, b: 6, label: "약술형 올인 (6개)" },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setHumanitiesCount(preset.h)}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      humanitiesCount === preset.h
                        ? 'bg-blue-600 text-white font-medium shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Billing Option Toggle (Monthly vs Annual) */}
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center p-1 bg-slate-200 rounded-xl">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    !isAnnual ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  월간 정기결제
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    isAnnual ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>연간 일시납 (7회차 풀패키지)</span>
                  <span className="bg-amber-400 text-slate-950 text-[10px] px-1.5 py-0.2 rounded font-bold">
                    16.7% OFF
                  </span>
                </button>
              </div>
            </div>

            {/* Price Result Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                <span className="text-xs text-slate-500 font-medium">선택 구성 내역</span>
                <p className="text-sm font-semibold text-slate-800">
                  인문논술 {humanitiesCount}교 (월 5만원/교) + 약술형 {briefCount}교 (월 3만원/교)
                </p>
                <p className="text-xs text-slate-500">
                  회차당 실전 모의고사 6종 세트 + 3분할 AI 첨삭 12회분 제공
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white p-5 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300">
                    {isAnnual ? '연간 일시납 최종 결제액 (7회차)' : '월 정기 구독료'}
                  </span>
                  {isAnnual && (
                    <span className="text-xs text-amber-400 font-semibold">
                      총 {totalSaved.toLocaleString()}원 절약
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-sky-300">
                    {isAnnual ? annualTotal.toLocaleString() : monthlyNormal.toLocaleString()}
                  </span>
                  <span className="text-sm text-slate-300 font-medium">원</span>
                  {isAnnual && (
                    <span className="text-xs text-slate-400 font-mono line-through ml-2">
                      {(monthlyNormal * 7).toLocaleString()}원
                    </span>
                  )}
                </div>

                {isAnnual && (
                  <p className="text-[11px] text-sky-200/80">
                    * 회차당 환산가 {annualMonthlyEquivalent.toLocaleString()}원 + 개념서(30,000원) 무료 배송 증정
                  </p>
                )}
              </div>
            </div>

            {/* Subscribe Action Button */}
            <div className="text-center pt-2">
              <button
                onClick={() => onOpenSubscriptionModal({
                  humanitiesCount,
                  briefCount,
                  isAnnual,
                  totalPrice: isAnnual ? annualTotal : monthlyNormal,
                })}
                className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mx-auto"
              >
                <span>선택한 {humanitiesCount > 0 ? `인문 ${humanitiesCount}교` : ''} {briefCount > 0 ? `약술 ${briefCount}교` : ''} 조합으로 구독 신청하기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
