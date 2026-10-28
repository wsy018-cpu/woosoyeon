import React from 'react';
import { OrderRecord } from '../types';
import { Truck, CheckCircle2, Clock, MapPin, Package, Phone } from 'lucide-react';

interface LogisticsModalProps {
  order: OrderRecord | null;
  onClose: () => void;
}

export const LogisticsModal: React.FC<LogisticsModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const steps = [
    { label: '결제 완료', time: '04-18 10:20', done: true, desc: '주문 접수 및 재고 할당 완료' },
    { label: '상품 포장/검수', time: '04-18 14:35', done: true, desc: '대치 물류센터 3PL 전용 라인 패킹' },
    { label: '허브터미널 간선상차', time: '04-18 19:10', done: true, desc: '동남권 물류 메가허브 이동 중' },
    { label: '배송 출발', time: '04-19 08:40', done: true, desc: '담당 택배원 배달 출발 (당일 14시 전 도착 예정)' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-sky-600" />
            <h3 className="font-bold text-base text-slate-900 font-serif-kr">
              3PL 실시간 배송 조회 시스템
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Carrier Info Strip */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400 block mb-0.5">배송 택배사</span>
            <strong className="text-slate-800 text-sm">{order.carrier}</strong>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block mb-0.5">운송장 번호</span>
            <strong className="text-blue-600 font-mono text-sm">{order.trackingNumber}</strong>
          </div>
        </div>

        {/* 4-Stage Timeline */}
        <div className="space-y-4 py-2">
          {steps.map((st, i) => (
            <div key={st.label} className="flex items-start gap-3 relative text-xs">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] shadow-sm z-10">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                {i < steps.length - 1 && (
                  <div className="w-0.5 h-10 bg-emerald-300 my-0.5" />
                )}
              </div>
              <div className="flex-1 pb-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{st.label}</span>
                  <span className="text-slate-400 font-mono text-[11px]">{st.time}</span>
                </div>
                <p className="text-slate-500 text-[11px] mt-0.5">{st.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Items in parcel */}
        <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
          <span className="font-semibold text-slate-700 block">배송 상품 내역</span>
          <div className="bg-slate-50 p-3 rounded-lg space-y-1">
            {order.items.map((it) => (
              <div key={it.product.id} className="flex justify-between text-slate-700">
                <span>{it.product.title}</span>
                <span className="font-mono">{it.quantity}권</span>
              </div>
            ))}
            <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900">
              <span>결제 총액</span>
              <span className="font-mono text-blue-600">{order.totalAmount.toLocaleString()}원</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer"
        >
          확인 닫기
        </button>
      </div>
    </div>
  );
};
