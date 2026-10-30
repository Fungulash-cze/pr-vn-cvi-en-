import React from 'react';
import { RotateCcw, Keyboard, CheckCircle2, AlertCircle } from 'lucide-react';
import { CardStatus } from '../utils/storage';

interface HeaderProps {
  activeTab: 'flashcards' | 'drill' | 'xray';
  onTabChange: (tab: 'flashcards' | 'drill' | 'xray') => void;
  cardStatus: Record<string, CardStatus>;
  totalCards: number;
  onOpenResetModal: () => void;
  onOpenShortcutsModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  cardStatus,
  totalCards,
  onOpenResetModal,
  onOpenShortcutsModal,
}) => {
  const masteredCount = Object.values(cardStatus).filter(s => s === 'GOOD').length;
  const reviewCount = Object.values(cardStatus).filter(s => s === 'AGAIN' || s === 'HARD').length;
  const percentMastered = Math.round((masteredCount / totalCards) * 100);

  return (
    <header className="border-b-2 border-[#161615] pb-5 mb-6">
      {/* Top Bar with Score */}
      <div className="flex flex-wrap items-center justify-end gap-3 text-xs font-mono text-[#575653] mb-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-mono text-[#161615] font-semibold">
            Úspěšnost: <span className="font-bold">{percentMastered}%</span>
          </span>
          <span className="text-[#8C8A84]">({masteredCount}/{totalCards})</span>
        </div>
      </div>

      {/* Main Title & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#161615] leading-none">
            Zdravotnické právo
          </h1>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onOpenShortcutsModal}
            className="hard-button bg-[#FCFBF9] hover:bg-[#F0EDE6] text-[#161615] px-3 py-1.5 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
            title="Zobrazit klávesové zkratky"
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Klávesy</span>
          </button>

          <button
            onClick={onOpenResetModal}
            className="hard-button bg-[#FCFBF9] hover:bg-[#FEE2E2] text-[#991B1B] px-3 py-1.5 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
            title="Resetovat průběžný pokrok"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <nav className="flex items-center gap-2 sm:gap-3 mt-6 border-t border-[#161615]/20 pt-4 overflow-x-auto pb-1">
        <button
          onClick={() => onTabChange('flashcards')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-1.5 border-[#161615] cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'flashcards'
              ? 'bg-[#161615] text-[#FCFBF9] shadow-[3px_3px_0px_#575653]'
              : 'bg-[#FCFBF9] text-[#161615] shadow-[2.5px_2.5px_0px_#161615] hover:-translate-x-0.5 hover:-translate-y-0.5'
          }`}
        >
          <span className="font-mono text-xs opacity-70">01</span>
          <span>Vzdělávací kartičky</span>
          <span className={`px-1.5 py-0.5 text-[10px] font-mono rounded-none border ${
            activeTab === 'flashcards'
              ? 'bg-[#333] text-[#FFF] border-[#555]'
              : 'bg-[#F0EDE6] text-[#161615] border-[#161615]'
          }`}>
            {totalCards} kartiček
          </span>
        </button>

        <button
          onClick={() => onTabChange('drill')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-1.5 border-[#161615] cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'drill'
              ? 'bg-[#161615] text-[#FCFBF9] shadow-[3px_3px_0px_#575653]'
              : 'bg-[#FCFBF9] text-[#161615] shadow-[2.5px_2.5px_0px_#161615] hover:-translate-x-0.5 hover:-translate-y-0.5'
          }`}
        >
          <span className="font-mono text-xs opacity-70">02</span>
          <span>Rychlé procvičování</span>
          <span className={`px-1.5 py-0.5 text-[10px] font-mono rounded-none border ${
            activeTab === 'drill'
              ? 'bg-[#333] text-[#FFF] border-[#555]'
              : 'bg-[#F0EDE6] text-[#161615] border-[#161615]'
          }`}>
            Lhůty, Semafor & Test (66)
          </span>
        </button>

        <button
          onClick={() => onTabChange('xray')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-1.5 border-[#161615] cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'xray'
              ? 'bg-[#161615] text-[#FCFBF9] shadow-[3px_3px_0px_#575653]'
              : 'bg-[#FCFBF9] text-[#161615] shadow-[2.5px_2.5px_0px_#161615] hover:-translate-x-0.5 hover:-translate-y-0.5'
          }`}
        >
          <span className="font-mono text-xs opacity-70">03</span>
          <span>Odhalování chyb</span>
          <span className={`px-1.5 py-0.5 text-[10px] font-mono rounded-none border ${
            activeTab === 'xray'
              ? 'bg-[#333] text-[#FFF] border-[#555]'
              : 'bg-[#F0EDE6] text-[#161615] border-[#161615]'
          }`}>
            3 dokumenty
          </span>
        </button>

        {/* Status Pills */}
        <div className="hidden lg:flex items-center gap-3 ml-auto text-xs font-mono">
          <div className="flex items-center gap-1.5 bg-[#DCFCE7] text-[#166534] px-2.5 py-1 border border-[#166534]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Zvládnuto: {masteredCount}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#FEF3C7] text-[#92400E] px-2.5 py-1 border border-[#92400E]">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>K opakování: {reviewCount}</span>
          </div>
        </div>
      </nav>
    </header>
  );
};
