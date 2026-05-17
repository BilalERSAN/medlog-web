import { Metadata } from "next";
import LoginForm from "./LoginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin Girişi | Curelog",
  description: "Yönetim paneli giriş sayfası",
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  // Eğer kullanıcı zaten giriş yapmışsa admin paneline yönlendir
  if (session) {
    redirect("/admin");
  }

  return <LoginForm />;
}
