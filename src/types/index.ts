export interface Dosha {
  name: 'Vata' | 'Pitta' | 'Kapha';
  description: string;
  characteristics: string[];
  recommendations: string[];
}

export interface Question {
  id: number;
  question: string;
  answers: {
    text: string;
    dosha: 'vata' | 'pitta' | 'kapha';
    score: number;
  }[];
}

export interface Herb {
  id: number;
  name: string;
  scientificName: string;
  description: string;
  benefits: string[];
  doshaEffects: {
    vata: 'increases' | 'decreases' | 'neutral';
    pitta: 'increases' | 'decreases' | 'neutral';
    kapha: 'increases' | 'decreases' | 'neutral';
  };
  image: string;
  category: string;
}

export interface Remedy {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  preparation: string[];
  doshaTarget: ('vata' | 'pitta' | 'kapha')[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
}

export interface UserProfile {
  name: string;
  age?: number;
  dominantDosha?: 'vata' | 'pitta' | 'kapha';
  doshaScores?: {
    vata: number;
    pitta: number;
    kapha: number;
  };
  completedQuestionnaire: boolean;
}

export interface DoshaResult {
  dominant: 'vata' | 'pitta' | 'kapha';
  percentages: {
    vata: number;
    pitta: number;
    kapha: number;
  };
  description: string;
  characteristics: string[];
  recommendations: string[];
  completedAt: string;
}