import React, { useState } from 'react';
import { Flame, TrendingUp, Trophy, ArrowRight, Play, School, Sparkles, Users } from 'lucide-react';

interface PopularRankingsSectionProps {
  onGoToUnivRoom: (univName: string) => void;
  onStartExam: (univName: string) => void;
}

export const PopularRankingsSection: React.FC<PopularRankingsSectionProps> = ({
  onGoToUnivRoom,
  onStartExam,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'humanities' | 'brief'>('all');

  // Real-time applicants data ranking
  const allRankings = [
    {
      rank: 1,
      name: "가천대",
      track: "약술형",
      category: "brief",
      emblemEmoji: "🌀",
      share: 34.2,
      count: 12840,
      trend: "maintain",
      trendText: "-",
      badge: "수도권 최대 980명 선발",
      quota: 980,
      competitionRatio: "25.1 : 1",
      minScore: "1개 영역 3등급",
      highlightReason: "EBS 연계율 100%와 80분 단답·1문장 서술형으로 수험생 최다 지원",
      color: "sky",
    },
    {
      rank: 2,
      name: "연세대",
      track: "인문논술",
      category: "humanities",
      emblemEmoji: "🦅",
      share: 28.5,
      count: 10720,
      trend: "up",
      trendText: "▲ 1",
      badge: "최상위권 선호도 1위",
      quota: 351,
      competitionRatio: "38.5 : 1",
      minScore: "2개합 4 이내",
      highlightReason: "인문·사회 융합 다면사고형과 도표 통계 해석으로 명문대 논술의 표준",
      color: "blue",
    },
    {
      rank: 3,
      name: "고려대",
      track: "인문논술",
      category: "humanities",
      emblemEmoji: "🐯",
      share: 26.3,
      count: 9890,
      trend: "down",
      trendText: "▼ 1",
      badge: "8년 만의 논술 부활",
      quota: 360,
      competitionRatio: "45.2 : 1",
      minScore: "4개합 8, 한국사 4",
      highlightReason: "수리·논리력 연계형 인문논술 부활로 상위권 수험생 대거 유입",
      color: "rose",
    },
    {
      rank: 4,
      name: "한양대",
      track: "인문논술",
      category: "humanities",
      emblemEmoji: "🦁",
      share: 23.3,
      count: 8750,
      trend: "up",
      trendText: "▲ 2",
      badge: "수능최저 전면 미적용",
      quota: 246,
      competitionRatio: "88.2 : 1",
      minScore: "수능최저 없음 (100% 논술)",
      highlightReason: "수능 성적 없이 오직 논술 실력만으로 역전 가능한 유일한 최상위권",
      color: "amber",
    },
    {
      rank: 5,
      name: "성균관대",
      track: "인문논술",
      category: "humanities",
      emblemEmoji: "🌿",
      share: 21.6,
      count: 8120,
      trend: "maintain",
      trendText: "-",
      badge: "1번 2:2 분류 요약 정석",
      quota: 380,
      competitionRatio: "41.0 : 1",
      minScore: "3개합 6 (글로벌 3개합 5)",
      highlightReason: "명확한 채점 기준표와 4개 제시문 2개 입장 분류의 정형화된 출제 공식",
      color: "emerald",
    },
    {
      rank: 6,
      name: "중앙대",
      track: "인문논술",
      category: "humanities",
      emblemEmoji: "🐉",
      share: 19.8,
      count: 7430,
      trend: "up",
      trendText: "▲ 1",
      badge: "550자 단일 단락 완성형",
      quota: 420,
      competitionRatio: "49.0 : 1",
      minScore: "3개합 6 (인문)",
      highlightReason: "서론·본론·결론이 하나로 이어지는 550자 완성형 글쓰기 시그니처",
      color: "indigo",
    },
  ];

  const filteredRankings = allRankings.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 font-display uppercase tracking-wider mb-1">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>2028 Applicant Real-Time Preference Index</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display tracking-tight flex items-center gap-2">
            <span>수험생 실시간 최다 선택 학교 순위 TOP 6</span>
            <span className="text-xs font-bold bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-200">
              실시간 집계중
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            논술캐스트 37,500여 명 수험생의 모의고사 구독 및 응시 빅데이터 기반 실시간 순위입니다.
          </p>
        </div>

        {/* Filter Segmented Buttons */}
        <div className="inline-flex items-center p-1 bg-slate-100 rounded-xl text-xs font-medium self-start sm:self-auto">
          {[
            { id: 'all', label: '종합 TOP 6' },
            { id: 'humanities', label: '인문논술 순위' },
            { id: 'brief', label: '약술형 순위' },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id as any)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeCategory === c.id
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRankings.map((item) => {
          const isTop1 = item.rank === 1;
          const isTop2 = item.rank === 2;
          const isTop3 = item.rank === 3;

          return (
            <div
              key={item.name}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 bg-white relative overflow-hidden ${
                isTop1
                  ? 'border-amber-300 shadow-md ring-1 ring-amber-300/40 bg-gradient-to-b from-amber-50/20 to-white'
                  : 'border-slate-200/90 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              {/* Card Top: Rank + University Details */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {/* Rank Badge */}
                    <div
                      className={`w-8 h-8 rounded-xl font-extrabold flex items-center justify-center font-mono text-sm shadow-xs ${
                        isTop1
                          ? 'bg-amber-400 text-slate-950 font-black'
                          : isTop2
                          ? 'bg-slate-300 text-slate-900'
                          : isTop3
                          ? 'bg-amber-700/80 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.rank}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{item.emblemEmoji}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-extrabold text-base text-slate-900 font-display">
                            {item.name}
                          </h3>
                          <span className="text-[10px] font-semibold text-slate-500 font-mono">
                            {item.track}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 block font-mono">
                          모집 {item.quota}명 · 경쟁률 {item.competitionRatio}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Trend Indicator */}
                  <span
                    className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                      item.trend === 'up'
                        ? 'text-rose-600 bg-rose-50'
                        : item.trend === 'down'
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-slate-400 bg-slate-50'
                    }`}
                  >
                    {item.trendText}
                  </span>
                </div>

                {/* Selection Share Bar */}
                <div className="space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">수험생 선택 비율</span>
                    <span className="font-mono font-bold text-slate-900">
                      {item.share}% <span className="text-[10px] text-slate-400 font-normal">({item.count.toLocaleString()}명)</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        isTop1 ? 'bg-amber-500' : 'bg-blue-600'
                      }`}
                      style={{ width: `${item.share * 2.5}%` }}
                    />
                  </div>
                </div>

                {/* Reason description */}
                <p className="text-xs text-slate-600 leading-relaxed font-serif-kr line-clamp-2">
                  {item.highlightReason}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onGoToUnivRoom(item.name)}
                  className="text-xs text-slate-600 hover:text-slate-900 font-medium transition-colors cursor-pointer"
                >
                  출제경향 보기 ➔
                </button>

                <button
                  onClick={() => onStartExam(item.name)}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>시험장 입장</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
