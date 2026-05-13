import { getDbBlogPosts } from "@/lib/db";

export type BilingualString = {
  en: string;
  ar: string;
} | string;

export type BlogPost = {
  id: string;
  slug: string;
  title: BilingualString;
  excerpt: BilingualString;
  content: BilingualString;
  date: BilingualString;
  author: BilingualString;
  category: BilingualString;
  tags: BilingualString | string[];
  image: string;
};

const initialBlogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "future-of-hair-transplant",
    title: {
      en: "The Future of Hair Transplant: What is DHI Technique?",
      ar: "مستقبل زراعة الشعر: ما هي تقنية DHI؟",
    },
    excerpt: {
      en: "Direct Hair Implantation (DHI) is revolutionizing the hair transplant industry. Learn why more patients choose DHI.",
      ar: "زراعة الشعر المباشرة (DHI) تحدث ثورة في صناعة زراعة الشعر. تعرف على سبب اختيار المزيد من المرضى لتقنية DHI.",
    },
    content: {
      en: "Direct Hair Implantation (DHI) is an advanced hair transplantation method... With DHI, hair follicles are implanted one by one directly to the thinning area that needs to be covered. Each hair follicle is placed in a specific direction, angle and depth, thanks to the DHI patented tool, the DHI implanter, providing 100% natural results and maximum viability.",
      ar: "زراعة الشعر المباشرة (DHI) هي طريقة متقدمة لزراعة الشعر... مع تقنية DHI، يتم زرع بصيلات الشعر واحدة تلو الأخرى مباشرة في المنطقة الخفيفة التي تحتاج إلى تغطية. يتم وضع كل بصيلة شعر في اتجاه وزاوية وعمق محدد، بفضل أداة DHI الحاصلة على براءة اختراع، قلم DHI، مما يوفر نتائج طبيعية 100% وأقصى قدر من الحيوية.",
    },
    date: {
      en: "May 15, 2026",
      ar: "١٥ مايو ٢٠٢٦",
    },
    author: {
      en: "Dr. Mehmet Yilmaz",
      ar: "د. محمد يلماز",
    },
    category: {
      en: "Hair Transplant",
      ar: "زراعة الشعر",
    },
    tags: {
      en: ["Hair Transplant", "DHI", "Hair Loss", "Turkey"],
      ar: ["زراعة الشعر", "DHI", "تساقط الشعر", "تركيا"],
    },
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "2",
    slug: "dental-aesthetics-smile-design",
    title: {
      en: "Dental Aesthetics: The Art of Smile Design",
      ar: "تجميل الأسنان: فن تصميم الابتسامة",
    },
    excerpt: {
      en: "Discover how modern aesthetic dentistry combines technology and art to create the perfect, natural-looking smile.",
      ar: "اكتشف كيف يجمع طب الأسنان التجميلي الحديث بين التكنولوجيا والفن لإنشاء ابتسامة مثالية وطبيعية المظهر.",
    },
    content: {
      en: "Smile design is a comprehensive dental cosmetic procedure that evaluates... Your facial structure, skin tone, gum line, and lips are all taken into consideration when designing a personalized smile. Modern techniques such as E-max veneers and digital smile design CAD/CAM systems allow us to preview the exact final outcome before starting the actual treatment.",
      ar: "تصميم الابتسامة هو إجراء تجميلي شامل للأسنان يقيم... يتم أخذ بنية وجهك ولون بشرتك وخط اللثة والشفتين في الاعتبار عند تصميم ابتسامة مخصصة. تتيح لنا التقنيات الحديثة مثل قشور E-max وأنظمة تصميم الابتسامة الرقمية CAD/CAM معاينة النتيجة النهائية الدقيقة قبل بدء العلاج الفعلي.",
    },
    date: {
      en: "May 10, 2026",
      ar: "١٠ مايو ٢٠٢٦",
    },
    author: {
      en: "Dr. Ayse Demir",
      ar: "د. عائشة ديمير",
    },
    category: {
      en: "Dentistry",
      ar: "طب الأسنان",
    },
    tags: {
      en: ["Smile Design", "Veneers", "Dentistry", "Aesthetics"],
      ar: ["تصميم الابتسامة", "الفينير", "طب الأسنان", "التجميل"],
    },
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=1200",
  },
];

declare global {
  var __blogPosts: BlogPost[] | undefined;
}

export const blogPosts: BlogPost[] = (globalThis as any).__blogPosts ?? initialBlogPosts;

if (!(globalThis as any).__blogPosts) {
  (globalThis as any).__blogPosts = blogPosts;
}

// Asenkron veri çekme fonksiyonu
export async function getBlogPosts(): Promise<BlogPost[]> {
  return await getDbBlogPosts(initialBlogPosts);
}
