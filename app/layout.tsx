import type { Metadata } from 'next';
import { Geist, Geist_Mono, Figtree, Manrope } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const manropeHeading = Manrope({ subsets: ['latin'], variable: '--font-heading' });

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'mirror.ai',
  description: 'Personal reflection engine — find your patterns, break your loops.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        figtree.variable,
        manropeHeading.variable,
      )}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
