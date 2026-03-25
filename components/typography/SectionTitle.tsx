interface SectionTitleProps {
  children: string;
}

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="mb-6 text-2xl font-serif font-bold text-text-heading">
      {children}
    </h2>
  );
}
