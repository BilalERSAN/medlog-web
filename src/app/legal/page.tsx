"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function LegalPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main className="flex-grow">
        <section className="bg-surface-container-low py-20 px-12">
          <div className="max-w-[1280px] mx-auto">
            <h1 className="font-h1 text-on-background mb-4">
              {t({ en: "Legal Warning", ar: "تحذير قانوني" })}
            </h1>
            <p className="font-body-lg text-secondary">
              {t({ en: "Legal Warning & Medical Disclaimer", ar: "تحذير قانوني وإخلاء مسؤولية طبي" })}
            </p>
          </div>
        </section>

        <section className="max-w-[1280px] mx-auto px-12 py-16">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-10 shadow-sm space-y-8">
            <div className="space-y-6 text-on-surface-variant font-body-md leading-relaxed">
              <p className="font-bold text-lg text-primary">
                {t({ en: "This website is designed for informational purposes only and does not provide medical services.", ar: "تم تصميم هذا الموقع لأغراض إعلامية فقط ولا يقدم خدمات طبية." })}
              </p>

              <p>
                {t({ en: "The information on the site should in no way be used for the diagnosis or treatment of diseases.", ar: "يجب ألا تستخدم المعلومات الواردة في الموقع بأي حال من الأحوال لتشخيص الأمراض أو علاجها." })}
              </p>

              <p>
                {t({ en: "The text and/or visual content on the site is not for advertising purposes but for preliminary informational purposes.", ar: "المحتوى النصي و/أو المرئي على الموقع ليس لأغراض إعلانية بل لأغراض إعلامية أولية." })}
              </p>

              <p>
                {t({ en: "These visual and/or text contents do not constitute a basis for any medical or home application. Persons visiting this site are deemed to have read and accepted the matters contained in the legal warning text.", ar: "هذه المحتويات المرئية و/أو النصية لا تشكل أساساً لأي تطبيق طبي أو منزلي. يعتبر الأشخاص الذين يزورون هذا الموقع قد قرأوا وقبلوا الأمور الواردة في نص التحذير القانوني." })}
              </p>

              <p>
                {t({ en: "All responsibility arising from the use of the site content for diagnosis and treatment purposes belongs to the visitor and the user. Persons visiting this site are deemed to have accepted these warnings.", ar: "تقع جميع المسؤوليات الناشئة عن استخدام محتوى الموقع لأغراض التشخيص والعلاج على عاتق الزائر والمستخدم. يعتبر الأشخاص الذين يزورون هذا الموقع قد قبلوا هذه التحذيرات." })}
              </p>

              <div className="bg-surface-container p-6 rounded-xl border-l-4 border-primary">
                <p>
                  {t({
                    en: "Medical knowledge and the diagnostic and treatment tools used are changing rapidly. A piece of information, method, or tool can be abandoned in a very short time. In addition, there may be different techniques, information, and various applications in medicine aimed at obtaining the same result. The personal experience and skills of the doctor are a decisive factor in diagnosis and treatment. It is possible to have different opinions on the same subject. Since the information on the site cannot be updated every day, every piece of information must be checked by the visitor by consulting their doctor.",
                    ar: "المعرفة الطبية وأدوات التشخيص والعلاج المستخدمة تتغير بسرعة. يمكن التخلي عن جزء من المعلومات أو طريقة أو أداة في وقت قصير جداً. بالإضافة إلى ذلك، قد تكون هناك تقنيات ومعلومات وتطبيقات مختلفة في الطب تهدف إلى الحصول على نفس النتيجة. تعتبر الخبرة الشخصية والمهارات التي يتمتع بها الطبيب عاملاً حاسماً في التشخيص والعلاج. من الممكن أن تكون هناك آراء مختلفة حول نفس الموضوع. نظراً لأن المعلومات الموجودة على الموقع لا يمكن تحديثها كل يوم، يجب على الزائر التحقق من كل جزء من المعلومات عن طريق استشارة طبيبه."
                  })}
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-outline-variant">
              <h2 className="font-h3 mb-4 text-on-background">
                {t({ en: "Summary", ar: "ملخص" })}
              </h2>
              <p className="font-body-sm text-secondary">
                {t({
                  en: "Curelog is an experience-sharing platform. We share the medical journeys of people we know to provide guidance to international patients. We are not a medical facility, nor do we perform medical operations. Our consultancy is based on shared experiential knowledge and is provided free of charge to help you navigate your own health journey in Turkey.",
                  ar: "كيورلوج هي منصة لتبادل الخبرات. نحن نشارك الرحلات الطبية للأشخاص الذين نعرفهم لتوفير التوجيه للمرضى الدوليين. نحن لسنا منشأة طبية، ولا نجري عمليات طبية. تعتمد استشاراتنا على المعرفة التجريبية المشتركة ويتم تقديمها مجاناً لمساعدتك في التنقل في رحلتك الصحية الخاصة في تركيا."
                })}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
