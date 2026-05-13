"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useLanguage } from "@/context/LanguageContext";

const hospitalImages = [
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=2047&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2000&auto=format&fit=crop"
];

export default function ImageCarousel({ hospitalName }: { hospitalName: string }) {
  const { language } = useLanguage();
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start", watchDrag: false, direction: language === "ar" ? "rtl" : "ltr" }, [Autoplay({ delay: 6000, stopOnInteraction: false })]);

  return (
    <div
      className="overflow-hidden rounded-xl h-64"
      ref={emblaRef}
      key={language}
    >
      <div className="flex h-full -ml-4">
        {hospitalImages.map((src, index) => (
          <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] min-w-0 h-full relative pl-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${hospitalName} Image ${index + 1}`}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
