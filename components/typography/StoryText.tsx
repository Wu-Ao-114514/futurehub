interface StoryTextProps {
  children: string;
}

export default function StoryText({ children }: StoryTextProps) {
  return (
    <p className="mb-6 text-lg leading-relaxed text-text-primary">
      {children}
    </p>
  );
}
