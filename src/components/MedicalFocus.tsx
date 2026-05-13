"use client";
import Link from "next/link";
import { departments } from "../data/doctors";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { useLanguage } from "@/context/LanguageContext";

export default function MedicalFocus() {
  const { t, language } = useLanguage();
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start", direction: language === "ar" ? "rtl" : "ltr" }, [Autoplay({ delay: 3000, stopOnInteraction: false })]);

  return (
    <section className="w-full max-w-[1280px] mx-auto px-12 py-xl bg-surface-container-low rounded-3xl mt-margin mb-margin scroll-mt-24" id="focus">
      <div className="mb-lg text-center max-w-2xl mx-auto flex flex-col items-center">
        <h2 className="font-h2 text-on-background">
          {t({ en: "Expert Medical Guidance", ar: "إرشاد طبي خبير" })}
        </h2>
        <p className="font-body-md text-secondary mt-sm mb-6">
          {t({ en: "In-depth guidance and shared medical experiences designed to help you make informed decisions for your health journey.", ar: "إرشادات متعمقة وتجارب طبية مشتركة مصممة لمساعدتك على اتخاذ قرارات مستنيرة لرحلتك الصحية." })}
        </p>
        <Link
          href="/departments"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-container transition-colors"
        >
          {t({ en: "View All Departments", ar: "عرض جميع الأقسام" })} <span className="material-symbols-outlined">{language === "ar" ? "arrow_back" : "arrow_forward"}</span>
        </Link>
      </div>
      <div className="overflow-hidden -mx-4 px-4" ref={emblaRef} key={language}>
        <div className="flex -ml-6">
          {departments.map((dept) => (
            <div key={dept.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-6 pb-4">
              <Link href={`/departments/${dept.slug}`} className="block group h-full">
                <div className="h-full bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-lg flex flex-col hover:bg-primary hover:border-primary hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
                  <div className="z-10 flex flex-col h-full">
                    <div className="w-14 h-14 bg-surface-container rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-container transition-colors duration-300">
                      <span className="material-symbols-outlined text-primary text-3xl group-hover:text-on-primary transition-colors duration-300" data-icon={dept.icon}>{dept.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-h3 text-on-background mb-xs group-hover:text-on-primary transition-colors duration-300">{t(dept.name)}</h3>
                      <p className="font-body-md text-secondary group-hover:text-primary-fixed-dim transition-colors duration-300 line-clamp-3">{t(dept.description)}</p>
                    </div>
                  </div>

                  {/* Abstract Background Graphic for Hover State */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-0 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:opacity-10 group-hover:scale-150 transition-all duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-container opacity-0 rounded-full -translate-x-1/3 translate-y-1/3 group-hover:opacity-20 transition-all duration-500"></div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
