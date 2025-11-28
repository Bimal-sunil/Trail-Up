import Link from 'next/link';
import type { Skill } from '@/lib/types';

interface Props {
  skills: Skill[];
}

export function SkillList({ skills }: Props) {
  if (!skills.length) {
    return <p className="text-sm text-gray-500">No skills found. Try another search.</p>;
  }
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {skills.map((s) => (
        <li key={s.id} className="border rounded-md p-4 hover:shadow-sm transition">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-medium">{s.name}</div>
              <div className="text-xs text-gray-500">{s.keywords.join(', ')}</div>
            </div>
            <Link href={`/assess/${encodeURIComponent(s.id)}`} className="text-blue-600 text-sm">Assess →</Link>
          </div>
        </li>
      ))}
    </ul>
  );
}


