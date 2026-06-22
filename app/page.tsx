import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <span className="text-lg font-semibold tracking-tight">mirror.ai</span>
          <nav className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pt-24 pb-20 sm:pt-32 sm:pb-28">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Personal reflection engine
              </p>
              <h1
                className="text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
                style={{ textWrap: 'balance' }}
              >
                Find your blind spots.
                <br />
                Break your loops.
              </h1>
              <p
                className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
                style={{ textWrap: 'pretty' }}
              >
                A journal that remembers. Write daily reflections, and over time mirror.ai surfaces
                the patterns you can't see — the excuses you repeat, the circles you're stuck in,
                the gaps between your intentions and actions.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <Link
                  href="/signup"
                  className="inline-flex h-10 items-center rounded-md bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  Start writing
                </Link>
                <Link
                  href="/login"
                  className="inline-flex h-10 items-center rounded-md border border-border px-4 text-sm text-muted-foreground transition-colors hover:bg-muted"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative gradient */}
          <div
            className="pointer-events-none absolute -right-32 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full opacity-[0.04] blur-3xl"
            style={{
              background: 'radial-gradient(circle, oklch(0.65 0.15 250) 0%, transparent 70%)',
            }}
          />
        </section>

        {/* How it works */}
        <section className="border-t border-border/50 px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <h2
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
              style={{ textWrap: 'balance' }}
            >
              How it works
            </h2>
            <p className="mt-3 max-w-lg text-muted-foreground" style={{ textWrap: 'pretty' }}>
              Three steps. No setup. No friction.
            </p>

            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              <div>
                <div className="mb-3 text-2xl">1</div>
                <h3 className="font-medium">Write freely</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Daily winds, losses, regrets, thoughts. No structure required. Just write what's
                  real.
                </p>
              </div>
              <div>
                <div className="mb-3 text-2xl">2</div>
                <h3 className="font-medium">AI sees the patterns</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Each entry is analyzed across 7 behavioral dimensions — commitments vs actions,
                  avoidance, triggers, self-deception.
                </p>
              </div>
              <div>
                <div className="mb-3 text-2xl">3</div>
                <h3 className="font-medium">Break the loops</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  "You've said 'I'll start tomorrow' 7 times in 3 weeks." The patterns you can't
                  see, made visible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What it captures */}
        <section className="border-t border-border/50 px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <h2
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
              style={{ textWrap: 'balance' }}
            >
              What mirror sees
            </h2>
            <p className="mt-3 max-w-lg text-muted-foreground" style={{ textWrap: 'pretty' }}>
              Not just mood tracking. Behavioral analysis across dimensions most journaling apps
              miss.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Commitments vs Actions',
                  desc: 'The gap between what you planned and what you did.',
                },
                {
                  title: 'Avoidance Patterns',
                  desc: 'What you avoid, and what you substitute it with.',
                },
                {
                  title: 'Trigger → Reaction',
                  desc: 'Event to emotional response mappings you keep repeating.',
                },
                {
                  title: 'Self-Deception Flags',
                  desc: 'Rationalizations and excuses detected across entries.',
                },
                {
                  title: 'Decision Quality',
                  desc: 'Choices made, reasoning captured, outcomes tracked.',
                },
                {
                  title: 'Growth Signals',
                  desc: 'Self-awareness moments and changed behavior, celebrated.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-lg border border-border/60 p-5">
                  <h3 className="text-sm font-medium">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border/50 px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl text-center">
            <h2
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
              style={{ textWrap: 'balance' }}
            >
              Your life has patterns.
              <br />
              It's time to see them.
            </h2>
            <p
              className="mx-auto mt-3 max-w-md text-muted-foreground"
              style={{ textWrap: 'pretty' }}
            >
              Start with one entry. The patterns emerge over time. No subscription required.
            </p>
            <div className="mt-8">
              <Link
                href="/signup"
                className="inline-flex h-10 items-center rounded-md bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Start writing — it's free
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50 px-6 py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between text-xs text-muted-foreground">
          <span>mirror.ai</span>
          <span>Your reflections stay yours.</span>
        </div>
      </footer>
    </div>
  );
}
