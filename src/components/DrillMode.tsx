import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Clock,
  Zap,
  BookOpen,
  AlertTriangle,
  FileCheck,
  Award,
  Layers,
  Eye,
  EyeOff,
  SkipForward,
  BookMarked,
} from 'lucide-react';
import {
  NUMERIC_DRILL_ITEMS,
  SEMAPHORE_DRILL_ITEMS,
  SemaphoreAction,
  MODEL_TEST_ITEMS,
  ModelTestItem,
  NumericDrillItem,
  SemaphoreDrillItem,
} from '../data/legalData';

export interface DrillModeProps {
  modelTestItems?: ModelTestItem[];
  numericItems?: NumericDrillItem[];
  semaphoreItems?: SemaphoreDrillItem[];
}

export const DrillMode: React.FC<DrillModeProps> = ({
  modelTestItems,
  numericItems,
  semaphoreItems,
}) => {
  const activeTestItems = modelTestItems || MODEL_TEST_ITEMS;
  const activeNumericItems = numericItems || NUMERIC_DRILL_ITEMS;
  const activeSemaphoreItems = semaphoreItems || SEMAPHORE_DRILL_ITEMS;

  const [subTab, setSubTab] = useState<'numeric' | 'semaphore' | 'test'>('test');

  // Study vs Test Mode toggle (ability to browse questions without mandatory answering)
  const [isStudyMode, setIsStudyMode] = useState<boolean>(false);
  const [showAnswerInStudy, setShowAnswerInStudy] = useState<boolean>(false);

  // ==========================================
  // 1. Numeric Drill State
  // ==========================================
  const [numIndex, setNumIndex] = useState<number>(0);
  const [selectedNumOption, setSelectedNumOption] = useState<string | null>(null);
  const [numScore, setNumScore] = useState<{ correct: number; answered: number }>({ correct: 0, answered: 0 });
  const [numFinished, setNumFinished] = useState<boolean>(false);

  const handleNumericSelect = (option: string) => {
    if (selectedNumOption !== null) return;
    setSelectedNumOption(option);
    const item = activeNumericItems[numIndex];
    if (!item) return;
    const isCorrect = option === item.correctAnswer;
    setNumScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      answered: prev.answered + 1,
    }));
  };

  const handleNextNumeric = () => {
    if (numIndex < activeNumericItems.length - 1) {
      setNumIndex(prev => prev + 1);
      setSelectedNumOption(null);
      setShowAnswerInStudy(false);
    } else {
      setNumFinished(true);
    }
  };

  const handlePrevNumeric = () => {
    if (numIndex > 0) {
      setNumIndex(prev => prev - 1);
      setSelectedNumOption(null);
      setShowAnswerInStudy(false);
    }
  };

  const handleRestartNumeric = () => {
    setNumIndex(0);
    setSelectedNumOption(null);
    setNumScore({ correct: 0, answered: 0 });
    setNumFinished(false);
    setShowAnswerInStudy(false);
  };

  // ==========================================
  // 2. Semaphore Drill State
  // ==========================================
  const [semIndex, setSemIndex] = useState<number>(0);
  const [selectedSemAction, setSelectedSemAction] = useState<SemaphoreAction | null>(null);
  const [semScore, setSemScore] = useState<{ correct: number; answered: number }>({ correct: 0, answered: 0 });
  const [semFinished, setSemFinished] = useState<boolean>(false);

  const handleSemaphoreSelect = (action: SemaphoreAction) => {
    if (selectedSemAction !== null) return;
    setSelectedSemAction(action);
    const item = activeSemaphoreItems[semIndex];
    if (!item) return;
    const isCorrect = action === item.correctAction;
    setSemScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      answered: prev.answered + 1,
    }));
  };

  const handleNextSemaphore = () => {
    if (semIndex < activeSemaphoreItems.length - 1) {
      setSemIndex(prev => prev + 1);
      setSelectedSemAction(null);
      setShowAnswerInStudy(false);
    } else {
      setSemFinished(true);
    }
  };

  const handlePrevSemaphore = () => {
    if (semIndex > 0) {
      setSemIndex(prev => prev - 1);
      setSelectedSemAction(null);
      setShowAnswerInStudy(false);
    }
  };

  const handleRestartSemaphore = () => {
    setSemIndex(0);
    setSelectedSemAction(null);
    setSemScore({ correct: 0, answered: 0 });
    setSemFinished(false);
    setShowAnswerInStudy(false);
  };

  // ==========================================
  // 3. Model Test A–D State
  // ==========================================
  const [testGroupFilter, setTestGroupFilter] = useState<'all' | number>('all');
  const [testIndex, setTestIndex] = useState<number>(0);
  const [selectedTestOption, setSelectedTestOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [testScore, setTestScore] = useState<{ correct: number; answered: number }>({ correct: 0, answered: 0 });
  const [testFinished, setTestFinished] = useState<boolean>(false);

  // Dynamically extract groups from activeTestItems
  const testGroups = useMemo(() => {
    const map = new Map<number, string>();
    activeTestItems.forEach(item => {
      if (!map.has(item.groupId)) {
        map.set(item.groupId, item.groupName);
      }
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [activeTestItems]);

  const filteredTestItems = useMemo(() => {
    if (testGroupFilter === 'all') return activeTestItems;
    return activeTestItems.filter(item => item.groupId === testGroupFilter);
  }, [testGroupFilter, activeTestItems]);

  const handleTestSelect = useCallback((choice: 'A' | 'B' | 'C' | 'D') => {
    if (selectedTestOption !== null) return;
    setSelectedTestOption(choice);
    const item = filteredTestItems[testIndex];
    if (!item) return;
    const isCorrect = choice === item.correctOption;
    setTestScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      answered: prev.answered + 1,
    }));
  }, [selectedTestOption, filteredTestItems, testIndex]);

  const handleNextTest = useCallback(() => {
    if (testIndex < filteredTestItems.length - 1) {
      setTestIndex(prev => prev + 1);
      setSelectedTestOption(null);
      setShowAnswerInStudy(false);
    } else {
      setTestFinished(true);
    }
  }, [testIndex, filteredTestItems.length]);

  const handlePrevTest = useCallback(() => {
    if (testIndex > 0) {
      setTestIndex(prev => prev - 1);
      setSelectedTestOption(null);
      setShowAnswerInStudy(false);
    }
  }, [testIndex]);

  const handleRestartTest = () => {
    setTestIndex(0);
    setSelectedTestOption(null);
    setTestScore({ correct: 0, answered: 0 });
    setTestFinished(false);
    setShowAnswerInStudy(false);
  };

  // Reset test index when filter changes
  useEffect(() => {
    setTestIndex(0);
    setSelectedTestOption(null);
    setTestScore({ correct: 0, answered: 0 });
    setTestFinished(false);
    setShowAnswerInStudy(false);
  }, [testGroupFilter]);

  // Reset state when items change (e.g. module switched)
  useEffect(() => {
    setTestGroupFilter('all');
    setTestIndex(0);
    setSelectedTestOption(null);
    setTestScore({ correct: 0, answered: 0 });
    setTestFinished(false);

    setNumIndex(0);
    setSelectedNumOption(null);
    setNumScore({ correct: 0, answered: 0 });
    setNumFinished(false);

    setSemIndex(0);
    setSelectedSemAction(null);
    setSemScore({ correct: 0, answered: 0 });
    setSemFinished(false);

    setShowAnswerInStudy(false);

    if (activeSemaphoreItems.length === 0 && subTab === 'semaphore') {
      setSubTab('test');
    }
  }, [activeTestItems, activeNumericItems, activeSemaphoreItems, subTab]);

  // Reset answer revelation when switching subtabs
  useEffect(() => {
    setShowAnswerInStudy(false);
  }, [subTab, isStudyMode]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is in an input or modal
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (subTab === 'test') handlePrevTest();
        else if (subTab === 'numeric') handlePrevNumeric();
        else if (subTab === 'semaphore') handlePrevSemaphore();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (subTab === 'test') handleNextTest();
        else if (subTab === 'numeric') handleNextNumeric();
        else if (subTab === 'semaphore') handleNextSemaphore();
      } else if (e.key === ' ') {
        // Space toggles revelation of solution
        e.preventDefault();
        setShowAnswerInStudy(prev => !prev);
      } else if (subTab === 'test' && !testFinished) {
        const keyUpper = e.key.toUpperCase();
        if ((keyUpper === 'A' || keyUpper === 'B' || keyUpper === 'C' || keyUpper === 'D') && selectedTestOption === null) {
          e.preventDefault();
          handleTestSelect(keyUpper as 'A' | 'B' | 'C' | 'D');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [subTab, testFinished, selectedTestOption, handleTestSelect, handleNextTest, handlePrevTest]);

  const currentNumItem = activeNumericItems[numIndex];
  const currentSemItem = activeSemaphoreItems[semIndex];
  const currentTestItem: ModelTestItem | undefined = filteredTestItems[testIndex];

  return (
    <div className="space-y-6">
      {/* Top Header: Sub-tab Navigation and Study/Test Mode Toggle */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b-2 border-[#161615] pb-3">
        {/* Tab Selection */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 lg:pb-0">
          <button
            onClick={() => setSubTab('test')}
            className={`px-3.5 py-2 text-xs sm:text-sm font-bold border-1.5 border-[#161615] cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap ${
              subTab === 'test'
                ? 'bg-[#161615] text-[#FCFBF9] shadow-[2.5px_2.5px_0px_#575653]'
                : 'bg-[#FCFBF9] text-[#161615] shadow-[2px_2px_0px_#161615] hover:-translate-x-0.5 hover:-translate-y-0.5'
            }`}
          >
            <FileCheck className="w-4 h-4 text-[#1D4ED8]" />
            <span>Modelový test A–D</span>
            <span className="font-mono text-xs opacity-75">[{activeTestItems.length}]</span>
          </button>

          <button
            onClick={() => setSubTab('numeric')}
            className={`px-3.5 py-2 text-xs sm:text-sm font-bold border-1.5 border-[#161615] cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap ${
              subTab === 'numeric'
                ? 'bg-[#161615] text-[#FCFBF9] shadow-[2.5px_2.5px_0px_#575653]'
                : 'bg-[#FCFBF9] text-[#161615] shadow-[2px_2px_0px_#161615] hover:-translate-x-0.5 hover:-translate-y-0.5'
            }`}
          >
            <Clock className="w-4 h-4 text-[#C2410C]" />
            <span>Lhůty a věk</span>
            <span className="font-mono text-xs opacity-75">[{activeNumericItems.length}]</span>
          </button>

          {activeSemaphoreItems.length > 0 && (
            <button
              onClick={() => setSubTab('semaphore')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-bold border-1.5 border-[#161615] cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap ${
                subTab === 'semaphore'
                  ? 'bg-[#161615] text-[#FCFBF9] shadow-[2.5px_2.5px_0px_#575653]'
                  : 'bg-[#FCFBF9] text-[#161615] shadow-[2px_2px_0px_#161615] hover:-translate-x-0.5 hover:-translate-y-0.5'
              }`}
            >
              <Zap className="w-4 h-4 text-[#16A34A]" />
              <span>Právní semafor</span>
              <span className="font-mono text-xs opacity-75">[{activeSemaphoreItems.length}]</span>
            </button>
          )}
        </div>

        {/* Study Mode vs Test Mode Toggle */}
        <div className="flex items-center gap-2 self-start lg:self-auto bg-[#E8E6DF] p-1 border-1.5 border-[#161615]">
          <span className="text-xs font-mono text-[#575653] font-bold px-2 hidden sm:inline">
            Režim:
          </span>
          <button
            onClick={() => {
              setIsStudyMode(false);
              setShowAnswerInStudy(false);
            }}
            className={`px-2.5 py-1 text-xs font-mono font-bold cursor-pointer transition-colors flex items-center gap-1.5 ${
              !isStudyMode
                ? 'bg-[#161615] text-[#FCFBF9]'
                : 'text-[#161615] hover:bg-[#DCD8CF]'
            }`}
          >
            <Zap className="w-3 h-3" />
            <span>Ostrý test</span>
          </button>
          <button
            onClick={() => {
              setIsStudyMode(true);
              setShowAnswerInStudy(false);
            }}
            className={`px-2.5 py-1 text-xs font-mono font-bold cursor-pointer transition-colors flex items-center gap-1.5 ${
              isStudyMode
                ? 'bg-[#1D4ED8] text-[#FFFFFF]'
                : 'text-[#161615] hover:bg-[#DCD8CF]'
            }`}
            title="Procházení otázek bez povinnosti odpovídat (jako kartičky)"
          >
            <BookMarked className="w-3 h-3" />
            <span>Volné studium</span>
          </button>
        </div>
      </div>

      {/* Info notice about Study Mode if active */}
      {isStudyMode && (
        <div className="bg-[#EFF6FF] border-1.5 border-[#1D4ED8] p-3 text-xs flex items-center justify-between gap-3 text-[#1E40AF]">
          <div className="flex items-center gap-2">
            <BookMarked className="w-4 h-4 text-[#1D4ED8] shrink-0" />
            <span>
              <strong>Režim volného studia:</strong> Můžete libovolně listovat otázkami [← / →] bez nutnosti klikat na odpověď. Stiskem <strong>[Mezerníku]</strong> nebo tlačítkem níže odhalíte správné řešení a judikaturu.
            </span>
          </div>
        </div>
      )}

      {/* ================================================================
          SUBTAB A: MODEL TEST A-D (50 QUESTIONS)
          ================================================================ */}
      {subTab === 'test' && (
        <div className="space-y-4">
          {/* Group Filter Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 text-xs">
            <span className="font-mono text-[#575653] font-bold text-[11px] mr-1 shrink-0">Skupina:</span>
            <button
              onClick={() => setTestGroupFilter('all')}
              className={`px-2.5 py-1 font-mono font-bold border transition-colors cursor-pointer whitespace-nowrap ${
                testGroupFilter === 'all'
                  ? 'bg-[#161615] text-[#FCFBF9] border-[#161615]'
                  : 'bg-[#FCFBF9] text-[#161615] border-[#161615]/30 hover:border-[#161615]'
              }`}
            >
              Všech {activeTestItems.length} otázek
            </button>
            {testGroups.map(grp => {
              const grpCount = activeTestItems.filter(i => i.groupId === grp.id).length;
              return (
                <button
                  key={grp.id}
                  onClick={() => setTestGroupFilter(grp.id)}
                  className={`px-2.5 py-1 font-mono font-bold border transition-colors cursor-pointer whitespace-nowrap ${
                    testGroupFilter === grp.id
                      ? 'bg-[#161615] text-[#FCFBF9] border-[#161615]'
                      : 'bg-[#FCFBF9] text-[#161615] border-[#161615]/30 hover:border-[#161615]'
                  }`}
                >
                  {grp.id}. {grp.name} ({grpCount})
                </button>
              );
            })}
          </div>

          {!testFinished && currentTestItem ? (
            <div className="hard-card p-6 sm:p-8 space-y-6">
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between border-b-1.5 border-[#161615] pb-3 gap-2">
                <div className="flex items-center gap-2">
                  <span className="bg-[#DBEAFE] text-[#1D4ED8] border border-[#1D4ED8] font-mono text-[11px] font-bold px-2 py-0.5">
                    {currentTestItem.code}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#161615]">
                    Otázka {testIndex + 1} z {filteredTestItems.length}
                  </span>
                  <span className="text-[#8C8A84] hidden sm:inline">·</span>
                  <span className="font-mono text-[11px] text-[#575653] font-semibold hidden md:inline">
                    {currentTestItem.groupName}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {!isStudyMode && (
                    <div className="font-mono text-xs font-bold text-[#575653]">
                      Skóre: <span className="text-[#161615]">{testScore.correct}</span> / {testScore.answered}
                    </div>
                  )}
                  <div className="w-24 bg-[#E7E5DF] h-2 border border-[#161615]">
                    <div
                      className="bg-[#161615] h-full transition-all duration-200"
                      style={{ width: `${((testIndex + 1) / filteredTestItems.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Question Statement */}
              <div>
                <div className="font-mono text-[11px] font-bold text-[#575653] uppercase tracking-wider mb-2">
                  Otázka:
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#161615] leading-snug">
                  {currentTestItem.question}
                </h3>
              </div>

              {/* Multiple Choice Options (A, B, C, D) */}
              <div className="grid grid-cols-1 gap-2.5">
                {currentTestItem.options.map((option) => {
                  const isSelected = selectedTestOption === option.letter;
                  const isCorrect = option.letter === currentTestItem.correctOption;
                  const revealed = isStudyMode && showAnswerInStudy;

                  let cardStyle = 'bg-[#FCFBF9] text-[#161615] border-[#161615]/30 hover:border-[#161615] hover:bg-[#F9F8F5]';

                  if (selectedTestOption !== null) {
                    if (isCorrect) {
                      cardStyle = 'bg-[#DCFCE7] text-[#166534] border-[#166534] shadow-[2px_2px_0px_#166534]';
                    } else if (isSelected) {
                      cardStyle = 'bg-[#FEE2E2] text-[#991B1B] border-[#991B1B] shadow-[2px_2px_0px_#991B1B]';
                    } else {
                      cardStyle = 'bg-[#FCFBF9] text-[#8C8A84] border-[#161615]/15 opacity-60';
                    }
                  } else if (revealed) {
                    if (isCorrect) {
                      cardStyle = 'bg-[#DCFCE7] text-[#166534] border-[#166534] shadow-[2px_2px_0px_#166534] font-semibold';
                    } else {
                      cardStyle = 'bg-[#FCFBF9] text-[#575653] border-[#161615]/20 opacity-70';
                    }
                  }

                  return (
                    <button
                      key={option.letter}
                      onClick={() => handleTestSelect(option.letter)}
                      disabled={selectedTestOption !== null}
                      className={`text-left p-3.5 sm:p-4 border-1.5 transition-all flex items-start gap-3.5 cursor-pointer disabled:cursor-default ${cardStyle}`}
                    >
                      <div className={`font-mono text-xs font-bold w-6 h-6 shrink-0 flex items-center justify-center border ${
                        selectedTestOption !== null && isCorrect
                          ? 'bg-[#166534] text-white border-[#166534]'
                          : selectedTestOption !== null && isSelected
                          ? 'bg-[#991B1B] text-white border-[#991B1B]'
                          : revealed && isCorrect
                          ? 'bg-[#166534] text-white border-[#166534]'
                          : 'bg-[#161615] text-[#FCFBF9] border-[#161615]'
                      }`}>
                        {option.letter}
                      </div>
                      <div className="text-xs sm:text-sm font-medium leading-relaxed flex-1">
                        {option.text}
                      </div>
                      {selectedTestOption !== null && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-[#166534] shrink-0" />
                      )}
                      {selectedTestOption !== null && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-[#991B1B] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legal Explanation & Caution Box (shown after answering OR in study mode if revealed) */}
              {(selectedTestOption !== null || (isStudyMode && showAnswerInStudy)) && (
                <div className="space-y-4 pt-4 border-t-1.5 border-[#161615] animate-in fade-in duration-200">
                  {/* Correct Option Banner */}
                  <div className="bg-[#DCFCE7] border-1.5 border-[#166534] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#166534] text-white font-mono font-bold text-xs px-2.5 py-1">
                        Správná odpověď: {currentTestItem.correctOption}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#166534]">
                        {selectedTestOption === currentTestItem.correctOption ? 'Výborně! Přesná odpověď.' : (selectedTestOption ? 'Chybná volba.' : 'Řešení')}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-[#166534] font-semibold">
                      {currentTestItem.legalBasis}
                    </div>
                  </div>

                  {/* Clarification */}
                  <div className="bg-[#FCFBF9] border-1.5 border-[#161615] p-4 text-xs sm:text-sm text-[#161615] leading-relaxed">
                    <div className="font-mono text-[11px] font-bold text-[#575653] uppercase tracking-wider mb-1">
                      Stručné právní vysvětlení:
                    </div>
                    <p className="font-serif text-base">{currentTestItem.answer}</p>
                  </div>

                  {/* Practical Trap & Case Law Box */}
                  <div className="bg-[#FFFBEB] border-1.5 border-[#B45309] p-4 text-xs sm:text-sm text-[#78350F] leading-relaxed">
                    <div className="flex items-center gap-1.5 font-bold font-mono uppercase text-[11px] mb-1.5 text-[#B45309]">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>Praktický chyták & Judikatura:</span>
                    </div>
                    <p>{currentTestItem.cautionOrCaseLaw}</p>
                  </div>
                </div>
              )}

              {/* Navigation Toolbar */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handlePrevTest}
                  disabled={testIndex === 0}
                  className="hard-button bg-[#FCFBF9] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F0EDE6] text-[#161615] px-4 py-2 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Předchozí [←]</span>
                </button>

                {/* In Study mode: toggle show solution button */}
                {isStudyMode && (
                  <button
                    onClick={() => setShowAnswerInStudy(prev => !prev)}
                    className="hard-button bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] px-3.5 py-2 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    {showAnswerInStudy || selectedTestOption !== null ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5 text-[#8C8A84]" />
                        <span>Skrýt řešení [Mezerník]</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5 text-[#B45309]" />
                        <span>Odhalit řešení [Mezerník]</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  onClick={handleNextTest}
                  className="hard-button bg-[#161615] text-[#FCFBF9] hover:bg-[#2E2E2C] px-5 py-2.5 text-xs sm:text-sm font-mono font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span>
                    {testIndex < filteredTestItems.length - 1
                      ? isStudyMode || selectedTestOption !== null
                        ? 'Další otázka [→]'
                        : 'Přeskočit na další [→]'
                      : 'Vyhodnotit test'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Finished Summary */
            <div className="hard-card p-8 text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-[#DBEAFE] border-2 border-[#161615] flex items-center justify-center">
                <Award className="w-8 h-8 text-[#1D4ED8]" />
              </div>
              <div>
                <span className="font-mono text-xs uppercase font-bold text-[#575653]">Modelový test dokončen</span>
                <h3 className="font-serif text-3xl font-bold mt-1">
                  Úspěšnost: {filteredTestItems.length > 0 ? Math.round((testScore.correct / filteredTestItems.length) * 100) : 0}%
                </h3>
                <p className="text-sm text-[#575653] mt-2">
                  Správně zodpovězeno {testScore.correct} z {filteredTestItems.length} zkušebních otázek.
                </p>
              </div>

              <div className="flex justify-center gap-3 flex-wrap">
                <button
                  onClick={handleRestartTest}
                  className="hard-button bg-[#161615] text-[#FCFBF9] hover:bg-[#2E2E2C] px-5 py-2.5 text-xs sm:text-sm font-mono font-bold flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Spustit test znovu</span>
                </button>
                <button
                  onClick={() => {
                    setTestGroupFilter('all');
                    handleRestartTest();
                  }}
                  className="hard-button bg-[#FCFBF9] text-[#161615] hover:bg-[#F5F3EE] px-5 py-2.5 text-xs sm:text-sm font-mono font-bold flex items-center gap-2 cursor-pointer"
                >
                  <Layers className="w-4 h-4" />
                  <span>Všech {activeTestItems.length} otázek</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================================================================
          SUBTAB B: NUMERIC DRILL (LHŮTY A VĚKOVÉ HRANICE)
          ================================================================ */}
      {subTab === 'numeric' && (
        <div className="space-y-4">
          {!numFinished && currentNumItem ? (
            <div className="hard-card p-6 sm:p-8 space-y-6">
              {/* Header Info */}
              <div className="flex items-center justify-between border-b-1.5 border-[#161615] pb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-[#FFEDD5] text-[#C2410C] border border-[#C2410C] font-mono text-[11px] font-bold px-2 py-0.5">
                    Lhůty a věk
                  </span>
                  <span className="font-mono text-xs font-bold text-[#161615]">
                    Otázka {numIndex + 1} z {activeNumericItems.length}
                  </span>
                </div>
                {!isStudyMode && (
                  <div className="font-mono text-xs font-bold text-[#575653]">
                    Skóre: <span className="text-[#161615]">{numScore.correct}</span> / {numScore.answered}
                  </div>
                )}
              </div>

              {/* Question Statement */}
              <div>
                <div className="font-mono text-[11px] font-bold text-[#575653] uppercase tracking-wider mb-2">
                  Přesná zákonná lhůta / věková hranice:
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#161615] leading-snug">
                  {currentNumItem.question}
                </h3>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentNumItem.options.map((option) => {
                  const isSelected = selectedNumOption === option;
                  const isCorrect = option === currentNumItem.correctAnswer;
                  const revealed = isStudyMode && showAnswerInStudy;

                  let cardStyle = 'bg-[#FCFBF9] text-[#161615] border-[#161615]/30 hover:border-[#161615] hover:bg-[#F9F8F5]';

                  if (selectedNumOption !== null) {
                    if (isCorrect) {
                      cardStyle = 'bg-[#DCFCE7] text-[#166534] border-[#166534] shadow-[2px_2px_0px_#166534]';
                    } else if (isSelected) {
                      cardStyle = 'bg-[#FEE2E2] text-[#991B1B] border-[#991B1B] shadow-[2px_2px_0px_#991B1B]';
                    } else {
                      cardStyle = 'bg-[#FCFBF9] text-[#8C8A84] border-[#161615]/15 opacity-60';
                    }
                  } else if (revealed) {
                    if (isCorrect) {
                      cardStyle = 'bg-[#DCFCE7] text-[#166534] border-[#166534] shadow-[2px_2px_0px_#166534] font-semibold';
                    }
                  }

                  return (
                    <button
                      key={option}
                      onClick={() => handleNumericSelect(option)}
                      disabled={selectedNumOption !== null}
                      className={`text-left p-4 border-1.5 transition-all flex items-center justify-between cursor-pointer disabled:cursor-default font-mono text-sm sm:text-base font-bold ${cardStyle}`}
                    >
                      <span>{option}</span>
                      {selectedNumOption !== null && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-[#166534]" />
                      )}
                      {selectedNumOption !== null && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-[#991B1B]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation (shown after selection OR in study mode if revealed) */}
              {(selectedNumOption !== null || (isStudyMode && showAnswerInStudy)) && (
                <div className="bg-[#F0EDE6] border-1.5 border-[#161615] p-4 text-xs sm:text-sm space-y-2 animate-in fade-in duration-200">
                  <div className="font-mono text-xs font-bold text-[#161615]">
                    Správná odpověď: {currentNumItem.correctAnswer}
                  </div>
                  <p className="text-[#575653]">{currentNumItem.explanation}</p>
                  <div className="font-mono text-[11px] text-[#8C8A84] pt-1 border-t border-[#161615]/10">
                    Opora: {currentNumItem.legalBasis}
                  </div>
                </div>
              )}

              {/* Navigation Toolbar */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handlePrevNumeric}
                  disabled={numIndex === 0}
                  className="hard-button bg-[#FCFBF9] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F0EDE6] text-[#161615] px-4 py-2 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Předchozí [←]</span>
                </button>

                {/* In Study mode: toggle show solution button */}
                {isStudyMode && (
                  <button
                    onClick={() => setShowAnswerInStudy(prev => !prev)}
                    className="hard-button bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] px-3.5 py-2 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    {showAnswerInStudy || selectedNumOption !== null ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5 text-[#8C8A84]" />
                        <span>Skrýt řešení</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5 text-[#B45309]" />
                        <span>Odhalit řešení</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  onClick={handleNextNumeric}
                  className="hard-button bg-[#161615] text-[#FCFBF9] hover:bg-[#2E2E2C] px-5 py-2.5 text-xs sm:text-sm font-mono font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span>{numIndex < activeNumericItems.length - 1 ? 'Další [→]' : 'Vyhodnotit'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Finished Summary */
            <div className="hard-card p-8 text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-[#FEF3C7] border-2 border-[#161615] flex items-center justify-center">
                <Clock className="w-8 h-8 text-[#B45309]" />
              </div>
              <div>
                <span className="font-mono text-xs uppercase font-bold text-[#575653]">Procvičování dokončeno</span>
                <h3 className="font-serif text-3xl font-bold mt-1">
                  Úspěšnost: {activeNumericItems.length > 0 ? Math.round((numScore.correct / activeNumericItems.length) * 100) : 0}%
                </h3>
                <p className="text-sm text-[#575653] mt-2">
                  Správně zodpovězeno {numScore.correct} z {activeNumericItems.length} zákonných lhůt a věkových hranic.
                </p>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={handleRestartNumeric}
                  className="hard-button bg-[#161615] text-[#FCFBF9] hover:bg-[#2E2E2C] px-5 py-2.5 text-xs sm:text-sm font-mono font-bold flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restartovat procvičování</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {subTab === 'semaphore' && activeSemaphoreItems.length > 0 && (
        <div className="space-y-4">
          {!semFinished && currentSemItem ? (
            <div className="hard-card p-6 sm:p-8 space-y-6">
              {/* Header Info */}
              <div className="flex items-center justify-between border-b-1.5 border-[#161615] pb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-[#CCFBF1] text-[#0F766E] border border-[#0F766E] font-mono text-[11px] font-bold px-2 py-0.5">
                    Semafor
                  </span>
                  <span className="font-mono text-xs font-bold text-[#161615]">
                    Situace {semIndex + 1} z {activeSemaphoreItems.length}
                  </span>
                </div>
                {!isStudyMode && (
                  <div className="font-mono text-xs font-bold text-[#575653]">
                    Skóre: <span className="text-[#161615]">{semScore.correct}</span> / {semScore.answered}
                  </div>
                )}
              </div>

              {/* Scenario */}
              <div>
                <div className="font-mono text-[11px] font-bold text-[#575653] uppercase tracking-wider mb-2">
                  Právní situace v praxi:
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#161615] leading-snug">
                  {currentSemItem.situation}
                </h3>
              </div>

              {/* Semaphore Action Options */}
              <div className="space-y-2">
                <div className="font-mono text-[11px] font-bold text-[#575653] uppercase tracking-wider mb-1">
                  Jaký je zákonný postup lékaře / poskytovatele?
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentSemItem.options.map((action) => {
                    const isSelected = selectedSemAction === action;
                    const isCorrect = action === currentSemItem.correctAction;
                    const revealed = isStudyMode && showAnswerInStudy;

                    let cardStyle = 'bg-[#FCFBF9] text-[#161615] border-[#161615]/30 hover:border-[#161615] hover:bg-[#F9F8F5]';

                    if (selectedSemAction !== null) {
                      if (isCorrect) {
                        cardStyle = 'bg-[#DCFCE7] text-[#166534] border-[#166534] shadow-[2px_2px_0px_#166534]';
                      } else if (isSelected) {
                        cardStyle = 'bg-[#FEE2E2] text-[#991B1B] border-[#991B1B] shadow-[2px_2px_0px_#991B1B]';
                      } else {
                        cardStyle = 'bg-[#FCFBF9] text-[#8C8A84] border-[#161615]/15 opacity-60';
                      }
                    } else if (revealed) {
                      if (isCorrect) {
                        cardStyle = 'bg-[#DCFCE7] text-[#166534] border-[#166534] shadow-[2px_2px_0px_#166534] font-semibold';
                      }
                    }

                    return (
                      <button
                        key={action}
                        onClick={() => handleSemaphoreSelect(action)}
                        disabled={selectedSemAction !== null}
                        className={`text-left p-4 border-1.5 transition-all flex items-center justify-between cursor-pointer disabled:cursor-default font-mono text-xs sm:text-sm font-bold ${cardStyle}`}
                      >
                        <span>{action}</span>
                        {selectedSemAction !== null && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-[#166534]" />
                        )}
                        {selectedSemAction !== null && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-[#991B1B]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Explanation (shown after selection OR in study mode if revealed) */}
              {(selectedSemAction !== null || (isStudyMode && showAnswerInStudy)) && (
                <div className="bg-[#F0EDE6] border-1.5 border-[#161615] p-4 text-xs sm:text-sm space-y-2 animate-in fade-in duration-200">
                  <div className="font-mono text-xs font-bold text-[#161615]">
                    Správné řešení: {currentSemItem.correctAction}
                  </div>
                  <p className="text-[#575653]">{currentSemItem.explanation}</p>
                  <div className="font-mono text-[11px] text-[#8C8A84] pt-1 border-t border-[#161615]/10">
                    Opora: {currentSemItem.legalBasis}
                  </div>
                </div>
              )}

              {/* Navigation Toolbar */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handlePrevSemaphore}
                  disabled={semIndex === 0}
                  className="hard-button bg-[#FCFBF9] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F0EDE6] text-[#161615] px-4 py-2 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Předchozí [←]</span>
                </button>

                {/* In Study mode: toggle show solution button */}
                {isStudyMode && (
                  <button
                    onClick={() => setShowAnswerInStudy(prev => !prev)}
                    className="hard-button bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] px-3.5 py-2 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    {showAnswerInStudy || selectedSemAction !== null ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5 text-[#8C8A84]" />
                        <span>Skrýt řešení</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5 text-[#B45309]" />
                        <span>Odhalit řešení</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  onClick={handleNextSemaphore}
                  className="hard-button bg-[#161615] text-[#FCFBF9] hover:bg-[#2E2E2C] px-5 py-2.5 text-xs sm:text-sm font-mono font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span>{semIndex < activeSemaphoreItems.length - 1 ? 'Další [→]' : 'Vyhodnotit'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Finished Summary */
            <div className="hard-card p-8 text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-[#CCFBF1] border-2 border-[#161615] flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-[#0F766E]" />
              </div>
              <div>
                <span className="font-mono text-xs uppercase font-bold text-[#575653]">Semafor dokončen</span>
                <h3 className="font-serif text-3xl font-bold mt-1">
                  Úspěšnost: {activeSemaphoreItems.length > 0 ? Math.round((semScore.correct / activeSemaphoreItems.length) * 100) : 0}%
                </h3>
                <p className="text-sm text-[#575653] mt-2">
                  Správně vyřešeno {semScore.correct} ze {activeSemaphoreItems.length} situací mlčenlivosti a souhlasů.
                </p>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={handleRestartSemaphore}
                  className="hard-button bg-[#161615] text-[#FCFBF9] hover:bg-[#2E2E2C] px-5 py-2.5 text-xs sm:text-sm font-mono font-bold flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restartovat semafor</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
