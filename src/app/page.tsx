import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MedicalFocus from "@/components/MedicalFocus";
import PatientStories from "@/components/PatientStories";
import BlogPreview from "@/components/BlogPreview";
import ProfessionalGuidance from "@/components/ProfessionalGuidance";
import Footer from "@/components/Footer";
import { getBlogPosts } from "@/data/blog";
import { getStories } from "@/data/stories";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [blogPostsList, storiesList] = await Promise.all([
    getBlogPosts(),
    getStories(),
  ]);

  return (
    <>
      <Header />
      <main className="flex-grow">
        <Hero />
        <MedicalFocus />
        <PatientStories stories={storiesList} />
        <BlogPreview blogPosts={blogPostsList} />
        <ProfessionalGuidance />
      </main>
      <Footer />
    </>
  );
}
