import React from 'react';
import { CartItem } from '../types';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col p-6 animate-slide-left">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-slate-800" />
            <h2 className="font-bold text-lg text-slate-900 font-serif-kr">
              장바구니 ({items.reduce((acc, i) => acc + i.quantity, 0)}권)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer p-1"
          >
            ✕
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-2">
              <ShoppingBag className="w-12 h-12 stroke-1" />
              <p className="text-sm font-medium">장바구니에 담긴 교재가 없습니다.</p>
              <p className="text-xs text-slate-400">교재몰에서 원하는 도서를 추가해 보세요.</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between gap-2 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {item.product.category}
                    </span>
                    <h4 className="font-bold text-slate-900 font-serif-kr text-sm">
                      {item.product.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-slate-400 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                  <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-slate-200">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono font-bold text-slate-800 px-1">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      disabled={item.quantity >= item.product.stock}
                      className="text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {(item.product.price * item.quantity).toLocaleString()}원
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Area */}
        {items.length > 0 && (
          <div className="border-t border-slate-100 pt-4 space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>상품 금액</span>
                <span className="font-mono">{totalAmount.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>배송비 (3PL 우체국)</span>
                <span className="font-medium text-emerald-600">무료 배송</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>총 결제금액</span>
                <span className="font-mono text-blue-600 text-lg">
                  {totalAmount.toLocaleString()}원
                </span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>주문하기 ({totalAmount.toLocaleString()}원)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
