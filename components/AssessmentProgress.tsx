interface Props {
  answered: number;
  total: number;
}

export function AssessmentProgress({ answered, total }: Props) {
  const pct = Math.round((answered / total) * 100);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
        <span>Progress</span>
        <span>{answered}/{total} ({pct}%)</span>
      </div>
      <div className="h-2 bg-gray-200 rounded">
        <div className="h-2 bg-blue-600 rounded" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}


