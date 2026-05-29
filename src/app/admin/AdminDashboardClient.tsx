"use client";
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from "react";
import { BlogPost, BilingualString } from "@/data/blog";
import { Story } from "@/data/stories";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
  initialBlogPosts: BlogPost[];
  initialStories: Story[];
}

export default function AdminDashboardClient({ initialBlogPosts, initialStories }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"blogs" | "stories" | "pending">("blogs");
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogPosts);
  const [stories, setStories] = useState<Story[]>(initialStories);
  
  // Modal states
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; type: 'blog' | 'story'; id: string } | null>(null);

  // Helper to read BilingualString
  const getString = (val: BilingualString) => {
    if (!val) return "";
    if (typeof val === "string") return val;
    return val.en || val.ar || "";
  };

  // Fetch updated data from API
  const refreshData = async () => {
    try {
      const [blogRes, storyRes] = await Promise.all([
        fetch("/api/admin/blog"),
        fetch("/api/admin/stories"),
      ]);
      if (blogRes.ok) setBlogs(await blogRes.json());
      if (storyRes.ok) setStories(await storyRes.json());
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setBlogs(initialBlogPosts);
    setStories(initialStories);
  }, [initialBlogPosts, initialStories]);

  // File to Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Delete Handlers
  const handleDeleteBlog = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/blog?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage({ type: "success", text: "Blog yazısı başarıyla silindi." });
        await refreshData();
      } else {
        setMessage({ type: "error", text: "Silme işlemi başarısız oldu." });
      }
    } catch (e: any) {
      setMessage({ type: "error", text: e.message });
    }
  };

  const handleDeleteStory = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/stories?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage({ type: "success", text: "Hasta hikayesi başarıyla silindi." });
        await refreshData();
      } else {
        setMessage({ type: "error", text: "Silme işlemi başarısız oldu." });
      }
    } catch (e: any) {
      setMessage({ type: "error", text: e.message });
    }
  };

  return (
    <>
      <div className="space-y-8 pb-16">
        {message && (
          <div
          className={`p-4 rounded-xl flex items-center justify-between shadow-sm transition-all ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <div className="flex items-center space-x-3">
            <span className="material-symbols-outlined text-2xl">
              {message.type === "success" ? "check_circle" : "error"}
            </span>
            <p className="font-medium">{message.text}</p>
          </div>
          <button onClick={() => setMessage(null)} className="text-gray-400 hover:text-gray-600">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("blogs")}
            className={`flex items-center space-x-2 py-2.5 px-6 rounded-lg font-medium text-sm transition-all ${
              activeTab === "blogs"
                ? "bg-white text-primary shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <span className="material-symbols-outlined text-lg">article</span>
            <span>Blog Yazıları ({blogs.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("stories")}
            className={`flex items-center space-x-2 py-2.5 px-6 rounded-lg font-medium text-sm transition-all ${
              activeTab === "stories"
                ? "bg-white text-primary shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <span className="material-symbols-outlined text-lg">forum</span>
            <span>Hasta Hikayeleri ({stories.filter(s => s.status !== 'pending').length})</span>
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`flex items-center space-x-2 py-2.5 px-6 rounded-lg font-medium text-sm transition-all ${
              activeTab === "pending"
                ? "bg-white text-primary shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <span className="material-symbols-outlined text-lg">pending_actions</span>
            <span>Onay Bekleyenler ({stories.filter(s => s.status === 'pending').length})</span>
          </button>
        </div>

        <button
          onClick={() => {
            if (activeTab === "blogs") {
              setIsBlogModalOpen(true);
            } else {
              setEditingStory(null);
              setIsStoryModalOpen(true);
            }
          }}
          className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-medium shadow-md shadow-primary/20 transition-all hover:scale-[1.02]"
        >
          <span className="material-symbols-outlined text-xl">add</span>
          <span>{activeTab === "blogs" ? "Yeni Blog Ekle" : "Yeni Hikaye Ekle"}</span>
        </button>
      </div>

      {activeTab === "blogs" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <span className="material-symbols-outlined text-4xl">image</span>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => setDeleteConfirmation({ isOpen: true, type: 'blog', id: post.id })}
                    className="bg-white/90 backdrop-blur-sm text-red-600 p-2 rounded-xl shadow-md hover:bg-red-600 hover:text-white transition-all flex items-center justify-center"
                    title="Sil"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
                <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full">
                  {getString(post.category)}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 mb-2">
                    {getString(post.title)}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {getString(post.excerpt)}
                  </p>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-400 border-t border-gray-50 pt-3">
                  <span>{getString(post.author)}</span>
                  <span>{getString(post.date)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeTab === 'pending' ? stories.filter(s => s.status === 'pending') : stories.filter(s => s.status !== 'pending')).map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col group p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 relative">
                    {!story.image || story.image.includes("1500648767791") ? (
                      <div className="flex items-center justify-center h-full text-gray-400 bg-gray-100">
                        <span className="material-symbols-outlined">person</span>
                      </div>
                    ) : (
                      <Image
                        src={story.image}
                        alt=""
                        fill
                        style={{ objectPosition: story.imagePosition || 'center' }}
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{story.patientName}</h3>
                    <span className="text-xs text-primary font-medium px-2.5 py-0.5 bg-primary/10 rounded-full inline-block mt-0.5 mr-2">
                      {getString(story.departmentName)}
                    </span>
                    {story.status === 'pending' && (
                      <span className="text-xs text-orange-600 font-medium px-2.5 py-0.5 bg-orange-100 rounded-full inline-block mt-0.5">
                        Onay Bekliyor
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => {
                      setEditingStory(story);
                      setIsStoryModalOpen(true);
                    }}
                    className="text-gray-400 hover:text-blue-600 p-2 rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center"
                    title={story.status === 'pending' ? 'Onayla / Düzenle' : 'Düzenle'}
                  >
                    <span className="material-symbols-outlined text-lg">edit</span>
                  </button>
                  <button
                    onClick={() => setDeleteConfirmation({ isOpen: true, type: 'story', id: story.id })}
                    className="text-gray-400 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 transition-all flex items-center justify-center"
                    title="Sil"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm italic line-clamp-4 flex-grow bg-gray-50/50 p-4 rounded-xl border border-gray-100/50 mb-4">
                &quot;{getString(story.quote)}&quot;
              </p>
              {story.galleryImages && story.galleryImages.length > 0 && (
                <div className="flex items-center space-x-2 pt-3 border-t border-gray-100">
                  <span className="material-symbols-outlined text-gray-400 text-sm">photo_library</span>
                  <span className="text-xs text-gray-500">{story.galleryImages.length} galeri fotoğrafı</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Custom Delete Confirmation Modal */}
    {deleteConfirmation?.isOpen && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-[400px] min-w-[320px] p-8 shadow-2xl relative border border-gray-100 flex flex-col items-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <span className="material-symbols-outlined text-3xl">delete_forever</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">Emin misiniz?</h3>
          <p className="text-gray-500 text-center mb-8 leading-relaxed">
            {deleteConfirmation.type === 'blog' 
              ? "Bu blog yazısını kalıcı olarak silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
              : "Bu hasta hikayesini kalıcı olarak silmek istediğinize emin misiniz? Bu işlem geri alınamaz."}
          </p>
          <div className="flex w-full space-x-4">
            <button
              onClick={() => setDeleteConfirmation(null)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3.5 rounded-xl transition-all"
            >
              İptal
            </button>
            <button
              onClick={() => {
                if (deleteConfirmation.type === 'blog') {
                  handleDeleteBlog(deleteConfirmation.id);
                } else {
                  handleDeleteStory(deleteConfirmation.id);
                }
                setDeleteConfirmation(null);
              }}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-red-600/30"
            >
              Evet, Sil
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Blog Modal - space-y-8 dışına çıkarıldı */}
    <BlogModal
      isOpen={isBlogModalOpen}
      onClose={() => setIsBlogModalOpen(false)}
      onSubmit={async (data) => {
        setLoading(true);
        try {
          const res = await fetch("/api/admin/blog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          if (res.ok) {
            setMessage({ type: "success", text: "Blog yazısı başarıyla eklendi." });
            setIsBlogModalOpen(false);
            await refreshData();
          } else {
            setMessage({ type: "error", text: "Ekleme başarısız oldu." });
          }
        } catch (e: any) {
          setMessage({ type: "error", text: e.message });
        } finally {
          setLoading(false);
        }
      }}
      fileToBase64={fileToBase64}
      loading={loading}
    />

    {/* Story Modal - space-y-8 dışına çıkarıldı */}
    <StoryModal
      isOpen={isStoryModalOpen}
      editingStory={editingStory}
      onClose={() => setIsStoryModalOpen(false)}
      onSubmit={async (data) => {
        setLoading(true);
        try {
          // If editing, use POST to update (which will conflict and update in db)
          // If we want it to be approved, we set status to 'approved' inside the modal.
          const res = await fetch("/api/admin/stories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          if (res.ok) {
            setMessage({ type: "success", text: "Hasta hikayesi başarıyla kaydedildi." });
            setIsStoryModalOpen(false);
            await refreshData();
          } else {
            setMessage({ type: "error", text: "Ekleme başarısız oldu." });
          }
        } catch (e: any) {
          setMessage({ type: "error", text: e.message });
        } finally {
          setLoading(false);
        }
      }}
      fileToBase64={fileToBase64}
      loading={loading}
    />
    </>
  );
}

// ==========================================
// BLOG MODAL COMPONENT
// ==========================================
function BlogModal({
  isOpen,
  onClose,
  onSubmit,
  fileToBase64,
  loading,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BlogPost) => Promise<void>;
  fileToBase64: (file: File) => Promise<string>;
  loading: boolean;
}) {
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [excerptEn, setExcerptEn] = useState("");
  const [excerptAr, setExcerptAr] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [contentAr, setContentAr] = useState("");
  const [categoryEn, setCategoryEn] = useState("");
  const [categoryAr, setCategoryAr] = useState("");
  const [authorEn, setAuthorEn] = useState("Curelog Editorial Team");
  const [authorAr, setAuthorAr] = useState("فريق تحرير كيورلوج");
  const [tagsEn, setTagsEn] = useState("");
  const [tagsAr, setTagsAr] = useState("");
  const [image, setImage] = useState("");
  const [imgUploading, setImgUploading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = "blog-" + Date.now();
    const slug = titleEn.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || id;
    
    const postData: BlogPost = {
      id,
      slug,
      title: { en: titleEn, ar: titleAr || titleEn },
      excerpt: { en: excerptEn, ar: excerptAr || excerptEn },
      content: { en: contentEn, ar: contentAr || contentEn },
      date: {
        en: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        ar: new Date().toLocaleDateString("ar-EG", { month: "long", day: "numeric", year: "numeric" }),
      },
      author: { en: authorEn, ar: authorAr },
      category: { en: categoryEn, ar: categoryAr || categoryEn },
      tags: {
        en: tagsEn.split(",").map((t) => t.trim()).filter(Boolean),
        ar: tagsAr.split(",").map((t) => t.trim()).filter(Boolean),
      },
      image: image || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
    };

    await onSubmit(postData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto border border-gray-100">
        <div className="flex justify-between items-center border-b border-gray-100 pb-5 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">post_add</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Yeni Blog Yazısı Ekle</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-50">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block font-medium text-sm text-gray-700 mb-2">Kapak Fotoğrafı</label>
            <div className="flex items-center space-x-6 bg-gray-50 p-4 rounded-2xl border border-dashed border-gray-200">
              {image ? (
                <div className="relative w-32 h-20 rounded-xl overflow-hidden shadow-sm">
                  <Image src={image} alt="" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => setImage("")}
                    className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full shadow"
                  >
                    <span className="material-symbols-outlined text-xs">close</span>
                  </button>
                </div>
              ) : (
                <div className="w-32 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 border border-gray-200">
                  <span className="material-symbols-outlined text-3xl">add_photo_alternate</span>
                </div>
              )}
              <div className="flex-grow">
                <input
                  type="file"
                  accept="image/*"
                  id="blog-image"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImgUploading(true);
                      try {
                        const base64 = await fileToBase64(file);
                        setImage(base64);
                      } catch (err) {
                        console.error(err);
                      } finally {
                        setImgUploading(false);
                      }
                    }
                  }}
                />
                <label
                  htmlFor="blog-image"
                  className="cursor-pointer inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-all"
                >
                  <span className="material-symbols-outlined text-lg text-gray-500">upload</span>
                  <span>{imgUploading ? "Yükleniyor..." : "Görsel Seç"}</span>
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1">Başlık (İngilizce)</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1">Başlık (Arapça)</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-right"
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1">Kategori (İngilizce)</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={categoryEn}
                onChange={(e) => setCategoryEn(e.target.value)}
                placeholder="Aesthetics, Dentistry..."
              />
            </div>
            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1">Kategori (Arapça)</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-right"
                value={categoryAr}
                onChange={(e) => setCategoryAr(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1">Özet Açıklama (İngilizce)</label>
              <textarea
                rows={2}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={excerptEn}
                onChange={(e) => setExcerptEn(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1">Özet Açıklama (Arapça)</label>
              <textarea
                rows={2}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-right"
                value={excerptAr}
                onChange={(e) => setExcerptAr(e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium text-sm text-gray-700 mb-1">İçerik (İngilizce HTML / Markdown)</label>
              <textarea
                rows={5}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-sm"
                value={contentEn}
                onChange={(e) => setContentEn(e.target.value)}
                placeholder="<h2>Heading</h2>&#10;&#10;Paragraph text here..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium text-sm text-gray-700 mb-1">İçerik (Arapça HTML / Markdown)</label>
              <textarea
                rows={5}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-sm text-right"
                value={contentAr}
                onChange={(e) => setContentAr(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1">Etiketler (İngilizce, virgülle ayırın)</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={tagsEn}
                onChange={(e) => setTagsEn(e.target.value)}
                placeholder="Hair Transplant, Turkey, FUE"
              />
            </div>
            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1">Etiketler (Arapça, virgülle ayırın)</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-right"
                value={tagsAr}
                onChange={(e) => setTagsAr(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-50 transition-all"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-medium shadow-md shadow-primary/20 transition-all disabled:opacity-50"
            >
              {loading ? "Kaydediliyor..." : "Blog Yazısını Kaydet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// STORY MODAL COMPONENT
// ==========================================
function StoryModal({
  isOpen,
  onClose,
  onSubmit,
  fileToBase64,
  loading,
  editingStory,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Story) => Promise<void>;
  fileToBase64: (file: File) => Promise<string>;
  loading: boolean;
  editingStory?: Story | null;
}) {
  const [patientName, setPatientName] = useState("");
  const [departmentSlug, setDepartmentSlug] = useState("hair-transplant");
  const [departmentNameEn, setDepartmentNameEn] = useState("Hair Transplant and Aesthetics");
  const [departmentNameAr, setDepartmentNameAr] = useState("زراعة الشعر وتجميله");
  const [quoteEn, setQuoteEn] = useState("");
  const [quoteAr, setQuoteAr] = useState("");
  const [image, setImage] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [imgUploading, setImgUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);

  // Kırpma / Ayarlama stateleri
  const [rawImage, setRawImage] = useState("");
  const [isCropping, setIsCropping] = useState(false);
  const [cropZoom, setCropZoom] = useState(1);
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const departments = [
    { slug: "hair-transplant", en: "Hair Transplant and Aesthetics", ar: "زراعة الشعر وتجميله" },
    { slug: "ivf-fertility", en: "IVF and Infertility", ar: "أطفال الأنابيب والعقم" },
    { slug: "plastic-surgery", en: "Plastic, Reconstructive and Aesthetic Surgery", ar: "الجراحة التجميلية والترميمية" },
    { slug: "dentistry", en: "Oral and Dental Health", ar: "صحة الفم والأسنان" },
    { slug: "ophthalmology", en: "Ophthalmology (Eye Diseases)", ar: "طب العيون" },
    { slug: "neurosurgery", en: "Neurosurgery (Brain & Nerve)", ar: "جراحة المخ والأعصاب" },
  ];

  useEffect(() => {
    if (editingStory) {
      setPatientName(editingStory.patientName);
      setDepartmentSlug(editingStory.departmentSlug);
      setDepartmentNameEn(typeof editingStory.departmentName === 'string' ? editingStory.departmentName : editingStory.departmentName.en || "");
      setDepartmentNameAr(typeof editingStory.departmentName === 'string' ? "" : editingStory.departmentName.ar || "");
      setQuoteEn(typeof editingStory.quote === 'string' ? editingStory.quote : editingStory.quote.en || "");
      setQuoteAr(typeof editingStory.quote === 'string' ? "" : editingStory.quote.ar || "");
      setImage(editingStory.image || "");
      setGalleryImages(editingStory.galleryImages || []);
    } else {
      setPatientName("");
      setDepartmentSlug("hair-transplant");
      setDepartmentNameEn("Hair Transplant and Aesthetics");
      setDepartmentNameAr("زراعة الشعر وتجميله");
      setQuoteEn("");
      setQuoteAr("");
      setImage("");
      setGalleryImages([]);
    }
  }, [editingStory, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingStory ? editingStory.id : "story-" + Date.now();
    
    const storyData: Story = {
      id,
      patientName,
      departmentSlug,
      departmentName: { en: departmentNameEn, ar: departmentNameAr },
      quote: { en: quoteEn, ar: quoteAr || quoteEn },
      image: image || "",
      galleryImages: galleryImages.length > 0 ? galleryImages : undefined,
      imagePosition: "center",
      status: "approved", // When admin saves, it becomes approved
    };

    await onSubmit(storyData);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl my-8 border border-gray-100 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center border-b border-gray-100 pb-5 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">{editingStory ? 'edit' : 'person_add'}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                {editingStory ? "Hasta Hikayesini Düzenle / Onayla" : "Yeni Hasta Hikayesi Ekle"}
              </h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-50">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Main Image Upload */}
            <div>
              <label className="block font-medium text-sm text-gray-700 mb-2">Hasta Profil Fotoğrafı</label>
              <div className="flex items-center space-x-6 bg-gray-50 p-4 rounded-2xl border border-dashed border-gray-200">
                {image ? (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-sm border border-gray-200">
                    <Image src={image} alt="" fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => setImage("")}
                      className="absolute top-0 right-0 bg-red-600 text-white p-0.5 rounded-full shadow"
                    >
                      <span className="material-symbols-outlined text-[10px]">close</span>
                    </button>
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 border border-gray-200">
                    <span className="material-symbols-outlined text-2xl">person</span>
                  </div>
                )}
                <div className="flex-grow">
                  <input
                    type="file"
                    accept="image/*"
                    id="story-image"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImgUploading(true);
                        try {
                          const base64 = await fileToBase64(file);
                          setRawImage(base64);
                          setCropZoom(1);
                          setCropX(0);
                          setCropY(0);
                          setIsCropping(true);
                        } catch (err) {
                          console.error(err);
                        } finally {
                          setImgUploading(false);
                        }
                      }
                    }}
                  />
                  <label
                    htmlFor="story-image"
                    className="cursor-pointer inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-all"
                  >
                    <span className="material-symbols-outlined text-lg text-gray-500">upload</span>
                    <span>{imgUploading ? "Yükleniyor..." : "Görsel Seç ve Ayarla"}</span>
                  </label>
                  <p className="text-xs text-gray-400 mt-2">Görseli seçtikten sonra açılan pencereden yuvarlak çerçeveye oturtun.</p>
                </div>
              </div>
            </div>

            {/* Gallery Upload */}
            <div>
              <label className="block font-medium text-sm text-gray-700 mb-2">Galeri Fotoğrafları (İsteğe Bağlı - Çoklu Seçim Yapabilirsiniz)</label>
              <div className="bg-gray-50 p-4 rounded-2xl border border-dashed border-gray-200 space-y-4">
                <div className="flex flex-wrap gap-3">
                  {galleryImages.map((img, idx) => (
                    <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden shadow-sm border border-gray-200">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setGalleryImages(galleryImages.filter((_, i) => i !== idx))}
                        className="absolute top-1 right-1 bg-red-600 text-white p-0.5 rounded-full shadow"
                      >
                        <span className="material-symbols-outlined text-[10px]">close</span>
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center justify-center">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      id="story-gallery"
                      className="hidden"
                      onChange={async (e) => {
                        const files = Array.from(e.target.files || []);
                        if (files.length > 0) {
                          setGalleryUploading(true);
                          try {
                            const base64List = await Promise.all(files.map(fileToBase64));
                            setGalleryImages([...galleryImages, ...base64List]);
                          } catch (err) {
                            console.error(err);
                          } finally {
                            setGalleryUploading(false);
                          }
                        }
                      }}
                    />
                    <label
                      htmlFor="story-gallery"
                      className="cursor-pointer flex flex-col items-center justify-center w-20 h-20 bg-white rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 shadow-sm transition-all"
                    >
                      <span className="material-symbols-outlined text-2xl">add_photo_alternate</span>
                      <span className="text-[10px] font-medium mt-1">Galeri Ekle</span>
                    </label>
                  </div>
                </div>
                {galleryUploading && <p className="text-xs text-primary font-medium">Galeri fotoğrafları yükleniyor...</p>}
              </div>
            </div>

            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1">Hasta Adı Soyadı</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1">Tedavi Bölümü</label>
              <select
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                value={departmentSlug}
                onChange={(e) => {
                  const slug = e.target.value;
                  setDepartmentSlug(slug);
                  const dep = departments.find((d) => d.slug === slug);
                  if (dep) {
                    setDepartmentNameEn(dep.en);
                    setDepartmentNameAr(dep.ar);
                  }
                }}
              >
                {departments.map((d) => (
                  <option key={d.slug} value={d.slug}>
                    {d.en} / {d.ar}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1">Hasta Yorumu / Hikayesi (İngilizce)</label>
              <textarea
                rows={4}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={quoteEn}
                onChange={(e) => setQuoteEn(e.target.value)}
                placeholder="My experience with Medlog was amazing..."
              />
            </div>

            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1">Hasta Yorumu / Hikayesi (Arapça)</label>
              <textarea
                rows={4}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-right"
                value={quoteAr}
                onChange={(e) => setQuoteAr(e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-50 transition-all"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-medium shadow-md shadow-primary/20 transition-all disabled:opacity-50"
              >
                {loading ? "Kaydediliyor..." : (editingStory ? "Kaydet ve Onayla" : "Hikayeyi Kaydet")}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Kırpma / Ayarlama Modali - TAMAMEN DIŞARIDA VE EN ÜSTTE */}
      {isCropping && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-[95%] max-w-xl min-w-[320px] sm:min-w-[480px] shadow-2xl flex flex-col items-center space-y-6 border border-gray-100 my-auto mx-auto flex-shrink-0">
            <div className="text-center w-full border-b border-gray-100 pb-4">
              <h3 className="font-bold text-xl sm:text-2xl text-gray-900 mb-1">Profil Fotoğrafını Ayarla</h3>
              <p className="text-xs sm:text-sm text-gray-500">Resmi sürükleyerek veya alt kısımdaki kaydırıcılarla yuvarlak alana tam oturtun</p>
            </div>

            {/* Yuvarlak Önizleme ve Sürükleme Alanı */}
            <div
              className="relative w-64 h-64 sm:w-72 sm:h-72 bg-gray-50 rounded-full overflow-hidden border-4 border-primary shadow-2xl cursor-move select-none flex items-center justify-center flex-shrink-0 mx-auto"
              onMouseDown={(e) => {
                setIsDragging(true);
                setDragStart({ x: e.clientX - cropX, y: e.clientY - cropY });
              }}
              onMouseMove={(e) => {
                if (isDragging) {
                  setCropX(e.clientX - dragStart.x);
                  setCropY(e.clientY - dragStart.y);
                }
              }}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onTouchStart={(e) => {
                if (e.touches.length === 1) {
                  setIsDragging(true);
                  setDragStart({ x: e.touches[0].clientX - cropX, y: e.touches[0].clientY - cropY });
                }
              }}
              onTouchMove={(e) => {
                if (isDragging && e.touches.length === 1) {
                  setCropX(e.touches[0].clientX - dragStart.x);
                  setCropY(e.touches[0].clientY - dragStart.y);
                }
              }}
              onTouchEnd={() => setIsDragging(false)}
            >
              <img
                id="crop-source-image"
                src={rawImage}
                alt="Crop preview"
                style={{
                  transform: `translate(${cropX}px, ${cropY}px) scale(${cropZoom})`,
                  transformOrigin: "center center",
                  transition: isDragging ? "none" : "transform 0.1s ease-out",
                  userSelect: "none",
                  pointerEvents: "none",
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
              {/* Çerçeve kılavuzu */}
              <div className="absolute inset-0 border-2 border-white/60 rounded-full pointer-events-none shadow-inner"></div>
            </div>

            {/* Kaydırıcı Kontrolleri */}
            <div className="w-full space-y-5 bg-gray-50 p-5 rounded-2xl border border-gray-100 flex-shrink-0">
              <div>
                <div className="flex justify-between text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  <span>🔍 Yakınlaştırma / Büyütme (Zoom)</span>
                  <span className="bg-white px-2 py-0.5 rounded-md border border-gray-200 text-primary font-bold">{cropZoom.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3.5"
                  step="0.05"
                  value={cropZoom}
                  onChange={(e) => setCropZoom(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  <span>↔️ Yatay Konum (Sol / Sağ)</span>
                  <span className="bg-white px-2 py-0.5 rounded-md border border-gray-200 text-primary font-bold">{cropX}px</span>
                </div>
                <input
                  type="range"
                  min="-250"
                  max="250"
                  step="5"
                  value={cropX}
                  onChange={(e) => setCropX(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  <span>↕️ Dikey Konum (Yukarı / Aşağı)</span>
                  <span className="bg-white px-2 py-0.5 rounded-md border border-gray-200 text-primary font-bold">{cropY}px</span>
                </div>
                <input
                  type="range"
                  min="-250"
                  max="250"
                  step="5"
                  value={cropY}
                  onChange={(e) => setCropY(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>

            <div className="flex space-x-4 w-full pt-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => setIsCropping(false)}
                className="flex-1 py-3 sm:py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-all text-sm sm:text-base shadow-sm"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={() => {
                  const imgElement = document.getElementById("crop-source-image") as HTMLImageElement;
                  if (imgElement) {
                    const canvas = document.createElement("canvas");
                    canvas.width = 400;
                    canvas.height = 400;
                    const ctx = canvas.getContext("2d");
                    if (ctx) {
                      ctx.beginPath();
                      ctx.arc(200, 200, 200, 0, Math.PI * 2);
                      ctx.closePath();
                      ctx.clip();

                      ctx.fillStyle = "#ffffff";
                      ctx.fillRect(0, 0, 400, 400);

                      const scale = cropZoom;
                      const width = 400 * scale;
                      const height = 400 * scale;
                      const dx = (400 - width) / 2 + cropX * 1.5;
                      const dy = (400 - height) / 2 + cropY * 1.5;

                      ctx.drawImage(imgElement, dx, dy, width, height);
                      const dataUrl = canvas.toDataURL("image/png", 0.95);
                      setImage(dataUrl);
                      setIsCropping(false);
                    }
                  }
                }}
                className="flex-1 py-3 sm:py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl shadow-lg shadow-primary/30 transition-all text-sm sm:text-base hover:scale-[1.02]"
              >
                Kırp ve Onayla
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
