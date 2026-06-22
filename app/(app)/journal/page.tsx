import Link from 'next/link';
import { getEntries } from '@/lib/actions/entries';

function formatDate(date: Date) {
  const now = new Date();
  const d = new Date(date);
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;

  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

export default async function JournalPage() {
  const entries = await getEntries();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Journal</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your daily reflections, captured.</p>
      </div>

      {entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
          <p className="text-muted-foreground">No entries yet. Start your reflection journey.</p>
          <Link
            href="/journal/new"
            className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Write your first entry
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <Link
              key={entry.id}
              href={`/journal/${entry.id}`}
              className="block rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-medium">{entry.title}</h2>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{entry.content}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(entry.createdAt)}
                  </span>
                  {entry.moodScore !== null && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                      {entry.moodScore}/10
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
