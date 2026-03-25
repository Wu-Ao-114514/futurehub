import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'The Gap - A Reflective Journey',
  description: 'A reflective journey on noticing what others dont',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Merriweather:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <main className="min-h-screen bg-bg-page px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-content">{children}</div>
        </main>
      </body>
    </html>
  );
}
