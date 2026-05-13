"use client";
import { useState, FormEvent } from "react";
import CustomSelect from "./CustomSelect";
import { departments } from "../data/doctors";
import { useLanguage } from "@/context/LanguageContext";

export default function ProfessionalGuidance() {
  const { t } = useLanguage();
  const [inquiry, setInquiry] = useState(departments[0].id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const inquiryOptions = [
    ...departments.map(dept => ({ label: t(dept.name), value: dept.id })),
    { label: t({ en: "Other / General Medical Guidance", ar: "أخرى / استشارة طبية عامة" }), value: "general" },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const inquiryName = inquiryOptions.find(opt => opt.value === inquiry)?.label || inquiry;
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, inquiry: inquiryName, message })
      });
      
      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setInquiry(departments[0].id);
        
        setTimeout(() => {
          setStatus("idle");
        }, 6000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="w-full max-w-[1280px] mx-auto px-12 py-xl bg-primary-fixed rounded-3xl my-margin scroll-mt-24" id="guidance">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg items-center">
        <div>
          <h2 className="font-h2 text-on-primary-fixed mb-sm">
            {t({ en: "Let Us Answer Your Questions", ar: "دعنا نجيب على أسئلتك" })}
          </h2>
          <p className="font-body-lg text-on-primary-fixed-variant mb-lg">
            {t({ en: "Reach out for professional guidance tailored to your unique medical situation. Our consultancy team is ready to assist you.", ar: "تواصل معنا للحصول على توجيه مهني مصمم خصيصاً لحالتك الطبية الفريدة. فريق الاستشارات لدينا مستعد لمساعدتك." })}
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 text-on-primary-fixed-variant">
              <span className="material-symbols-outlined mx-2">call</span>
              <span className="font-body-md" dir="ltr">+90 507 040 8182</span>
            </div>
            <div className="flex items-center space-x-4 text-on-primary-fixed-variant">
              <span className="material-symbols-outlined mx-2">mail</span>
              <span className="font-body-md">info@medlogturkey.com</span>
            </div>
            <div className="flex items-center space-x-4 text-on-primary-fixed-variant">
              <span className="material-symbols-outlined mx-2">location_on</span>
              <span className="font-body-md">{t({ en: "Turkey, Ankara", ar: "تركيا، أنقرة" })}</span>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-lg rounded-xl shadow-md mt-8 md:mt-0 relative overflow-hidden min-h-[500px]">
          
          <div className={`absolute inset-0 bg-surface-container-lowest flex flex-col items-center justify-center z-10 transition-all duration-700 ease-in-out ${status === 'success' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-6xl">check_circle</span>
            </div>
            <h3 className="font-h3 text-on-surface mb-2">{t({ en: "Message Sent!", ar: "تم إرسال الرسالة!" })}</h3>
            <p className="font-body-md text-on-surface-variant text-center px-8">
              {t({ en: "Thank you for contacting us. Our team will get back to you shortly.", ar: "شكرًا لتواصلك معنا. سيقوم فريقنا بالرد عليك قريبًا." })}
            </p>
          </div>

          <form className={`space-y-4 transition-all duration-500 ${status === 'success' ? 'opacity-0' : 'opacity-100'}`} onSubmit={handleSubmit}>
            <div>
              <label className="block font-body-md text-on-surface mb-2" htmlFor="name">{t({ en: "Full Name", ar: "الاسم الكامل" })}</label>
              <input required value={name} onChange={e => setName(e.target.value)} className="w-full border-outline-variant rounded-lg p-3 font-body-md focus:ring-primary focus:border-primary border outline-none" id="name" placeholder={t({ en: "Jane Doe", ar: "فلان الفلاني" })} type="text" />
            </div>
            <div>
              <label className="block font-body-md text-on-surface mb-2" htmlFor="email">{t({ en: "Email Address", ar: "البريد الإلكتروني" })}</label>
              <input required value={email} onChange={e => setEmail(e.target.value)} className="w-full border-outline-variant rounded-lg p-3 font-body-md focus:ring-primary focus:border-primary border outline-none" id="email" placeholder="jane@example.com" type="email" />
            </div>
            <div>
              <label className="block font-body-md text-on-surface mb-2" htmlFor="phone">{t({ en: "Phone Number", ar: "رقم الهاتف" })}</label>
              <input required value={phone} onChange={e => setPhone(e.target.value)} className="w-full border-outline-variant rounded-lg p-3 font-body-md focus:ring-primary focus:border-primary border outline-none" id="phone" placeholder="+90 555 555 5555" type="tel" />
            </div>
            <div>
              <label className="block font-body-md text-on-surface mb-2" htmlFor="inquiry">{t({ en: "Nature of Inquiry", ar: "طبيعة الاستفسار" })}</label>
              <CustomSelect
                options={inquiryOptions}
                value={inquiry}
                onChange={setInquiry}
                placeholder={t({ en: "Select Inquiry", ar: "اختر الاستفسار" })}
              />
            </div>
            <div>
              <label className="block font-body-md text-on-surface mb-2" htmlFor="message">{t({ en: "Message", ar: "الرسالة" })}</label>
              <textarea required value={message} onChange={e => setMessage(e.target.value)} className="w-full border-outline-variant rounded-lg p-3 font-body-md focus:ring-primary focus:border-primary h-32 border outline-none" id="message" placeholder={t({ en: "How can we help you today?", ar: "كيف يمكننا مساعدتك اليوم؟" })}></textarea>
            </div>
            {status === 'error' && (
              <p className="text-error font-body-sm">{t({ en: "An error occurred. Please try again.", ar: "حدث خطأ. يرجى المحاولة مرة أخرى." })}</p>
            )}
            <button disabled={status === 'loading'} className="w-full bg-primary text-on-primary font-body-md font-semibold py-4 rounded-lg shadow-sm hover:bg-primary-container disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer flex items-center justify-center space-x-2" type="submit">
              {status === 'loading' ? (
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
              ) : (
                <span>{t({ en: "Request Free Guidance", ar: "طلب استشارة مجانية" })}</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
