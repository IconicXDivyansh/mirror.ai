# Supabase Key Naming Change

Supabase has renamed **anon key** to **publishable key**.

- In dashboard and docs, you'll now see "publishable key" instead of "anon key".
- The value is the same — it's the public client-side key safe to expose in `NEXT_PUBLIC_` env vars.
- In code/config, use `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (not `ANON_KEY`).
- The old `anon` key name still works for backward compatibility, but new projects should use the new name.
