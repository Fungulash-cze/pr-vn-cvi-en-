export type CardStatus = 'NEW' | 'AGAIN' | 'HARD' | 'GOOD';

export interface UserProgress {
  cardStatus: Record<string, CardStatus>;
  numericDrillScore: { answered: number; correct: number };
  semaphoreDrillScore: { answered: number; correct: number };
  xrayDiscovered: Record<string, string[]>; // docId -> array of sentenceIds identified as flaws
  lastActiveTab: 'flashcards' | 'drill' | 'xray';
}

const STORAGE_KEY = 'zdravotnicke_pravo_app_state_v1';

export const getInitialProgress = (): UserProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load progress from localStorage', e);
  }

  return {
    cardStatus: {},
    numericDrillScore: { answered: 0, correct: 0 },
    semaphoreDrillScore: { answered: 0, correct: 0 },
    xrayDiscovered: {},
    lastActiveTab: 'flashcards',
  };
};

export const saveProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
};

export const resetAllProgress = (): UserProgress => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to reset progress', e);
  }
  return {
    cardStatus: {},
    numericDrillScore: { answered: 0, correct: 0 },
    semaphoreDrillScore: { answered: 0, correct: 0 },
    xrayDiscovered: {},
    lastActiveTab: 'flashcards',
  };
};
