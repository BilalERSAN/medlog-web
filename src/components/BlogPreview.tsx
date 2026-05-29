"use client";
import Link from "next/link";
import { BlogPost } from "../data/blog";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

export default function BlogPreview({ blogPosts }: { blogPosts: BlogPost[] }) {
  const { t, language } = useLanguage();
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start", direction: language === "ar" ? "rtl" : "ltr" }, [
    Autoplay({ delay: 4000, stopOnInteraction: false })
  ]);

  return (
    <section className="w-full max-w-[1280px] mx-auto px-12 py-24 scroll-mt-24" id="blog-preview">
      <div className="mb-lg text-center max-w-2xl mx-auto flex flex-col items-center">
        <h2 className="font-h2 text-on-background mb-4">{t({ en: "Curelog Health Blog", ar: "مدونة كيورلوج الصحية" })}</h2>
        <p className="font-body-lg text-secondary mb-6">
          {t({ 
            en: "Explore our latest blog articles on advanced medical treatments, healthy living, and expert advice for international patients.", 
            ar: "استكشف أحدث مقالات مدونتنا حول العلاجات الطبية المتقدمة والحياة الصحية ونصائح الخبراء للمرضى الدوليين." 
          })}
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-container transition-colors"
        >
          {t({ en: "View All Posts", ar: "عرض جميع المقالات" })} <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>

      <div className="overflow-hidden -mx-4 px-4" ref={emblaRef} key={language}>
        <div className="flex -ml-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-6 pb-4">
              <Link href={`/blog/${post.slug}`} className="group h-full block">
                <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden h-full flex flex-col hover:border-primary/30 hover:shadow-xl transition-all duration-500">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={t(post.title)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider">
                      {t(post.category)}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-sm text-secondary mb-4 font-medium">
                      <span>{t(post.date)}</span>
                      <span className="w-1 h-1 bg-outline rounded-full"></span>
                      <span>{t(post.author)}</span>
                    </div>
                    <h3 className="font-h3 text-on-background mb-4 group-hover:text-primary transition-colors line-clamp-2">
                      {t(post.title)}
                    </h3>
                    <p className="font-body-md text-secondary line-clamp-3 mb-6">
                      {t(post.excerpt)}
                    </p>
                    <div className="mt-auto flex items-center text-primary font-bold text-sm">
                      {t({ en: "READ MORE", ar: "اقرأ المزيد" })} <span className="material-symbols-outlined text-sm ml-1 group-hover:ml-2 transition-all">chevron_right</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}