import { NextResponse } from "next/server";
import { insertDbStory } from "@/lib/db";
import { uploadToBlob } from "@/lib/storage";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.patientName || !data.quote) {
      return NextResponse.json({ error: "Full name and story text are required." }, { status: 400 });
    }

    const id = "story-" + Date.now();

    // Hastanın yüklediği görselleri Vercel Blob'a yükle
    let image = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop";
    if (data.image && data.image.startsWith("data:")) {
      image = await uploadToBlob(data.image, `story-${id}.png`);
    }

    let galleryImages = undefined;
    if (data.galleryImages && Array.isArray(data.galleryImages)) {
      galleryImages = await Promise.all(
        data.galleryImages.map(async (img: string, i: number) => {
          if (img.startsWith("data:")) {
            return await uploadToBlob(img, `story-gallery-${id}-${i}.png`);
          }
          return img;
        })
      );
    }

    const storyData = {
      id,
      patientName: data.patientName,
      departmentSlug: data.departmentSlug,
      departmentName: { en: data.departmentNameEn, ar: "" }, // Admin can fill Arabic later
      quote: { en: data.quote, ar: "" }, // Admin can fill Arabic later
      image: image,
      galleryImages: galleryImages,
      imagePosition: "center",
      status: "pending" as const
    };

    await insertDbStory(storyData);

    revalidatePath("/admin");
    revalidatePath("/stories");

    return NextResponse.json({ success: true, story: storyData });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
