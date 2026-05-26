import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoriesFilter from "@/components/StoriesFilter";
import { getStories } from "@/data/stories";
import PatientStoryModalClient from "./PatientStoryModalClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Patient Stories | Curelog",
  description: "Read real stories and experiences from our patients at Curelog.",
  alternates: { canonical: '/stories' },
};

const departments = [
  { slug: "hair-transplant", en: "Hair Transplant and Aesthetics", ar: "زراعة الشعر وتجميله" },
  { slug: "ivf-fertility", en: "IVF and Infertility", ar: "أطفال الأنابيب والعقم" },
  { slug: "plastic-surgery", en: "Plastic, Reconstructive and Aesthetic Surgery", ar: "الجراحة التجميلية والترميمية" },
  { slug: "dentistry", en: "Oral and Dental Health", ar: "صحة الفم والأسنان" },
  { slug: "ophthalmology", en: "Ophthalmology (Eye Diseases)", ar: "طب العيون" },
  { slug: "neurosurgery", en: "Neurosurgery (Brain & Nerve)", ar: "جراحة المخ والأعصاب" },
];

export default async function StoriesPage() {
  const storiesList = await getStories();

  return (
    <>
      <Header />
      <main className="flex-grow bg-surface">
        {/* Hero Section */}
        <section className="bg-surface-container-low border-b border-outline-variant py-20 px-12">
          <div className="max-w-[1280px] mx-auto flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-primary-container rounded-2xl flex items-center justify-center mb-6 shadow-md">
              <span className="material-symbols-outlined text-on-primary text-5xl">volunteer_activism</span>
            </div>
            <h1 className="font-h1 text-on-background mb-4">Patient Stories</h1>
            <p className="font-body-lg text-secondary max-w-2xl mb-10">
              Discover how our dedicated medical experts and advanced treatments have positively impacted the lives of our patients. Real stories, real healing.
            </p>
            
            {/* Hasta Hikayesi Ekleme Modalı */}
            <PatientStoryModalClient departments={departments} />
          </div>
        </section>

        {/* Filter & List Section */}
        <section className="max-w-[1280px] mx-auto px-12 py-16">
          <StoriesFilter stories={storiesList} />
        </section>
      </main>
      <Footer />
    </>
  );
}
