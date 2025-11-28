import type { RoadmapSection as Section } from '@/lib/types';

interface Props {
  section: Section;
}

export function RoadmapSection({ section }: Props) {
  return (
    <section className="border rounded-md p-4">
      <h3 className="font-semibold mb-2">{section.title}</h3>
      <ul className="list-disc ml-5 mb-3 text-sm">
        {section.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {section.resources && section.resources.length > 0 && (
        <div className="text-sm">
          <div className="font-medium mb-1">Resources</div>
          <ul className="list-disc ml-5">
            {section.resources.map((r) => (
              <li key={r.url}>
                <a href={r.url} className="text-blue-700" target="_blank" rel="noreferrer">
                  {r.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}


