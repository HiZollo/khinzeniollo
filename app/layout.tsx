import type { Metadata } from "next";
import { Providers } from "./provider"
import "./globals.css";

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
      <body>
        <Providers>
          <main id="main">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
