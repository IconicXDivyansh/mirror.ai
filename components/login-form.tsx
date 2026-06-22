'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { signIn, signInWithGoogle } from '@/lib/actions/auth';

export function LoginForm() {
  const [signInState, signInAction, signInPending] = useActionState(signIn, {
    error: null,
  });
  const [googleState, googleAction, googlePending] = useActionState(signInWithGoogle, {
    error: null,
  });

  const error = signInState.error || googleState.error;

  return (
    <div className="w-full max-w-sm">
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        {error && (
          <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        )}
        <form action={signInAction}>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              className="bg-background"
            />
          </Field>
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Link href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="bg-background"
            />
          </Field>
          <Field>
            <Button type="submit" disabled={signInPending} className="w-full">
              {signInPending ? 'Please wait...' : 'Login'}
            </Button>
          </Field>
        </form>
        <FieldSeparator>Or continue with</FieldSeparator>
        <form action={googleAction}>
          <Field>
            <Button type="submit" variant="outline" disabled={googlePending} className="w-full">
              {googlePending ? 'Please wait...' : 'Login with Google'}
            </Button>
          </Field>
        </form>
        <FieldDescription className="text-center">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="underline underline-offset-4">
            Sign up
          </Link>
        </FieldDescription>
      </FieldGroup>
    </div>
  );
}
