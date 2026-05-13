import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { departments } from "@/data/doctors";
import DepartmentsClient from "./DepartmentsClient";

export const metadata = {
  title: "Medical Departments | Medlog Institutional Medical Consultancy",
  description: "Explore our specialized medical departments including hair transplant, IVF, cardiology, and more.",
};

export default function DepartmentsPage() {
  return (
    <>
      <Header />
      <DepartmentsClient departments={departments} />
      <Footer />
    </>
  );
}
