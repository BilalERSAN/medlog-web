"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { BlogPost } from "@/data/blog";
import { useLanguage } from "@/context/LanguageContext";

export default function BlogListClient({ blogPosts }: { blogPosts: BlogPost[] }) {
  const { t } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(6);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setVisibleCount(prev => Math.min(prev + 6, blogPosts.length));
      }
    }, { threshold: 0.1 });

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [blogPosts.length]);

  const displayedPosts = blogPosts.slice(0, visibleCount);

  return (
    <>
      <section className="bg-surface-container-low py-20 px-12 border-b border-outline-variant">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-primary-container rounded-2xl flex items-center justify-center mb-6 shadow-md">
            <span className="material-symbols-outlined text-on-primary text-5xl">menu_book</span>
          </div>
          <h1 className="font-h1 text-on-background mb-4">
            {t({ en: "Curelog Health & Medical Blog", ar: "مدونة كيورلوج الصحية والطبية" })}
          </h1>
          <p className="font-body-lg text-secondary max-w-2xl mx-auto">
            {t({ en: "Dive into expertly written articles covering medical innovations, healthcare procedures, and guidance for your medical journey in Turkey.", ar: "تعمق في مقالات مكتوبة بخبرة تغطي الابتكارات الطبية وإجراءات الرعاية الصحية والتوجيهات لرحلتك العلاجية في تركيا." })}
          </p>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {displayedPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <article className="flex flex-col md:flex-row gap-8 bg-surface-container-lowest border border-outline-variant rounded-3xl overflow-hidden hover:border-primary/50 hover:shadow-2xl transition-all duration-500 h-full">
                <div className="md:w-2/5 relative h-64 md:h-auto shrink-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={t(post.title)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="md:w-3/5 p-8 flex flex-col">
                  <div className="flex items-center gap-3 text-xs font-bold text-primary uppercase tracking-widest mb-4">
                    {t(post.category)}
                  </div>
                  <h2 className="font-h2 text-2xl mb-4 group-hover:text-primary transition-colors">
                    {t(post.title)}
                  </h2>
                  <p className="font-body-md text-secondary line-clamp-3 mb-6">
                    {t(post.excerpt)}
                  </p>
                  <div className="mt-auto flex flex-nowrap items-center justify-between gap-2 pt-4 border-t border-outline-variant">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="material-symbols-outlined text-sm text-secondary shrink-0">calendar_today</span>
                      <span className="text-sm text-secondary font-medium truncate whitespace-nowrap">{t(post.date)}</span>
                    </div>
                    <span className="text-primary font-bold text-xs sm:text-sm shrink-0 ml-2">
                      {t({ en: "READ ARTICLE", ar: "اقرأ المقال" })}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
        
        {visibleCount < blogPosts.length && (
          <div ref={loaderRef} className="w-full flex justify-center py-12">
            <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
          </div>
        )}
      </section>
    </>
  );
}
