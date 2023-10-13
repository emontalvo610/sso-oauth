import '../styles/globals.css';
import '@pickleballinc/react-ui/stylesheets/bundle.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pickleball - SSO',
  description: 'Pickleball - Auth Server'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="box-border flex min-h-screen items-center justify-between p-6 sm:p-2">
          {children}
        </main>
      </body>
    </html>
  );
}
