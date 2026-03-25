import type { EvidenceItem } from '@/data/storyContent';

interface EvidenceBoxProps {
  title: string;
  items: EvidenceItem[];
  sources?: string;
}

export default function EvidenceBox({ title, items, sources }: EvidenceBoxProps) {
  return (
    <div className="my-8 rounded-lg border border-gray-200 bg-white p-6">
      <div className="mb-4 flex items-start justify-between">
        <h3 className="text-lg font-semibold text-text-heading">{title}</h3>
        <span className="rounded-full bg-tag-yellow px-3 py-1 text-xs font-medium text-gray-700">
          Research Findings
        </span>
      </div>

      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={item.id} className="flex gap-4">
            <div className="flex h-6 w-8 shrink-0 items-center justify-center rounded bg-brand-blue font-mono text-xs font-bold text-white">
              F{index + 1}
            </div>
            <span className="flex-1 text-text-primary">{item.content}</span>
          </li>
        ))}
      </ul>
      {sources && (
        <p className="mt-4 text-sm italic text-gray-500">{sources}</p>
      )}
    </div>
  );
}
