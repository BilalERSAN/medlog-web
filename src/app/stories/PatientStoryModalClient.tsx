"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  departments: { slug: string; en: string; ar: string }[];
}

export default function PatientStoryModalClient({ departments }: Props) {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [patientName, setPatientName] = useState("");
  const [departmentSlug, setDepartmentSlug] = useState(departments[0]?.slug || "");
  const [quote, setQuote] = useState("");
  const [image, setImage] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [imgUploading, setImgUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const selectedDept = departments.find(d => d.slug === departmentSlug);

    try {
      const res = await fetch("/api/stories/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName,
          departmentSlug,
          departmentNameEn: selectedDept?.en || "",
          quote,
          image,
          galleryImages
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || t({ en: "An error occurred.", ar: "حدث خطأ ما." }));
      }
    } catch (err: any) {
      setError(err.message || t({ en: "Connection error.", ar: "خطأ في الاتصال." }));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setIsOpen(false);
    setSubmitted(false);
    setPatientName("");
    setQuote("");
    setImage("");
    setGalleryImages([]);
    setError("");
  };

  return (
    <>
      <div className="flex justify-center mb-12">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-primary/30 transition-all hover:scale-105"
        >
          <span className="material-symbols-outlined text-2xl">favorite</span>
          <span className="text-lg tracking-wide">{t({ en: "Share Your Story", ar: "شارك قصتك" })}</span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 md:p-10 shadow-2xl my-8 relative max-h-[90vh] overflow-y-auto border border-gray-100">
            <button
              onClick={resetForm}
              className={`absolute top-6 ${language === 'ar' ? 'left-6' : 'right-6'} text-gray-400 hover:text-gray-900 p-2 rounded-xl hover:bg-gray-100 transition-colors`}
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {submitted ? (
              <div className="text-center py-10 space-y-6 flex flex-col items-center">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2 shadow-inner">
                  <span className="material-symbols-outlined text-5xl">check_circle</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{t({ en: "Thank You!", ar: "شكراً لك!" })}</h2>
                <p className="text-gray-600 text-lg leading-relaxed w-full max-w-[400px] px-4">
                  {t({ en: "Your story has been submitted and will be added to our website after review. We appreciate you sharing your experience.", ar: "تم إرسال قصتك وستتم إضافتها إلى موقعنا بعد المراجعة. نقدر لك مشاركة تجربتك معنا." })}
                </p>
                <button
                  onClick={resetForm}
                  className="mt-6 bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-medium transition-all"
                >
                  {t({ en: "Close", ar: "إغلاق" })}
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">{t({ en: "Share Your Story", ar: "شارك قصتك" })}</h2>
                  <p className="text-gray-500">
                    {t({ en: "Share your experience to inspire other patients who are seeking treatment like you.", ar: "شارك تجربتك لإلهام المرضى الآخرين الذين يبحثون عن العلاج مثلك." })}
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-center space-x-3 text-sm">
                    <span className="material-symbols-outlined">error</span>
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <label className="block font-medium text-gray-900 mb-2">{t({ en: "Your Profile Photo (Optional)", ar: "صورة ملفك الشخصي (اختياري)" })}</label>
                    <div className="flex items-center space-x-6 bg-gray-50 p-4 rounded-2xl border border-dashed border-gray-200">
                      {image ? (
                        <div className="relative">
                          <div className="w-20 h-20 rounded-full overflow-hidden shadow-md border border-gray-200">
                            <img src={image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <button
                            type="button"
                            onClick={() => setImage("")}
                            className={`absolute -top-1 ${language === 'ar' ? '-left-1' : '-right-1'} bg-red-600 text-white p-1 rounded-full shadow-md flex items-center justify-center hover:bg-red-700 transition-colors z-10`}
                          >
                            <span className="material-symbols-outlined text-[12px]">close</span>
                          </button>
                        </div>
                      ) : (
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-gray-400 border border-gray-200 shadow-sm">
                          <span className="material-symbols-outlined text-3xl">person</span>
                        </div>
                      )}
                      <div className="flex-grow">
                        <input
                          type="file"
                          accept="image/*"
                          id="patient-image"
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
                          htmlFor="patient-image"
                          className="cursor-pointer inline-flex items-center space-x-2 bg-white px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-all"
                        >
                          <span className="material-symbols-outlined text-lg text-gray-500">photo_camera</span>
                          <span>{imgUploading ? t({ en: "Uploading...", ar: "جاري الرفع..." }) : t({ en: "Choose Photo", ar: "اختر صورة" })}</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Gallery Upload */}
                  <div>
                    <label className="block font-medium text-gray-900 mb-2">{t({ en: "Before/After or Extra Photos (Optional)", ar: "صور قبل/بعد أو صور إضافية (اختياري)" })}</label>
                    <div className="bg-gray-50 p-4 rounded-2xl border border-dashed border-gray-200 space-y-4">
                      <div className="flex flex-wrap gap-3">
                        {galleryImages.map((img, idx) => (
                          <div key={idx} className="relative w-24 h-24 rounded-xl overflow-hidden shadow-sm border border-gray-200">
                            <img src={img} alt="" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setGalleryImages(galleryImages.filter((_, i) => i !== idx))}
                              className={`absolute top-1 ${language === 'ar' ? 'left-1' : 'right-1'} bg-red-600 text-white p-1 rounded-full shadow`}
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
                            id="patient-gallery"
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
                            htmlFor="patient-gallery"
                            className="cursor-pointer flex flex-col items-center justify-center w-24 h-24 bg-white rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 shadow-sm transition-all"
                          >
                            <span className="material-symbols-outlined text-3xl mb-1">add_photo_alternate</span>
                            <span className="text-[11px] font-medium">{t({ en: "Add Photo", ar: "إضافة صورة" })}</span>
                          </label>
                        </div>
                      </div>
                      {galleryUploading && <p className="text-sm text-primary font-medium animate-pulse">{t({ en: "Uploading photos...", ar: "جاري رفع الصور..." })}</p>}
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block font-medium text-gray-900 mb-1.5">{t({ en: "Full Name", ar: "الاسم الكامل" })}</label>
                      <input
                        type="text"
                        required
                        className="w-full px-5 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-colors"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder={t({ en: "E.g. John Doe", ar: "مثال: أحمد محمد" })}
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-gray-900 mb-1.5">{t({ en: "Treatment Department", ar: "القسم العلاجي" })}</label>
                      <select
                        className="w-full px-5 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-colors appearance-none"
                        value={departmentSlug}
                        onChange={(e) => setDepartmentSlug(e.target.value)}
                      >
                        {departments.map((d) => (
                          <option key={d.slug} value={d.slug}>
                            {language === 'ar' ? d.ar : d.en}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-gray-900 mb-1.5">{t({ en: "Your Story", ar: "قصتك" })}</label>
                      <textarea
                        required
                        rows={5}
                        className="w-full px-5 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-colors resize-none"
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                        placeholder={t({ 
                          en: "Share your journey with us. Your story can be the guiding light for someone else seeking healing...", 
                          ar: "شاركنا رحلتك. قصتك يمكن أن تكون النور الذي يرشد شخصاً آخر يبحث عن الشفاء..." 
                        })}
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {loading ? (
                        <>
                          <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                          <span>{t({ en: "Submitting...", ar: "جاري الإرسال..." })}</span>
                        </>
                      ) : (
                        <>
                          <span>{t({ en: "Submit My Story", ar: "إرسال قصتي" })}</span>
                          <span className={`material-symbols-outlined text-xl ${language === 'ar' ? 'rotate-180' : ''}`}>send</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
