import { put } from "@vercel/blob";

export async function uploadToBlob(base64Data: string, filename: string): Promise<string> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    // Eğer Vercel Blob yapılandırılmamışsa, doğrudan base64'ü döndür (Fallback)
    return base64Data;
  }

  try {
    // Base64 string formatı: "data:image/jpeg;base64,/9j/4AAQ..."
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      // Geçerli bir base64 değilse (zaten bir URL ise) aynen döndür
      return base64Data;
    }

    const buffer = Buffer.from(matches[2], "base64");
    const extension = filename.split(".").pop() || "png";
    const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${extension}`;

    const blob = await put(`uploads/${uniqueFilename}`, buffer, {
      access: "public",
    });

    return blob.url;
  } catch (e) {
    console.error("Vercel Blob yükleme hatası:", e);
    // Hata durumunda base64'ü yedek olarak kullan
    return base64Data;
  }
}
