import React from 'react';
import { Download, FileText, CheckCircle, Printer } from 'lucide-react';

interface MaterialPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  univName: string;
  fileName: string;
}

export const MaterialPreviewModal: React.FC<MaterialPreviewModalProps> = ({
  isOpen,
  onClose,
  univName,
  fileName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-bold text-base text-slate-900 font-serif-kr">
                {univName} 수험 자료 열람·다운로드
              </h3>
              <span className="text-xs text-slate-400 font-mono">{fileName}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Realistic Simulated PDF Viewer Container */}
        <div className="bg-slate-100 border border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-4 shadow-inner min-h-64">
          <div className="w-16 h-20 bg-white border border-slate-300 rounded shadow-md flex flex-col justify-between p-2">
            <div className="space-y-1">
              <div className="w-8 h-1.5 bg-blue-600 rounded" />
              <div className="w-full h-1 bg-slate-200 rounded" />
              <div className="w-full h-1 bg-slate-200 rounded" />
            </div>
            <div className="text-[8px] font-mono text-slate-400 text-center">PDF</div>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-800 font-serif-kr">
              {fileName}
            </p>
            <p className="text-xs text-slate-500">
              2028 개편 최신판 · A4 고해상도 인쇄용 백터 PDF (1.4MB)
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => {
                alert(`'${fileName}' 다운로드가 시작되었습니다.`);
                onClose();
              }}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>PDF 다운로드</span>
            </button>
            <button
              onClick={() => {
                window.print();
              }}
              className="px-4 py-2.5 border border-slate-300 hover:bg-white bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>바로 인쇄</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>인쇄 후 실제 원고지 답안지에 작성하여 OCR 탭에서 업로드할 수 있습니다.</span>
        </div>
      </div>
    </div>
  );
};
