import type { Metadata } from 'next';
import './ui/globals.css';
import { geistMono, geistSans } from './ui/fonts';

export const metadata: Metadata = {
  title: 'СтилЛедиМакс, ЧП',
  description: 'Тестовое задание для СтилЛедиМакс, ЧП',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
