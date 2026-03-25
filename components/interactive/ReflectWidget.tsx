'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';

interface ReflectWidgetProps {
  id: string;
  question: string;
  placeholder?: string;
  isHighlighted?: boolean;
  onSave?: (id: string, text: string, name: string) => void;
}

export default function ReflectWidget({
  id,
  question,
  placeholder = 'Type your response...',
  isHighlighted = false,
  onSave,
}: ReflectWidgetProps) {
  const [inputText, setInputText] = useState('');
  const [userName, setUserName] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);

  const handleSubmit = async () => {
    if (!inputText.trim() || !userName.trim()) return;

    setIsSaving(true);
    setSaveError(false);

    try {
      onSave?.(id, inputText, userName);

      const response = await fetch('/api/reflections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question_id: id,
          response: inputText,
          name: userName,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Save error:', error);
      setSaveError(true);
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
        <div className="rounded-xl bg-bg-bubble p-5 text-text-primary">
          <p className="mb-4">{question}</p>
          <div className="rounded-lg bg-white p-4 text-text-primary">
            <p className="mb-2 text-sm text-gray-500">Name: {userName}</p>
            <p className="whitespace-pre-wrap">{inputText}</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-500">Thank you for sharing your reflection.</p>
      </div>
    );
  }

  return (
    <div className="my-8 rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-4">
        <p className="text-text-primary">{question}</p>
      </div>

      <div className="space-y-4">
        {/* Name Input */}
        <div>
          <label htmlFor={`name-${id}`} className="mb-1 block text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            id={`name-${id}`}
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="How should we address you?"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-text-primary placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Response Textarea */}
        <div>
          <label htmlFor={`response-${id}`} className="mb-1 block text-sm font-medium text-gray-700">
            Your Response
          </label>
          <div
            className={`rounded-lg border bg-white transition-colors ${
              isFocused
                ? 'border-blue-500 ring-1 ring-blue-500'
                : 'border-gray-200'
            }`}
          >
            <TextareaAutosize
              id={`response-${id}`}
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
              disabled={!inputText.trim() || !userName.trim() || isSaving}
              className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue text-white transition-opacity hover:bg-blue-600 disabled:opacity-50"
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
  );
}
