import React from 'react';
import { Keyboard } from 'lucide-react';

interface FooterProps {
  onOpenShortcuts: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenShortcuts }) => {
  return (
    <footer className="mt-16 pt-8 pb-12 border-t-2 border-[#161615] text-[#575653]">
      {/* Keyboard Shortcuts Strip Bar */}
      <div className="hard-card-sm bg-[#FCFBF9] p-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#161615] font-bold">
          <Keyboard className="w-4 h-4 text-[#161615]" />
          <span>Klávesové ovládání:</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px]">
          <div className="flex items-center gap-1.5">
            <kbd className="bg-[#161615] text-[#FCFBF9] px-1.5 py-0.5 rounded-none font-bold">Mezerník</kbd>
            <span>Otočit</span>
          </div>

          <div className="flex items-center gap-1.5">
            <kbd className="bg-[#161615] text-[#FCFBF9] px-1.5 py-0.5 rounded-none font-bold">H</kbd>
            <span>Vodítko</span>
          </div>

          <div className="flex items-center gap-1.5">
            <kbd className="bg-[#FEE2E2] text-[#991B1B] border border-[#991B1B] px-1.5 py-0.5 rounded-none font-bold">1</kbd>
            <span>Neumím</span>
          </div>

          <div className="flex items-center gap-1.5">
            <kbd className="bg-[#FFEDD5] text-[#9A3412] border border-[#9A3412] px-1.5 py-0.5 rounded-none font-bold">2</kbd>
            <span>Váhal jsem</span>
          </div>

          <div className="flex items-center gap-1.5">
            <kbd className="bg-[#DCFCE7] text-[#166534] border border-[#166534] px-1.5 py-0.5 rounded-none font-bold">3</kbd>
            <span>Umím</span>
          </div>

          <div className="flex items-center gap-1.5">
            <kbd className="bg-[#161615] text-[#FCFBF9] px-1.5 py-0.5 rounded-none font-bold">←</kbd>
            <kbd className="bg-[#161615] text-[#FCFBF9] px-1.5 py-0.5 rounded-none font-bold">→</kbd>
            <span>Listovat</span>
          </div>
        </div>

        <button
          onClick={onOpenShortcuts}
          className="text-[#161615] hover:underline font-bold cursor-pointer ml-auto"
        >
          Nápověda zkratek ↗
        </button>
      </div>
    </footer>
  );
};
