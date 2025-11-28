import type { AnswerOption, Level } from './types';

export function answerToPoints(answer: AnswerOption): number {
  if (answer === 'yes') return 2;
  if (answer === 'somewhat') return 1;
  return 0;
}

export function scoreToLevel(total: number): Level {
  if (total >= 16) return 'pro';
  if (total >= 8) return 'intermediate';
  return 'beginner';
}


