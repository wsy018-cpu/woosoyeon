import React, { useState } from 'react';
import { all30Universities, mockExams } from '../data/mockData';
import { Target, ArrowRight, Play, CheckCircle2, Clock, Edit3, Sparkles, School, Plus, Check } from 'lucide-react';

interface MyTargetSchoolsSectionProps {
  onGoToUnivRoom: (univName: string) => void;
  onStartExam: (univName: string) => void;
  onViewEvaluation: () => void;
}

export const MyTargetSchoolsSection: React.FC<MyTargetSchoolsSectionProps> = ({
  onGoToUnivRoom,
  onStartExam,
  onViewEvaluation,
}) => {
  // Stored target schools in LocalStorage, default 6 schools
  const [targetSchools, setTargetSchools] = useState<string[]>(() => {
    const saved = localStorage.getItem('nonsoul_cast_my_target_schools');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return ['연세대', '고려대', '가천대', '성균관대', '한양대', '서강대'];
      }
    }
    return ['연세대', '고려대', '가천대', '성균관대', '한양대', '서강대'];
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState<string[]>(targetSchools);
  const [modalSearch, setModalSearch] = useState('');

  const saveTargetSchools = (newSchools: string[]) => {
    setTargetSchools(newSchools);
    localStorage.setItem('nonsoul_cast_my_target_schools', JSON.stringify(newSchools));
  };

  const handleOpenEditModal = () => {
    setTempSelected(targetSchools);
    setIsEditModalOpen(true);
  };

  const handleToggleSchool = (univName: string) => {
    if (tempSelected.includes(univName)) {
      setTempSelected(tempSelected.filter((s) => s !== univName));
    } else {
      if (tempSelected.length >= 6) {
        alert('목표 학교는 수시 6회 지원 기준 최대 6개교까지 선택할 수 있습니다.');
        return;
      }
      setTempSelected([...tempSelected, univName]);
    }
  };

  const handleSaveModal = () => {
    saveTargetSchools(tempSelected);
    setIsEditModalOpen(false);
  };

  // Get rich data for user's target schools
  const schoolCards = targetSchools.map((name) => {
    const info = all30Universities.find((u) => u.name === name) || {
      id: name,
      name,
      track: '인문논술',
      minScore: '수능최저 요강참조',
      quota: 300,
      emblemEmoji: '🏛️',
      color: 'blue',
      campus: '본교',
      slogan: '창의적 인재 육성',
      tierCategory: '주요대'
    };

    // Specific status simulation
    const isCompleted = name === '연세대';
    const isPending = name === '가천대';

    return {
      ...info,
      status: isCompleted ? '응시완료 (72점)' : isPending ? '응시 대기중 (80분)' : '4월 모의고사 준비중',
      isCompleted,
      isPending,
      score: isCompleted ? 72 : null,
      dDay: 'D-5',
    };
  });

  return (
    <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 font-display uppercase tracking-wider mb-1">
            <Target className="w-4 h-4 text-sky-500" />
            <span>My Target 6 Universities Quick Access</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display tracking-tight flex items-center gap-2">
            <span>내가 선택한 목표 6개교 바로가기</span>
            <span className="text-xs font-mono font-bold bg-sky-50 text-sky-700 px-2.5 py-0.5 rounded-full border border-sky-200">
              {targetSchools.length}/6개교 설정됨
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            수시 원서접수 6개 목표 대학의 4월 모의고사 응시 현황, 성적표 열람 및 시험장 바로 입장이 가능합니다.
          </p>
        </div>

        {/* Change Target Schools CTA */}
        <button
          onClick={handleOpenEditModal}
          className="self-start sm:self-auto px-4 py-2 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Edit3 className="w-3.5 h-3.5 text-slate-500" />
          <span>목표 대학 변경 (6개교)</span>
        </button>
      </div>

      {/* Target Schools Grid (Responsive 2~3 columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {schoolCards.map((school) => (
          <div
            key={school.name}
            className="p-5 rounded-2xl border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all bg-gradient-to-b from-white to-slate-50/50 flex flex-col justify-between space-y-4 group"
          >
            {/* School Header */}
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl p-2 rounded-xl bg-white shadow-xs border border-slate-100 shrink-0">
                    {school.emblemEmoji}
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-extrabold text-base text-slate-900 font-display group-hover:text-blue-600 transition-colors">
                        {school.name}
                      </h3>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                        {school.track}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-0.5 truncate max-w-[180px]">
                      {school.campus} · {school.minScore}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${
                    school.isCompleted
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : school.isPending
                      ? 'bg-sky-50 text-sky-800 border-sky-200'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {school.status}
                </span>
              </div>

              {/* Slogan */}
              <p className="text-[11px] text-slate-500 italic mt-3 line-clamp-1 border-l-2 border-slate-200 pl-2">
                "{school.slogan}"
              </p>
            </div>

            {/* Action Bar */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => onGoToUnivRoom(school.name)}
                className="text-xs text-slate-600 hover:text-slate-900 font-medium transition-colors cursor-pointer"
              >
                대학룸 정보 ➔
              </button>

              <div className="flex items-center gap-1.5">
                {school.isCompleted ? (
                  <button
                    onClick={onViewEvaluation}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>성적표 보기 (72점)</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onStartExam(school.name)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>실전 응시하기</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* If less than 6 schools selected, show add slot card */}
        {schoolCards.length < 6 && (
          <div
            onClick={handleOpenEditModal}
            className="p-6 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/20 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer transition-all min-h-[170px]"
          >
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xs text-slate-700 block">목표 대학 추가하기</span>
              <span className="text-[11px] text-slate-400">최대 6개교까지 바로가기 설정</span>
            </div>
          </div>
        )}
      </div>

      {/* Edit Target Schools Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900 font-display">
                  수시 목표 6개 대학 편집
                </h3>
                <p className="text-xs text-slate-500">
                  메인 화면 바로가기에 등록할 대학을 선택하세요 ({tempSelected.length}/6개 선택됨)
                </p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Search Box */}
            <input
              type="text"
              placeholder="대학명 검색 (예: 연세, 고려, 가천, 성균관...)"
              value={modalSearch}
              onChange={(e) => setModalSearch(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500/20"
            />

            {/* University 30 Roster Selector */}
            <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-1">
              {all30Universities
                .filter((u) => u.name.includes(modalSearch) || u.track.includes(modalSearch))
                .map((u) => {
                  const isChecked = tempSelected.includes(u.name);
                  return (
                    <div
                      key={u.id}
                      onClick={() => handleToggleSchool(u.name)}
                      className={`p-3 rounded-xl border text-xs flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? 'border-blue-600 bg-blue-50/80 font-bold text-blue-950 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{u.emblemEmoji}</span>
                        <div>
                          <span className="block">{u.name}</span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            {u.track}
                          </span>
                        </div>
                      </div>

                      {isChecked ? (
                        <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-slate-300" />
                      )}
                    </div>
                  );
                })}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs">
              <span className="text-slate-500">
                선택된 학교: <strong className="text-blue-600">{tempSelected.join(', ') || '없음'}</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  취소
                </button>
                <button
                  onClick={handleSaveModal}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-xs cursor-pointer"
                >
                  저장하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
