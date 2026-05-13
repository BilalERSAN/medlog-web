import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blog";
import BlogListClient from "./BlogListClient";

export const metadata = {
  title: "Medical Blog Turkey | Hair Transplant, IVF & Medical Tourism Guide",
  description: "Comprehensive guides on medical procedures in Turkey, including hair transplant turkey, IVF turkey, and health tourism safety.",
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="flex-grow bg-surface">
        <BlogListClient blogPosts={blogPosts} />
      </main>
      <Footer />
    </>
  );
}
