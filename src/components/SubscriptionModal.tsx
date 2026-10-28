import React, { useState } from 'react';
import { ShieldCheck, Gift, Check, CreditCard, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  planDetails: {
    humanitiesCount: number;
    briefCount: number;
    isAnnual: boolean;
    totalPrice: number;
  };
  onSuccess: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  planDetails,
  onSuccess,
}) => {
  const [studentName, setStudentName] = useState('김논술');
  const [phone, setPhone] = useState('010-9876-5432');
  const [address, setAddress] = useState('서울시 강남구 대치동 논술빌딩 302호');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'kakaopay' | 'naverpay'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
      });
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-semibold text-blue-600 font-mono uppercase">
              YIGAM-Style One-Stop Checkout
            </span>
            <h2 className="text-xl font-bold text-slate-900 font-serif-kr mt-0.5">
              2028 모의고사 연간 구독 신청
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Plan Summary Box */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-slate-800">선택 조합</span>
            <span className="font-mono font-bold text-blue-600">
              인문논술 {planDetails.humanitiesCount}교 + 약술형 {planDetails.briefCount}교
            </span>
          </div>
          <div className="flex justify-between items-center text-slate-600">
            <span>결제 방식</span>
            <span>{planDetails.isAnnual ? '연간 일시납 (7회차 풀패키지 16.7% 할인)' : '월간 정기결제'}</span>
          </div>
          {planDetails.isAnnual && (
            <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 p-2 rounded border border-amber-200/80 font-medium">
              <Gift className="w-3.5 h-3.5" />
              <span>[특별 혜택] 2028 인문논술 완성 개념서 (30,000원 상당) 무료 증정</span>
            </div>
          )}
          <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
            <span className="font-bold text-slate-800 text-sm">최종 결제 금액</span>
            <span className="text-xl font-extrabold font-mono text-blue-600">
              {planDetails.totalPrice.toLocaleString()}원
            </span>
          </div>
        </div>

        {/* Shipping & Subscriber Form */}
        <form onSubmit={handlePay} className="space-y-4 text-xs">
          <div className="space-y-3">
            <span className="font-bold text-slate-800 block">수령인 및 배송 정보 (자택 직배송)</span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-600 block mb-1">수험생 성명</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="text-slate-600 block mb-1">연락처</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
            <div>
              <label className="text-slate-600 block mb-1">배송지 주소 (교재 및 시험지 패키지 수령지)</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="font-bold text-slate-800 block">결제 수단 선택</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'card', label: '신용/체크카드' },
                { id: 'kakaopay', label: '카카오페이' },
                { id: 'naverpay', label: '네이버페이' },
              ].map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`py-2 rounded-lg border text-center font-medium transition-all cursor-pointer ${
                    paymentMethod === m.id
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Security Note */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>KCP 안전 결제 시스템을 통해 안전하게 암호화 처리됩니다.</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isProcessing ? (
              <span>결제 승인 처리 중...</span>
            ) : (
              <>
                <span>{planDetails.totalPrice.toLocaleString()}원 결제하고 구독 시작하기</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
