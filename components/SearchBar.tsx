"use client";

import { useEffect, useMemo, useState } from "react";
import { debounce } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { fetchQuestions } from "@/lib/features/questionare/questioinareSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";

interface Props {
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ onChange, placeholder }: Props) {
  const [value, setValue] = useState<string>("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const debounced = useMemo(() => debounce(onChange, 200), [onChange]);

  useEffect(() => {
    debounced(value);
  }, [value, debounced]);

  return (
    <div className="w-full">
      <input
        className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder ?? "Search a skill..."}
        aria-label="Search skills"
      />
      <button
        onClick={() => {
          dispatch(fetchQuestions(value));
        }}
      >
        Search
      </button>
    </div>
  );
}
