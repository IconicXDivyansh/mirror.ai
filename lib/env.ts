import { z } from 'zod';

const serverSchema = z.object({
  DATABASE_URL: z.string().url(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
});

function validateEnv<T extends z.ZodRawShape>(schema: z.ZodObject<T>, label: string) {
  const result = schema.safeParse(
    label === 'client'
      ? {
          NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
          NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
        }
      : { DATABASE_URL: process.env.DATABASE_URL },
  );

  if (!result.success) {
    console.error(`❌ Invalid ${label} environment variables:`);
    console.error(result.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables');
  }

  return result.data;
}

export const env = {
  ...validateEnv(clientSchema, 'client'),
  ...validateEnv(serverSchema, 'server'),
};
