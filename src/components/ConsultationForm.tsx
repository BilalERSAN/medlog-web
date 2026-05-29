"use client";
import { useState, FormEvent } from "react";
import CustomSelect from "./CustomSelect";
import { departments } from "../data/doctors";
import { useLanguage } from "@/context/LanguageContext";

export default function ConsultationForm() {
  const { t } = useLanguage();
  const defaultDept = departments.find(d => d.slug === "ivf-fertility")?.id || departments[0].id;
  const [inquiry, setInquiry] = useState(defaultDept);
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
        setInquiry(defaultDept);
        
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
    <section className="w-full max-w-[900px] mx-auto px-6 py-12 relative">
      {/* Decorative background blobs */}
      <div className="absolute top-10 left-10 w-64 md:w-96 h-64 md:h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-[80px] opacity-70"></div>
      <div className="absolute top-20 right-10 w-64 md:w-96 h-64 md:h-96 bg-primary/5 rounded-full mix-blend-multiply filter blur-[80px] opacity-70"></div>
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-64 md:w-96 h-64 md:h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-[80px] opacity-50"></div>
      
      <div className="text-center mb-12 relative z-10">
        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm tracking-wide shadow-sm">
          {t({ en: "Medical Consultation", ar: "استشارة طبية" })}
        </div>
        <h2 className="text-4xl md:text-5xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-primary/60 tracking-tight">
          {t({ en: "Let Us Answer Your Questions", ar: "دعنا نجيب على أسئلتك" })}
        </h2>
        <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          {t({ en: "Reach out for professional guidance tailored to your unique medical situation. Our consultancy team is ready to assist you.", ar: "تواصل معنا للحصول على توجيه مهني مصمم خصيصاً لحالتك الطبية الفريدة. فريق الاستشارات لدينا مستعد لمساعدتك." })}
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-xl shadow-primary/5 border border-white/50 relative overflow-hidden mb-16 min-h-[500px] transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 z-10">
        <div className={`absolute inset-0 bg-white/95 backdrop-blur-2xl flex flex-col items-center justify-center z-20 transition-all duration-700 ease-in-out px-6 ${status === 'success' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}>
          <div className="w-24 h-24 shrink-0 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-full flex items-center justify-center mb-6 shadow-inner border border-primary/10">
            <span className="material-symbols-outlined text-primary text-5xl">check_circle</span>
          </div>
          <h3 className="text-3xl font-bold text-on-surface mb-4 text-center">{t({ en: "Message Sent!", ar: "تم إرسال الرسالة!" })}</h3>
          <p className="text-lg text-on-surface-variant text-center w-full max-w-[500px] leading-relaxed">
            {t({ en: "Thank you for contacting us. Our medical team will review your inquiry and get back to you shortly.", ar: "شكرًا لتواصلك معنا. سيقوم فريقنا الطبي بمراجعة استفسارك والرد عليك قريبًا." })}
          </p>
        </div>

        <form className={`space-y-6 transition-all duration-500 relative z-10 ${status === 'success' ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`} onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-on-surface ml-1" htmlFor="name">{t({ en: "Full Name", ar: "الاسم الكامل" })}</label>
              <input required value={name} onChange={e => setName(e.target.value)} className="w-full bg-surface-variant/30 border-transparent rounded-xl p-4 text-base focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 outline-none shadow-sm" id="name" placeholder={t({ en: "Jane Doe", ar: "فلان الفلاني" })} type="text" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-on-surface ml-1" htmlFor="email">{t({ en: "Email Address", ar: "البريد الإلكتروني" })}</label>
              <input required value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-surface-variant/30 border-transparent rounded-xl p-4 text-base focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 outline-none shadow-sm" id="email" placeholder="jane@example.com" type="email" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-on-surface ml-1" htmlFor="phone">{t({ en: "Phone Number", ar: "رقم الهاتف" })}</label>
              <input required value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-surface-variant/30 border-transparent rounded-xl p-4 text-base focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 outline-none shadow-sm" id="phone" placeholder="+90 555 555 5555" type="tel" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-on-surface ml-1" htmlFor="inquiry">{t({ en: "Nature of Inquiry", ar: "طبيعة الاستفسار" })}</label>
              <div className="bg-surface-variant/30 rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/50 transition-all duration-200 shadow-sm border border-transparent">
                <CustomSelect
                  options={inquiryOptions}
                  value={inquiry}
                  onChange={setInquiry}
                  placeholder={t({ en: "Select Inquiry", ar: "اختر الاستفسار" })}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-on-surface ml-1" htmlFor="message">{t({ en: "Message", ar: "الرسالة" })}</label>
            <textarea required value={message} onChange={e => setMessage(e.target.value)} className="w-full bg-surface-variant/30 border-transparent rounded-xl p-4 text-base focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary h-40 transition-all duration-200 outline-none shadow-sm resize-none" id="message" placeholder={t({ en: "How can we help you today? Please briefly describe your medical condition or request.", ar: "كيف يمكننا مساعدتك اليوم؟ يرجى وصف حالتك الطبية أو طلبك باختصار." })}></textarea>
          </div>
          
          {status === 'error' && (
            <div className="p-4 bg-error/10 text-error rounded-xl flex items-center gap-2 text-sm font-medium">
              <span className="material-symbols-outlined">error</span>
              {t({ en: "An error occurred. Please try again.", ar: "حدث خطأ. يرجى المحاولة مرة أخرى." })}
            </div>
          )}
          
          <button disabled={status === 'loading'} className="w-full bg-gradient-to-r from-primary to-primary/80 text-white text-lg font-bold py-4 rounded-xl shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2 mt-4" type="submit">
            {status === 'loading' ? (
              <span className="material-symbols-outlined animate-spin text-2xl">progress_activity</span>
            ) : (
              <div className="flex items-center gap-2">
                <span>{t({ en: "Request Guidance", ar: "طلب استشارة" })}</span>
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </div>
            )}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        <div className="flex flex-col items-center justify-center p-8 bg-white/60 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
          <div className="w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex items-center justify-center mb-4 text-primary shadow-inner">
            <span className="material-symbols-outlined text-3xl">call</span>
          </div>
          <h4 className="font-bold text-on-surface mb-1">{t({ en: "Phone", ar: "هاتف" })}</h4>
          <span className="text-on-surface-variant font-medium text-center">
            {t({ en: "We will contact you shortly", ar: "سنتواصل معك في أقرب وقت" })}
          </span>
        </div>
        
        <div className="flex flex-col items-center justify-center p-8 bg-white/60 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
          <div className="w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex items-center justify-center mb-4 text-primary shadow-inner">
            <span className="material-symbols-outlined text-3xl">mail</span>
          </div>
          <h4 className="font-bold text-on-surface mb-1">{t({ en: "Email", ar: "البريد الإلكتروني" })}</h4>
          <span className="text-on-surface-variant font-medium">info@curelogturkey.com</span>
        </div>
        
        <div className="flex flex-col items-center justify-center p-8 bg-white/60 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
          <div className="w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex items-center justify-center mb-4 text-primary shadow-inner">
            <span className="material-symbols-outlined text-3xl">location_on</span>
          </div>
          <h4 className="font-bold text-on-surface mb-1">{t({ en: "Location", ar: "الموقع" })}</h4>
          <span className="text-on-surface-variant font-medium">{t({ en: "Turkey, Ankara", ar: "تركيا، أنقرة" })}</span>
        </div>
      </div>
    </section>
  );
}
