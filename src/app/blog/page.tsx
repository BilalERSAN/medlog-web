import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBlogPosts } from "@/data/blog";
import BlogListClient from "./BlogListClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Medical Blog Turkey | Hair Transplant, IVF & Medical Tourism Guide",
  description: "Comprehensive guides on medical procedures in Turkey, including hair transplant turkey, IVF turkey, and health tourism safety.",
  alternates: { canonical: '/blog' },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Header />
      <main className="flex-grow bg-surface">
        <BlogListClient blogPosts={posts} />
      </main>
      <Footer />
    </>
  );
}
