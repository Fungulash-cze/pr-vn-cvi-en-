import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  HelpCircle,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  BookOpen,
  LayoutGrid,
  Check,
} from 'lucide-react';
import { FLASHCARDS, CATEGORIES, Flashcard } from '../data/legalData';
import { CardStatus } from '../utils/storage';

interface FlashcardsModeProps {
  cardStatus: Record<string, CardStatus>;
  onRateCard: (cardId: string, status: CardStatus) => void;
  onClearCardStatus: (cardId: string) => void;
}

export const FlashcardsMode: React.FC<FlashcardsModeProps> = ({
  cardStatus,
  onRateCard,
  onClearCardStatus,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'need_review' | 'mastered' | 'unseen'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [showClue, setShowClue] = useState<boolean>(false);
  const [showGridDrawer, setShowGridDrawer] = useState<boolean>(false);

  // Filter cards
  const filteredCards = useMemo(() => {
    return FLASHCARDS.filter(card => {
      // Category filter
      if (selectedCategory !== 'all' && card.categoryId.toString() !== selectedCategory) {
        return false;
      }

      // Status filter
      const status = cardStatus[card.id];
      if (statusFilter === 'need_review' && status !== 'AGAIN' && status !== 'HARD') {
        return false;
      }
      if (statusFilter === 'mastered' && status !== 'GOOD') {
        return false;
      }
      if (statusFilter === 'unseen' && status !== undefined) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesQuestion = card.question.toLowerCase().includes(query);
        const matchesAnswer = card.answer.toLowerCase().includes(query);
        const matchesBasis = card.legalBasis.toLowerCase().includes(query);
        const matchesCaution = card.cautionOrCaseLaw.toLowerCase().includes(query);
        const matchesCode = card.code.toLowerCase().includes(query);
        return matchesQuestion || matchesAnswer || matchesBasis || matchesCaution || matchesCode;
      }

      return true;
    });
  }, [selectedCategory, statusFilter, searchQuery, cardStatus]);

  // Keep index within bounds
  useEffect(() => {
    if (currentIndex >= filteredCards.length) {
      setCurrentIndex(Math.max(0, filteredCards.length - 1));
    }
    setIsFlipped(false);
    setShowClue(false);
  }, [filteredCards.length, selectedCategory, statusFilter, searchQuery]);

  const currentCard: Flashcard | undefined = filteredCards[currentIndex];

  const handleNext = useCallback(() => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
      setShowClue(false);
    }
  }, [currentIndex, filteredCards.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
      setShowClue(false);
    }
  }, [currentIndex]);

  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  const handleToggleClue = useCallback(() => {
    setShowClue(prev => !prev);
  }, []);

  const handleRate = useCallback((status: CardStatus) => {
    if (!currentCard) return;
    onRateCard(currentCard.id, status);
    // Smooth auto-advance if available
    if (currentIndex < filteredCards.length - 1) {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setIsFlipped(false);
        setShowClue(false);
      }, 150);
    }
  }, [currentCard, currentIndex, filteredCards.length, onRateCard]);

  // Global Keyboard listener for card mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        handleToggleClue();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === '1') {
        e.preventDefault();
        handleRate('AGAIN');
      } else if (e.key === '2') {
        e.preventDefault();
        handleRate('HARD');
      } else if (e.key === '3') {
        e.preventDefault();
        handleRate('GOOD');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, handleToggleClue, handleNext, handlePrev, handleRate]);

  // Law tag styling helper
  const getLawTagStyle = (tag: string) => {
    switch (tag) {
      case 'LZPS':
        return 'bg-[#DBEAFE] text-[#1D4ED8] border-[#1D4ED8]';
      case 'ZZS':
        return 'bg-[#CCFBF1] text-[#0F766E] border-[#0F766E]';
      case 'OZ':
        return 'bg-[#FFEDD5] text-[#C2410C] border-[#C2410C]';
      case 'TZ_ZRS':
        return 'bg-[#FFE4E6] text-[#9F1239] border-[#9F1239]';
      default:
        return 'bg-[#F0EDE6] text-[#161615] border-[#161615]';
    }
  };

  const getStatusBadge = (status?: CardStatus) => {
    switch (status) {
      case 'GOOD':
        return <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#166534] bg-[#DCFCE7] border border-[#166534] px-2 py-0.5"><Check className="w-3 h-3" /> Zvládnuto</span>;
      case 'HARD':
        return <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#9A3412] bg-[#FFEDD5] border border-[#9A3412] px-2 py-0.5">S dopomocí</span>;
      case 'AGAIN':
        return <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#991B1B] bg-[#FEE2E2] border border-[#991B1B] px-2 py-0.5">Znovu</span>;
      default:
        return <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#575653] bg-[#E7E5DF] border border-[#8C8A84] px-2 py-0.5">Neznámé</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter and Search Bar */}
      <div className="hard-card-sm p-4 space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Category Dropdown */}
          <div className="flex items-center gap-2 flex-1">
            <span className="font-mono text-xs font-bold text-[#575653] whitespace-nowrap">Okruh:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#FCFBF9] border-1.5 border-[#161615] px-3 py-1.5 text-xs sm:text-sm font-semibold text-[#161615] focus:outline-none w-full"
            >
              <option value="all">Všech 7 okruhů ({FLASHCARDS.length} kartiček)</option>
              {CATEGORIES.map(cat => {
                const count = FLASHCARDS.filter(c => c.categoryId === cat.id).length;
                const done = FLASHCARDS.filter(c => c.categoryId === cat.id && cardStatus[c.id] === 'GOOD').length;
                return (
                  <option key={cat.id} value={cat.id}>
                    Okruh {cat.id}: {cat.title} ({done}/{count} hotovo)
                  </option>
                );
              })}
            </select>
          </div>

          {/* Search box */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8A84]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Hledat zákon, paragraf, pojem..."
              className="w-full bg-[#FCFBF9] border-1.5 border-[#161615] pl-8 pr-3 py-1.5 text-xs sm:text-sm font-medium text-[#161615] placeholder:text-[#8C8A84] focus:outline-none"
            />
          </div>

          {/* Grid View toggle */}
          <button
            onClick={() => setShowGridDrawer(prev => !prev)}
            className={`hard-button px-3 py-1.5 text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
              showGridDrawer ? 'bg-[#161615] text-[#FCFBF9]' : 'bg-[#FCFBF9] text-[#161615]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Přehled kartiček ({filteredCards.length})</span>
          </button>
        </div>

        {/* Status Quick Filters */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-[#161615]/10 text-xs">
          <span className="font-mono text-[#575653] font-bold text-[11px] mr-1">Filtr stavu:</span>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-2.5 py-1 font-mono text-[11px] font-bold border transition-colors cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-[#161615] text-[#FCFBF9] border-[#161615]'
                : 'bg-[#FCFBF9] text-[#161615] border-[#161615]/30 hover:border-[#161615]'
            }`}
          >
            Všechny ({FLASHCARDS.length})
          </button>
          <button
            onClick={() => setStatusFilter('need_review')}
            className={`px-2.5 py-1 font-mono text-[11px] font-bold border transition-colors cursor-pointer ${
              statusFilter === 'need_review'
                ? 'bg-[#991B1B] text-[#FFF] border-[#991B1B]'
                : 'bg-[#FEF2F2] text-[#991B1B] border-[#991B1B]/40 hover:border-[#991B1B]'
            }`}
          >
            K opakování ({Object.values(cardStatus).filter(s => s === 'AGAIN' || s === 'HARD').length})
          </button>
          <button
            onClick={() => setStatusFilter('mastered')}
            className={`px-2.5 py-1 font-mono text-[11px] font-bold border transition-colors cursor-pointer ${
              statusFilter === 'mastered'
                ? 'bg-[#166534] text-[#FFF] border-[#166534]'
                : 'bg-[#F0FDF4] text-[#166534] border-[#166534]/40 hover:border-[#166534]'
            }`}
          >
            Zvládnuto ({Object.values(cardStatus).filter(s => s === 'GOOD').length})
          </button>
          <button
            onClick={() => setStatusFilter('unseen')}
            className={`px-2.5 py-1 font-mono text-[11px] font-bold border transition-colors cursor-pointer ${
              statusFilter === 'unseen'
                ? 'bg-[#575653] text-[#FFF] border-[#575653]'
                : 'bg-[#F5F3EE] text-[#575653] border-[#575653]/40 hover:border-[#575653]'
            }`}
          >
            Neprojité ({FLASHCARDS.filter(c => !cardStatus[c.id]).length})
          </button>
        </div>
      </div>

      {/* Grid Drawer if opened */}
      {showGridDrawer && (
        <div className="hard-card p-4 bg-[#FCFBF9] space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-[#161615]/20 pb-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#161615]">
              Rychlý skok na kartičku (kliknutím vyberete)
            </span>
            <button
              onClick={() => setShowGridDrawer(false)}
              className="text-xs font-mono font-bold text-[#8C8A84] hover:text-[#161615] cursor-pointer"
            >
              Zavřít [✕]
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-60 overflow-y-auto p-1">
            {filteredCards.map((c, idx) => {
              const st = cardStatus[c.id];
              let dotBg = 'bg-[#D1D5DB]';
              if (st === 'GOOD') dotBg = 'bg-[#16A34A]';
              if (st === 'HARD') dotBg = 'bg-[#F97316]';
              if (st === 'AGAIN') dotBg = 'bg-[#DC2626]';

              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setIsFlipped(false);
                    setShowClue(false);
                    setShowGridDrawer(false);
                  }}
                  className={`border text-left p-2 transition-all cursor-pointer ${
                    currentIndex === idx
                      ? 'border-[#161615] bg-[#161615] text-[#FCFBF9] font-bold'
                      : 'border-[#161615]/20 bg-[#FFF] hover:border-[#161615]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span>{c.code}</span>
                    <span className={`w-2 h-2 rounded-full ${dotBg}`}></span>
                  </div>
                  <div className="text-[11px] truncate mt-0.5 opacity-80">
                    {c.question}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Flashcard Display */}
      {filteredCards.length === 0 ? (
        <div className="hard-card p-12 text-center space-y-4">
          <BookOpen className="w-10 h-10 mx-auto text-[#8C8A84]" />
          <h3 className="font-serif text-2xl font-bold">Žádné kartičky neodpovídají zadanému filtru</h3>
          <p className="text-sm text-[#575653]">
            Zkuste změnit okruh, vymazat vyhledávání nebo přepnout filtr stavu na „Všechny“.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setStatusFilter('all');
              setSearchQuery('');
            }}
            className="hard-button bg-[#161615] text-[#FCFBF9] px-4 py-2 text-xs font-mono font-bold cursor-pointer"
          >
            Obnovit výchozí zobrazení
          </button>
        </div>
      ) : (
        currentCard && (
          <div className="space-y-4">
            {/* Top Bar for Card: Navigation & Progress */}
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#161615]">
                  Záznam {String(currentIndex + 1).padStart(2, '0')} / {String(filteredCards.length).padStart(2, '0')}
                </span>
                <span className="text-[#8C8A84]">·</span>
                {getStatusBadge(cardStatus[currentCard.id])}
              </div>

              {/* Progress Bar */}
              <div className="w-32 sm:w-48 bg-[#E7E5DF] h-2 border border-[#161615]">
                <div
                  className="bg-[#161615] h-full transition-all duration-200"
                  style={{ width: `${((currentIndex + 1) / filteredCards.length) * 100}%` }}
                />
              </div>
            </div>

            {/* THE ARCHIVAL CARD CONTAINER */}
            <div
              className={`hard-card relative transition-all duration-200 p-6 sm:p-8 min-h-[360px] flex flex-col justify-between ${
                isFlipped ? 'bg-[#FCFBF9]' : 'bg-[#FCFBF9]'
              }`}
            >
              {/* Card Header Stamp */}
              <div>
                <div className="flex items-center justify-between border-b-1.5 border-[#161615] pb-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className={`px-2 py-0.5 text-[11px] font-mono font-bold uppercase border ${getLawTagStyle(currentCard.lawTag)}`}>
                      {currentCard.lawTagName}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#161615]">
                      {currentCard.code}
                    </span>
                  </div>

                  <span className="font-mono text-[11px] text-[#575653] font-semibold hidden sm:inline">
                    {isFlipped ? 'Rub kartičky // Odpověď a právní opora' : 'Líc kartičky // Otázka'}
                  </span>
                </div>

                <div className="text-xs font-mono font-semibold text-[#575653] uppercase tracking-wide mb-3">
                  Okruh {currentCard.categoryId}: {currentCard.categoryName}
                </div>

                {/* CARD FRONT CONTENT */}
                {!isFlipped ? (
                  <div className="space-y-6">
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#161615] leading-snug">
                      {currentCard.question}
                    </h2>

                    {/* Clue box if opened */}
                    {showClue && (
                      <div className="bg-[#FEF3C7] border-1.5 border-dashed border-[#B45309] p-4 text-xs sm:text-sm text-[#78350F] animate-in fade-in duration-150">
                        <div className="flex items-center gap-1.5 font-bold font-mono uppercase text-[11px] mb-1">
                          <HelpCircle className="w-3.5 h-3.5 text-[#B45309]" />
                          <span>Právní vodítko:</span>
                        </div>
                        <p className="font-medium">{currentCard.clue}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  /* CARD BACK CONTENT */
                  <div className="space-y-4 animate-in fade-in duration-150">
                    {/* Primary Direct Answer */}
                    <div className="bg-[#F8F7F4] border-l-4 border-[#161615] pl-4 pr-3 py-3 border-y border-r border-[#161615]/20">
                      <div className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#575653] mb-1">
                        Přímá odpověď:
                      </div>
                      <p className="text-sm sm:text-base text-[#161615] font-semibold leading-relaxed whitespace-pre-line">
                        {currentCard.answer}
                      </p>
                    </div>

                    {/* Legal Basis Monospaced Box */}
                    <div className="bg-[#EFECE6] border-1.5 border-[#161615] p-3.5 font-mono text-xs text-[#161615] leading-relaxed">
                      <div className="font-bold uppercase tracking-wider text-[11px] text-[#575653] mb-1 flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-[#161615]" />
                        <span>§ Zákonná opora:</span>
                      </div>
                      <div className="font-semibold text-[#161615]">
                        {currentCard.legalBasis}
                      </div>
                    </div>

                    {/* Warning / Caution / Case Law Box */}
                    <div className="bg-[#FFFBEB] border-1.5 border-[#D97706] p-3.5 text-xs sm:text-sm text-[#92400E] leading-relaxed">
                      <div className="font-mono font-bold uppercase tracking-wider text-[11px] text-[#B45309] mb-1 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />
                        <span>Praktický chyták / Judikatura:</span>
                      </div>
                      <p className="font-medium text-[#78350F]">
                        {currentCard.cautionOrCaseLaw}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* CARD FOOTER ACTIONS */}
              <div className="pt-6 mt-6 border-t-1.5 border-[#161615]">
                {!isFlipped ? (
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={handleToggleClue}
                      className="hard-button bg-[#FCFBF9] hover:bg-[#FEF3C7] text-[#161615] px-3.5 py-2 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-[#B45309]" />
                      <span>{showClue ? 'Skrýt vodítko [H]' : 'Zobrazit vodítko [H]'}</span>
                    </button>

                    <button
                      onClick={handleFlip}
                      className="hard-button bg-[#161615] text-[#FCFBF9] hover:bg-[#2A2A28] px-5 py-2.5 text-xs sm:text-sm font-mono font-bold flex items-center gap-2 cursor-pointer ml-auto"
                    >
                      <RotateCw className="w-4 h-4" />
                      <span>Otočit kartu [Mezerník]</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="font-mono text-[11px] font-bold text-[#575653] uppercase tracking-wider text-center">
                      Sebehodnocení – jak dobře znáte odpověď?
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                      <button
                        onClick={() => handleRate('AGAIN')}
                        className="hard-button bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#991B1B] p-3 text-xs sm:text-sm font-bold flex flex-col items-center justify-center gap-1 cursor-pointer"
                      >
                        <span className="font-mono text-xs font-bold">[1] Znovu</span>
                        <span className="text-[11px] font-normal opacity-90">Neuměl jsem</span>
                      </button>

                      <button
                        onClick={() => handleRate('HARD')}
                        className="hard-button bg-[#FFEDD5] hover:bg-[#FDBA74] text-[#9A3412] p-3 text-xs sm:text-sm font-bold flex flex-col items-center justify-center gap-1 cursor-pointer"
                      >
                        <span className="font-mono text-xs font-bold">[2] S dopomocí</span>
                        <span className="text-[11px] font-normal opacity-90">Váhal jsem / nepřesné</span>
                      </button>

                      <button
                        onClick={() => handleRate('GOOD')}
                        className="hard-button bg-[#DCFCE7] hover:bg-[#86EFAC] text-[#166534] p-3 text-xs sm:text-sm font-bold flex flex-col items-center justify-center gap-1 cursor-pointer"
                      >
                        <span className="font-mono text-xs font-bold">[3] Zvládnuto</span>
                        <span className="text-[11px] font-normal opacity-90">Přesná znalost</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Card Navigation Toolbar */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="hard-button bg-[#FCFBF9] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F0EDE6] text-[#161615] px-4 py-2 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Předchozí [←]</span>
              </button>

              <button
                onClick={handleFlip}
                className="text-xs font-mono text-[#575653] hover:text-[#161615] font-bold cursor-pointer underline underline-offset-4"
              >
                {isFlipped ? 'Zpět na otázku' : 'Zkontrolovat odpověď'}
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === filteredCards.length - 1}
                className="hard-button bg-[#FCFBF9] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F0EDE6] text-[#161615] px-4 py-2 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <span>Další [→]</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};
