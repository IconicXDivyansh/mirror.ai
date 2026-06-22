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
import { signUp, signInWithGoogle } from '@/lib/actions/auth';

export function SignupForm() {
  const [signUpState, signUpAction, signUpPending] = useActionState(signUp, {
    error: null,
  });
  const [googleState, googleAction, googlePending] = useActionState(signInWithGoogle, {
    error: null,
  });

  const error = signUpState.error || googleState.error;

  return (
    <div className="w-full max-w-sm">
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>
        {error && (
          <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        )}
        <form action={signUpAction}>
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
            <FieldDescription>
              We&apos;ll use this to contact you. We will not share your email with anyone else.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="bg-background"
            />
            <FieldDescription>Must be at least 6 characters long.</FieldDescription>
          </Field>
          <Field>
            <Button type="submit" disabled={signUpPending} className="w-full">
              {signUpPending ? 'Please wait...' : 'Create Account'}
            </Button>
          </Field>
        </form>
        <FieldSeparator>Or continue with</FieldSeparator>
        <form action={googleAction}>
          <Field>
            <Button type="submit" variant="outline" disabled={googlePending} className="w-full">
              {googlePending ? 'Please wait...' : 'Sign up with Google'}
            </Button>
          </Field>
        </form>
        <FieldDescription className="px-6 text-center">
          Already have an account?{' '}
          <Link href="/login" className="underline underline-offset-4">
            Sign in
          </Link>
        </FieldDescription>
      </FieldGroup>
    </div>
  );
}
