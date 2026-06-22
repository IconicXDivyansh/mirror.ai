import { notFound } from 'next/navigation';
import { getEntry } from '@/lib/actions/entries';
import EntryDetailClient from './entry-detail-client';

export default async function EntryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = await getEntry(id);

  if (!entry) {
    notFound();
  }

  return <EntryDetailClient entry={entry} />;
}
