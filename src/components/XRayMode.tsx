import React, { useState } from 'react';
import { FileText, AlertTriangle, CheckCircle2, RotateCcw, HelpCircle, FileCheck, Info } from 'lucide-react';
import { LEGAL_XRAY_DOCUMENTS, XRayDocument, XRaySentence } from '../data/legalData';

interface XRayModeProps {
  documents?: XRayDocument[];
}

export const XRayMode: React.FC<XRayModeProps> = ({ documents }) => {
  const activeDocs = documents || LEGAL_XRAY_DOCUMENTS;
  const [selectedDocIndex, setSelectedDocIndex] = useState<number>(0);
  const [clickedSentences, setClickedSentences] = useState<Record<string, Record<string, boolean>>>({});

  // Reset or clamp index if documents change
  const safeDocIndex = selectedDocIndex < activeDocs.length ? selectedDocIndex : 0;
  const currentDoc: XRayDocument = activeDocs[safeDocIndex] || activeDocs[0];
  const docClicks = clickedSentences[currentDoc?.id] || {};

  // Count discovered errors for current document
  const discoveredErrorsCount = currentDoc.sentences.filter(
    s => s.isError && docClicks[s.id]
  ).length;

  const isCompleted = discoveredErrorsCount === currentDoc.totalErrors;

  const handleSentenceClick = (sentenceId: string) => {
    setClickedSentences(prev => ({
      ...prev,
      [currentDoc.id]: {
        ...(prev[currentDoc.id] || {}),
        [sentenceId]: true,
      },
    }));
  };

  const handleResetDocument = () => {
    setClickedSentences(prev => ({
      ...prev,
      [currentDoc.id]: {},
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Document Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#161615] pb-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {activeDocs.map((doc, idx) => {
            const clicks = clickedSentences[doc.id] || {};
            const found = doc.sentences.filter(s => s.isError && clicks[s.id]).length;
            const docDone = found === doc.totalErrors;

            return (
              <button
                key={doc.id}
                onClick={() => setSelectedDocIndex(idx)}
                className={`px-3.5 py-2 text-xs font-bold border-1.5 border-[#161615] cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap ${
                  selectedDocIndex === idx
                    ? 'bg-[#161615] text-[#FCFBF9] shadow-[2.5px_2.5px_0px_#575653]'
                    : 'bg-[#FCFBF9] text-[#161615] shadow-[2px_2px_0px_#161615] hover:-translate-x-0.5 hover:-translate-y-0.5'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Dokument {idx + 1}: {doc.title}</span>
                <span className={`px-1.5 py-0.2 font-mono text-[10px] border ${
                  docDone
                    ? 'bg-[#DCFCE7] text-[#166534] border-[#166534]'
                    : 'bg-[#F0EDE6] text-[#575653] border-[#161615]/30'
                }`}>
                  {found}/{doc.totalErrors} vad
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleResetDocument}
          className="hard-button bg-[#FCFBF9] hover:bg-[#FEE2E2] text-[#991B1B] px-3 py-1.5 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Resetovat označení</span>
        </button>
      </div>

      {/* Main Archival Clinical Document Display */}
      <div className="hard-card relative p-6 sm:p-8 bg-[#FCFBF9] space-y-6">
        {/* Archival Clinical Header Stamp */}
        <div className="border-b-2 border-[#161615] pb-4 flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] font-bold text-[#575653] uppercase tracking-wider">
              {currentDoc.documentType} // Protokol č. {currentDoc.metaInfo.protocolNo}
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#161615] mt-1">
              {currentDoc.title}
            </h2>
            <div className="text-xs text-[#575653] font-medium mt-1">
              Vystavitel: <span className="font-semibold text-[#161615]">{currentDoc.metaInfo.institution}</span> · Datum: {currentDoc.metaInfo.date}
            </div>
          </div>

          {/* Discovery Status Stamp */}
          <div className="flex flex-col sm:items-end">
            <div className={`border-1.5 border-[#161615] px-4 py-2 font-mono text-xs font-bold flex items-center gap-2 shadow-[2px_2px_0px_#161615] ${
              isCompleted ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-[#FEF3C7] text-[#92400E]'
            }`}>
              {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              <span>
                {isCompleted
                  ? `VŠECHNY ${currentDoc.totalErrors} VADY ODHALENY!`
                  : `Nalezeno vad: ${discoveredErrorsCount} / ${currentDoc.totalErrors}`}
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#575653] mt-1">
              Dokument obsahuje přesně {currentDoc.totalErrors} závažné právní vady.
            </span>
          </div>
        </div>

        {/* Instructions strip */}
        <div className="bg-[#F5F3EE] border-1.5 border-[#161615] p-3 text-xs sm:text-sm text-[#161615] flex items-center gap-2">
          <Info className="w-4 h-4 text-[#161615] shrink-0" />
          <span>
            <strong>Didaktický úkol:</strong> Přečtěte si listinu a klikněte na věty, které podle Vašeho posouzení obsahují právní chybu či odporují zákonu.
          </span>
        </div>

        {/* THE DOCUMENT TEXT (INTERACTIVE SENTENCES) */}
        <div className="bg-[#FFFFFF] border-1.5 border-[#161615] p-5 sm:p-6 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] space-y-3 font-serif text-base sm:text-lg leading-relaxed text-[#161615]">
          {currentDoc.sentences.map((sentence: XRaySentence, idx: number) => {
            const isClicked = docClicks[sentence.id];

            let sentenceClass = 'hover:bg-[#F5F3EE] cursor-pointer';
            if (isClicked) {
              if (sentence.isError) {
                sentenceClass = 'bg-[#FEE2E2] border-l-4 border-[#991B1B] pl-3 pr-2 py-1.5 font-sans text-sm sm:text-base font-semibold text-[#991B1B]';
              } else {
                sentenceClass = 'bg-[#DCFCE7]/60 border-l-4 border-[#166534] pl-3 pr-2 py-1.5 font-sans text-sm sm:text-base text-[#166534]';
              }
            }

            return (
              <div
                key={sentence.id}
                onClick={() => handleSentenceClick(sentence.id)}
                className={`p-2 transition-all border-b border-[#161615]/10 last:border-b-0 ${sentenceClass}`}
              >
                <div className="flex items-start gap-2">
                  <span className="font-mono text-[11px] font-bold text-[#8C8A84] mt-1 shrink-0">
                    §{idx + 1}
                  </span>
                  <div className="flex-1">
                    {sentence.text}
                    {isClicked && (
                      <span className="ml-2 inline-flex items-center gap-1 font-mono text-[10px] font-bold px-1.5 py-0.2 uppercase border">
                        {sentence.isError ? (
                          <span className="text-[#991B1B] bg-[#FFF] border-[#991B1B] px-1">
                            ⚠️ Právní vada #{sentence.errorNumber}
                          </span>
                        ) : (
                          <span className="text-[#166534] bg-[#FFF] border-[#166534] px-1">
                            ✓ V souladu se zákonem
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* DETAILED LEGAL ANALYSIS DRAWER */}
        <div className="pt-4 border-t-1.5 border-[#161615] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-[#161615] flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#161615]" />
              <span>Právní rozbor označených částí:</span>
            </h3>
            <span className="font-mono text-xs text-[#575653]">
              Prozkoumáno {Object.keys(docClicks).length} z {currentDoc.sentences.length} vět
            </span>
          </div>

          {Object.keys(docClicks).length === 0 ? (
            <div className="hard-card-sm p-4 bg-[#F8F7F4] text-xs sm:text-sm text-[#575653] italic text-center">
              Kliknutím na kteroukoli větu v dokumentu výše zkontrolujete, zda je v souladu se zákonem, nebo zda obsahuje právní vadu.
            </div>
          ) : (
            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {currentDoc.sentences
                .filter(s => docClicks[s.id])
                .map(s => {
                  return (
                    <div
                      key={s.id}
                      className={`hard-card-sm p-3.5 text-xs sm:text-sm transition-all ${
                        s.isError ? 'bg-[#FFFBEB] border-[#D97706]' : 'bg-[#F0FDF4] border-[#166534]'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase mb-1">
                        {s.isError ? (
                          <span className="text-[#B45309] flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Závažná právní vada:</span>
                          </span>
                        ) : (
                          <span className="text-[#166534] flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>V souladu se zákonem:</span>
                          </span>
                        )}
                      </div>
                      <p className="font-medium text-[#161615] leading-relaxed">
                        {s.explanation}
                      </p>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
