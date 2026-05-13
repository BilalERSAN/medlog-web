"use client";
import Link from "next/link";
import { Department } from "@/data/doctors";
import { useLanguage } from "@/context/LanguageContext";

export default function DepartmentsClient({ departments }: { departments: Department[] }) {
  const { t, language } = useLanguage();

  return (
    <main className="flex-grow bg-surface">
      <section className="bg-surface-container-low py-20 px-12 border-b border-outline-variant">
        <div className="max-w-[1280px] mx-auto text-center">
          <h1 className="font-h1 text-on-background mb-4">
            {t({ en: "Our Medical Specializations", ar: "تخصصاتنا الطبية" })}
          </h1>
          <p className="font-body-lg text-secondary max-w-2xl mx-auto">
            {t({ en: "We provide expert guidance across a wide range of medical fields, connecting you with the best specialists in Turkey.", ar: "نقدم إرشادات الخبراء عبر مجموعة واسعة من المجالات الطبية، ونربطك بأفضل المتخصصين في تركيا." })}
          </p>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept) => (
            <Link key={dept.id} href={`/departments/${dept.slug}`} className="group h-full">
              <div className="h-full bg-surface-container-lowest border border-outline-variant rounded-2xl p-10 flex flex-col hover:bg-primary hover:border-primary hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                <div className="z-10 flex flex-col h-full">
                  <div className="w-20 h-20 bg-surface-container rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary-container transition-colors duration-500 shadow-sm">
                    <span className="material-symbols-outlined text-primary text-5xl group-hover:text-on-primary transition-colors duration-500" data-icon={dept.icon}>{dept.icon}</span>
                  </div>
                  <div>
                    <h2 className="font-h2 text-2xl text-on-background mb-4 group-hover:text-on-primary transition-colors duration-500">{t(dept.name)}</h2>
                    <p className="font-body-md text-secondary group-hover:text-primary-fixed-dim transition-colors duration-500 leading-relaxed">
                      {t(dept.description)}
                    </p>
                  </div>
                  <div className="mt-8 flex items-center gap-2 text-primary group-hover:text-on-primary font-bold text-sm uppercase tracking-wider transition-colors duration-500">
                    {t({ en: "Explore Insights", ar: "اكتشف الرؤى" })} <span className="material-symbols-outlined text-sm">{language === "ar" ? "arrow_back" : "arrow_forward"}</span>
                  </div>
                </div>

                {/* Abstract Background Graphic */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-0 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:opacity-10 group-hover:scale-150 transition-all duration-700"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-container opacity-0 rounded-full -translate-x-1/3 translate-y-1/3 group-hover:opacity-20 transition-all duration-700"></div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
