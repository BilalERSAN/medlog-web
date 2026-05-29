"use client";
import { Department, Doctor } from "@/data/doctors";
import Link from "next/link";
import HospitalCarousel from "@/components/HospitalCarousel";
import DoctorCard from "@/components/DoctorCard";
import { useLanguage } from "@/context/LanguageContext";

export default function DepartmentClient({ 
  department, 
  departmentDoctors, 
  hospitals 
}: { 
  department: Department, 
  departmentDoctors: Doctor[], 
  hospitals: import("@/data/blog").BilingualString[] 
}) {
  const { t } = useLanguage();

  return (
    <main className="flex-grow bg-surface">
      {/* Hero Section */}
      <section className="bg-surface-container-low border-b border-outline-variant py-20 px-12">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-primary-container rounded-2xl flex items-center justify-center mb-6 shadow-md">
            <span className="material-symbols-outlined text-on-primary text-5xl" data-icon={department.icon}>{department.icon}</span>
          </div>
          <h1 className="font-h1 text-on-background mb-4">{t(department.name)}</h1>
          <p className="font-body-lg text-secondary max-w-2xl">{t(department.description)}</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-[1280px] mx-auto px-12 py-xl">
        {hospitals.length > 0 && (
          <div className="mb-12">
            <h2 className="font-h2 text-on-background mb-6">
              {t({ en: "Referenced Facilities", ar: "المرافق المرجعية" })}
            </h2>
            <HospitalCarousel hospitals={hospitals} />
          </div>
        )}

        <h2 className="font-h2 text-on-background mb-8">
          {t({ en: "Referenced Specialists", ar: "المتخصصون المرجعيون" })}
        </h2>
        {departmentDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {departmentDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="bg-surface-container-low border border-outline-variant rounded-xl p-12 text-center">
            <span className="material-symbols-outlined text-outline text-4xl mb-4">info</span>
            <h3 className="font-h3 text-on-surface-variant">
              {t({ en: "No specialists found", ar: "لم يتم العثور على متخصصين" })}
            </h3>
            <p className="font-body-md text-secondary mt-2">
              {t({ en: "We are currently updating our specialist roster for this department.", ar: "نقوم حالياً بتحديث قائمة المتخصصين لهذا القسم." })}
            </p>
          </div>
        )}

        <div className="mt-16 text-center">
          <Link href="/departments" className="inline-flex items-center gap-2 text-primary hover:text-primary-container font-semibold transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
            {t({ en: "Back to All Departments", ar: "العودة إلى جميع الأقسام" })}
          </Link>
        </div>
      </section>
    </main>
  );
}
