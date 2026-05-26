import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBlogPosts } from "@/data/blog";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  return {
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const posts = await getBlogPosts();
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-grow bg-white">
        <BlogPostClient post={post} />
      </main>
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
