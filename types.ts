
export enum ParaphraseTone {
  STANDARD = 'Standard',
  FORMAL = 'Formal',
  CASUAL = 'Casual',
  CREATIVE = 'Creative',
  CONCISE = 'Concise',
  ACADEMIC = 'Academic'
}

export interface ParaphraseHistoryItem {
  id: string;
  original: string;
  paraphrased: string;
  tone: ParaphraseTone;
  timestamp: number;
}
