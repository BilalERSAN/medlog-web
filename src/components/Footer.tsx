"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-surface-container-lowest w-full mt-auto border-t border-outline-variant">
      <div className="flex flex-col md:flex-row justify-between items-center py-12 px-12 max-w-[1280px] mx-auto gap-8">
        <div className="text-xl font-bold tracking-tight text-primary">Curelog</div>
        <div className="flex flex-wrap justify-center gap-8">
          <a className="font-label-caps uppercase text-secondary hover:text-primary transition-colors duration-300" href="/about">{t({ en: "About Us", ar: "معلومات عنا" })}</a>
          <a className="font-label-caps uppercase text-secondary hover:text-primary transition-colors duration-300" href="/blog">{t({ en: "Blog", ar: "المدونة" })}</a>
          <a className="font-label-caps uppercase text-secondary hover:text-primary transition-colors duration-300" href="/consultation">{t({ en: "Contact", ar: "اتصل بنا" })}</a>
          <a className="font-label-caps uppercase text-secondary hover:text-primary transition-colors duration-300" href="/privacy">{t({ en: "Privacy Policy", ar: "سياسة الخصوصية" })}</a>
          <a className="font-label-caps uppercase text-secondary hover:text-primary transition-colors duration-300" href="/terms">{t({ en: "Terms of Service", ar: "شروط الخدمة" })}</a>
          <a className="font-label-caps uppercase text-secondary hover:text-primary transition-colors duration-300" href="/legal">{t({ en: "Legal Warning", ar: "تحذير قانوني" })}</a>
        </div>
        <div className="font-body-md text-sm text-secondary text-center md:text-right" dir="ltr">
          © {new Date().getFullYear()} Curelog | {t({ en: "Medical Guidance & Experience Sharing. All rights reserved.", ar: "التوجيه الطبي وتبادل الخبرات. كل الحقوق محفوظة." })}
        </div>
      </div>
    </footer>
  );
}
