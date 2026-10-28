/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppTab, Exam, EvaluationResult, BookProduct, CartItem, OrderRecord } from './types';
import { mockExams, mockDefaultEvaluation, initialBookProducts } from './data/mockData';
import { Header } from './components/Header';
import { SubscriptionHero } from './components/SubscriptionHero';
import { UnivRooms } from './components/UnivRooms';
import { ExamRoom } from './components/ExamRoom';
import { EvaluationReport } from './components/EvaluationReport';
import { BookMall } from './components/BookMall';
import { JuniorWriting } from './components/JuniorWriting';
import { MiddleWriting } from './components/MiddleWriting';
import { SubscriptionModal } from './components/SubscriptionModal';
import { LogisticsModal } from './components/LogisticsModal';
import { CartDrawer } from './components/CartDrawer';
import { MaterialPreviewModal } from './components/MaterialPreviewModal';
import { Sparkles, Check, School, ShieldCheck } from 'lucide-react';

export default function App() {
  // Navigation tab
  const [currentTab, setCurrentTab] = useState<AppTab>('main');

  // Active exam for ExamRoom
  const [activeExam, setActiveExam] = useState<Exam>(mockExams[0]);

  // Active Evaluation result for EvaluationReport
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult>(mockDefaultEvaluation);

  // AI Evaluation Loading Spinner Overlay
  const [isAiGrading, setIsAiGrading] = useState<boolean>(false);
  const [gradingStep, setGradingStep] = useState<string>('논제 및 제시문 독해 분석 중...');

  // Book Products with real-time stock
  const [products, setProducts] = useState<BookProduct[]>(() => {
    const saved = localStorage.getItem('nonsoul_cast_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialBookProducts;
      }
    }
    return initialBookProducts;
  });

  // Shopping Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('nonsoul_cast_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Recent Orders with 3PL tracking
  const [recentOrders, setRecentOrders] = useState<OrderRecord[]>(() => {
    const saved = localStorage.getItem('nonsoul_cast_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        orderId: "ORD-2028-0418",
        items: [
          { product: initialBookProducts[0], quantity: 1 },
          { product: initialBookProducts[1], quantity: 1 }
        ],
        totalAmount: 50000,
        trackingNumber: "6892-1049-5582",
        carrier: "우체국택배 (익일특급)",
        status: "배송중",
        date: "2028-04-18 10:20",
        shippingAddress: "서울시 강남구 대치동 980-12"
      }
    ];
  });

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState({
    humanitiesCount: 4,
    briefCount: 2,
    isAnnual: true,
    totalPrice: 1764000,
  });

  const [activeLogisticsOrder, setActiveLogisticsOrder] = useState<OrderRecord | null>(null);
  const [materialModalData, setMaterialModalData] = useState<{ isOpen: boolean; univ: string; file: string }>({
    isOpen: false,
    univ: '',
    file: '',
  });

  // Global Toast
  const [toast, setToast] = useState<string | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('nonsoul_cast_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('nonsoul_cast_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('nonsoul_cast_orders', JSON.stringify(recentOrders));
  }, [recentOrders]);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Cart operations
  const handleAddToCart = (product: BookProduct) => {
    if (product.stock <= 0) {
      triggerToast('해당 교재는 현재 일시 품절입니다.');
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) {
          triggerToast('가용 재고 수량을 초과하여 담을 수 없습니다.');
          return prev;
        }
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    triggerToast(`'${product.title}' 장바구니에 담았습니다.`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  // Instant Checkout & Stock Deduction
  const handleCartCheckout = () => {
    if (cartItems.length === 0) return;

    // Deduct stock
    setProducts((prev) =>
      prev.map((prod) => {
        const inCart = cartItems.find((ci) => ci.product.id === prod.id);
        if (inCart) {
          return {
            ...prod,
            stock: Math.max(0, prod.stock - inCart.quantity),
            isSoldOut: prod.stock - inCart.quantity <= 0,
          };
        }
        return prod;
      })
    );

    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const newOrder: OrderRecord = {
      orderId: `ORD-${Date.now().toString().slice(-6)}`,
      items: [...cartItems],
      totalAmount: total,
      trackingNumber: `6892-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      carrier: "우체국택배 (익일특급)",
      status: "결제완료",
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      shippingAddress: "서울시 강남구 대치동 980-12",
    };

    setRecentOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    setIsCartOpen(false);
    triggerToast('교재 주문 및 결제가 완료되었습니다! 3PL 물류 배송 조회가 가능합니다.');
    setActiveLogisticsOrder(newOrder);
  };

  const handleQuickBuy = (product: BookProduct) => {
    handleAddToCart(product);
    setIsCartOpen(true);
  };

  // Exam and Evaluation submission
  const handleStartExam = (exam: Exam) => {
    setActiveExam(exam);
    setCurrentTab('exam-room');
  };

  const handleSubmitAnswer = (answerText: string) => {
    setIsAiGrading(true);
    setGradingStep('1/3: 논제 요구조건 및 핵심 키워드 매트릭스 분석 중...');

    setTimeout(() => {
      setGradingStep('2/3: 제시문 분석력 및 논리적 일관성 다면 배점 산출 중...');
    }, 1000);

    setTimeout(() => {
      setGradingStep('3/3: 3분할 핀포인트 코멘트 및 최종 등급 리포트 생성 완료!');
    }, 2000);

    setTimeout(() => {
      setIsAiGrading(false);

      // Create new evaluation result dynamically matching user answer
      const updatedEval: EvaluationResult = {
        ...mockDefaultEvaluation,
        examId: activeExam.id,
        univName: `${activeExam.univ} ${activeExam.track} ${activeExam.month}`,
        submittedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        submittedAnswer: answerText,
        wordCount: answerText.length,
        wordCountTarget: `${activeExam.wordCountMin}~${activeExam.wordCountMax}자 (${
          answerText.length >= activeExam.wordCountMin && answerText.length <= activeExam.wordCountMax
            ? '규정 충족'
            : '분량 보완 필요'
        })`,
      };

      setEvaluationResult(updatedEval);
      setCurrentTab('eval-report');
      triggerToast('AI 3분할 채점 리포트 생성이 완료되었습니다.');
    }, 2800);
  };

  const handleReevaluate = (newAnswer: string) => {
    setEvaluationResult((prev) => ({
      ...prev,
      score: 86, // upgraded score upon revision!
      averageScore: 64,
      percentile: 94, // top 6%!
      submittedAnswer: newAnswer,
      wordCount: newAnswer.length,
      remainingRevisions: Math.max(0, prev.remainingRevisions - 1),
      breakdown: [
        { label: "논제 이해", score: 23, max: 25, criteria: "개인과 공동체의 대조", feedback: "개념 정의와 대립각이 명확히 수립되었습니다." },
        { label: "제시문 분석", score: 22, max: 25, criteria: "제시문 간 관계", feedback: "오독이었던 동일시 오류가 완벽히 수정되었습니다." },
        { label: "논리 전개", score: 23, max: 25, criteria: "유기적 구성", feedback: "하버마스의 절차적 조화로 자연스럽게 귀결됩니다." },
        { label: "표현 및 분량", score: 18, max: 25, criteria: "어문 규범", feedback: "군더더기 없는 명료한 비문학적 어조가 돋보입니다." }
      ],
      generalComment: "수정본에서 '자유 지상주의'와 '공동선 우선주의'의 긴장 관계를 명쾌하게 대조하여 점수가 72점에서 86점(상위 6%)으로 대폭 상승했습니다!",
      highlightedText: [
        {
          id: "h1",
          text: "제시문 (가)는 자유를 간섭의 부재로 정의하며 공동체의 개입을 경계한다.",
          status: "good",
          tag: "개념 정의 우수",
          comment: "밀의 소극적 자유를 군더더기 없이 정확하게 압축했습니다.",
        },
        {
          id: "h2",
          text: "이처럼 (가)가 권리의 우선성을 강조하는 반면, (나)는 도덕적 공동선의 선행성을 역설하며 뚜렷한 대립을 보인다.",
          status: "good",
          tag: "재작성 교정 완료 (만점)",
          comment: "오류 문장이 완벽하게 비교 기준으로 교정되어 제시문 간의 철학적 긴장감을 탁월하게 포착했습니다.",
        }
      ],
      revisionHistory: [
        ...(prev.revisionHistory || []),
        {
          version: 2,
          score: 86,
          submittedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          diffSummary: "제시문 대립 기준 수정 반영 (+14점 향상)",
        }
      ]
    }));
    triggerToast('2차 재작성 첨삭 점수가 86점으로 상승 반영되었습니다!');
  };

  const handleStartExamByName = (univName: string) => {
    const found = mockExams.find((e) => e.univ.includes(univName) || univName.includes(e.univ));
    if (found) {
      setActiveExam(found);
    }
    setCurrentTab('exam-room');
  };

  const handleGoToUnivRoomByName = (univName: string) => {
    const found = mockExams.find((e) => e.univ.includes(univName) || univName.includes(e.univ));
    if (found) {
      setActiveExam(found);
    }
    setCurrentTab('univ-rooms');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Global Toast */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 text-xs animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Main GNB Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuickTrial={() => {
          setActiveExam(mockExams[0]);
          setCurrentTab('exam-room');
        }}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8">
        {currentTab === 'main' && (
          <SubscriptionHero
            onOpenCalculator={() => {
              const el = document.getElementById('calc-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            onGoToUnivRooms={() => setCurrentTab('univ-rooms')}
            onOpenSubscriptionModal={(plan) => {
              setSubscriptionPlan(plan);
              setIsSubscriptionModalOpen(true);
            }}
            onGoToUnivRoomByName={handleGoToUnivRoomByName}
            onStartExamByName={handleStartExamByName}
            onViewEvaluation={() => setCurrentTab('eval-report')}
          />
        )}

        {currentTab === 'univ-rooms' && (
          <UnivRooms
            onStartExam={handleStartExam}
            onPreviewMaterial={(univName, fileName) => {
              setMaterialModalData({
                isOpen: true,
                univ: univName,
                file: fileName,
              });
            }}
          />
        )}

        {currentTab === 'exam-room' && (
          <ExamRoom
            exam={activeExam}
            onSubmitAnswer={handleSubmitAnswer}
            onExit={() => setCurrentTab('univ-rooms')}
          />
        )}

        {currentTab === 'eval-report' && (
          <EvaluationReport
            result={evaluationResult}
            onBackToExam={() => setCurrentTab('exam-room')}
            onBackToHome={() => setCurrentTab('main')}
            onReevaluate={handleReevaluate}
          />
        )}

        {currentTab === 'book-mall' && (
          <BookMall
            products={products}
            onAddToCart={handleAddToCart}
            onQuickBuy={handleQuickBuy}
            onOpenLogisticsModal={(ord) => setActiveLogisticsOrder(ord)}
            recentOrders={recentOrders}
          />
        )}

        {currentTab === 'junior' && <JuniorWriting />}

        {currentTab === 'middle' && <MiddleWriting />}
      </main>

      {/* AI Grading Async Loading Modal Overlay */}
      {isAiGrading && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center space-y-6 shadow-2xl border border-slate-200">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-ping opacity-25" />
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white shadow-lg mx-auto">
                <Sparkles className="w-10 h-10 animate-spin" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-lg text-slate-900 font-serif-kr">
                논술캐스트 AI 첨삭 엔진 가동 중
              </h3>
              <p className="text-xs text-blue-600 font-mono font-semibold animate-pulse">
                {gradingStep}
              </p>
              <p className="text-[11px] text-slate-400">
                대학별 채점 기준표(Rubric)와 600자 원고지 규범을 대조하고 있습니다.
              </p>
            </div>

            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full animate-pulse w-3/4" />
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCartCheckout}
      />

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        planDetails={subscriptionPlan}
        onSuccess={() => {
          triggerToast('2028 모의고사 연간 구독이 성공적으로 완료되었습니다! 개념서가 곧 배송됩니다.');
        }}
      />

      {/* 3PL Logistics Tracking Modal */}
      <LogisticsModal
        order={activeLogisticsOrder}
        onClose={() => setActiveLogisticsOrder(null)}
      />

      {/* Material Preview Modal */}
      <MaterialPreviewModal
        isOpen={materialModalData.isOpen}
        onClose={() => setMaterialModalData({ isOpen: false, univ: '', file: '' })}
        univName={materialModalData.univ}
        fileName={materialModalData.file}
      />

      {/* Clean Academic Footer */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs py-10 px-4 sm:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-white font-bold font-serif-kr text-base">
              <span>논술캐스트</span>
              <span className="text-xs text-sky-400 font-mono">NONSOUL CAST</span>
            </div>
            <p className="text-slate-500 text-[11px]">
              주식회사 논술캐스트 에듀테크 연구소 · 서울특별시 강남구 테헤란로 152 7층
            </p>
            <p className="text-slate-600 text-[11px]">
              대표이사: 김연구 · 사업자등록번호: 214-88-91024 · 통신판매업신고: 2028-서울강남-0418
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <span className="cursor-pointer hover:text-white transition-colors">이용약관</span>
            <span>·</span>
            <span className="cursor-pointer hover:text-white transition-colors">개인정보처리방침</span>
            <span>·</span>
            <span className="cursor-pointer hover:text-white transition-colors">대학별 채점 기준표 공시</span>
            <span>·</span>
            <span className="cursor-pointer hover:text-white transition-colors">고객센터 1588-2028</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
