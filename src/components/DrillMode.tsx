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
} from '../data/legalData';

export const DrillMode: React.FC = () => {
  const [subTab, setSubTab] = useState<'numeric' | 'semaphore' | 'test'>('test');

  // Study vs Test Mode toggle (user requested ability to browse questions without mandatory answering)
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
    const item = NUMERIC_DRILL_ITEMS[numIndex];
    const isCorrect = option === item.correctAnswer;
    setNumScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      answered: prev.answered + 1,
    }));
  };

  const handleNextNumeric = () => {
    if (numIndex < NUMERIC_DRILL_ITEMS.length - 1) {
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
    const item = SEMAPHORE_DRILL_ITEMS[semIndex];
    const isCorrect = action === item.correctAction;
    setSemScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      answered: prev.answered + 1,
    }));
  };

  const handleNextSemaphore = () => {
    if (semIndex < SEMAPHORE_DRILL_ITEMS.length - 1) {
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
  // 3. Model Test A–D State (50 Questions from PDF)
  // ==========================================
  const [testGroupFilter, setTestGroupFilter] = useState<'all' | 1 | 2 | 3 | 4 | 5>('all');
  const [testIndex, setTestIndex] = useState<number>(0);
  const [selectedTestOption, setSelectedTestOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [testScore, setTestScore] = useState<{ correct: number; answered: number }>({ correct: 0, answered: 0 });
  const [testFinished, setTestFinished] = useState<boolean>(false);

  const filteredTestItems = useMemo(() => {
    if (testGroupFilter === 'all') return MODEL_TEST_ITEMS;
    return MODEL_TEST_ITEMS.filter(item => item.groupId === testGroupFilter);
  }, [testGroupFilter]);

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

  // Reset answers when switching subtabs
  useEffect(() => {
    setShowAnswerInStudy(false);
  }, [subTab, isStudyMode]);

  // Global Keyboard shortcut listener for drill/test mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') {
        return;
      }

      // Arrow navigation works across all tabs without requiring an answer!
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

  const currentNumItem = NUMERIC_DRILL_ITEMS[numIndex];
  const currentSemItem = SEMAPHORE_DRILL_ITEMS[semIndex];
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
            <span className="font-mono text-xs opacity-75">[{MODEL_TEST_ITEMS.length}]</span>
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
            <span className="font-mono text-xs opacity-75">[{NUMERIC_DRILL_ITEMS.length}]</span>
          </button>

          <button
            onClick={() => setSubTab('semaphore')}
            className={`px-3.5 py-2 text-xs sm:text-sm font-bold border-1.5 border-[#161615] cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap ${
              subTab === 'semaphore'
                ? 'bg-[#161615] text-[#FCFBF9] shadow-[2.5px_2.5px_0px_#575653]'
                : 'bg-[#FCFBF9] text-[#161615] shadow-[2px_2px_0px_#161615] hover:-translate-x-0.5 hover:-translate-y-0.5'
            }`}
          >
            <Zap className="w-4 h-4 text-[#0F766E]" />
            <span>Semafor</span>
            <span className="font-mono text-xs opacity-75">[{SEMAPHORE_DRILL_ITEMS.length}]</span>
          </button>
        </div>

        {/* Study / Free Browse Mode Switch */}
        <div className="flex items-center gap-2 self-start lg:self-center">
          <button
            onClick={() => {
              setIsStudyMode(prev => !prev);
              setShowAnswerInStudy(false);
            }}
            className={`hard-button px-3 py-1.5 text-xs font-mono font-bold flex items-center gap-2 cursor-pointer transition-all ${
              isStudyMode
                ? 'bg-[#FEF3C7] text-[#92400E] border-[#B45309]'
                : 'bg-[#FCFBF9] text-[#161615]'
            }`}
            title="Přepnout mezi testováním (s bodováním) a volným procházením (jako u kartiček)"
          >
            <BookMarked className="w-3.5 h-3.5 text-[#B45309]" />
            <span>
              Režim: {isStudyMode ? 'Volné procházení (bez zkoušení)' : 'Ostré zkoušení (s volbou)'}
            </span>
          </button>
        </div>
      </div>

      {/* ================================================================
          SUBTAB A: MODELOVÝ TEST A–D (50 OTÁZEK Z PDF DOKUMENTU)
          ================================================================ */}
      {subTab === 'test' && (
        <div className="space-y-4">
          {/* Group Filter Selector */}
          <div className="hard-card-sm p-3 bg-[#FCFBF9] flex items-center gap-2 overflow-x-auto text-xs">
            <span className="font-mono font-bold text-[#575653] whitespace-nowrap mr-1 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Okruh:</span>
            </span>
            <button
              onClick={() => setTestGroupFilter('all')}
              className={`px-2.5 py-1 font-mono font-bold border transition-colors cursor-pointer whitespace-nowrap ${
                testGroupFilter === 'all'
                  ? 'bg-[#161615] text-[#FCFBF9] border-[#161615]'
                  : 'bg-[#FCFBF9] text-[#161615] border-[#161615]/30 hover:border-[#161615]'
              }`}
            >
              Všech 50 otázek [{MODEL_TEST_ITEMS.length}]
            </button>
            <button
              onClick={() => setTestGroupFilter(1)}
              className={`px-2.5 py-1 font-mono font-bold border transition-colors cursor-pointer whitespace-nowrap ${
                testGroupFilter === 1
                  ? 'bg-[#161615] text-[#FCFBF9] border-[#161615]'
                  : 'bg-[#FCFBF9] text-[#161615] border-[#161615]/30 hover:border-[#161615]'
              }`}
            >
              1. Práva pacientů & ZZS (10)
            </button>
            <button
              onClick={() => setTestGroupFilter(2)}
              className={`px-2.5 py-1 font-mono font-bold border transition-colors cursor-pointer whitespace-nowrap ${
                testGroupFilter === 2
                  ? 'bg-[#161615] text-[#FCFBF9] border-[#161615]'
                  : 'bg-[#FCFBF9] text-[#161615] border-[#161615]/30 hover:border-[#161615]'
              }`}
            >
              2. Rodiče, nezletilí & DVP (10)
            </button>
            <button
              onClick={() => setTestGroupFilter(3)}
              className={`px-2.5 py-1 font-mono font-bold border transition-colors cursor-pointer whitespace-nowrap ${
                testGroupFilter === 3
                  ? 'bg-[#161615] text-[#FCFBF9] border-[#161615]'
                  : 'bg-[#FCFBF9] text-[#161615] border-[#161615]/30 hover:border-[#161615]'
              }`}
            >
              3. Omezovací prostředky & Detence (10)
            </button>
            <button
              onClick={() => setTestGroupFilter(4)}
              className={`px-2.5 py-1 font-mono font-bold border transition-colors cursor-pointer whitespace-nowrap ${
                testGroupFilter === 4
                  ? 'bg-[#161615] text-[#FCFBF9] border-[#161615]'
                  : 'bg-[#FCFBF9] text-[#161615] border-[#161615]/30 hover:border-[#161615]'
              }`}
            >
              4. Dokumentace & Mlčenlivost (10)
            </button>
            <button
              onClick={() => setTestGroupFilter(5)}
              className={`px-2.5 py-1 font-mono font-bold border transition-colors cursor-pointer whitespace-nowrap ${
                testGroupFilter === 5
                  ? 'bg-[#161615] text-[#FCFBF9] border-[#161615]'
                  : 'bg-[#FCFBF9] text-[#161615] border-[#161615]/30 hover:border-[#161615]'
              }`}
            >
              5. Trestní & Civilní úprava (10)
            </button>
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

              {/* 4 Options (A, B, C, D) */}
              <div className="space-y-2.5 pt-1">
                <div className="text-[11px] font-mono uppercase font-bold text-[#575653] flex items-center justify-between">
                  <span>
                    {isStudyMode
                      ? 'Možnosti odpovědi (kliknutím nebo tlačítkem níže odhalíte řešení):'
                      : 'Zvolte možnost [A / B / C / D] (nebo přeskočte šipkou [→]):'}
                  </span>
                  {selectedTestOption && (
                    <span className={selectedTestOption === currentTestItem.correctOption ? 'text-[#166534] font-bold' : 'text-[#991B1B] font-bold'}>
                      {selectedTestOption === currentTestItem.correctOption ? '✓ Správně zvoleno' : `✕ Chybná volba (správně je ${currentTestItem.correctOption})`}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {currentTestItem.options.map((opt) => {
                    const isSelected = selectedTestOption === opt.letter;
                    const isCorrect = opt.letter === currentTestItem.correctOption;
                    const isRevealed = selectedTestOption !== null || showAnswerInStudy;

                    let btnStyle = 'bg-[#FFF] border-[#161615]/30 hover:border-[#161615] hover:bg-[#F8F7F4] text-[#161615]';

                    if (isRevealed) {
                      if (isCorrect) {
                        btnStyle = 'bg-[#DCFCE7] border-[#166534] text-[#14532D] font-semibold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-[#FEE2E2] border-[#991B1B] text-[#7F1D1D] font-semibold';
                      } else {
                        btnStyle = 'bg-[#FCFBF9] border-[#161615]/15 text-[#575653] opacity-60';
                      }
                    }

                    return (
                      <button
                        key={opt.letter}
                        onClick={() => {
                          if (isStudyMode) {
                            setShowAnswerInStudy(true);
                          } else {
                            handleTestSelect(opt.letter);
                          }
                        }}
                        className={`text-left p-3.5 border-1.5 transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                      >
                        <span className={`font-mono font-bold text-xs px-2.5 py-0.5 border shrink-0 ${
                          isRevealed && isCorrect
                            ? 'bg-[#166534] text-[#FFF] border-[#166534]'
                            : isRevealed && isSelected
                            ? 'bg-[#991B1B] text-[#FFF] border-[#991B1B]'
                            : 'bg-[#161615] text-[#FCFBF9] border-[#161615]'
                        }`}>
                          {opt.letter}
                        </span>
                        <span className="text-sm flex-1 leading-snug pt-0.5">
                          {opt.text}
                        </span>
                        {isRevealed && isCorrect && <CheckCircle2 className="w-5 h-5 text-[#166534] shrink-0" />}
                        {isRevealed && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-[#991B1B] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reveal toggle in Study / Free browsing mode or when answered */}
              {(selectedTestOption !== null || showAnswerInStudy) ? (
                <div className="space-y-4 pt-4 border-t-1.5 border-[#161615] animate-in fade-in duration-150">
                  <div className="bg-[#DCFCE7] border-1.5 border-[#166534] p-3 text-xs sm:text-sm font-bold text-[#14532D] flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#166534]" />
                      <span>SPRÁVNÁ ODPOVĚĎ: {currentTestItem.correctOption}</span>
                    </span>
                    <span className="text-xs font-mono font-normal">
                      {currentTestItem.options.find(o => o.letter === currentTestItem.correctOption)?.text}
                    </span>
                  </div>

                  {/* Statutory legal basis box */}
                  <div className="bg-[#EFECE6] border-1.5 border-[#161615] p-3.5 font-mono text-xs text-[#161615] leading-relaxed">
                    <div className="font-bold uppercase tracking-wider text-[11px] text-[#575653] mb-1 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-[#161615]" />
                      <span>§ Zákonná opora:</span>
                    </div>
                    <div className="font-semibold text-[#161615]">
                      {currentTestItem.legalBasis}
                    </div>
                  </div>

                  {/* Chyták / Judikatura box */}
                  <div className="bg-[#FFFBEB] border-1.5 border-[#D97706] p-3.5 text-xs sm:text-sm text-[#92400E] leading-relaxed">
                    <div className="font-mono font-bold uppercase tracking-wider text-[11px] text-[#B45309] mb-1 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>Chyták / Judikatura a výklad v praxi:</span>
                    </div>
                    <p className="font-medium text-[#78350F]">
                      {currentTestItem.cautionOrCaseLaw}
                    </p>
                  </div>
                </div>
              ) : null}

              {/* Free Navigation Toolbar: Prev, Reveal Answer, Next/Skip without requiring answer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#161615]/20">
                <button
                  onClick={handlePrevTest}
                  disabled={testIndex === 0}
                  className="hard-button bg-[#FCFBF9] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F0EDE6] text-[#161615] px-4 py-2 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Předchozí [←]</span>
                </button>

                <button
                  onClick={() => setShowAnswerInStudy(prev => !prev)}
                  className="hard-button bg-[#FCFBF9] hover:bg-[#FEF3C7] text-[#161615] px-4 py-2 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
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

                <button
                  onClick={handleNextTest}
                  className="hard-button bg-[#161615] text-[#FCFBF9] hover:bg-[#2E2E2C] px-5 py-2.5 text-xs sm:text-sm font-mono font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span>
                    {testIndex < filteredTestItems.length - 1
                      ? selectedTestOption !== null || showAnswerInStudy
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
                  <span>Všech 50 otázek</span>
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
          {!numFinished ? (
            <div className="hard-card p-6 sm:p-8 space-y-6">
              {/* Header Info */}
              <div className="flex items-center justify-between border-b-1.5 border-[#161615] pb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-[#FFEDD5] text-[#C2410C] border border-[#C2410C] font-mono text-[11px] font-bold px-2 py-0.5">
                    Lhůty a věk
                  </span>
                  <span className="font-mono text-xs font-bold text-[#161615]">
                    Otázka {numIndex + 1} z {NUMERIC_DRILL_ITEMS.length}
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

              {/* 4 Multiple Choice Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentNumItem.options.map((option, i) => {
                  const isSelected = selectedNumOption === option;
                  const isCorrect = option === currentNumItem.correctAnswer;
                  const isRevealed = selectedNumOption !== null || showAnswerInStudy;

                  let btnStyle = 'bg-[#FCFBF9] text-[#161615] border-[#161615] hover:bg-[#F0EDE6]';

                  if (isRevealed) {
                    if (isCorrect) {
                      btnStyle = 'bg-[#DCFCE7] text-[#166534] border-[#166534] font-bold';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-[#FEE2E2] text-[#991B1B] border-[#991B1B] font-bold';
                    } else {
                      btnStyle = 'bg-[#F8F7F4] text-[#8C8A84] border-[#161615]/20 opacity-50';
                    }
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => {
                        if (isStudyMode) {
                          setShowAnswerInStudy(true);
                        } else {
                          handleNumericSelect(option);
                        }
                      }}
                      className={`hard-button p-4 text-left font-mono text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span className="font-bold">{option}</span>
                      {isRevealed && isCorrect && <CheckCircle2 className="w-4 h-4 text-[#166534]" />}
                      {isRevealed && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-[#991B1B]" />}
                    </button>
                  );
                })}
              </div>

              {/* Evaluation and Explanation Box */}
              {(selectedNumOption !== null || showAnswerInStudy) && (
                <div className="space-y-4 pt-4 border-t-1.5 border-[#161615] animate-in fade-in duration-150">
                  <div
                    className={`p-4 border-1.5 ${
                      selectedNumOption === currentNumItem.correctAnswer || showAnswerInStudy
                        ? 'bg-[#DCFCE7] border-[#166534] text-[#166534]'
                        : 'bg-[#FEE2E2] border-[#991B1B] text-[#991B1B]'
                    }`}
                  >
                    <div className="font-mono font-bold text-xs uppercase flex items-center gap-1.5 mb-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Správná hodnota: {currentNumItem.correctAnswer}</span>
                    </div>
                    <p className="text-sm text-[#161615] font-medium mt-1">
                      {currentNumItem.explanation}
                    </p>
                    <div className="font-mono text-xs font-bold text-[#161615] mt-2 pt-2 border-t border-[#161615]/20 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-[#575653]" />
                      <span>{currentNumItem.legalBasis}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Free Navigation Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#161615]/20">
                <button
                  onClick={handlePrevNumeric}
                  disabled={numIndex === 0}
                  className="hard-button bg-[#FCFBF9] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F0EDE6] text-[#161615] px-4 py-2 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Předchozí [←]</span>
                </button>

                <button
                  onClick={() => setShowAnswerInStudy(prev => !prev)}
                  className="hard-button bg-[#FCFBF9] hover:bg-[#FEF3C7] text-[#161615] px-4 py-2 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
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

                <button
                  onClick={handleNextNumeric}
                  className="hard-button bg-[#161615] text-[#FCFBF9] hover:bg-[#2E2E2C] px-5 py-2.5 text-xs sm:text-sm font-mono font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span>{numIndex < NUMERIC_DRILL_ITEMS.length - 1 ? 'Další [→]' : 'Vyhodnotit'}</span>
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
                  Úspěšnost: {Math.round((numScore.correct / NUMERIC_DRILL_ITEMS.length) * 100)}%
                </h3>
                <p className="text-sm text-[#575653] mt-2">
                  Správně zodpovězeno {numScore.correct} z {NUMERIC_DRILL_ITEMS.length} zákonných lhůt a věkových hranic.
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

      {/* ================================================================
          SUBTAB C: SEMAPHORE DRILL (MLČENLIVOST A SOUHLASY)
          ================================================================ */}
      {subTab === 'semaphore' && (
        <div className="space-y-4">
          {!semFinished ? (
            <div className="hard-card p-6 sm:p-8 space-y-6">
              {/* Header Info */}
              <div className="flex items-center justify-between border-b-1.5 border-[#161615] pb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-[#CCFBF1] text-[#0F766E] border border-[#0F766E] font-mono text-[11px] font-bold px-2 py-0.5">
                    Semafor
                  </span>
                  <span className="font-mono text-xs font-bold text-[#161615]">
                    Situace {semIndex + 1} z {SEMAPHORE_DRILL_ITEMS.length}
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentSemItem.options.map((action, i) => {
                    const isSelected = selectedSemAction === action;
                    const isCorrect = action === currentSemItem.correctAction;
                    const isRevealed = selectedSemAction !== null || showAnswerInStudy;

                    let btnStyle = 'bg-[#FCFBF9] text-[#161615] border-[#161615] hover:bg-[#F0EDE6]';

                    if (isRevealed) {
                      if (isCorrect) {
                        btnStyle = 'bg-[#DCFCE7] text-[#166534] border-[#166534] font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-[#FEE2E2] text-[#991B1B] border-[#991B1B] font-bold';
                      } else {
                        btnStyle = 'bg-[#F8F7F4] text-[#8C8A84] border-[#161615]/20 opacity-50';
                      }
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => {
                          if (isStudyMode) {
                            setShowAnswerInStudy(true);
                          } else {
                            handleSemaphoreSelect(action);
                          }
                        }}
                        className={`hard-button p-4 text-center font-mono text-xs sm:text-sm font-bold transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${btnStyle}`}
                      >
                        <span>{action}</span>
                        {isRevealed && isCorrect && <CheckCircle2 className="w-4 h-4 text-[#166534]" />}
                        {isRevealed && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-[#991B1B]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Evaluation and Explanation Box */}
              {(selectedSemAction !== null || showAnswerInStudy) && (
                <div className="space-y-4 pt-4 border-t-1.5 border-[#161615] animate-in fade-in duration-150">
                  <div
                    className={`p-4 border-1.5 ${
                      selectedSemAction === currentSemItem.correctAction || showAnswerInStudy
                        ? 'bg-[#DCFCE7] border-[#166534] text-[#166534]'
                        : 'bg-[#FEE2E2] border-[#991B1B] text-[#991B1B]'
                    }`}
                  >
                    <div className="font-mono font-bold text-xs uppercase flex items-center gap-1.5 mb-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Správná reakce: {currentSemItem.correctAction}</span>
                    </div>
                    <p className="text-sm text-[#161615] font-medium mt-1">
                      {currentSemItem.explanation}
                    </p>
                    <div className="font-mono text-xs font-bold text-[#161615] mt-2 pt-2 border-t border-[#161615]/20 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-[#575653]" />
                      <span>{currentSemItem.legalBasis}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Free Navigation Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#161615]/20">
                <button
                  onClick={handlePrevSemaphore}
                  disabled={semIndex === 0}
                  className="hard-button bg-[#FCFBF9] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F0EDE6] text-[#161615] px-4 py-2 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Předchozí [←]</span>
                </button>

                <button
                  onClick={() => setShowAnswerInStudy(prev => !prev)}
                  className="hard-button bg-[#FCFBF9] hover:bg-[#FEF3C7] text-[#161615] px-4 py-2 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
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

                <button
                  onClick={handleNextSemaphore}
                  className="hard-button bg-[#161615] text-[#FCFBF9] hover:bg-[#2E2E2C] px-5 py-2.5 text-xs sm:text-sm font-mono font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span>{semIndex < SEMAPHORE_DRILL_ITEMS.length - 1 ? 'Další [→]' : 'Vyhodnotit'}</span>
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
                  Úspěšnost: {Math.round((semScore.correct / SEMAPHORE_DRILL_ITEMS.length) * 100)}%
                </h3>
                <p className="text-sm text-[#575653] mt-2">
                  Správně vyřešeno {semScore.correct} ze {SEMAPHORE_DRILL_ITEMS.length} situací mlčenlivosti a souhlasů.
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
