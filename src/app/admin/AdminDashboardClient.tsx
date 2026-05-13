"use client";

import { useState, useEffect } from "react";
import { BlogPost, BilingualString } from "@/data/blog";
import { Story } from "@/data/stories";
import { useRouter } from "next/navigation";

interface Props {
  initialBlogPosts: BlogPost[];
  initialStories: Story[];
}

export default function AdminDashboardClient({ initialBlogPosts, initialStories }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"blogs" | "stories">("blogs");
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogPosts);
  const [stories, setStories] = useState<Story[]>(initialStories);
  
  // Modal states
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

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
    if (!confirm("Bu blog yazısını silmek istediğinize emin misiniz?")) return;
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
    if (!confirm("Bu hasta hikayesini silmek istediğinize emin misiniz?")) return;
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
            <span>Hasta Hikayeleri ({stories.length})</span>
          </button>
        </div>

        <button
          onClick={() => (activeTab === "blogs" ? setIsBlogModalOpen(true) : setIsStoryModalOpen(true))}
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
                  <img
                    src={post.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <span className="material-symbols-outlined text-4xl">image</span>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => handleDeleteBlog(post.id)}
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
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col group p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 relative">
                    {story.image ? (
                      <img
                        src={story.image}
                        alt=""
                        style={{ objectPosition: story.imagePosition || 'center' }}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <span className="material-symbols-outlined">person</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{story.patientName}</h3>
                    <span className="text-xs text-primary font-medium px-2.5 py-0.5 bg-primary/10 rounded-full inline-block mt-0.5">
                      {getString(story.departmentName)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteStory(story.id)}
                  className="text-gray-400 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 transition-all flex items-center justify-center"
                  title="Sil"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
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

      {/* Blog Modal */}
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

      {/* Story Modal */}
      <StoryModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        onSubmit={async (data) => {
          setLoading(true);
          try {
            const res = await fetch("/api/admin/stories", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });
            if (res.ok) {
              setMessage({ type: "success", text: "Hasta hikayesi başarıyla eklendi." });
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
    </div>
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
  const [authorEn, setAuthorEn] = useState("Medlog Editorial Team");
  const [authorAr, setAuthorAr] = useState("فريق تحرير ميدلوج");
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
                  <img src={image} alt="" className="w-full h-full object-cover" />
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
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Story) => Promise<void>;
  fileToBase64: (file: File) => Promise<string>;
  loading: boolean;
}) {
  const [patientName, setPatientName] = useState("");
  const [departmentSlug, setDepartmentSlug] = useState("hair-transplant");
  const [departmentNameEn, setDepartmentNameEn] = useState("Hair Transplant and Aesthetics");
  const [departmentNameAr, setDepartmentNameAr] = useState("زراعة الشعر وتجميله");
  const [quoteEn, setQuoteEn] = useState("");
  const [quoteAr, setQuoteAr] = useState("");
  const [image, setImage] = useState("");
  const [imagePosition, setImagePosition] = useState("center");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [imgUploading, setImgUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);

  const departments = [
    { slug: "hair-transplant", en: "Hair Transplant and Aesthetics", ar: "زراعة الشعر وتجميله" },
    { slug: "ivf-fertility", en: "IVF and Infertility", ar: "أطفال الأنابيب والعقم" },
    { slug: "plastic-surgery", en: "Plastic, Reconstructive and Aesthetic Surgery", ar: "الجراحة التجميلية والترميمية" },
    { slug: "dentistry", en: "Oral and Dental Health", ar: "صحة الفم والأسنان" },
    { slug: "ophthalmology", en: "Ophthalmology (Eye Diseases)", ar: "طب العيون" },
    { slug: "neurosurgery", en: "Neurosurgery (Brain & Nerve)", ar: "جراحة المخ والأعصاب" },
  ];

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = "story-" + Date.now();
    
    const storyData: Story = {
      id,
      patientName,
      departmentSlug,
      departmentName: { en: departmentNameEn, ar: departmentNameAr },
      quote: { en: quoteEn, ar: quoteAr || quoteEn },
      image: image || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      galleryImages: galleryImages.length > 0 ? galleryImages : undefined,
      imagePosition,
    };

    await onSubmit(storyData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl my-8 border border-gray-100 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-gray-100 pb-5 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">person_add</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Yeni Hasta Hikayesi Ekle</h2>
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
                <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-sm">
                  <img src={image} alt="" style={{ objectPosition: imagePosition }} className="w-full h-full object-cover" />
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
              <div className="flex-grow space-y-3">
                <div>
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
                    htmlFor="story-image"
                    className="cursor-pointer inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-all"
                  >
                    <span className="material-symbols-outlined text-lg text-gray-500">upload</span>
                    <span>{imgUploading ? "Yükleniyor..." : "Görsel Seç"}</span>
                  </label>
                </div>

                {/* Object Position Selector */}
                {image && (
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Görsel Odak Noktası (Hizalama)</label>
                    <select
                      className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-primary"
                      value={imagePosition}
                      onChange={(e) => setImagePosition(e.target.value)}
                    >
                      <option value="center">Orta (Varsayılan)</option>
                      <option value="top">Üst (Yüz / Baş Odaklı)</option>
                      <option value="bottom">Alt</option>
                      <option value="left">Sol</option>
                      <option value="right">Sağ</option>
                    </select>
                  </div>
                )}
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
              {loading ? "Kaydediliyor..." : "Hikayeyi Kaydet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
