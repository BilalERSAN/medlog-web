"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Story } from "../data/stories";
import CustomSelect from "./CustomSelect";
import { useLanguage } from "@/context/LanguageContext";

function StoryCard({ story, onZoomImage, searchTerm }: { story: Story, onZoomImage: (src: string) => void, searchTerm: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);
  const { t } = useLanguage();

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="bg-primary/20 text-primary font-bold px-0.5 rounded">{part}</span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div id={story.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden hover:border-outline hover:shadow-md transition-all duration-300 flex flex-col h-full scroll-mt-24">
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-4 mb-6">
          {!story.image || story.image.includes("1500648767791") ? (
            <div className="w-16 h-16 rounded-full bg-surface-variant flex items-center justify-center border-2 border-primary-container shrink-0">
              <span className="material-symbols-outlined text-secondary text-3xl">person</span>
            </div>
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={story.image}
              alt={story.patientName}
              style={{ objectPosition: story.imagePosition || 'center' }}
              className="w-16 h-16 rounded-full object-cover border-2 border-primary-container shrink-0"
            />
          )}
          <div>
            <h3 className="font-h3 text-on-background mb-1">{highlightText(story.patientName, searchTerm)}</h3>
            <p className="font-body-sm font-semibold text-primary">{t(story.departmentName)}</p>
          </div>
        </div>

        <div className="relative flex-grow flex flex-col">
          <span className="material-symbols-outlined absolute -top-2 -left-2 text-surface-variant text-4xl -z-10 rotate-180">format_quote</span>
          <div className={`font-body-md text-secondary leading-relaxed italic relative z-10 pl-4 border-l-2 border-primary-container transition-all duration-300 mb-6 flex-grow overflow-hidden ${isExpanded ? '' : 'line-clamp-4'}`}>
            &quot;{highlightText(t(story.quote), searchTerm)}&quot;
          </div>

          {isExpanded && story.galleryImages && story.galleryImages.length > 0 && (
            <div className="mt-2 mb-6 w-full">
              <h4 className="font-body-sm font-semibold text-on-surface mb-3">Gallery</h4>
              <div className="overflow-hidden rounded-xl" ref={emblaRef}>
                <div className="flex -ml-4 h-32">
                  {story.galleryImages.map((src, idx) => (
                    <div key={idx} className="flex-[0_0_80%] sm:flex-[0_0_60%] min-w-0 pl-4 h-full relative cursor-zoom-in group" onClick={() => onZoomImage(src)}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={`${story.patientName} gallery image ${idx + 1}`}
                        className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-xl ml-4 pointer-events-none" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-auto self-start text-primary font-body-md font-semibold flex items-center gap-1 hover:text-primary-container transition-colors group cursor-pointer"
          >
            {isExpanded ? t({ en: 'Show Less', ar: 'عرض أقل' }) : t({ en: 'Read Full Story', ar: 'اقرأ القصة كاملة' })}
            <span className="material-symbols-outlined text-sm transition-transform">
              {isExpanded ? 'expand_less' : 'arrow_forward'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StoriesFilter({ stories }: { stories: Story[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const { t } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(6);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(6);
  }, [searchTerm, selectedDepartment]);

  const departments = useMemo(() => {
    const depts = new Set<string>();
    stories.forEach(s => depts.add(t(s.departmentName)));
    return Array.from(depts).sort();
  }, [stories, t]);

  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      const matchesSearch = story.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t(story.quote).toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = selectedDepartment === "" || t(story.departmentName) === selectedDepartment;

      return matchesSearch && matchesDepartment;
    });
  }, [stories, searchTerm, selectedDepartment, t]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setVisibleCount(prev => Math.min(prev + 6, filteredStories.length));
      }
    }, { threshold: 0.1 });

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [filteredStories.length]);

  const displayedStories = filteredStories.slice(0, visibleCount);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-4 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm relative">
        <div className="flex-1 relative z-10">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">search</span>
          <input
            type="text"
            placeholder="Search stories by keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface border border-outline-variant rounded-xl pl-12 pr-4 py-4 font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
          />
        </div>
        <div className="w-full md:w-72 relative z-20">
          <CustomSelect
            options={[
              { label: "All Departments", value: "" },
              ...departments.map(dept => ({ label: dept, value: dept }))
            ]}
            value={selectedDepartment}
            onChange={setSelectedDepartment}
            placeholder="All Departments"
            icon="filter_list"
          />
        </div>
      </div>

      {filteredStories.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedStories.map((story) => (
              <StoryCard key={story.id} story={story} onZoomImage={setZoomedImage} searchTerm={searchTerm} />
            ))}
          </div>
          {visibleCount < filteredStories.length && (
            <div ref={loaderRef} className="w-full flex justify-center py-8">
              <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
            </div>
          )}
        </>
      ) : (
        <div className="bg-surface-container-low border border-outline-variant rounded-xl p-12 text-center">
          <span className="material-symbols-outlined text-outline text-4xl mb-4">search_off</span>
          <h3 className="font-h3 text-on-surface-variant">No stories found</h3>
          <p className="font-body-md text-secondary mt-2">We couldn&apos;t find any patient stories matching your search criteria.</p>
          <button
            onClick={() => { setSearchTerm(""); setSelectedDepartment(""); }}
            className="mt-6 px-6 py-2 bg-primary-container text-on-primary-container rounded-full font-semibold hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8 cursor-zoom-out"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-5xl w-full max-h-full flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={zoomedImage}
              alt="Zoomed gallery image"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
