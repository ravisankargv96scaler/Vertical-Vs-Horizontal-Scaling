export enum Tab {
  CORE_CONCEPT = 'concept',
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
  DECISION = 'decision',
  HYBRID = 'hybrid',
  QUIZ = 'quiz'
}

export interface ServerStats {
  cpu: number;
  ram: number;
  cost: number;
}

export interface ServerNode {
  id: string;
  status: 'active' | 'booting' | 'dead';
  load: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export type ServerSize = 'small' | 'medium' | 'large';

export interface HybridSlot {
  id: number;
  content: ServerSize | null;
}