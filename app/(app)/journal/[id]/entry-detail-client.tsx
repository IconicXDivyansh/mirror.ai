'use client';

import { useTransition, useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateEntry, deleteEntry } from '@/lib/actions/entries';
import type { entries } from '@/lib/db/schema';

type Entry = typeof entries.$inferSelect;

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

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function EntryDetailClient({ entry }: { entry: Entry }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<number | null>(entry.moodScore);

  function handleUpdate(formData: FormData) {
    if (selectedMood !== null) {
      formData.set('moodScore', String(selectedMood));
    }

    startTransition(async () => {
      const result = await updateEntry(entry.id, formData);
      if (result.error) {
        setError(result.error);
      } else {
        setEditing(false);
        setError(null);
        router.refresh();
      }
    });
  }

  function handleDelete() {
    if (!confirm('Delete this entry? This cannot be undone.')) return;

    startTransition(async () => {
      const result = await deleteEntry(entry.id);
      if (result.error) {
        setError(result.error);
      } else {
        router.push('/journal');
      }
    });
  }

  if (editing) {
    return (
      <form action={handleUpdate} className="space-y-6">
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={entry.title}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
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
            defaultValue={entry.content}
            className="w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
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
            {isPending ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setSelectedMood(entry.moodScore);
              setError(null);
            }}
            className="rounded-md px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-muted-foreground">{formatDate(entry.createdAt)}</p>
        <h1 className="mt-1 text-2xl font-bold">{entry.title}</h1>
        {entry.moodScore !== null && (
          <span className="mt-2 inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs">
            {MOOD_OPTIONS[entry.moodScore - 1]?.emoji} {MOOD_OPTIONS[entry.moodScore - 1]?.label} (
            {entry.moodScore}/10)
          </span>
        )}
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none whitespace-pre-wrap text-sm leading-relaxed">
        {entry.content}
      </div>

      {entry.updatedAt.getTime() !== entry.createdAt.getTime() && (
        <p className="text-xs text-muted-foreground">Last edited {formatDate(entry.updatedAt)}</p>
      )}

      <div className="flex items-center gap-3 border-t border-border pt-4">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className="rounded-md px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10 disabled:opacity-50"
        >
          Delete
        </button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
