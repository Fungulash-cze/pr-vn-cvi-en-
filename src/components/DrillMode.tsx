import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, ShieldCheck, Clock, Zap, BookOpen } from 'lucide-react';
import { NUMERIC_DRILL_ITEMS, SEMAPHORE_DRILL_ITEMS, SemaphoreAction } from '../data/legalData';

export const DrillMode: React.FC = () => {
  const [subTab, setSubTab] = useState<'numeric' | 'semaphore'>('numeric');

  // Numeric Drill State
  const [numIndex, setNumIndex] = useState<number>(0);
  const [selectedNumOption, setSelectedNumOption] = useState<string | null>(null);
  const [numScore, setNumScore] = useState<{ correct: number; answered: number }>({ correct: 0, answered: 0 });
  const [numFinished, setNumFinished] = useState<boolean>(false);

  // Semaphore Drill State
  const [semIndex, setSemIndex] = useState<number>(0);
  const [selectedSemAction, setSelectedSemAction] = useState<SemaphoreAction | null>(null);
  const [semScore, setSemScore] = useState<{ correct: number; answered: number }>({ correct: 0, answered: 0 });
  const [semFinished, setSemFinished] = useState<boolean>(false);

  // Handle Numeric selection
  const handleNumericSelect = (option: string) => {
    if (selectedNumOption !== null) return; // already answered
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
    } else {
      setNumFinished(true);
    }
  };

  const handleRestartNumeric = () => {
    setNumIndex(0);
    setSelectedNumOption(null);
    setNumScore({ correct: 0, answered: 0 });
    setNumFinished(false);
  };

  // Handle Semaphore selection
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
    } else {
      setSemFinished(true);
    }
  };

  const handleRestartSemaphore = () => {
    setSemIndex(0);
    setSelectedSemAction(null);
    setSemScore({ correct: 0, answered: 0 });
    setSemFinished(false);
  };

  const currentNumItem = NUMERIC_DRILL_ITEMS[numIndex];
  const currentSemItem = SEMAPHORE_DRILL_ITEMS[semIndex];

  return (
    <div className="space-y-6">
      {/* Sub-tab Navigation */}
      <div className="flex items-center gap-3 border-b-2 border-[#161615] pb-3">
        <button
          onClick={() => setSubTab('numeric')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold border-1.5 border-[#161615] cursor-pointer transition-all flex items-center gap-2 ${
            subTab === 'numeric'
              ? 'bg-[#161615] text-[#FCFBF9] shadow-[2.5px_2.5px_0px_#575653]'
              : 'bg-[#FCFBF9] text-[#161615] shadow-[2px_2px_0px_#161615] hover:-translate-x-0.5 hover:-translate-y-0.5'
          }`}
        >
          <Clock className="w-4 h-4 text-[#C2410C]" />
          <span>Lhůty a věkové hranice</span>
          <span className="font-mono text-xs opacity-75">[{NUMERIC_DRILL_ITEMS.length}]</span>
        </button>

        <button
          onClick={() => setSubTab('semaphore')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold border-1.5 border-[#161615] cursor-pointer transition-all flex items-center gap-2 ${
            subTab === 'semaphore'
              ? 'bg-[#161615] text-[#FCFBF9] shadow-[2.5px_2.5px_0px_#575653]'
              : 'bg-[#FCFBF9] text-[#161615] shadow-[2px_2px_0px_#161615] hover:-translate-x-0.5 hover:-translate-y-0.5'
          }`}
        >
          <Zap className="w-4 h-4 text-[#0F766E]" />
          <span>Semafor mlčenlivosti a souhlasů</span>
          <span className="font-mono text-xs opacity-75">[{SEMAPHORE_DRILL_ITEMS.length}]</span>
        </button>
      </div>

      {/* SUBTAB A: NUMERIC DRILL */}
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
                <div className="font-mono text-xs font-bold text-[#575653]">
                  Skóre: <span className="text-[#161615]">{numScore.correct}</span> / {numScore.answered}
                </div>
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
                {currentNumItem.options.map((opt, i) => {
                  const isSelected = selectedNumOption === opt;
                  const isCorrect = opt === currentNumItem.correctAnswer;
                  const hasAnswered = selectedNumOption !== null;

                  let btnStyle = 'bg-[#FCFBF9] text-[#161615] hover:bg-[#F5F3EE]';
                  if (hasAnswered) {
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
                      onClick={() => handleNumericSelect(opt)}
                      disabled={hasAnswered}
                      className={`hard-button p-4 text-left font-mono text-sm sm:text-base font-semibold transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {hasAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-[#166534] shrink-0" />}
                      {hasAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-[#991B1B] shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Evaluation and Explanation Box */}
              {selectedNumOption !== null && (
                <div className="space-y-4 pt-4 border-t-1.5 border-[#161615] animate-in fade-in duration-150">
                  <div
                    className={`p-4 border-1.5 ${
                      selectedNumOption === currentNumItem.correctAnswer
                        ? 'bg-[#DCFCE7] border-[#166534] text-[#166534]'
                        : 'bg-[#FEE2E2] border-[#991B1B] text-[#991B1B]'
                    }`}
                  >
                    <div className="font-mono font-bold text-xs uppercase flex items-center gap-1.5 mb-1">
                      {selectedNumOption === currentNumItem.correctAnswer ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Přesně správně!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" />
                          <span>Nesprávná lhůta! Správná hodnota: {currentNumItem.correctAnswer}</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-[#161615] font-medium mt-1">
                      {currentNumItem.explanation}
                    </p>
                    <div className="font-mono text-xs font-bold text-[#161615] mt-2 pt-2 border-t border-[#161615]/20 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-[#575653]" />
                      <span>{currentNumItem.legalBasis}</span>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleNextNumeric}
                      className="hard-button bg-[#161615] text-[#FCFBF9] hover:bg-[#2E2E2C] px-5 py-2.5 text-xs sm:text-sm font-mono font-bold flex items-center gap-2 cursor-pointer"
                    >
                      <span>{numIndex < NUMERIC_DRILL_ITEMS.length - 1 ? 'Další otázka' : 'Zobrazit vyhodnocení'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Finished Summary */
            <div className="hard-card p-8 text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-[#FFEDD5] border-2 border-[#161615] flex items-center justify-center">
                <Clock className="w-8 h-8 text-[#C2410C]" />
              </div>
              <div>
                <span className="font-mono text-xs uppercase font-bold text-[#575653]">Procvičování dokončeno</span>
                <h3 className="font-serif text-3xl font-bold mt-1">
                  Úspěšnost: {Math.round((numScore.correct / NUMERIC_DRILL_ITEMS.length) * 100)}%
                </h3>
                <p className="text-sm text-[#575653] mt-2">
                  Správně zodpovězeno {numScore.correct} z {NUMERIC_DRILL_ITEMS.length} otázek na lhůty a věkové hranice.
                </p>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={handleRestartNumeric}
                  className="hard-button bg-[#161615] text-[#FCFBF9] hover:bg-[#2E2E2C] px-5 py-2.5 text-xs sm:text-sm font-mono font-bold flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Spustit znovu</span>
                </button>
                <button
                  onClick={() => setSubTab('semaphore')}
                  className="hard-button bg-[#FCFBF9] text-[#161615] hover:bg-[#F5F3EE] px-5 py-2.5 text-xs sm:text-sm font-mono font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span>Přejít na Semafor mlčenlivosti</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB B: SEMAPHORE DRILL */}
      {subTab === 'semaphore' && (
        <div className="space-y-4">
          {!semFinished ? (
            <div className="hard-card p-6 sm:p-8 space-y-6">
              {/* Header Info */}
              <div className="flex items-center justify-between border-b-1.5 border-[#161615] pb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-[#CCFBF1] text-[#0F766E] border border-[#0F766E] font-mono text-[11px] font-bold px-2 py-0.5 uppercase">
                    Semafor mlčenlivosti
                  </span>
                  <span className="font-mono text-xs font-bold text-[#161615]">
                    Situace {semIndex + 1} z {SEMAPHORE_DRILL_ITEMS.length}
                  </span>
                </div>
                <div className="font-mono text-xs font-bold text-[#575653]">
                  Skóre: <span className="text-[#161615]">{semScore.correct}</span> / {semScore.answered}
                </div>
              </div>

              {/* Clinical Situation */}
              <div>
                <div className="font-mono text-[11px] font-bold text-[#575653] uppercase tracking-wider mb-2">
                  Klinická / právní situace:
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#161615] leading-snug">
                  {currentSemItem.situation}
                </h3>
              </div>

              {/* 3 Quick Decision Buttons */}
              <div className="space-y-2 pt-2">
                <div className="font-mono text-[11px] font-bold text-[#575653] uppercase tracking-wider">
                  Zvolte zákonný postup lékaře / poskytovatele:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentSemItem.options.map((action, i) => {
                    const isSelected = selectedSemAction === action;
                    const isCorrect = action === currentSemItem.correctAction;
                    const hasAnswered = selectedSemAction !== null;

                    let btnStyle = 'bg-[#FCFBF9] text-[#161615] hover:bg-[#F5F3EE]';
                    if (hasAnswered) {
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
                        onClick={() => handleSemaphoreSelect(action)}
                        disabled={hasAnswered}
                        className={`hard-button p-4 text-center font-mono text-xs sm:text-sm font-bold transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${btnStyle}`}
                      >
                        <span>{action}</span>
                        {hasAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-[#166534]" />}
                        {hasAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-[#991B1B]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Evaluation and Explanation Box */}
              {selectedSemAction !== null && (
                <div className="space-y-4 pt-4 border-t-1.5 border-[#161615] animate-in fade-in duration-150">
                  <div
                    className={`p-4 border-1.5 ${
                      selectedSemAction === currentSemItem.correctAction
                        ? 'bg-[#DCFCE7] border-[#166534] text-[#166534]'
                        : 'bg-[#FEE2E2] border-[#991B1B] text-[#991B1B]'
                    }`}
                  >
                    <div className="font-mono font-bold text-xs uppercase flex items-center gap-1.5 mb-1">
                      {selectedSemAction === currentSemItem.correctAction ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Zákonný postup správně identifikován!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" />
                          <span>Chybný postup! Správná reakce: {currentSemItem.correctAction}</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-[#161615] font-medium mt-1">
                      {currentSemItem.explanation}
                    </p>
                    <div className="font-mono text-xs font-bold text-[#161615] mt-2 pt-2 border-t border-[#161615]/20 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-[#575653]" />
                      <span>{currentSemItem.legalBasis}</span>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleNextSemaphore}
                      className="hard-button bg-[#161615] text-[#FCFBF9] hover:bg-[#2E2E2C] px-5 py-2.5 text-xs sm:text-sm font-mono font-bold flex items-center gap-2 cursor-pointer"
                    >
                      <span>{semIndex < SEMAPHORE_DRILL_ITEMS.length - 1 ? 'Další situace' : 'Zobrazit vyhodnocení'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
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
                <button
                  onClick={() => setSubTab('numeric')}
                  className="hard-button bg-[#FCFBF9] text-[#161615] hover:bg-[#F5F3EE] px-5 py-2.5 text-xs sm:text-sm font-mono font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span>Přejít na Lhůty a věk</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
