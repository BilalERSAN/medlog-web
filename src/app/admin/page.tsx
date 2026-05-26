import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";
import { getBlogPosts } from "@/data/blog";
import { getAllStories } from "@/data/stories";
import AdminDashboardClient from "./AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const [blogPostsList, storiesList] = await Promise.all([
    getBlogPosts(),
    getAllStories(),
  ]);

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-md shadow-primary/20">
                <span className="material-symbols-outlined text-white">admin_panel_settings</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Curelog İçerik Yönetimi</h1>
                <p className="text-xs text-gray-500">Vercel Postgres & Blob Depolama</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-gray-600">{session.user?.name || "Admin"}</span>
              </div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminDashboardClient initialBlogPosts={blogPostsList} initialStories={storiesList} />
      </main>
    </div>
  );
}
