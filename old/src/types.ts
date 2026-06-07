export interface NovenaDay {
  day: number;
  theme: string;
  prayer: string;
  reflection: string;
}

export interface Novena {
  id: string;
  title: string;
  latinTitle?: string;
  category: string;
  description: string;
  originHistory: string;
  howToPray: string[];
  days: NovenaDay[];
  prayerIntentionRequired: boolean;
  imageAlt: string;
}

export type ActiveModalType = 'tos' | 'privacy' | 'cookie' | 'contact' | 'about' | null;

export interface PrayerLog {
  novenaId: string;
  completedDays: number[]; // e.g. [1, 2, 3]
  intention: string;
  startDate: string;
  lastPrayedDate: string | null;
  isCompleted: boolean;
}
