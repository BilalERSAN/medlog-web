import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { Public_Sans, Inter } from "next/font/google";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-public-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

import AsyncIconLink from "@/components/AsyncIconLink";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.curelogturkey.com"),
  title: {
    default: "Top Medical Treatments & Health Tourism in Turkey | Curelog",
    template: "%s | Curelog Turkey",
  },
  description: "Premium medical tourism in Turkey. Expert medical consultancy for Rhinoplasty, Dental Treatments, Hair Transplant, IVF, Bariatric Surgery, Cardiology, Orthopedics, and Neurology. Get your free consultation today.",
  keywords: [
    "health tourism turkey",
    "medical tourism turkey",
    "rhinoplasty turkey",
    "nose job turkey",
    "best plastic surgery clinic istanbul",
    "dental implants turkey",
    "hollywood smile turkey",
    "best dental clinic turkey",
    "hair transplant turkey",
    "best hair transplant clinic istanbul",
    "bariatric surgery turkey",
    "weight loss surgery turkey",
    "IVF treatment turkey",
    "in vitro fertilization turkey",
    "azoospermia treatment turkey",
    "cardiology hospital turkey",
    "neurology treatment turkey",
    "orthopedic surgery turkey",
    "medical consultancy turkey",

    "السياحة العلاجية في تركيا", // Sağlık turizmi
    "تجميل الأنف في تركيا", // Burun estetiği
    "عمليات التجميل في تركيا", // Plastik cerrahi
    "زراعة الأسنان في تركيا", // Diş implantı
    "ابتسامة هوليود في تركيا", // Hollywood smile
    "زراعة الشعر في تركيا", // Saç ekimi
    "أفضل عيادة لزراعة الشعر في إسطنبول", // En iyi saç ekim kliniği
    "جراحة السمنة في تركيا", // Obezite cerrahisi / Mide küçültme
    "قص المعدة في تركيا", // Tüp mide
    "أطفال الأنابيب في تركيا", // Tüp bebek
    "علاج العقم في تركيا", // Kısırlık tedavisi
    "علاج انعدام الحيوانات المنوية في تركيا", // Azospermi tedavisi
    "علاج أمراض القلب في تركيا", // Kalp hastalıkları tedavisi
    "جراحة العظام في تركيا", // Ortopedi cerrahisi
    "علاج الأعصاب في تركيا" // Nöroloji tedavisi
  ],
  authors: [{ name: "Curelog Turkey" }],
  creator: "Curelog Turkey",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_AE"],
    url: "https://www.curelogturkey.com",
    title: "Premium Health Tourism in Turkey | Curelog",
    description: "Start your healing journey in Turkey. Top-tier clinics for Rhinoplasty, Dental, Hair Transplant, IVF, and advanced medical treatments.",
    siteName: "Curelog Turkey",
    images: [
      {
        url: "/curelog-og-image.png",
        width: 1200,
        height: 630,
        alt: "Curelog Turkey Medical Services - Rhinoplasty, Dental, IVF, Hair Transplant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Health Tourism in Turkey | Curelog",
    description: "Start your healing journey in Turkey. Top-tier clinics for Rhinoplasty, Dental, Hair Transplant, IVF, and advanced medical treatments.",
    images: ["/curelog-og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`light scroll-smooth ${publicSans.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <head>
        <AsyncIconLink />
      </head>
      <body className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}