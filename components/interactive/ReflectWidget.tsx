'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';

interface ReflectWidgetProps {
  id: string;
  question: string;
  userName: string;
  placeholder?: string;
  isLastQuestion?: boolean;
  onAllSubmitted?: () => void;
}

export default function ReflectWidget({
  id,
  question,
  userName,
  placeholder = 'Type your response...',
  isLastQuestion = false,
  onAllSubmitted,
}: ReflectWidgetProps) {
  const [inputText, setInputText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // 从 localStorage 获取已保存的回答
  const getSavedResponses = (): Record<string, string> => {
    const saved = localStorage.getItem('reflection_responses');
    return saved ? JSON.parse(saved) : {};
  };

  const handleSubmit = async () => {
    if (!inputText.trim() || !userName.trim()) {
      if (!userName.trim()) {
        setError('Please enter your name at the top of the page.');
      }
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      // 保存当前回答到 localStorage
      const responses = getSavedResponses();
      responses[id] = inputText;
      localStorage.setItem('reflection_responses', JSON.stringify(responses));

      // 如果是最后一个问题，合并所有回答提交到服务器
      if (isLastQuestion) {
        await submitAllResponses(responses);
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('Save error:', err);
      setError('Failed to save. Your response is saved locally.');
    } finally {
      setIsSaving(false);
    }
  };

  const submitAllResponses = async (finalResponses: Record<string, string>) => {
    const allQuestions = [
      { question_id: 'q1', label: 'Part I Reflection' },
      { question_id: 'q2', label: 'Part II Reflection' },
      { question_id: 'q3', label: 'Part III Reflection' },
    ];

    const combinedResponse = allQuestions
      .map((q) => `${q.label}:\n${finalResponses[q.question_id] || 'Not answered'}`)
      .join('\n\n---\n\n');

    const response = await fetch('/api/reflections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question_id: 'complete',
        question: 'Complete Reflection (All 3 Parts)',
        name: userName,
        response: combinedResponse,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save to server');
    }

    // 提交后清除 localStorage
    localStorage.removeItem('reflection_responses');

    // 通知父页面提交完成
    onAllSubmitted?.();
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
            <p className="whitespace-pre-wrap">{inputText}</p>
          </div>
        </div>
        {isLastQuestion ? (
          <p className="mt-3 text-sm text-green-600 font-medium">
            All reflections submitted successfully. Thank you for sharing!
          </p>
        ) : (
          <p className="mt-3 text-sm text-gray-500">Continue reading to reflect more.</p>
        )}
      </div>
    );
  }

  return (
    <div className="my-8 rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-4">
        <p className="text-text-primary">{question}</p>
      </div>

      <div className="space-y-4">
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
          {error && (
            <p className="mt-1 text-xs text-red-500">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
