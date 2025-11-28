'use client';

import skills from '@/data/skills.json';
import type { Level, Skill } from '@/lib/types';
import { useMemo } from 'react';
import { RoadmapSection } from '@/components/RoadmapSection';

export default function RoadmapPage({ params }: { params: { skill: string } }) {
  const skillId = decodeURIComponent(params.skill);
  const skill = useMemo(() => (skills as Skill[]).find((s) => s.id === skillId), [skillId]);

  const stored = typeof window !== 'undefined' ? window.sessionStorage.getItem('trailup:assessment') : null;
  const assessment = stored ? JSON.parse(stored) as { skillId: string; score: number; level: Level } : null;
  const level: Level | null = assessment?.skillId === skillId ? assessment.level : null;

  if (!skill) return <div>Skill not found.</div>;

  const roadmap = level ? skill.roadmap[level] : null;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Roadmap: {skill.name}</h2>
        {level && <p className="text-sm text-gray-600">Your level: <span className="font-medium capitalize">{level}</span></p>}
        {!level && <p className="text-sm text-gray-600">General roadmap shown (no assessment data).</p>}
      </div>

      {roadmap ? (
        <>
          <p className="text-gray-700">{roadmap.summary}</p>
          <div className="grid gap-4">
            {roadmap.sections.map((s) => (
              <RoadmapSection key={s.title} section={s} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-sm text-gray-600">Take the assessment to personalize your roadmap.</div>
      )}
    </div>
  );
}


