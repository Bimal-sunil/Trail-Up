'use client';

import type { AnswerOption, Question } from '@/lib/types';

interface Props {
  question: Question;
  value?: AnswerOption | null;
  onChange: (value: AnswerOption) => void;
  index: number;
  count: number;
}

export function QuestionCard({ question, value, onChange, index, count }: Props) {
  return (
    <div className="border rounded-md p-4">
      <div className="text-xs text-gray-500 mb-1">Question {index + 1} of {count}</div>
      <div className="mb-3 font-medium">{question.text}</div>
      <div className="flex gap-3">
        {(['yes','somewhat','no'] as AnswerOption[]).map((opt) => (
          <label key={opt} className="inline-flex items-center gap-2 text-sm">
            <input
              type="radio"
              name={question.id}
              checked={value === opt}
              onChange={() => onChange(opt)}
              aria-label={opt}
            />
            <span className="capitalize">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}


