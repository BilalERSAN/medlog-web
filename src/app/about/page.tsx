"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main className="flex-grow">
        <section className="bg-surface-container-low py-20 px-12">
          <div className="max-w-[1280px] mx-auto text-center">
            <h1 className="font-h1 text-on-background mb-6">
              {t({ en: "About Medlog", ar: "نبذة عن ميدلوج" })}
            </h1>
            <p className="font-body-lg text-secondary max-w-3xl mx-auto">
              {t({ 
                en: "A community-driven platform dedicated to sharing real medical experiences and guiding international patients with transparency and care.",
                ar: "منصة مجتمعية مخصصة لمشاركة التجارب الطبية الحقيقية وإرشاد المرضى الدوليين بشفافية ورعاية." 
              })}
            </p>
          </div>
        </section>

        <section className="max-w-[1280px] mx-auto px-12 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="font-h2 text-on-background mb-4">
                  {t({ en: "Our Mission: Purely Experience", ar: "مهمتنا: تجربة خالصة" })}
                </h2>
                <p className="font-body-md text-secondary leading-relaxed">
                  {t({
                    en: "Medlog is not a commercial health service provider. We are a platform where we share our own experiences and observations with people coming from abroad. We tell the stories of people we know—how they found cures for their illnesses and their journey through the medical system.",
                    ar: "ميدلوج ليست مزود خدمات صحية تجارية. نحن منصة حيث نشارك تجاربنا وملاحظاتنا الخاصة مع الأشخاص القادمين من الخارج. نروي قصص أشخاص نعرفهم - كيف وجدوا علاجات لأمراضهم ورحلتهم عبر النظام الطبي."
                  })}
                </p>
              </div>

              <div className="bg-primary-container/10 p-8 rounded-2xl border border-primary-container/20">
                <h3 className="font-h3 text-primary mb-3">
                  {t({ en: "100% Free & Transparent", ar: "100% مجاني وشفاف" })}
                </h3>
                <p className="font-body-md text-secondary">
                  {t({
                    en: "We absolutely do not demand any fees from patients. Our guidance is provided completely free of charge. We believe that sharing knowledge can change lives, and we do it without any commercial interest.",
                    ar: "نحن لا نطلب أي رسوم من المرضى على الإطلاق. يتم تقديم إرشاداتنا مجاناً تماماً. نحن نؤمن بأن تبادل المعرفة يمكن أن يغير الحياة، ونفعل ذلك دون أي مصلحة تجارية."
                  })}
                </p>
              </div>

              <div>
                <h3 className="font-h3 text-on-background mb-3">
                  {t({ en: "No Advertising", ar: "بدون إعلانات" })}
                </h3>
                <p className="font-body-md text-secondary">
                  {t({
                    en: "We do not advertise any specific products, institutions, or organizations. Our information is based solely on personal experiences and observations of successful medical journeys.",
                    ar: "نحن لا نعلن عن أي منتجات أو مؤسسات أو منظمات محددة. تستند معلوماتنا فقط إلى التجارب الشخصية والملاحظات للرحلات الطبية الناجحة."
                  })}
                </p>
              </div>
            </div>

            <div className="bg-surface-container-highest rounded-3xl p-12 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-h3 text-on-background mb-6 text-center">
                  {t({ en: "Why We Do This", ar: "لماذا نفعل هذا" })}
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <span className="material-symbols-outlined text-primary">volunteer_activism</span>
                    <div>
                      <h4 className="font-semibold text-on-background">{t({ en: "Helping Others", ar: "مساعدة الآخرين" })}</h4>
                      <p className="text-sm text-secondary">{t({ en: "Assisting international patients who are looking for reliable health solutions in Turkey.", ar: "مساعدة المرضى الدوليين الذين يبحثون عن حلول صحية موثوقة في تركيا." })}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="material-symbols-outlined text-primary">forum</span>
                    <div>
                      <h4 className="font-semibold text-on-background">{t({ en: "Sharing Stories", ar: "مشاركة القصص" })}</h4>
                      <p className="text-sm text-secondary">{t({ en: "Documenting real-life cures and medical journeys to provide hope and direction.", ar: "توثيق العلاجات والرحلات الطبية الواقعية لتوفير الأمل والتوجيه." })}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="material-symbols-outlined text-primary">verified_user</span>
                    <div>
                      <h4 className="font-semibold text-on-background">{t({ en: "No Strings Attached", ar: "بدون قيود أو شروط" })}</h4>
                      <p className="text-sm text-secondary">{t({ en: "Providing information without any hidden costs or commercial agendas.", ar: "توفير معلومات دون أي تكاليف خفية أو أجندات تجارية." })}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Abstract Background */}
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary opacity-5 rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
