'use server';

import { eq, and, desc } from 'drizzle-orm';
import { db } from '@/lib/db';
import { entries } from '@/lib/db/schema';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

async function getUserId() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');
  return user.id;
}

export async function createEntry(formData: FormData) {
  const userId = await getUserId();
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const moodScore = formData.get('moodScore') as string | null;

  if (!title?.trim() || !content?.trim()) {
    return { error: 'Title and content are required' };
  }

  const [entry] = await db
    .insert(entries)
    .values({
      userId,
      title: title.trim(),
      content: content.trim(),
      moodScore: moodScore ? Number.parseInt(moodScore, 10) : null,
    })
    .returning();

  revalidatePath('/journal');
  return { data: entry };
}

export async function getEntries() {
  const userId = await getUserId();

  const rows = await db
    .select()
    .from(entries)
    .where(eq(entries.userId, userId))
    .orderBy(desc(entries.createdAt));

  return rows;
}

export async function getEntry(id: string) {
  const userId = await getUserId();

  const [entry] = await db
    .select()
    .from(entries)
    .where(and(eq(entries.id, id), eq(entries.userId, userId)));

  return entry ?? null;
}

export async function updateEntry(id: string, formData: FormData) {
  const userId = await getUserId();
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const moodScore = formData.get('moodScore') as string | null;

  if (!title?.trim() || !content?.trim()) {
    return { error: 'Title and content are required' };
  }

  const [updated] = await db
    .update(entries)
    .set({
      title: title.trim(),
      content: content.trim(),
      moodScore: moodScore ? Number.parseInt(moodScore, 10) : null,
      updatedAt: new Date(),
    })
    .where(and(eq(entries.id, id), eq(entries.userId, userId)))
    .returning();

  if (!updated) return { error: 'Entry not found' };

  revalidatePath('/journal');
  revalidatePath(`/journal/${id}`);
  return { data: updated };
}

export async function deleteEntry(id: string) {
  const userId = await getUserId();

  const [deleted] = await db
    .delete(entries)
    .where(and(eq(entries.id, id), eq(entries.userId, userId)))
    .returning();

  if (!deleted) return { error: 'Entry not found' };

  revalidatePath('/journal');
  return { data: deleted };
}
