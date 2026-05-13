import { NextResponse } from "next/server";
import { getDbBlogPosts, insertDbBlogPost, deleteDbBlogPost } from "@/lib/db";
import { uploadToBlob } from "@/lib/storage";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const posts = await getDbBlogPosts([]);
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.title || !data.content) {
      return NextResponse.json({ error: "Başlık ve içerik zorunludur." }, { status: 400 });
    }

    // Görseli Vercel Blob'a yükle (veya base64 fallback)
    if (data.image && data.image.startsWith("data:")) {
      data.image = await uploadToBlob(data.image, `blog-${data.id}.png`);
    }

    await insertDbBlogPost(data);

    revalidatePath("/blog");
    revalidatePath("/admin");

    return NextResponse.json({ success: true, post: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Blog ID zorunludur." }, { status: 400 });
    }

    await deleteDbBlogPost(id);

    revalidatePath("/blog");
    revalidatePath("/admin");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
