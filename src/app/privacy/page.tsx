"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main className="flex-grow">
        <section className="bg-surface-container-low py-20 px-12">
          <div className="max-w-[1280px] mx-auto">
            <h1 className="font-h1 text-on-background mb-4">
              {t({ en: "Privacy Policy", ar: "سياسة الخصوصية" })}
            </h1>
            <p className="font-body-lg text-secondary">
              {t({ en: "Your privacy is important to us.", ar: "خصوصيتك تهمنا." })}
            </p>
          </div>
        </section>

        <section className="max-w-[1280px] mx-auto px-12 py-16">
          <div className="prose max-w-none text-on-surface-variant font-body-md space-y-6">
            <p>
              {t({ en: "At Curelog, we are committed to protecting your privacy. This policy explains how we handle any information when you visit our website.", ar: "في كيورلوج، نحن ملتزمون بحماية خصوصيتك. توضح هذه السياسة كيف نتعامل مع أي معلومات عند زيارتك لموقعنا." })}
            </p>

            <h2 className="font-h3 text-on-background mt-8">
              {t({ en: "Information Collection", ar: "جمع المعلومات" })}
            </h2>
            <p>
              {t({ en: "As a non-commercial, experience-sharing platform, we do not require user registration. We do not collect personal identification information unless you voluntarily provide it through our contact forms.", ar: "بصفتنا منصة غير تجارية لتبادل الخبرات، فإننا لا نطلب تسجيل المستخدم. نحن لا نجمع معلومات التعريف الشخصية ما لم تقدمها طوعاً من خلال نماذج الاتصال الخاصة بنا." })}
            </p>

            <h2 className="font-h3 text-on-background mt-8">
              {t({ en: "Use of Information", ar: "استخدام المعلومات" })}
            </h2>
            <p>
              {t({ en: "Any information shared through our contact forms is used solely to respond to your inquiries and provide guidance based on our experiences. We do not sell, trade, or otherwise transfer your information to third parties.", ar: "تُستخدم أي معلومات تتم مشاركتها من خلال نماذج الاتصال الخاصة بنا للرد على استفساراتك فقط وتقديم التوجيه بناءً على تجاربنا. نحن لا نبيع أو نتاجر أو ننقل معلوماتك بطريقة أخرى إلى أطراف ثالثة." })}
            </p>

            <h2 className="font-h3 text-on-background mt-8">
              {t({ en: "Cookies", ar: "ملفات تعريف الارتباط (Cookies)" })}
            </h2>
            <p>
              {t({ en: "We use essential cookies to ensure the basic functionality of our website and to improve your browsing experience. These cookies do not track your personal activities on other sites.", ar: "نحن نستخدم ملفات تعريف الارتباط الأساسية لضمان الوظائف الأساسية لموقعنا على الويب ولتحسين تجربة التصفح الخاصة بك. لا تتتبع ملفات تعريف الارتباط هذه أنشطتك الشخصية على المواقع الأخرى." })}
            </p>

            <h2 className="font-h3 text-on-background mt-8">
              {t({ en: "Third-Party Links", ar: "روابط الطرف الثالث" })}
            </h2>
            <p>
              {t({ en: "Our website may contain links to external medical institutions or information sources. We are not responsible for the privacy practices of these third-party websites.", ar: "قد يحتوي موقعنا على روابط لمؤسسات طبية خارجية أو مصادر معلومات. نحن لسنا مسؤولين عن ممارسات الخصوصية لمواقع الطرف الثالث هذه." })}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
