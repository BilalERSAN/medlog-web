"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t, language } = useLanguage();

  return (
    <section className="relative w-full min-h-[560px] h-[80vh] flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Modern Doctor Consultation"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUUOJ2j-gdJIgHrVVqOGYIsL4Jqj21XVHF2x_TBwA1kGvsFKohfxzHJTaeJk8pCIvo_G2wvke3B6lDY0rmykUQILyRk2w7dutJ-eQZm_8m46qSbTzUR7DVSv3JtdSye_17ml3-wNSofUCmRTZEurJKkn20GQl2R7iSOzw7JFBiMOHz6lvgCjGXVKMXE9itaD-2XMdm6bVc3wm50Rl2e_SdLnRXZ-ySPXkDjhcowbd5Utn-RQoQFGkrdoimuL10rSWzZTW848h1t0s"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className={`absolute inset-0 bg-gradient-to-${language === "ar" ? "l" : "r"} from-on-background/90 via-on-background/70 to-transparent`}></div>
      </div>
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-8 md:px-12">
        <div className="max-w-2xl space-y-md">
          <h1 className="font-h1 text-on-primary leading-tight">
            {t({ en: "We Are Here to Guide You Through Your Health Journey", ar: "نحن هنا لإرشادك خلال رحلتك الصحية" })}
          </h1>
          <p className="font-body-lg text-surface-container">
            {t({ 
              en: "Our medical guidance platform provides shared surgical experiences and premium insights, guiding you to optimal health decisions with unyielding professionalism.",
              ar: "توفر منصة التوجيه الطبي الخاصة بنا تجارب جراحية مشتركة ورؤى متميزة، وتوجهك إلى القرارات الصحية المثلى باحترافية لا تتزعزع."
            })}
          </p>
          <div className="pt-md">
            <a
              className="inline-flex items-center justify-center bg-primary text-on-primary font-body-md text-sm sm:text-base px-5 sm:px-8 py-3 sm:py-4 rounded-full shadow-md hover:bg-primary-container transition-all duration-200 ease-in-out whitespace-nowrap"
              href="#focus"
            >
              {t({ en: "Learn More about our expertise", ar: "اكتشف المزيد عن خبرتنا" })}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

