"use client";

import Link from "next/link";
import { BlogPost } from "@/data/blog";
import { useLanguage } from "@/context/LanguageContext";

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const { t, language } = useLanguage();

  return (
    <>
      {/* Article Header */}
      <section className="max-w-[1280px] mx-auto px-12 pt-20 pb-12">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors font-medium mb-8"
          >
            <span className="material-symbols-outlined">
              {language === "ar" ? "arrow_forward" : "arrow_back"}
            </span>
            {t({ en: "Back to Blog", ar: "العودة إلى المدونة" })}
          </Link>

          <div className="flex items-center gap-3 text-sm font-bold text-primary uppercase tracking-widest mb-6">
            {t(post.category)}
            <span className="w-1 h-1 bg-outline rounded-full"></span>
            <span className="text-secondary font-medium lowercase">
              {t({ en: "10 min read", ar: "١٠ دقائق للقراءة" })}
            </span>
          </div>

          <h1 className="font-h1 text-4xl md:text-5xl lg:text-6xl text-on-background mb-8 leading-tight">
            {t(post.title)}
          </h1>

          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-on-primary-container font-bold">
              M
            </div>
            <div>
              <div className="font-bold text-on-background">{t(post.author)}</div>
              <div className="text-sm text-secondary">{t(post.date)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="max-w-[1280px] mx-auto px-12 mb-16">
        <div className="aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={t(post.title)}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Article Content */}
      <section className="max-w-[1280px] mx-auto px-12 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg prose-slate max-w-none 
            prose-headings:font-h2 prose-headings:text-on-background prose-headings:mb-6 prose-headings:mt-12
            prose-p:font-body-md prose-p:text-secondary prose-p:leading-relaxed prose-p:mb-6
            prose-li:text-secondary prose-li:font-body-md
            prose-strong:text-on-background prose-strong:font-bold
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-surface-container-low prose-blockquote:p-8 prose-blockquote:rounded-r-xl prose-blockquote:italic
          ">
            {/* Rendering markdown-like content simply for now */}
            <div dangerouslySetInnerHTML={{ __html: formatContent(t(post.content)) }} />
          </div>

          {/* Tags */}
          <div className="mt-16 pt-8 border-t border-outline-variant flex flex-wrap gap-3">
            {(Array.isArray(post.tags) ? post.tags : (post.tags as any)[t({ en: "en", ar: "ar" })] || post.tags.en).map((tag: string) => (
              <span key={tag} className="px-4 py-2 bg-surface-container rounded-full text-sm font-medium text-secondary">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related Posts CTA */}
      <section className="bg-surface-container-low py-20 px-12">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="font-h2 mb-6">{t({ en: "Need expert guidance?", ar: "هل تحتاج إلى إرشاد الخبراء؟" })}</h2>
          <p className="font-body-lg text-secondary mb-10 max-w-2xl mx-auto">
            {t({ 
              en: "Our team provides free experiential guidance for patients looking for medical solutions in Turkey.",
              ar: "يقدم فريقنا إرشاداً تجريبياً مجانياً للمرضى الذين يبحثون عن حلول طبية في تركيا."
            })}
          </p>
          <Link
            href="/consultation"
            className="bg-primary text-on-primary px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all inline-block"
          >
            {t({ en: "Get Guidance", ar: "احصل على إرشاد" })}
          </Link>
        </div>
      </section>
    </>
  );
}

// Simple formatter for the dummy markdown-like content
function formatContent(content: string) {
  if (!content) return "";
  return content
    .replace(/^# (.*$)/gim, '<h1 class="font-h1 text-4xl mb-8">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="font-h2 text-3xl mb-6 mt-12">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="font-h3 text-2xl mb-4 mt-8">$1</h3>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/^\* (.*$)/gim, '<li class="ml-4 mb-2">$1</li>')
    .split('\n').map(line => {
      if (!line.trim()) return '';
      if (line.startsWith('<')) return line;
      return `<p class="mb-6">${line}</p>`;
    }).join('');
}
