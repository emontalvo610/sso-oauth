import '../styles/globals.css';
import '@pickleballinc/react-ui/stylesheets/bundle.css';
import 'react-toastify/dist/ReactToastify.css';

import Loading from '@lib/components/Loadings/Loading';
import QueryProvider from '@lib/components/Wrappers/QueryProvider';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <QueryProvider>
            <main className="box-border flex min-h-screen items-center justify-between p-6 sm:p-4">
              <ToastContainer theme="light" position="bottom-left" />
              {children}
            </main>
          </QueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
