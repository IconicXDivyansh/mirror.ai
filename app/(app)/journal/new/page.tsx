'use client';

import { useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createEntry } from '@/lib/actions/entries';

const MOOD_OPTIONS = [
  { value: 1, label: 'Terrible', emoji: '😞' },
  { value: 2, label: 'Bad', emoji: '😔' },
  { value: 3, label: 'Rough', emoji: '😐' },
  { value: 4, label: 'Meh', emoji: '😑' },
  { value: 5, label: 'Okay', emoji: '🙂' },
  { value: 6, label: 'Good', emoji: '😊' },
  { value: 7, label: 'Great', emoji: '😄' },
  { value: 8, label: 'Amazing', emoji: '😁' },
  { value: 9, label: 'Fantastic', emoji: '🤩' },
  { value: 10, label: 'Euphoric', emoji: '🥳' },
];

export default function NewEntryPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(formData: FormData) {
    if (selectedMood !== null) {
      formData.set('moodScore', String(selectedMood));
    }

    startTransition(async () => {
      const result = await createEntry(formData);
      if (result.error) {
        setError(result.error);
      } else if (result.data) {
        router.push(`/journal/${result.data.id}`);
      }
    });
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">New Entry</h1>
        <p className="mt-1 text-sm text-muted-foreground">What's on your mind today?</p>
      </div>

      <form ref={formRef} action={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="A short title for today"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label htmlFor="content" className="mb-1 block text-sm font-medium">
            Reflection
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={10}
            placeholder="Write freely. What happened today? What are you feeling? What went well? What didn't?"
            className="w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">How are you feeling?</label>
          <div className="flex flex-wrap gap-2">
            {MOOD_OPTIONS.map((mood) => (
              <button
                key={mood.value}
                type="button"
                onClick={() => setSelectedMood(selectedMood === mood.value ? null : mood.value)}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  selectedMood === mood.value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:bg-muted'
                }`}
              >
                <span>{mood.emoji}</span>
                <span className="hidden sm:inline">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {isPending ? 'Saving...' : 'Save Entry'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-md px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
