import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Medlog Institutional Medical Consultancy",
  description: "Comprehensive consultative services designed for absolute precision and premium care.",
  // Sitenin Google ve diğer arama motorları tarafından taranmasını engeller
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light scroll-smooth">
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;600;700;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
