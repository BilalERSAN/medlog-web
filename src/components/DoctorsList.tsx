"use client";
import { doctors } from "../data/doctors";
import { useLanguage } from "@/context/LanguageContext";

export default function DoctorsList() {
  const { t, language } = useLanguage();

  return (
    <section className="w-full max-w-[1280px] mx-auto px-12 py-xl my-margin" id="doctors">
      <div className="mb-lg text-center max-w-2xl mx-auto">
        <h2 className="font-h2 text-on-background">
          {t({ en: "Our Distinguished Specialists", ar: "أخصائيونا المتميزون" })}
        </h2>
        <p className="font-body-md text-secondary mt-sm">
          {t({ en: "Meet the medical experts and institutions partnered with Curelog to deliver world-class care.", ar: "تعرف على الخبراء الطبيين والمؤسسات الشريكة مع كيورلوج لتقديم رعاية ذات مستوى عالمي." })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden hover:border-outline hover:shadow-md transition-all duration-300 flex flex-col">
            <div className="relative h-64 overflow-hidden bg-surface-container">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={doctor.image}
                alt={typeof doctor.name === 'string' ? doctor.name : doctor.name.en}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-white text-xl">{doctor.icon}</span>
                  <span className="font-label-caps text-white">{t(doctor.department)}</span>
                </div>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-h3 text-on-background mb-1">{t(doctor.name)}</h3>
              <p className="font-body-md font-semibold text-primary mb-3">{t(doctor.hospital)}</p>

              <div className="flex items-start gap-2 mb-4 text-secondary">
                <span className="material-symbols-outlined text-sm mt-1">location_on</span>
                <span className="font-body-md text-sm">{t(doctor.city)} {doctor.address && `- ${t(doctor.address)}`}</span>
              </div>

              <p className="font-body-md text-secondary line-clamp-3 mb-4 flex-grow">{t(doctor.about)}</p>

              <button className="mt-auto self-start text-primary font-body-md font-semibold flex items-center gap-1 hover:text-primary-container transition-colors group">
                {t({ en: "Request Consultation", ar: "طلب استشارة" })}
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">{language === "ar" ? "arrow_back" : "arrow_forward"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
