import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <section className="bg-surface-container-low py-20 px-12">
          <div className="max-w-[1280px] mx-auto">
            <h1 className="font-h1 text-on-background mb-4">Terms of Service</h1>
            <p className="font-body-lg text-secondary">Terms and conditions for using our platform.</p>
          </div>
        </section>

        <section className="max-w-[1280px] mx-auto px-12 py-16">
          <div className="prose max-w-none text-on-surface-variant font-body-md space-y-6">
            <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>

            <h2 className="font-h3 text-on-background mt-8">Non-Medical Service</h2>
            <p>Curelog is an informational platform based on personal experiences. We do not provide medical services, diagnoses, or treatments. All information should be verified by a medical professional. Please see our <Link href="/legal" className="text-primary hover:underline">Legal Warning</Link> for detailed disclaimers.</p>

            <h2 className="font-h3 text-on-background mt-8">No Commercial Intent</h2>
            <p>We are a free platform. We do not charge patients for our information or guidance. We do not engage in the advertising or promotion of medical products or institutions for commercial gain.</p>

            <h2 className="font-h3 text-on-background mt-8">User Responsibility</h2>
            <p>The use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services, or information available through this website meet your specific requirements.</p>

            <h2 className="font-h3 text-on-background mt-8">Content Accuracy</h2>
            <p>While we strive to keep our information accurate and up to date, medical knowledge evolves rapidly. We do not guarantee the completeness or accuracy of the content on this site at all times.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
