import type { Metadata } from "next";
import { Providers } from "./provider"
import "./globals.css";
import { Ubuntu } from 'next/font/google'

const ubuntu = Ubuntu({
  weight: '400',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Khinzeniollo",
  description: "El proyecto khinzeniollo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={ubuntu.className}>
        <Providers>
          <main id="main">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
