import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#161615]/60 backdrop-blur-xs animate-in fade-in">
      <div className="hard-card max-w-md w-full p-6 bg-[#FCFBF9] space-y-4 shadow-[8px_8px_0px_#161615]">
        <div className="flex items-start justify-between border-b-1.5 border-[#161615] pb-3">
          <div className="flex items-center gap-2 text-[#991B1B]">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <h3 className="font-serif text-xl font-bold text-[#161615]">
              Resetovat veškerý studijní pokrok?
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#8C8A84] hover:text-[#161615] font-bold p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-[#575653] leading-relaxed">
          Tato akce smaže veškerá Vaše hodnocení ve vzdělávacích kartičkách (naučeno / k opakování),
          výsledky v rychlém procvičování a označené chyby v dokumentech z paměti prohlížeče (<code className="font-mono text-xs text-[#161615] bg-[#F5F3EE] px-1 py-0.5">localStorage</code>).
        </p>

        <div className="flex justify-end gap-3 pt-3 border-t border-[#161615]/20">
          <button
            onClick={onClose}
            className="hard-button bg-[#FCFBF9] text-[#161615] px-4 py-2 text-xs font-mono font-bold cursor-pointer"
          >
            Zrušit
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="hard-button bg-[#991B1B] text-[#FFF] hover:bg-[#7F1D1D] px-4 py-2 text-xs font-mono font-bold cursor-pointer"
          >
            Ano, smazat pokrok
          </button>
        </div>
      </div>
    </div>
  );
};
