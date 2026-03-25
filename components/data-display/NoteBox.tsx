interface NoteBoxProps {
  title: string;
  content: string;
}

export default function NoteBox({ title, content }: NoteBoxProps) {
  return (
    <div className="my-8 rounded-lg bg-bg-note border-l-4 border-brand-dark-blue p-6">
      <h4 className="mb-2 text-sm font-semibold text-brand-dark-blue">{title}</h4>
      <p className="italic text-text-primary">{content}</p>
    </div>
  );
}
