"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t({ en: "Departments", ar: "الأقسام الطبية" }), href: "/departments" },
    { name: t({ en: "Patient Stories", ar: "قصص المرضى" }), href: "/stories" },
    { name: t({ en: "Blog", ar: "المدونة" }), href: "/blog" },
    { name: t({ en: "Get Guidance", ar: "احصل على إرشاد" }), href: "/consultation" },
  ];

  const isActive = (href: string) => {
    if (pathname === href) return true;
    if (pathname !== "/" && href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="bg-white w-full top-0 sticky border-b border-surface-variant z-50">
      <div className="flex justify-between items-center h-20 px-4 md:px-12 max-w-[1280px] mx-auto">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-primary">Curelog</Link>
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              className={`font-h3 text-body-md tracking-tight transition-all duration-200 ease-in-out pb-1 ${isActive(link.href)
                ? "text-primary border-b-2 border-primary"
                : "text-secondary hover:text-primary"
                }`}
              href={link.href}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            className="flex items-center gap-1 font-bold text-secondary hover:text-primary transition-colors text-sm px-2"
            aria-label="Toggle Language"
          >
            <span className="material-symbols-outlined text-base">language</span>
            {language === "en" ? "AR" : "EN"}
          </button>
          <Link
            className="bg-primary text-on-primary font-body-md px-4 py-2 text-sm md:text-base md:px-6 md:py-3 rounded-full shadow-sm hover:bg-primary-container hover:shadow-md transition-all duration-200 ease-in-out"
            href="/consultation"
          >
            {t({ en: "Consultation", ar: "استشارة" })}
          </Link>
        </div>
      </div>
    </header>
  );
}
