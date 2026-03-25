'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';

interface ReflectWidgetProps {
  id: string;
  question: string;
  placeholder?: string;
  isHighlighted?: boolean;
  onSave?: (id: string, text: string) => void;
}

export default function ReflectWidget({
  id,
  question,
  placeholder = 'Type your response...',
  isHighlighted = false,
  onSave,
}: ReflectWidgetProps) {
  const [inputText, setInputText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);

  // Parse question text to highlight key phrases (text between **bold** markers)
  const parseQuestion = (text: string) => {
    if (!isHighlighted) return text;
    // Highlight "officially true" and "see for yourself" in part 1
    return text
      .replace(/officially true/g, '<em class="font-semibold">officially true</em>')
      .replace(/see for yourself/g, '<em class="font-semibold">see for yourself</em>');
  };

  const handleSubmit = async () => {
    if (!inputText.trim()) return;

    setIsSaving(true);
    setSaveError(false);

    try {
      // Save to local state
      onSave?.(id, inputText);

      // Send to Supabase via API
      const response = await fetch('/api/reflections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question_id: id,
          response: inputText,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Save error:', error);
      setSaveError(true);
      // Still mark as submitted locally
      setIsSubmitted(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (isSubmitted) {
    return (
      <div className="my-8 rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue font-semibold text-white">
            Q
          </div>
          <div className="flex-1">
            <p className="mb-2 text-sm font-medium text-gray-500">REFLECT WITH QUE</p>
            <div className="rounded-xl bg-bg-bubble p-5 text-text-primary">
              <p className="mb-4" dangerouslySetInnerHTML={{ __html: parseQuestion(question) }} />
              <div className="rounded-lg bg-white p-4 text-text-primary">
                {inputText}
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-400">Thank you for reflecting.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue font-semibold text-white">
          Q
        </div>
        <div className="flex-1">
          <p className="mb-2 text-sm font-medium text-gray-500">REFLECT WITH QUE</p>
          <div className="rounded-xl bg-bg-bubble p-5">
            <p className="text-text-primary" dangerouslySetInnerHTML={{ __html: parseQuestion(question) }} />
          </div>

          <div className="relative mt-4">
            <div
              className={`rounded-lg border bg-white transition-colors ${
                isFocused
                  ? 'border-brand-blue ring-1 ring-brand-blue'
                  : 'border-gray-200'
              }`}
            >
              <TextareaAutosize
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                minRows={3}
                className="w-full resize-none bg-transparent p-4 pr-14 text-text-primary placeholder:text-gray-400 focus:outline-none"
              />

              <button
                onClick={handleSubmit}
                disabled={!inputText.trim() || isSaving}
                className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue text-white transition-opacity hover:bg-brand-dark-blue disabled:opacity-50"
                aria-label="Send response"
              >
                {isSaving ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </div>

            <p className="mt-2 text-xs text-gray-400">
              Press Enter to send, Shift + Enter for new line
            </p>
            {saveError && (
              <p className="mt-1 text-xs text-red-500">
                Note: Your response was saved locally but may not have been recorded on our server.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
