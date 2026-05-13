import { sql } from "@vercel/postgres";
import { BlogPost } from "@/data/blog";
import { Story } from "@/data/stories";

let initialized = false;

export async function initDb() {
  if (initialized) return;
  if (!process.env.POSTGRES_URL) {
    console.warn("POSTGRES_URL bulunamadı. In-memory (RAM) depolama modu kullanılıyor.");
    initialized = true;
    return;
  }

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id VARCHAR(100) PRIMARY KEY,
        data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS patient_stories (
        id VARCHAR(100) PRIMARY KEY,
        data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    initialized = true;
  } catch (e) {
    console.error("Veritabanı başlatılırken hata oluştu:", e);
  }
}

// ==========================================
// BLOG POSTS DB OPERATIONS
// ==========================================
export async function getDbBlogPosts(initialList: BlogPost[]): Promise<BlogPost[]> {
  await initDb();

  if (!process.env.POSTGRES_URL) {
    return (globalThis as any).__blogPosts ?? initialList;
  }

  try {
    const { rows } = await sql`SELECT data FROM blog_posts ORDER BY created_at DESC;`;
    const dbPosts: BlogPost[] = rows.map(r => r.data as BlogPost);

    // Hem veritabanındakileri hem de varsayılan statik listeyi harmanla
    const postsMap = new Map<string, BlogPost>();
    initialList.forEach(post => postsMap.set(post.id, post));
    dbPosts.forEach(post => postsMap.set(post.id, post));

    return Array.from(postsMap.values());
  } catch (e) {
    console.error("Bloglar çekilirken hata:", e);
    return (globalThis as any).__blogPosts ?? initialList;
  }
}

export async function insertDbBlogPost(post: BlogPost): Promise<void> {
  await initDb();

  if (!(globalThis as any).__blogPosts) {
    (globalThis as any).__blogPosts = [];
  }
  const list: BlogPost[] = (globalThis as any).__blogPosts;
  const existingIdx = list.findIndex(p => p.id === post.id);
  if (existingIdx >= 0) list[existingIdx] = post;
  else list.unshift(post);

  if (!process.env.POSTGRES_URL) return;

  try {
    await sql`
      INSERT INTO blog_posts (id, data)
      VALUES (${post.id}, ${JSON.stringify(post)})
      ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data;
    `;
  } catch (e) {
    console.error("Blog eklenirken hata:", e);
  }
}

export async function deleteDbBlogPost(id: string): Promise<void> {
  await initDb();

  if ((globalThis as any).__blogPosts) {
    (globalThis as any).__blogPosts = ((globalThis as any).__blogPosts as BlogPost[]).filter(p => p.id !== id);
  }

  if (!process.env.POSTGRES_URL) return;

  try {
    await sql`DELETE FROM blog_posts WHERE id = ${id};`;
  } catch (e) {
    console.error("Blog silinirken hata:", e);
  }
}

// ==========================================
// PATIENT STORIES DB OPERATIONS
// ==========================================
export async function getDbStories(initialList: Story[]): Promise<Story[]> {
  await initDb();

  if (!process.env.POSTGRES_URL) {
    return (globalThis as any).__stories ?? initialList;
  }

  try {
    const { rows } = await sql`SELECT data FROM patient_stories ORDER BY created_at DESC;`;
    const dbStories: Story[] = rows.map(r => r.data as Story);

    // Hem veritabanındakileri hem de varsayılan statik listeyi harmanla
    const storiesMap = new Map<string, Story>();
    initialList.forEach(story => storiesMap.set(story.id, story));
    dbStories.forEach(story => storiesMap.set(story.id, story));

    return Array.from(storiesMap.values());
  } catch (e) {
    console.error("Hikayeler çekilirken hata:", e);
    return (globalThis as any).__stories ?? initialList;
  }
}

export async function insertDbStory(story: Story): Promise<void> {
  await initDb();

  if (!(globalThis as any).__stories) {
    (globalThis as any).__stories = [];
  }
  const list: Story[] = (globalThis as any).__stories;
  const existingIdx = list.findIndex(s => s.id === story.id);
  if (existingIdx >= 0) list[existingIdx] = story;
  else list.unshift(story);

  if (!process.env.POSTGRES_URL) return;

  try {
    await sql`
      INSERT INTO patient_stories (id, data)
      VALUES (${story.id}, ${JSON.stringify(story)})
      ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data;
    `;
  } catch (e) {
    console.error("Hikaye eklenirken hata:", e);
  }
}

export async function deleteDbStory(id: string): Promise<void> {
  await initDb();

  if ((globalThis as any).__stories) {
    (globalThis as any).__stories = ((globalThis as any).__stories as Story[]).filter(s => s.id !== id);
  }

  if (!process.env.POSTGRES_URL) return;

  try {
    await sql`DELETE FROM patient_stories WHERE id = ${id};`;
  } catch (e) {
    console.error("Hikaye silinirken hata:", e);
  }
}
