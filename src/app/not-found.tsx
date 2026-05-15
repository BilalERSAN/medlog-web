"use client";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-background" dir={language === "ar" ? "rtl" : "ltr"}>
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 md:py-20 px-6">
        {/* flex yerine grid kullanıyoruz: mobilde 1 sütun, md ve sonrasında 2 eşit sütun */}
        <div className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">

          {/* Text Content Container */}
          <div className="flex flex-col justify-center text-center md:text-start order-2 md:order-1">
            <span className="font-label-caps text-primary tracking-widest uppercase mb-4 block">
              Error 404
            </span>
            <h1 className="font-h1 text-on-background mb-6 text-4xl md:text-5xl lg:text-6xl">
              {t({
                en: "Oops! Page Not Found",
                ar: "عذراً! الصفحة غير موجودة"
              })}
            </h1>
            {/* max-w-xl kaldırıldı, w-full eklendi */}
            <p className="font-body-lg text-secondary mb-10 w-full leading-relaxed">
              {t({
                en: "The healing journey continues, but this specific page seems to have wandered off. Let's guide you back to our main medical services.",
                ar: "رحلة الشفاء مستمرة، ولكن يبدو أن هذه الصفحة قد ضلت طريقها. دعنا نوجهك للعودة إلى خدماتنا الطبية الرئيسية."
              })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-primary text-on-primary font-bold px-8 py-4 rounded-full shadow-lg hover:bg-primary-container transition-all duration-300 text-center"
              >
                {t({
                  en: "Back to Home",
                  ar: "العودة للرئيسية"
                })}
              </Link>
              <Link
                href="/#focus"
                className="inline-flex items-center justify-center bg-transparent text-primary border border-primary font-bold px-8 py-4 rounded-full shadow-sm hover:bg-surface-container-low transition-all duration-300 text-center"
              >
                {t({
                  en: "View Services",
                  ar: "عرض الخدمات"
                })}
              </Link>
            </div>
          </div>

          {/* Illustration Container */}
          <div className="flex justify-center items-center w-full order-1 md:order-2">
            <div className="relative w-full max-w-[350px] md:max-w-[450px] lg:max-w-[500px] aspect-square animate-pulse-slow">
              <Image
                src="/images/404.png"
                alt="404 Not Found"
                fill
                className="object-contain"
                priority
              />
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl"></div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}

// Animasyon kodları
const styles = `
  @keyframes pulse-slow {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.02); opacity: 0.95; }
  }
  .animate-pulse-slow {
    animation: pulse-slow 6s ease-in-out infinite;
  }
`;