'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoadingPage() {
  const router = useRouter();

  useEffect(() => {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const skill = params?.get('skill');
    const t = setTimeout(() => {
      if (skill) router.push(`/roadmap/${encodeURIComponent(skill)}`);
      else router.push('/');
    }, 1300);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
      <p className="text-gray-700">Generating your learning roadmap…</p>
    </div>
  );
}


