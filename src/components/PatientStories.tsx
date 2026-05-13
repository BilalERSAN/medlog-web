"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { stories } from "../data/stories";
import { useLanguage } from "@/context/LanguageContext";

export default function PatientStories() {
  const { t, language } = useLanguage();
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start", direction: language === "ar" ? "rtl" : "ltr" }, [
    Autoplay({ delay: 4000, stopOnInteraction: false })
  ]);

  return (
    <section className="w-full max-w-[1280px] mx-auto px-12 py-xl my-margin scroll-mt-24" id="stories">
      <div className="mb-lg text-center max-w-2xl mx-auto flex flex-col items-center">
        <h2 className="font-h2 text-on-background mb-4">{t({ en: "Real Stories, Real Healing", ar: "قصص حقيقية، شفاء حقيقي" })}</h2>
        <p className="font-body-md text-secondary mb-6">{t({ en: "Hear from those who have experienced our dedicated care firsthand.", ar: "استمع إلى أولئك الذين جربوا رعايتنا المخصصة بأنفسهم." })}</p>
        <Link
          href="/stories"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-container transition-colors group"
        >
          {t({ en: "View All Stories", ar: "عرض جميع القصص" })}
          <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
            {language === "ar" ? "arrow_back" : "arrow_forward"}
          </span>
        </Link>
      </div>
      <div className="overflow-hidden -mx-4 px-4" ref={emblaRef} key={language}>
        <div className="flex -ml-6">
          {stories.map((story) => (
            <div key={story.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-6 pb-4">
              <Link 
                href={`/stories#${story.id}`}
                className="bg-surface-container-low p-lg rounded-xl shadow-sm border border-outline-variant h-full flex flex-col hover:border-primary/50 hover:shadow-md transition-all duration-300 group block"
              >
                <div className="flex items-center space-x-4 mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={story.patientName}
                    style={{ objectPosition: story.imagePosition || 'center' }}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary-container shrink-0"
                    src={story.image}
                  />
                  <div>
                    <h4 className="font-h3 text-body-lg font-semibold text-on-background">{story.patientName}</h4>
                    <p className="font-body-md text-sm text-secondary">
                      {t(story.departmentName)}
                    </p>
                  </div>
                </div>
                <div className="flex-grow mb-6">
                  <p className="font-body-md text-secondary italic line-clamp-4">
                    &quot;{t(story.quote)}&quot;
                  </p>
                </div>
                <div className="mt-auto text-primary font-body-sm font-semibold flex items-center gap-1 group-hover:text-primary-container transition-colors">
                  {t({ en: "Read Full Story", ar: "اقرأ القصة كاملة" })}
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    {language === "ar" ? "arrow_back" : "arrow_forward"}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}