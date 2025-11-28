'use client';

import { useEffect, useMemo, useState } from 'react';
import skills from '@/data/skills.json';
import type { AnswerOption, Skill } from '@/lib/types';
import { AssessmentProgress } from '@/components/AssessmentProgress';
import { QuestionCard } from '@/components/QuestionCard';
import { answerToPoints, scoreToLevel } from '@/lib/scoring';
import { useRouter } from 'next/navigation';

export default function AssessPage({ params }: { params: { skill: string } }) {
  const router = useRouter();
  const skillId = decodeURIComponent(params.skill);
  const skill = useMemo(() => (skills as Skill[]).find((s) => s.id === skillId), [skillId]);

  const total = skill?.questions.length ?? 0;
  const storageKey = `trailup:answers:${skillId}`;

  const [answers, setAnswers] = useState<Record<string, AnswerOption | null>>({});

  useEffect(() => {
    if (!skill) return;
    const init: Record<string, AnswerOption | null> = {};
    for (const q of skill.questions) init[q.id] = null;
    const saved = typeof window !== 'undefined' ? window.sessionStorage.getItem(storageKey) : null;
    setAnswers(saved ? { ...init, ...JSON.parse(saved) } : init);
  }, [skill, storageKey]);

  const answeredCount = useMemo(
    () => Object.values(answers).filter((v) => v !== null).length,
    [answers]
  );

  const canSubmit = answeredCount === total && total > 0;

  function updateAnswer(id: string, value: AnswerOption) {
    setAnswers((prev) => {
      const next = { ...prev, [id]: value };
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(storageKey, JSON.stringify(next));
      }
      return next;
    });
  }

  function onSubmit() {
    if (!skill) return;
    const sum = Object.entries(answers).reduce((acc, [qid, val]) => {
      if (val === null) return acc;
      return acc + answerToPoints(val);
    }, 0);
    const level = scoreToLevel(sum);
    const assessment = { skillId, score: sum, level };
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('trailup:assessment', JSON.stringify(assessment));
    }
    router.push(`/loading?skill=${encodeURIComponent(skillId)}`);
  }

  if (!skill) return <div>Skill not found.</div>;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Assess: {skill.name}</h2>
        <p className="text-sm text-gray-600">Answer the 10 questions below.</p>
      </div>

      <AssessmentProgress answered={answeredCount} total={total} />

      <div className="grid gap-4">
        {skill.questions.map((q, idx) => (
          <QuestionCard
            key={q.id}
            question={q}
            value={answers[q.id]}
            onChange={(v) => updateAnswer(q.id, v)}
            index={idx}
            count={total}
          />
        ))}
      </div>

      <div className="flex justify-end">
        <button
          className="rounded-md bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
          onClick={onSubmit}
          disabled={!canSubmit}
        >
          Submit & Continue
        </button>
      </div>
    </div>
  );
}


