import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsultationForm from "@/components/ConsultationForm";

export const metadata = {
  title: "Get Consultation | Medical Tourism Turkey",
  description: "Get professional medical consultation for your treatment in Turkey.",
  alternates: { canonical: '/consultation' },
};

export default function ConsultationPage() {
  return (
    <>
      <Header />
      <main className="flex-grow bg-surface py-6">
        <ConsultationForm />
      </main>
      <Footer />
    </>
  );
}
