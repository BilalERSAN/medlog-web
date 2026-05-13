import { BilingualString } from "./blog";
import { getDbStories } from "@/lib/db";

export type Story = {
  id: string;
  patientName: string;
  departmentSlug: string;
  departmentName: BilingualString;
  quote: BilingualString;
  image: string;
  galleryImages?: string[];
  imagePosition?: string;
};

const initialStories: Story[] = [
  {
    id: "s1",
    patientName: "Sarah Jenkins",
    departmentSlug: "neurosurgery",
    departmentName: { en: "Neurosurgery (Brain & Nerve)", ar: "جراحة المخ والأعصاب" },
    quote: { en: "The guidance provided through Medlog gave me clarity during a confusing time. Their neurological focus and compassionate approach gave me the confidence I needed for my recovery journey. Before reaching out, I had visited three different clinics and no one could pinpoint the exact cause of my chronic migraines. Through the shared experiences on this platform, I was able to find the right direction. The surgery was a complete success, and the post-operative support was beyond anything I had ever experienced. I am now completely pain-free for the first time in six years.", ar: "أعطاني التوجيه المقدم من خلال ميدلوج وضوحاً خلال وقت مربك. تركيزهم العصبي ونهجهم العطوف أعطاني الثقة التي كنت أحتاجها لرحلة التعافي. قبل التواصل معهم، زرت ثلاث عيادات مختلفة ولم يتمكن أحد من تحديد السبب الدقيق للصداع النصفي المزمن الذي أعاني منه. من خلال التجارب المشتركة على هذه المنصة، تمكنت من العثور على الاتجاه الصحيح. كانت الجراحة ناجحة تماماً، وكان دعم ما بعد الجراحة يفوق أي شيء جربته على الإطلاق. أنا الآن خالية تماماً من الألم لأول مرة منذ ست سنوات." },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDghi_6Jk-dYxep_L-sesZ4D5qh5xxtgw8ZRyc4kvYqYN5JykqDeJJNUbrO8fkIyOKomrnvqIa__U4TwStjNbs4AULn-auEnnL4hIFxqqx4uyCnm85yjptSz3R0keJ3XajzuacXNAdqakdcEdTzcuVIkiBjW5Bl8YQC7ioH1vZfifRCELL_q_oxElR_LRk4WU-jNJ3LDO_e9OtjEnEsNykA2wWm0kZgvxSHwcoA7arfkbvi7nuFpDEK-Wy5UswgiA8QG6-MpbqUvB4",
  },
  {
    id: "s2",
    patientName: "Michael Chang",
    departmentSlug: "plastic-surgery",
    departmentName: { en: "Plastic, Reconstructive and Aesthetic Surgery", ar: "الجراحة التجميلية والترميمية" },
    quote: { en: "I thought my active days were over after the accident. The specialists didn't just treat the injury; they built a comprehensive plan that got me back on the trails with full confidence in my body. The reconstructive surgery was complex, but the aesthetic consideration they took ensured that the scarring would be minimal, which did wonders for my self-esteem. Today, I'm back to mountain biking and hiking. When I look at my leg, I see the incredible medical artistry and dedication of the surgical team I found through Medlog's guidance.", ar: "اعتقدت أن أيامي النشطة قد انتهت بعد الحادث. لم يعالج المتخصصون الإصابة فحسب؛ بل وضعوا خطة شاملة أعادتني إلى المسارات بثقة كاملة في جسدي. كانت الجراحة الترميمية معقدة، لكن الاعتبار الجمالي الذي أخذوه ضمن أن الندوب ستكون في حدها الأدنى، مما فعل العجائب لاحترامي لذاتي. اليوم، عدت إلى ركوب الدراجات الجبلية والمشي لمسافات طويلة. عندما أنظر إلى ساقي، أرى البراعة الطبية المذهلة والتفاني من الفريق الجراحي الذي وجدته من خلال إرشاد ميدلوج." },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYeX9B7Zdm3A3X26CLMf3Gu6neucp70_2NAXB2ht42AYyFhJsiXs2zd9xY0suNtjw9ixeXbI8U8OnZuMqOnnmthmo9U8zmC6A9tjuDT6-g_NvbLTb_bgGNOle0WQ5S9MKObPDv_LNBtTDemgsaRx6oj01biJtMOd6wPLk0H-Lmc7wNraEkN-L44WGSNqwwItKFqkZ-6cgDGE9eXzPSupUfSLir-6_vCwt5zTlDBIYVJJVrwTUCMw3AE76bu3Sx_70iLnZHOoAgG8k",
  },
  {
    id: "s3",
    patientName: "Elena Rodriguez",
    departmentSlug: "cardiovascular",
    departmentName: { en: "Cardiovascular Surgery", ar: "جراحة القلب والأوعية الدموية" },
    quote: { en: "Uncompromising standards is exactly what I experienced. From the diagnostics to the final consultation, I felt like I was in the absolute best hands possible.", ar: "المعايير التي لا هوادة فيها هي بالضبط ما جربته. من التشخيص إلى الاستشارة النهائية، شعرت وكأنني في أفضل أيدٍ ممكنة على الإطلاق." },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjo2cfhNqzS-DD4TVOUn0XwIaiIhoCJxX4df6mDX9MGk9ZC_Kv0Ji3CdaAQ-Sc39XJcMe1xuzkhUoO1G4Lo5QjsU8gISQqVkjKNmg9VLYL96t30u9CD6TGCfYH8lp-p1mSCNweXor0NwnW5WiwLFFNasSmRoxUVyv88pG1prwmyTF6cN4_-BKxcw0CRCqeukrFaOpFi1-dQa0dwBCUPMKKsNmgJGatmvaq4NEEsuh6QzF2VG0nkEOy2iPy7EAOi2nyMExAzA091f4",
  },
  {
    id: "s4",
    patientName: "David Chen",
    departmentSlug: "ophthalmology",
    departmentName: { en: "Ophthalmology (Eye Diseases)", ar: "طب العيون (أمراض العيون)" },
    quote: { en: "My vision was deteriorating, and I was terrified. The advanced diagnostic tools and the incredibly skilled specialists I found through this platform gave me my sight and my life back.", ar: "كانت رؤيتي تتدهور، وكنت مرعوباً. منحتني أدوات التشخيص المتقدمة والمتخصصين المهرة بشكل لا يصدق الذين وجدتهم من خلال هذه المنصة بصري وحياتي مرة أخرى." },
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "s5",
    patientName: "Aisha Patel",
    departmentSlug: "dentistry",
    departmentName: { en: "Oral and Dental Health", ar: "صحة الفم والأسنان" },
    quote: { en: "I've always had anxiety about dental procedures, but the gentle approach and state-of-the-art facilities recommended through Medlog completely changed my perspective. I finally have the perfect smile.", ar: "كنت دائماً أشعر بالقلق من إجراءات الأسنان، لكن النهج اللطيف والمرافق الحديثة الموصى بها من خلال ميدلوج غيرت وجهة نظري تماماً. لدي أخيراً الابتسامة المثالية." },
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "s6",
    patientName: "Robert Miller",
    departmentSlug: "urology",
    departmentName: { en: "Urology", ar: "جراحة المسالك البولية" },
    quote: { en: "Dealing with prostate issues is never easy, but the robotic surgery options discussed during my consultation meant less downtime and a much faster recovery than I ever imagined.", ar: "التعامل مع مشاكل البروستاتا ليس بالأمر السهل أبداً، لكن خيارات الجراحة الروبوتية التي تمت مناقشتها خلال استشارتي كانت تعني فترة نقاهة أقل وتعافياً أسرع بكثير مما تخيلت." },
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "s7",
    patientName: "Sophia Martinez",
    departmentSlug: "beauty-personal-care",
    departmentName: { en: "Beauty and Personal Care", ar: "الجمال والعناية الشخصية" },
    quote: { en: "The personalized skincare and medical aesthetic guidance I received was phenomenal. They truly focus on enhancing natural beauty with world-class professionalism.", ar: "كانت العناية بالبشرة المخصصة والإرشاد الطبي التجميلي الذي تلقيته استثنائياً. إنهم يركزون حقاً على تعزيز الجمال الطبيعي باحترافية ذات مستوى عالمي." },
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "s8",
    patientName: "James Thompson",
    departmentSlug: "ivf-fertility",
    departmentName: { en: "IVF and Infertility", ar: "أطفال الأنابيب والعقم" },
    quote: { en: "After years of struggling to conceive, finding the right specialists was crucial. The modern laboratory facilities and empathetic approach were game-changers for our family.", ar: "بعد سنوات من المعاناة للحمل، كان العثور على المتخصصين المناسبين أمراً بالغ الأهمية. كانت مرافق المختبرات الحديثة والنهج التعاطفي بمثابة تغيير لقواعد اللعبة لعائلتنا." },
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "s9",
    patientName: "Olivia Brown",
    departmentSlug: "plastic-surgery",
    departmentName: { en: "Plastic, Reconstructive and Aesthetic Surgery", ar: "الجراحة التجميلية والترميمية" },
    quote: { en: "The level of care and precision I experienced was outstanding. The results of my reconstructive surgery were beyond what I had hoped for, restoring not just my appearance but my confidence.", ar: "كان مستوى الرعاية والدقة الذي جربته رائعاً. كانت نتائج جراحتي الترميمية تفوق ما كنت أتمناه، واستعادت ليس فقط مظهري بل ثقتي بنفسي." },
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "s10",
    patientName: "Isabella Rossi",
    departmentSlug: "obstetrics-gynecology",
    departmentName: { en: "Obstetrics and Gynecology", ar: "أمراض النساء والتوليد" },
    quote: { en: "The gynecological guidance I received was exceptionally professional and compassionate. The surgeons performed a complex laparoscopic procedure that resolved my health issues with minimal recovery time.", ar: "كان الإرشاد النسائي الذي تلقيته مهنياً وعطوفاً بشكل استثنائي. أجرى الجراحون عملية تنظيرية معقدة أدت إلى حل مشاكلي الصحية بأقل وقت للتعافي." },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjo2cfhNqzS-DD4TVOUn0XwIaiIhoCJxX4df6mDX9MGk9ZC_Kv0Ji3CdaAQ-Sc39XJcMe1xuzkhUoO1G4Lo5QjsU8gISQqVkjKNmg9VLYL96t30u9CD6TGCfYH8lp-p1mSCNweXor0NwnW5WiwLFFNasSmRoxUVyv88pG1prwmyTF6cN4_-BKxcw0CRCqeukrFaOpFi1-dQa0dwBCUPMKKsNmgJGatmvaq4NEEsuh6QzF2VG0nkEOy2iPy7EAOi2nyMExAzA091f4",
  },
  {
    id: "s11",
    patientName: "Mark Anderson",
    departmentSlug: "hair-transplant",
    departmentName: { en: "Hair Transplant and Aesthetics", ar: "زراعة الشعر وتجميله" },
    quote: { en: "The hair transplant results exceeded all my expectations. The DHI technique provided a natural density that I thought was impossible. The informational support made everything so easy.", ar: "تجاوزت نتائج زراعة الشعر كل توقعاتي. وفرت تقنية DHI كثافة طبيعية كنت أعتقد أنها مستحيلة. جعل الدعم المعلوماتي كل شيء سهلاً للغاية." },
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "s12",
    patientName: "Linda Thompson",
    departmentSlug: "ivf-fertility",
    departmentName: { en: "IVF and Infertility", ar: "أطفال الأنابيب والعقم" },
    quote: {
      en: "After years of trying, we finally found hope through the advanced reproductive guidance here. The expertise in ROSI technology was the key to our success.",
      ar: "بعد سنوات من المحاولة، وجدنا أخيراً الأمل من خلال الإرشاد الإنجابي المتقدم هنا. كانت الخبرة في تكنولوجيا ROSI هي المفتاح لنجاحنا."
    },
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "s13",
    patientName: "Ahmed Al-Farsi",
    departmentSlug: "hair-transplant",
    departmentName: { en: "Hair Transplant and Aesthetics", ar: "زراعة الشعر وتجميله" },
    quote: {
      en: "The natural appearance of my hair transplant exceeded all expectations. The guidance I received about the DHI technique was invaluable for my decision.",
      ar: "تجاوز المظهر الطبيعي لزراعة شعري كل التوقعات. كان الإرشاد الذي تلقيته حول تقنية DHI لا يقدر بثمن لقراري."
    },
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "s14",
    patientName: "Sophia Rossi",
    departmentSlug: "obstetrics-gynecology",
    departmentName: { en: "Obstetrics and Gynecology", ar: "أمراض النساء والتوليد" },
    quote: {
      en: "Finding reliable gynecological care abroad was a priority. The compassionate and professional guidance I found here made my health journey in Turkey seamless.",
      ar: "كان العثور على رعاية نسائية موثوقة في الخارج أولوية. الإرشاد العطوف والمهني الذي وجدته هنا جعل رحلتي الصحية في تركيا سلسة."
    },
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "s15",
    patientName: "James Wilson",
    departmentSlug: "ear-nose-throat",
    departmentName: { en: "Ear, Nose, and Throat (ENT)", ar: "الأنف والأذن والحنجرة" },
    quote: {
      en: "My chronic sinus issues were finally addressed with modern surgical techniques. The shared experiences of other patients gave me the courage to proceed.",
      ar: "تمت أخيراً معالجة مشاكلي المزمنة في الجيوب الأنفية بتقنيات جراحية حديثة. منحتني التجارب المشتركة للمرضى الآخرين الشجاعة للمضي قدماً."
    },
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  }
];

declare global {
  var __stories: Story[] | undefined;
}

export const stories: Story[] = (globalThis as any).__stories ?? initialStories;

if (!(globalThis as any).__stories) {
  (globalThis as any).__stories = stories;
}

export async function getStories(): Promise<Story[]> {
  return await getDbStories(initialStories);
}
