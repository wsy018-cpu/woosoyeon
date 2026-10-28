import React from 'react';
import { AppTab } from '../types';
import { ShoppingBag, Sparkles, BookOpen, GraduationCap, PenTool } from 'lucide-react';

interface HeaderProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenQuickTrial: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  cartCount,
  onOpenCart,
  onOpenQuickTrial,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950 text-white border-b border-slate-800 shadow-sm">
      {/* Top Utility Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 sm:px-8 py-1.5 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sky-400">2028 대입 개편 대비</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>전국 30개 대학 인문·약술형 모의논술 실전 시스템</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <button
              onClick={() => onSelectTab('main')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              연간 구독 로드맵
            </button>
            <span aria-hidden="true" className="text-slate-700">|</span>
            <button
              onClick={onOpenCart}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>장바구니</span>
              {cartCount > 0 && (
                <span className="bg-sky-500 text-white rounded-full text-[10px] px-1.5 py-0.2 font-mono">
                  {cartCount}
                </span>
              )}
            </button>
            <span aria-hidden="true" className="text-slate-700">|</span>
            <span className="text-slate-400">마이페이지</span>
          </div>
        </div>
      </div>

      {/* Main GNB (One-row, 3-zone contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <div
          onClick={() => onSelectTab('main')}
          className="flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-blue-700 flex items-center justify-center text-white font-black text-base shadow-inner group-hover:scale-105 transition-transform">
            N
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-white font-display">
              논술캐스트
            </span>
            <span className="text-[10px] tracking-wider text-sky-400 font-bold uppercase font-display -mt-1">
              NONSOUL CAST
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Single line, quiet states) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => onSelectTab('main')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-all cursor-pointer ${
              currentTab === 'main'
                ? 'border-sky-400 text-white font-semibold'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            대입 인문논술
          </button>
          <button
            onClick={() => onSelectTab('univ-rooms')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-all cursor-pointer ${
              currentTab === 'univ-rooms' || currentTab === 'exam-room'
                ? 'border-sky-400 text-white font-semibold'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            30개 대학 룸
          </button>
          <button
            onClick={() => onSelectTab('junior')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-all cursor-pointer ${
              currentTab === 'junior'
                ? 'border-sky-400 text-white font-semibold'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            초등 글쓰기 (주니어)
          </button>
          <button
            onClick={() => onSelectTab('middle')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-all cursor-pointer ${
              currentTab === 'middle'
                ? 'border-sky-400 text-white font-semibold'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            중등 수행평가 (미들)
          </button>
          <button
            onClick={() => onSelectTab('book-mall')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-all cursor-pointer ${
              currentTab === 'book-mall'
                ? 'border-sky-400 text-white font-semibold'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            교재몰
          </button>
        </nav>

        {/* Mobile Nav Button Row */}
        <div className="flex lg:hidden items-center gap-1.5 overflow-x-auto text-xs py-1">
          <button
            onClick={() => onSelectTab('main')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${currentTab === 'main' ? 'bg-sky-600 text-white' : 'text-slate-300'}`}
          >
            대입논술
          </button>
          <button
            onClick={() => onSelectTab('univ-rooms')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${currentTab === 'univ-rooms' ? 'bg-sky-600 text-white' : 'text-slate-300'}`}
          >
            대학룸
          </button>
          <button
            onClick={() => onSelectTab('junior')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${currentTab === 'junior' ? 'bg-sky-600 text-white' : 'text-slate-300'}`}
          >
            초등
          </button>
          <button
            onClick={() => onSelectTab('middle')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${currentTab === 'middle' ? 'bg-sky-600 text-white' : 'text-slate-300'}`}
          >
            중등
          </button>
          <button
            onClick={() => onSelectTab('book-mall')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${currentTab === 'book-mall' ? 'bg-sky-600 text-white' : 'text-slate-300'}`}
          >
            교재몰
          </button>
        </div>

        {/* Zone 3: Primary Action & Quick Trial */}
        <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
          <button
            onClick={onOpenCart}
            aria-label="장바구니 보기"
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors relative cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={onOpenQuickTrial}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-sky-400 hover:bg-sky-300 rounded-lg shadow-sm transition-all cursor-pointer hover:shadow-sky-400/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>AI 첨삭체험</span>
          </button>
        </div>
      </div>
    </header>
  );
};
