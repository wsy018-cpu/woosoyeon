import React, { useState } from 'react';
import { BookProduct, CartItem, OrderRecord } from '../types';
import { initialBookProducts } from '../data/mockData';
import { ShoppingCart, Package, Bell, Check, Truck, AlertCircle, Sparkles, Filter } from 'lucide-react';

interface BookMallProps {
  products: BookProduct[];
  onAddToCart: (product: BookProduct) => void;
  onQuickBuy: (product: BookProduct) => void;
  onOpenLogisticsModal: (order: OrderRecord) => void;
  recentOrders: OrderRecord[];
}

export const BookMall: React.FC<BookMallProps> = ({
  products,
  onAddToCart,
  onQuickBuy,
  onOpenLogisticsModal,
  recentOrders,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [restockModalProduct, setRestockModalProduct] = useState<BookProduct | null>(null);
  const [phoneForAlert, setPhoneForAlert] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: '전체 교재 (7종)' },
    { id: '개념서', label: '개념 완성서' },
    { id: '배경지식', label: '필수 배경지식 4권' },
    { id: '약술형', label: '약술형 실전서' },
    { id: '도표', label: '도표·통계논술' },
    { id: '패키지', label: '입문 올인원 패키지' },
  ];

  const filteredProducts = products.filter((p) =>
    selectedCategory === 'all' ? true : p.category === selectedCategory
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRestockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneForAlert.trim()) return;
    setRestockModalProduct(null);
    setPhoneForAlert('');
    showToast(`'${restockModalProduct?.title}' 재입고 알림톡 예약이 완료되었습니다.`);
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 text-xs animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 font-mono uppercase tracking-wider mb-1">
            <Package className="w-4 h-4" />
            <span>Official Textbook &amp; 3PL Logistics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
            2028 대입 논술 전문 교재몰 &amp; 실시간 물류
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            대치동 연구진이 직접 집필한 7종 도서 라인업. 평일 16시 이전 주문 시 당일 우체국 택배 출고.
          </p>
        </div>

        {/* 3PL Order Status Quick Trigger */}
        {recentOrders.length > 0 && (
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex items-center gap-3">
            <Truck className="w-5 h-5 text-sky-600 shrink-0" />
            <div className="text-xs">
              <span className="font-semibold text-slate-800 block">최근 주문 배송 조회</span>
              <span className="text-slate-500 font-mono text-[11px]">
                {recentOrders[0].trackingNumber} ({recentOrders[0].status})
              </span>
            </div>
            <button
              onClick={() => onOpenLogisticsModal(recentOrders[0])}
              className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              배송추적
            </button>
          </div>
        )}
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-4 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === c.id
                ? 'bg-slate-900 text-white shadow-sm font-semibold'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((book) => {
          const isSoldOut = book.stock <= 0 || book.isSoldOut;
          const isLowStock = !isSoldOut && book.stock <= 2;

          return (
            <div
              key={book.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all hover:shadow-md"
            >
              <div>
                {/* Book Cover Gradient Header */}
                <div className={`p-6 bg-gradient-to-br ${book.coverColor} text-white relative min-h-36 flex flex-col justify-between`}>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-mono tracking-wider uppercase opacity-80">
                      {book.category}
                    </span>
                    {book.tag && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm">
                        {book.tag}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-serif-kr text-white leading-snug">
                      {book.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                      {book.subtitle}
                    </p>
                  </div>
                </div>

                {/* Book Details */}
                <div className="p-5 space-y-4 text-xs">
                  {/* Stock Status Tag */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">재고 현황</span>
                    {isSoldOut ? (
                      <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        일시 품절 (재입고 예정)
                      </span>
                    ) : isLowStock ? (
                      <span className="text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 animate-pulse">
                        품절 임박 (잔여 {book.stock}권)
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        판매중 (가용 재고 {book.stock}권 남음)
                      </span>
                    )}
                  </div>

                  <p className="text-slate-600 leading-relaxed">
                    {book.description}
                  </p>

                  {/* Bullet features */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-slate-700">
                    {book.features.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price and Action Bar */}
              <div className="p-5 pt-0">
                <div className="flex items-baseline justify-between mb-3 border-t border-slate-100 pt-3">
                  <span className="text-xs text-slate-400">판매가</span>
                  <div className="flex items-baseline gap-1.5">
                    {book.originalPrice && (
                      <span className="text-xs text-slate-400 line-through font-mono">
                        {book.originalPrice.toLocaleString()}원
                      </span>
                    )}
                    <span className="text-lg font-bold font-mono text-slate-900">
                      {book.price.toLocaleString()}원
                    </span>
                  </div>
                </div>

                {isSoldOut ? (
                  <button
                    onClick={() => setRestockModalProduct(book)}
                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>재입고 알림 신청</span>
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onAddToCart(book)}
                      className="py-2.5 border border-slate-300 hover:border-slate-400 text-slate-700 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>장바구니</span>
                    </button>
                    <button
                      onClick={() => onQuickBuy(book)}
                      className="py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-xs transition-colors cursor-pointer"
                    >
                      바로구매
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Restock Notification Modal */}
      {restockModalProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-sky-600" />
                <h3 className="font-bold text-base text-slate-900 font-serif-kr">
                  재입고 알림톡 신청
                </h3>
              </div>
              <button
                onClick={() => setRestockModalProduct(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <span className="text-slate-500">신청 대상 교재:</span>
              <p className="font-bold text-slate-800 text-sm">
                {restockModalProduct.title}
              </p>
              <p className="text-slate-500">
                입고 즉시 입력하신 휴대폰 번호로 카카오톡 알림 메시지를 발송해 드립니다.
              </p>
            </div>

            <form onSubmit={handleRestockSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  휴대폰 번호
                </label>
                <input
                  type="tel"
                  placeholder="010-1234-5678"
                  value={phoneForAlert}
                  onChange={(e) => setPhoneForAlert(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRestockModalProduct(null)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  알림 신청하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
