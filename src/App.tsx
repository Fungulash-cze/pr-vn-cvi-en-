import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { FlashcardsMode } from './components/FlashcardsMode';
import { DrillMode } from './components/DrillMode';
import { XRayMode } from './components/XRayMode';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { ShortcutsModal } from './components/ShortcutsModal';
import { Footer } from './components/Footer';
import {
  FLASHCARDS,
  CATEGORIES,
  MODEL_TEST_ITEMS,
  NUMERIC_DRILL_ITEMS,
  SEMAPHORE_DRILL_ITEMS,
  LEGAL_XRAY_DOCUMENTS,
} from './data/legalData';
import {
  CIVIL_LAW_FLASHCARDS,
  CIVIL_LAW_CATEGORIES,
  CIVIL_LAW_MODEL_ITEMS,
  CIVIL_LAW_NUMERIC_ITEMS,
  CIVIL_LAW_SEMAPHORE_ITEMS,
  CIVIL_LAW_XRAY_DOCUMENTS,
} from './data/civilLawData';
import {
  getInitialProgress,
  saveProgress,
  resetAllProgress,
  CardStatus,
  UserProgress,
  LegalModuleId,
} from './utils/storage';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(getInitialProgress);
  const [activeModule, setActiveModule] = useState<LegalModuleId>(progress.activeModule || 'zdravotnicke');
  const [activeTab, setActiveTab] = useState<'flashcards' | 'drill' | 'xray'>(progress.lastActiveTab || 'flashcards');
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState<boolean>(false);

  // Sync progress to localStorage on change
  useEffect(() => {
    saveProgress({
      ...progress,
      activeModule,
      lastActiveTab: activeTab,
    });
  }, [progress, activeModule, activeTab]);

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

  // Select dataset based on activeModule
  const isMedical = activeModule === 'zdravotnicke';

  const currentCards = useMemo(() => {
    return isMedical ? FLASHCARDS : CIVIL_LAW_FLASHCARDS;
  }, [isMedical]);

  const currentCategories = useMemo(() => {
    return isMedical ? CATEGORIES : CIVIL_LAW_CATEGORIES;
  }, [isMedical]);

  const currentTestItems = useMemo(() => {
    return isMedical ? MODEL_TEST_ITEMS : CIVIL_LAW_MODEL_ITEMS;
  }, [isMedical]);

  const currentNumericItems = useMemo(() => {
    return isMedical ? NUMERIC_DRILL_ITEMS : CIVIL_LAW_NUMERIC_ITEMS;
  }, [isMedical]);

  const currentSemaphoreItems = useMemo(() => {
    return isMedical ? SEMAPHORE_DRILL_ITEMS : CIVIL_LAW_SEMAPHORE_ITEMS;
  }, [isMedical]);

  const currentXRayDocs = useMemo(() => {
    return isMedical ? LEGAL_XRAY_DOCUMENTS : CIVIL_LAW_XRAY_DOCUMENTS;
  }, [isMedical]);

  // Card status specific to current module
  const currentModuleCardStatus = useMemo(() => {
    const result: Record<string, CardStatus> = {};
    currentCards.forEach(c => {
      if (progress.cardStatus[c.id]) {
        result[c.id] = progress.cardStatus[c.id];
      }
    });
    return result;
  }, [currentCards, progress.cardStatus]);

  const totalDrillTasks = currentTestItems.length + currentNumericItems.length + currentSemaphoreItems.length;

  return (
    <div className="min-h-screen bg-[#F5F3EE] archive-grid">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col min-h-screen justify-between">
        <main>
          {/* Header with Module Switcher */}
          <Header
            activeModule={activeModule}
            onModuleChange={setActiveModule}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            cardStatus={currentModuleCardStatus}
            totalCards={currentCards.length}
            drillCount={totalDrillTasks}
            docsCount={currentXRayDocs.length}
            onOpenResetModal={() => setIsResetModalOpen(true)}
            onOpenShortcutsModal={() => setIsShortcutsModalOpen(true)}
          />

          {/* Active Mode Content */}
          <div className="mt-6">
            {activeTab === 'flashcards' && (
              <FlashcardsMode
                cards={currentCards}
                categories={currentCategories}
                cardStatus={progress.cardStatus}
                onRateCard={handleRateCard}
                onClearCardStatus={handleClearCardStatus}
              />
            )}

            {activeTab === 'drill' && (
              <DrillMode
                modelTestItems={currentTestItems}
                numericItems={currentNumericItems}
                semaphoreItems={currentSemaphoreItems}
              />
            )}

            {activeTab === 'xray' && (
              <XRayMode
                documents={currentXRayDocs}
              />
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
