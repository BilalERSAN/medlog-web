"use client";
import { useState } from "react";
import { Doctor } from "../data/doctors";
import { useLanguage } from "@/context/LanguageContext";

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden hover:border-outline hover:shadow-md transition-all duration-300 flex flex-col h-full">
      <div className="relative h-72 overflow-hidden bg-surface-container shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={doctor.image}
          alt={typeof doctor.name === 'string' ? doctor.name : doctor.name.en}
          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-h3 text-on-background mb-1">{t(doctor.name)}</h3>
        <p className="font-body-md font-semibold text-primary mb-3">{t(doctor.hospital)}</p>

        <div className="flex items-start gap-2 mb-4 text-secondary">
          <span className="material-symbols-outlined text-sm mt-1 shrink-0">location_on</span>
          <span className="font-body-md text-sm">{t(doctor.city)} {doctor.address && `- ${t(doctor.address)}`}</span>
        </div>

        <div className={`font-body-md text-secondary mb-6 flex-grow transition-all duration-300 ${isExpanded ? '' : 'line-clamp-4'}`}>
          {t(doctor.about)}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-auto w-full bg-primary-container text-on-primary-container font-body-md font-semibold py-3 rounded-lg hover:bg-primary transition-colors hover:text-on-primary cursor-pointer text-center flex items-center justify-center gap-2"
        >
          <span>{isExpanded ? t({ en: 'Show Less', ar: 'عرض أقل' }) : t({ en: 'Read Full Profile', ar: 'قراءة الملف الشخصي كاملاً' })}</span>
          <span className="material-symbols-outlined text-sm">
            {isExpanded ? 'expand_less' : 'expand_more'}
          </span>
        </button>
      </div>
    </div>
  );
}
