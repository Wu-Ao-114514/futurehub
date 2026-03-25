'use client';

import { storyContent } from '@/data/storyContent';
import SectionTitle from '@/components/typography/SectionTitle';
import StoryText from '@/components/typography/StoryText';
import ReflectWidget from '@/components/interactive/ReflectWidget';
import EvidenceBox from '@/components/data-display/EvidenceBox';
import NoteBox from '@/components/data-display/NoteBox';
import { useState } from 'react';

export default function Home() {
  const { mainTitle, subtitle, introduction, part1, part2, part3 } = storyContent;
  const [userName, setUserName] = useState('');
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);
  const [isAllSubmitted, setIsAllSubmitted] = useState(false);

  const handleSubmitName = () => {
    if (!userName.trim()) return;
    setIsNameSubmitted(true);
  };

  const handleSubmitAll = () => {
    setIsAllSubmitted(true);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="mb-3 text-4xl font-serif font-bold text-text-heading">
          {mainTitle}
        </h1>
        <p className="text-lg text-text-primary">{subtitle}</p>
      </header>

      {/* Name Input - Only shown once at the beginning */}
      {!isNameSubmitted ? (
        <div className="mx-auto max-w-md rounded-xl border border-gray-200 bg-white p-8">
          <h2 className="mb-4 text-xl font-semibold text-text-heading">Welcome</h2>
          <p className="mb-6 text-text-primary">
            Please tell us how we should address you before you begin.
          </p>
          <div className="space-y-4">
            <div>
              <label htmlFor="user-name" className="mb-1 block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                id="user-name"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-text-primary placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmitName();
                  }
                }}
              />
            </div>
            <button
              onClick={handleSubmitName}
              disabled={!userName.trim()}
              className="w-full rounded-lg bg-brand-blue py-2.5 font-medium text-white transition-opacity hover:bg-blue-600 disabled:opacity-50"
            >
              Begin
            </button>
          </div>
        </div>
      ) : isAllSubmitted ? (
        /* Submission Complete */
        <div className="mx-auto max-w-md rounded-xl border border-green-200 bg-green-50 p-8 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-green-800">Thank You!</h2>
          <p className="text-green-700">
            Your reflections have been saved, {userName}.
          </p>
          <p className="mt-4 text-sm text-green-600">
            We appreciate you sharing your thoughts with us.
          </p>
        </div>
      ) : (
        <>
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
                userName={userName}
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
                userName={userName}
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
                userName={userName}
                isLastQuestion={true}
                onSubmitAll={handleSubmitAll}
              />
            )}
          </section>

          {/* Footer */}
          <footer className="mt-16 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
            <p>A reflective experience on noticing what others dont.</p>
          </footer>
        </>
      )}
    </div>
  );
}
