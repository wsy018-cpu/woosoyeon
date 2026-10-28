import React, { useState } from 'react';
import { Exam } from '../types';
import { mockExams, all30Universities } from '../data/mockData';
import { Search, Download, Play, Clock, FileText, Sparkles, School, MapPin, Award, AlertTriangle, Lightbulb, Compass, ChevronRight } from 'lucide-react';

interface UnivRoomsProps {
  onStartExam: (exam: Exam) => void;
  onPreviewMaterial: (univName: string, fileName: string) => void;
}

export const UnivRooms: React.FC<UnivRoomsProps> = ({
  onStartExam,
  onPreviewMaterial,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'SKY' | '서성한' | '중경외시' | '여대' | '수도권약술형'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnivDetail, setSelectedUnivDetail] = useState<Exam>(mockExams[0]);

  // Filter 30 universities by category or search query
  const filteredUniversities = all30Universities.filter((u) => {
    const matchesFilter = selectedFilter === 'all' ? true : u.tierCategory === selectedFilter;
    const matchesSearch = u.name.includes(searchQuery) || (u.slogan && u.slogan.includes(searchQuery)) || u.track.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  // When a university is clicked from the roster, find matching mockExam or generate one
  const handleSelectUniversity = (univName: string) => {
    const found = mockExams.find((e) => e.univ.includes(univName) || univName.includes(e.univ));
    if (found) {
      setSelectedUnivDetail(found);
    } else {
      // Find info from all30Universities to construct full identity
      const info = all30Universities.find((u) => u.name === univName) || all30Universities[0];
      const isBrief = info.track === '약술형';
      const newExam: Exam = {
        id: `${info.id}-2028-04`,
        univ: info.name,
        track: info.track as any,
        month: "4월 (2회차)",
        badgeColor: info.color === 'rose' ? 'bg-rose-900 text-rose-100' : 'bg-blue-900 text-blue-100',
        themeColor: `border-${info.color}-600 text-${info.color}-600`,
        bgLight: `bg-${info.color}-50/40`,
        question: isBrief
          ? `[문제] 제시문 (가)의 핵심 주장을 1문장으로 서술하고 근거 2가지를 본문에서 찾아 쓰시오.`
          : `[논제] 제시문 (가)와 (나)의 관점을 비교하고, (다)의 사회적 갈등에 대한 해결 방안을 논술하시오. (${isBrief ? '200자' : '800~1,000자'})`,
        timeLimit: isBrief ? 80 : 100,
        wordCountMin: isBrief ? 160 : 750,
        wordCountMax: isBrief ? 240 : 950,
        targetWords: isBrief ? 200 : 850,
        status: "응시가능",
        cutlineInfo: {
          avgScore: isBrief ? 84.0 : 79.0,
          competitionRatio: `${Math.floor(25 + Math.random() * 35)}.5 : 1`,
          minKoreanGrade: info.minScore,
        },
        englishName: `${info.name.toUpperCase()} UNIVERSITY`,
        campusLocation: info.campus,
        slogan: info.slogan,
        symbol: `${info.name}의 상징`,
        emblemEmoji: info.emblemEmoji,
        brandGradient: info.track === '약술형' ? 'from-sky-950 via-sky-900 to-slate-950' : 'from-slate-950 via-blue-950 to-slate-900',
        accentHex: info.track === '약술형' ? '#0072CE' : '#00205B',
        essayDna: isBrief
          ? "수도권 약술형: 단답형, 1문장 압축, 근거 제시형 15문항을 80분 내에 정확하게 서술"
          : `${info.name} 인문논술: 제시문 간의 논리적 상관관계를 도출하고 비판적 안목으로 대안을 제시`,
        professorTrap: "문항의 질문 취지에서 벗어난 교과서적 원론 서술이나 자수 기준 미달 시 과락",
        scoringSecret: "두괄식 주장 선언 후 명확한 논거 2가지를 대칭형으로 구성",
        answerSheetFormat: isBrief ? "지정 줄글 답안지" : "원고지 답안지",
        materials: {
          examPaper: `${info.name}_2028_모의논술_문제지.pdf`,
          practicePaper: `${info.name}_개요_연습지.pdf`,
          answerSheet: `${info.name}_답안지.pdf`,
          modelSolution: `${info.name}_모범답안.pdf`,
        },
        passages: [
          {
            id: "p1",
            label: "제시문 (가)",
            title: "공동체 윤리와 개인의 선택",
            content: `사회가 개인에게 요구하는 규범과 개인이 추구하는 자유는 항상 긴장 관계에 놓여 있다. 조화로운 발전을 위해서는 절차적 합의와 숙의가 필수적이다.`
          }
        ],
        sampleModelAnswer: `${info.name} 논술의 모범답안입니다.`,
      };
      setSelectedUnivDetail(newExam);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Header with Identity Exploration Prompt */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 font-display uppercase tracking-wider mb-1">
              <School className="w-4 h-4" />
              <span>30 Elite Universities Exclusive Campus Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              30개 대학 전용 논술 캠퍼스 &amp; 출제 DNA 허브
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              각 대학 고유의 상징 엠블럼, 교훈, 캠퍼스 로케이션, 채점 교수진이 밝힌 감점 함정과 4종 수험팩을 제공합니다.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="대학명(연세, 고려, 가천 등) 또는 슬로건 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Tier/Category Segmented Navigation Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 pb-1">
          <span className="text-xs text-slate-400 mr-2 shrink-0 font-medium">캠퍼스 군:</span>
          {[
            { id: 'all', label: '전체 30개교' },
            { id: 'SKY', label: 'SKY (연세·고려)' },
            { id: '서성한', label: '서성한 (서강·성균관·한양)' },
            { id: '중경외시', label: '중경외시 (중앙·경희·외대·시립)' },
            { id: '여대', label: '여대 (이화·숙명)' },
            { id: '수도권약술형', label: '수도권 약술형 (가천·삼육·서경 등)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id as any)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* University Fast-Select Badges Strip */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          {filteredUniversities.map((u) => {
            const isSelected = selectedUnivDetail.univ === u.name;
            return (
              <button
                key={u.id}
                onClick={() => handleSelectUniversity(u.name)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/80 shadow-sm ring-1 ring-blue-500 text-slate-950 font-bold'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                <span className="text-base">{u.emblemEmoji}</span>
                <span>{u.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">({u.track})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. DYNAMIC FULL-WIDTH CAMPUS IDENTITY HERO BANNER */}
      <div
        className={`relative overflow-hidden rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-white/10 transition-all duration-500 bg-gradient-to-br ${
          selectedUnivDetail.brandGradient || 'from-slate-950 via-blue-950 to-slate-900'
        }`}
      >
        {/* Subtle Decorative Background Watermark */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-9xl opacity-10 select-none pointer-events-none font-black">
          {selectedUnivDetail.emblemEmoji || '🏛️'}
        </div>

        <div className="relative z-10 space-y-6 max-w-4xl">
          {/* Top Tag Row */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-bold flex items-center gap-1.5 shadow-sm">
              <span className="text-base">{selectedUnivDetail.emblemEmoji || '🏛️'}</span>
              <span>{selectedUnivDetail.track} 전용 시험장</span>
            </span>

            {selectedUnivDetail.campusLocation && (
              <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-md text-slate-200 font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>{selectedUnivDetail.campusLocation}</span>
              </span>
            )}

            <span className="text-slate-300 font-mono text-[11px]">
              {selectedUnivDetail.month} 모의논술
            </span>
          </div>

          {/* University Name & Motto */}
          <div>
            <div className="text-xs font-mono font-bold tracking-widest text-sky-300 uppercase opacity-90">
              {selectedUnivDetail.englishName || `${selectedUnivDetail.univ.toUpperCase()} UNIVERSITY`}
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white mt-1">
              {selectedUnivDetail.univ}
            </h2>
            {selectedUnivDetail.slogan && (
              <p className="text-sm sm:text-base text-slate-200/90 italic font-serif-kr mt-2 border-l-2 border-sky-400 pl-3">
                "{selectedUnivDetail.slogan}"
              </p>
            )}
          </div>

          {/* 4 Essential Admission Metrics Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
            <div className="bg-black/35 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 space-y-1">
              <span className="text-slate-400 text-[11px] block">시험 제한시간</span>
              <strong className="text-lg font-mono font-bold text-white block">
                {selectedUnivDetail.timeLimit}분
              </strong>
              <span className="text-[10px] text-slate-300">카운트다운 타이머 연동</span>
            </div>

            <div className="bg-black/35 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 space-y-1">
              <span className="text-slate-400 text-[11px] block">목표 자수 규격</span>
              <strong className="text-lg font-mono font-bold text-white block">
                {selectedUnivDetail.targetWords}자
              </strong>
              <span className="text-[10px] text-slate-300">
                {selectedUnivDetail.wordCountMin}~{selectedUnivDetail.wordCountMax}자 (±10%)
              </span>
            </div>

            <div className="bg-black/35 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 space-y-1">
              <span className="text-slate-400 text-[11px] block">수능 최저기준</span>
              <strong className="text-sm font-bold text-amber-300 block truncate">
                {selectedUnivDetail.cutlineInfo?.minKoreanGrade || "요강 참조"}
              </strong>
              <span className="text-[10px] text-slate-300">2028 개편 수능 적용</span>
            </div>

            <div className="bg-black/35 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 space-y-1">
              <span className="text-slate-400 text-[11px] block">전년도 경쟁률</span>
              <strong className="text-lg font-mono font-bold text-sky-300 block">
                {selectedUnivDetail.cutlineInfo?.competitionRatio || "38.5 : 1"}
              </strong>
              <span className="text-[10px] text-slate-300">합격자 평균 80점대</span>
            </div>
          </div>

          {/* Big Launch CTA Button inside Hero */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onStartExam(selectedUnivDetail)}
              className="px-7 py-4 bg-white text-slate-950 hover:bg-slate-100 font-extrabold rounded-2xl shadow-xl transition-all flex items-center gap-2 cursor-pointer text-sm hover:scale-[1.02]"
            >
              <Play className="w-4 h-4 fill-current text-blue-600" />
              <span>{selectedUnivDetail.univ} 실전 모의고사 룸 입장 (시험 시작)</span>
            </button>
            <span className="text-xs text-slate-300">
              * 120분 타이머, 원고지 격자 에디터, AI 3분할 성적표 지원
            </span>
          </div>
        </div>
      </div>

      {/* 3. UNIVERSITY ESSAY DNA & PROFESSOR RUBRIC DEEP DIVE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pillar 1: Essay DNA */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3 flex flex-col justify-between hover:border-blue-400 transition-colors">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-blue-600">
              <Compass className="w-5 h-5 shrink-0" />
              <h3 className="font-bold text-sm text-slate-900 font-display">
                {selectedUnivDetail.univ} 논술 출제 DNA
              </h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-serif-kr">
              {selectedUnivDetail.essayDna || "해당 대학은 제시문 간의 논리적 긴장 관계와 다면적 사고력을 가장 중점적으로 평가합니다."}
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 text-[11px] text-blue-700 font-medium">
            답안 규격: {selectedUnivDetail.answerSheetFormat || "표준 원고지"}
          </div>
        </div>

        {/* Pillar 2: Professor Warning Trap */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3 flex flex-col justify-between hover:border-rose-400 transition-colors">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-rose-600">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h3 className="font-bold text-sm text-slate-900 font-display">
                교수진이 밝힌 치명적 감점 함정
              </h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-serif-kr">
              {selectedUnivDetail.professorTrap || "도표의 표면적 수치만 기계적으로 나열하거나, 대립점을 흑백논리로 서술할 시 C등급 과락 처리됩니다."}
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 text-[11px] text-rose-700 font-medium">
            주의: 단순 지문 요약은 0점 처리
          </div>
        </div>

        {/* Pillar 3: Scoring Secret */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3 flex flex-col justify-between hover:border-emerald-400 transition-colors">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-600">
              <Lightbulb className="w-5 h-5 shrink-0" />
              <h3 className="font-bold text-sm text-slate-900 font-display">
                합격자 평균 82점 비결 (Scoring Secret)
              </h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-serif-kr">
              {selectedUnivDetail.scoringSecret || "비교 기준을 '개인의 본질 규정'과 '국가 개입 범위' 등 2개의 범주로 먼저 선언하고 두괄식으로 서술하세요."}
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 text-[11px] text-emerald-700 font-medium">
            AI 첨삭 기준표 핵심 가산점 요건
          </div>
        </div>
      </div>

      {/* 4. EXAM PAPER SUITE & 4-SET MATERIALS */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
              Exam Materials &amp; Prompt
            </span>
            <h3 className="text-xl font-bold text-slate-900 font-display mt-0.5">
              {selectedUnivDetail.univ} {selectedUnivDetail.month} 출제 논제 및 4종 수험팩
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium">
              문항 수: 1개 세트
            </span>
            <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-medium">
              즉시 응시 가능
            </span>
          </div>
        </div>

        {/* Question Prompt Preview Card */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">
              실전 출제 논제 미리보기
            </span>
            <span className="text-xs font-mono text-blue-600 font-semibold">
              분량 {selectedUnivDetail.wordCountMin}~{selectedUnivDetail.wordCountMax}자
            </span>
          </div>
          <p className="text-sm text-slate-900 leading-relaxed font-serif-kr bg-white p-4 rounded-xl border border-slate-200/80">
            {selectedUnivDetail.question}
          </p>
        </div>

        {/* 4-Set Material Download Grid */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-800 block">
            {selectedUnivDetail.univ} 전용 4종 수험 세트 다운로드
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                title: "실전 문제지 (PDF)",
                desc: "실제 고사장 판형 A3 백터 인쇄본",
                file: selectedUnivDetail.materials.examPaper,
                tag: "문제지",
                color: "text-blue-600 bg-blue-50 border-blue-200",
              },
              {
                title: "개요 연습지",
                desc: "3단 논법 및 비교 매트릭스 구상용",
                file: selectedUnivDetail.materials.practicePaper,
                tag: "연습지",
                color: "text-slate-600 bg-slate-50 border-slate-200",
              },
              {
                title: "원고지 답안지",
                desc: `${selectedUnivDetail.targetWords}자 규격 맞춤 원고지`,
                file: selectedUnivDetail.materials.answerSheet,
                tag: "답안지",
                color: "text-emerald-600 bg-emerald-50 border-emerald-200",
              },
              {
                title: "모범답안 & 출제의도",
                desc: "대치동 연구진 해설 및 채점기준표",
                file: selectedUnivDetail.materials.modelSolution,
                tag: "해설집",
                color: "text-amber-600 bg-amber-50 border-amber-200",
              },
            ].map((mat) => (
              <div
                key={mat.title}
                onClick={() => onPreviewMaterial(selectedUnivDetail.univ, mat.file)}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm bg-white flex flex-col justify-between transition-all cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${mat.color}`}>
                      {mat.tag}
                    </span>
                    <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">
                    {mat.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {mat.desc}
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 font-mono mt-3 block truncate">
                  {mat.file}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => onStartExam(selectedUnivDetail)}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{selectedUnivDetail.univ} 실전 모의고사 지금 응시하기</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
