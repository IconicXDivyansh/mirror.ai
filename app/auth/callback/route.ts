import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/journal';

  if (code) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            // Write to the request so we can copy them to the redirect response later
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          },
        },
      },
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const redirectUrl = next.startsWith('/') ? `${origin}${next}` : `${origin}/journal`;
      const response = NextResponse.redirect(redirectUrl);
      // Copy all cookies that were set during exchangeCodeForSession
      for (const { name, value } of request.cookies.getAll()) {
        response.cookies.set(name, value);
      }
      return response;
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
