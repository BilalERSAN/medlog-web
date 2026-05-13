import { NextResponse } from "next/server";
import { getDbStories, insertDbStory, deleteDbStory } from "@/lib/db";
import { uploadToBlob } from "@/lib/storage";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const storiesList = await getDbStories([]);
    return NextResponse.json(storiesList);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.patientName || !data.quote) {
      return NextResponse.json({ error: "Hasta adı ve hikaye yorumu zorunludur." }, { status: 400 });
    }

    // Ana profil görselini Vercel Blob'a yükle
    if (data.image && data.image.startsWith("data:")) {
      data.image = await uploadToBlob(data.image, `story-${data.id}.png`);
    }

    // Galeri görsellerini Vercel Blob'a yükle
    if (data.galleryImages && Array.isArray(data.galleryImages)) {
      const uploadedGallery = await Promise.all(
        data.galleryImages.map(async (img: string, i: number) => {
          if (img.startsWith("data:")) {
            return await uploadToBlob(img, `story-gallery-${data.id}-${i}.png`);
          }
          return img;
        })
      );
      data.galleryImages = uploadedGallery;
    }

    await insertDbStory(data);

    revalidatePath("/stories");
    revalidatePath("/admin");

    return NextResponse.json({ success: true, story: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Hikaye ID zorunludur." }, { status: 400 });
    }

    await deleteDbStory(id);

    revalidatePath("/stories");
    revalidatePath("/admin");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
