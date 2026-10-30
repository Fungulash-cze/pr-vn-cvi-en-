import React from 'react';
import { Keyboard, X } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#161615]/60 backdrop-blur-xs animate-in fade-in">
      <div className="hard-card max-w-lg w-full p-6 bg-[#FCFBF9] space-y-4 shadow-[8px_8px_0px_#161615]">
        <div className="flex items-start justify-between border-b-1.5 border-[#161615] pb-3">
          <div className="flex items-center gap-2 text-[#161615]">
            <Keyboard className="w-5 h-5 shrink-0" />
            <h3 className="font-serif text-xl font-bold text-[#161615]">
              Klávesové ovládání kartiček
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#8C8A84] hover:text-[#161615] font-bold p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="flex items-center justify-between p-2 border-b border-[#161615]/10">
            <span className="font-medium text-[#161615]">Otočit kartičku (Líc / Rub)</span>
            <kbd className="font-mono text-xs font-bold bg-[#161615] text-[#FCFBF9] px-2 py-1 border border-[#161615]">
              Mezerník (Space)
            </kbd>
          </div>

          <div className="flex items-center justify-between p-2 border-b border-[#161615]/10">
            <span className="font-medium text-[#161615]">Zobrazit / skrýt vodítko na líci</span>
            <kbd className="font-mono text-xs font-bold bg-[#161615] text-[#FCFBF9] px-2.5 py-1 border border-[#161615]">
              H
            </kbd>
          </div>

          <div className="flex items-center justify-between p-2 border-b border-[#161615]/10">
            <span className="font-medium text-[#161615]">Hodnocení: Neumím (Znovu)</span>
            <kbd className="font-mono text-xs font-bold bg-[#FEE2E2] text-[#991B1B] px-2.5 py-1 border border-[#991B1B]">
              1
            </kbd>
          </div>

          <div className="flex items-center justify-between p-2 border-b border-[#161615]/10">
            <span className="font-medium text-[#161615]">Hodnocení: Váhal jsem (S dopomocí)</span>
            <kbd className="font-mono text-xs font-bold bg-[#FFEDD5] text-[#9A3412] px-2.5 py-1 border border-[#9A3412]">
              2
            </kbd>
          </div>

          <div className="flex items-center justify-between p-2 border-b border-[#161615]/10">
            <span className="font-medium text-[#161615]">Hodnocení: Umím (Zvládnuto)</span>
            <kbd className="font-mono text-xs font-bold bg-[#DCFCE7] text-[#166534] px-2.5 py-1 border border-[#166534]">
              3
            </kbd>
          </div>

          <div className="flex items-center justify-between p-2 border-b border-[#161615]/10">
            <span className="font-medium text-[#161615]">Přechod na předchozí / další kartičku</span>
            <div className="flex gap-1">
              <kbd className="font-mono text-xs font-bold bg-[#161615] text-[#FCFBF9] px-2 py-1 border border-[#161615]">←</kbd>
              <kbd className="font-mono text-xs font-bold bg-[#161615] text-[#FCFBF9] px-2 py-1 border border-[#161615]">→</kbd>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="hard-button bg-[#161615] text-[#FCFBF9] px-4 py-2 text-xs font-mono font-bold cursor-pointer"
          >
            Rozumím [Esc]
          </button>
        </div>
      </div>
    </div>
  );
};
