'use client';

import { useEffect, useState } from 'react';

interface Reflection {
  id: number;
  question_id: string;
  question: string;
  name: string;
  response: string;
  created_at: string;
}

export default function AdminPage() {
  const [data, setData] = useState<Reflection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/reflections')
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const exportCSV = () => {
    const headers = ['ID', 'Question ID', 'Name', 'Response', 'Created At'];
    const rows = data.map((r) => [
      r.id,
      r.question_id,
      r.name,
      r.response.replace(/\n/g, ' '),
      r.created_at,
    ]);

    const csvContent =
      'text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `reflections_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Error: {error}</p>
          <p className="mt-2 text-sm text-gray-500">Make sure the database file exists.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reflection Responses</h1>
            <p className="mt-1 text-sm text-gray-500">
              {data.length} {data.length === 1 ? 'response' : 'responses'} collected
            </p>
          </div>
          <button
            onClick={exportCSV}
            disabled={data.length === 0}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Export CSV
          </button>
        </header>

        {data.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-12 text-center">
            <p className="text-gray-500">No responses collected yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {data.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-gray-200 bg-white p-6"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Question {item.question_id.toUpperCase()}
                    </p>
                    <p className="mt-1 text-lg text-gray-900">{item.question}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(item.created_at).toLocaleString()}
                  </span>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm font-medium text-gray-500">
                    Respondent: {item.name}
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-gray-800">{item.response}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
