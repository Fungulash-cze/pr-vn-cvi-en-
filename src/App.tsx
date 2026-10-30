import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FlashcardsMode } from './components/FlashcardsMode';
import { DrillMode } from './components/DrillMode';
import { XRayMode } from './components/XRayMode';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { ShortcutsModal } from './components/ShortcutsModal';
import { Footer } from './components/Footer';
import { FLASHCARDS } from './data/legalData';
import { getInitialProgress, saveProgress, resetAllProgress, CardStatus, UserProgress } from './utils/storage';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(getInitialProgress);
  const [activeTab, setActiveTab] = useState<'flashcards' | 'drill' | 'xray'>(progress.lastActiveTab || 'flashcards');
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState<boolean>(false);

  // Sync progress to localStorage on change
  useEffect(() => {
    saveProgress({
      ...progress,
      lastActiveTab: activeTab,
    });
  }, [progress, activeTab]);

  const handleRateCard = (cardId: string, status: CardStatus) => {
    setProgress(prev => ({
      ...prev,
      cardStatus: {
        ...prev.cardStatus,
        [cardId]: status,
      },
    }));
  };

  const handleClearCardStatus = (cardId: string) => {
    setProgress(prev => {
      const updated = { ...prev.cardStatus };
      delete updated[cardId];
      return {
        ...prev,
        cardStatus: updated,
      };
    });
  };

  const handleResetAll = () => {
    const cleared = resetAllProgress();
    setProgress(cleared);
  };

  return (
    <div className="min-h-screen bg-[#F5F3EE] archive-grid">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col min-h-screen justify-between">
        <main>
          {/* Header */}
          <Header
            activeTab={activeTab}
            onTabChange={setActiveTab}
            cardStatus={progress.cardStatus}
            totalCards={FLASHCARDS.length}
            onOpenResetModal={() => setIsResetModalOpen(true)}
            onOpenShortcutsModal={() => setIsShortcutsModalOpen(true)}
          />

          {/* Active Mode Content */}
          <div className="mt-6">
            {activeTab === 'flashcards' && (
              <FlashcardsMode
                cardStatus={progress.cardStatus}
                onRateCard={handleRateCard}
                onClearCardStatus={handleClearCardStatus}
              />
            )}

            {activeTab === 'drill' && (
              <DrillMode />
            )}

            {activeTab === 'xray' && (
              <XRayMode />
            )}
          </div>
        </main>

        {/* Footer with permanent keyboard hints and legal metadata stamps */}
        <Footer onOpenShortcuts={() => setIsShortcutsModalOpen(true)} />
      </div>

      {/* Confirmation & Info Modals */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleResetAll}
      />

      <ShortcutsModal
        isOpen={isShortcutsModalOpen}
        onClose={() => setIsShortcutsModalOpen(false)}
      />
    </div>
  );
}
