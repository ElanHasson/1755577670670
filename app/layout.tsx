import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Win at Y Combinator',
  description: 'Y Combinator has launched some of the most successful startups in the world—but what does it actually take to stand out and succeed in the program? In this webinar, we’ll explore how Y Combinator works, what investors and partners are really looking for, and the strategies that top founders use to thrive. From shaping your idea to navigating Demo Day, you’ll get a behind-the-scenes look at how to maximize your shot at turning an application into a breakout company.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}