"use client";
import useEmblaCarousel from "embla-carousel-react";
import ImageCarousel from "./ImageCarousel";
import { useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { BilingualString } from "@/data/blog";

export default function HospitalCarousel({ hospitals }: { hospitals: BilingualString[] }) {
  const { t, language } = useLanguage();
  const isMultiple = hospitals.length > 1;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: isMultiple, align: "start", direction: language === "ar" ? "rtl" : "ltr" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      {isMultiple && (
        <div className="flex justify-between items-center gap-4 mb-4 text-secondary">
          <div className="flex items-center gap-2 font-body-sm bg-primary-container text-on-primary-container px-4 h-10 rounded-full shadow-sm font-semibold whitespace-nowrap overflow-hidden">
            <span className="material-symbols-outlined text-lg shrink-0">swipe</span>
            <span className="truncate">{t({ en: "Swipe for more", ar: "اسحب للمزيد" })}</span>
          </div>
          <div className="flex gap-2 shrink-0">
            <button onClick={scrollPrev} className="w-10 h-10 rounded-full bg-surface-container-low border border-outline-variant flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container hover:border-primary transition-colors cursor-pointer shadow-sm">
              <span className="material-symbols-outlined">{language === "ar" ? "chevron_right" : "chevron_left"}</span>
            </button>
            <button onClick={scrollNext} className="w-10 h-10 rounded-full bg-surface-container-low border border-outline-variant flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container hover:border-primary transition-colors cursor-pointer shadow-sm">
              <span className="material-symbols-outlined">{language === "ar" ? "chevron_left" : "chevron_right"}</span>
            </button>
          </div>
        </div>
      )}
      <div className="overflow-hidden -mx-4 px-4" ref={emblaRef} key={language}>
        <div className="flex -ml-6">
          {hospitals.map(hospital => {
            const hospitalEn = typeof hospital === 'string' ? hospital : hospital.en;
            return (
              <div key={hospitalEn} className="flex-[0_0_100%] min-w-0 pl-6 pb-4">
                <div className="bg-surface-container-lowest border border-outline-variant p-8 rounded-xl shadow-sm flex flex-col gap-6 h-full">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-3xl">local_hospital</span>
                    <h3 className="font-h3 text-on-background">{t(hospital)}</h3>
                  </div>

                  {/* Images */}
                  <ImageCarousel hospitalName={hospitalEn} />

                  {/* Map */}
                  <div className="w-full h-80 rounded-xl overflow-hidden border border-outline-variant">
                    <iframe
                      title={`Map of ${hospitalEn}`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(hospitalEn + ' Ankara')}&t=&z=13&ie=UTF8&iwloc=&output=embed`}>
                    </iframe>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
