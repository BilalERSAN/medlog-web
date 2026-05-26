import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { departments, doctors } from "@/data/doctors";
import { notFound } from "next/navigation";
import DepartmentClient from "./DepartmentClient";
import { BilingualString } from "@/data/blog";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  return {
    alternates: {
      canonical: `/departments/${slug}`,
    },
  };
}

export default async function DepartmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const department = departments.find(d => d.slug === slug);

  if (!department) {
    notFound();
  }

  const departmentDoctors = doctors.filter(d => d.departmentSlug === slug);

  // Get unique hospitals for this department by english name
  const hospitalsMap = new Map<string, BilingualString>();
  departmentDoctors.forEach(d => {
    const enName = typeof d.hospital === "string" ? d.hospital : d.hospital.en;
    hospitalsMap.set(enName, d.hospital);
  });
  const hospitals = Array.from(hospitalsMap.values());

  return (
    <>
      <Header />
      <DepartmentClient 
        department={department} 
        departmentDoctors={departmentDoctors} 
        hospitals={hospitals} 
      />
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  return departments.map((dept) => ({
    slug: dept.slug,
  }));
}
