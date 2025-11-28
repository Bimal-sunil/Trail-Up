"use client";
import skills from "@/data/skills.json";
import { SearchBar } from "@/components/SearchBar";
import { SkillList } from "@/components/SkillList";
import type { Skill } from "@/lib/types";
import { useEffect, useMemo, useState } from "react";

export default function HomePage() {
  const [q, setQ] = useState("");
  const list = skills as Skill[];

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return list;
    return list.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.keywords.some((k) => k.toLowerCase().includes(term))
    );
  }, [q, list]);

  useEffect(() => {
    const key = process.env.OPEN_AI_API_KEY;
    console.log(key);
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold">TrailUp</h1>
        <p className="text-gray-600">
          Search a skill, answer 10 questions, get a tailored roadmap.
        </p>
      </div>
      <SearchBar onChange={setQ} />
      <SkillList skills={filtered} />
    </div>
  );
}
