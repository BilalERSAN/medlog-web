import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MedicalFocus from "@/components/MedicalFocus";
import PatientStories from "@/components/PatientStories";
import BlogPreview from "@/components/BlogPreview";
import ProfessionalGuidance from "@/components/ProfessionalGuidance";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Hero />
        <MedicalFocus />
        <PatientStories />
        <BlogPreview />
        <ProfessionalGuidance />
      </main>
      <Footer />
    </>
  );
}
