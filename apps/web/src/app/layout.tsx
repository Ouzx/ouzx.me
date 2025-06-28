import { Geist, Geist_Mono } from 'next/font/google';
import '@ouzx-me/ui/globals.css';

import { ThemeProvider } from '@/providers/theme';

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
