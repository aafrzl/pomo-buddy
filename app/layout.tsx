import AuthProvider from '@/components/providers/AuthProvider';
import { Providers } from '@/components/providers/ProviderNextUI';
import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const font = Work_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pomobuddy',
  description: 'Pomobuddy is a productivity app that helps you stay focused and on track.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className="dark">
        <body className={font.className}>
          <Providers>
            <Toaster position="bottom-right" />
            {children}
            {/* <Footer /> */}
          </Providers>
        </body>
      </html>
    </AuthProvider>
  );
}
