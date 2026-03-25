'use client';

import { storyContent } from '@/data/storyContent';
import SectionTitle from '@/components/typography/SectionTitle';
import StoryText from '@/components/typography/StoryText';
import ReflectWidget from '@/components/interactive/ReflectWidget';
import EvidenceBox from '@/components/data-display/EvidenceBox';
import NoteBox from '@/components/data-display/NoteBox';

export default function Home() {
  const { mainTitle, subtitle, introduction, part1, part2, part3 } = storyContent;

  return (
    <div className="space-y-12">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="mb-3 text-4xl font-serif font-bold text-text-heading">
          {mainTitle}
        </h1>
        <p className="text-lg text-text-primary">{subtitle}</p>
      </header>

      {/* Introduction */}
      <div className="rounded-lg bg-gray-50 p-6 text-center">
        <p className="text-base italic text-text-primary">{introduction}</p>
      </div>

      {/* Part I */}
      <section>
        <SectionTitle>{part1.title}</SectionTitle>
        <div>
          {part1.paragraphs.map((paragraph, index) => (
            <StoryText key={index}>{paragraph}</StoryText>
          ))}
        </div>
        {part1.italicText && (
          <p className="mb-6 text-lg italic text-text-primary">{part1.italicText}</p>
        )}
        {part1.reflectPrompt && (
          <ReflectWidget
            id={part1.reflectPrompt.id}
            question={part1.reflectPrompt.text}
            isHighlighted={part1.reflectPrompt.isHighlighted}
          />
        )}
      </section>

      {/* Part II */}
      <section>
        <SectionTitle>{part2.title}</SectionTitle>
        <div>
          {part2.paragraphs.map((paragraph, index) => (
            <StoryText key={index}>{paragraph}</StoryText>
          ))}
        </div>
        {part2.evidence && (
          <EvidenceBox
            title={part2.evidence.title}
            items={part2.evidence.items}
            sources={part2.evidence.sources}
          />
        )}
        {part2.reflectPrompt && (
          <ReflectWidget
            id={part2.reflectPrompt.id}
            question={part2.reflectPrompt.text}
          />
        )}
      </section>

      {/* Part III */}
      <section>
        <SectionTitle>{part3.title}</SectionTitle>
        <div>
          {part3.paragraphs.map((paragraph, index) => (
            <StoryText key={index}>{paragraph}</StoryText>
          ))}
        </div>
        {part3.quote && (
          <blockquote className="my-8 border-l-4 border-brand-dark-blue pl-6 italic">
            <p className="text-lg text-text-primary">&quot;{part3.quote.text}&quot;</p>
            <footer className="mt-2 text-sm text-gray-500">— {part3.quote.author}</footer>
          </blockquote>
        )}
        {part3.note && (
          <NoteBox title={part3.note.title} content={part3.note.content} />
        )}
        {part3.reflectPrompt && (
          <ReflectWidget
            id={part3.reflectPrompt.id}
            question={part3.reflectPrompt.text}
          />
        )}
      </section>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
        <p>A reflective experience on noticing what others dont.</p>
      </footer>
    </div>
  );
}
