import { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blog';
import { departments } from '@/data/doctors';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.curelogturkey.com';

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/blog',
    '/departments',
    '/legal',
    '/privacy',
    '/stories',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Blog routes
  const blogRoutes = blogPosts.map((post) => {
    // Determine the date for lastModified
    let lastMod: Date;
    try {
      const dateStr = typeof post.date === 'string' ? post.date : post.date.en;
      lastMod = new Date(dateStr);
      // Check if date is valid
      if (isNaN(lastMod.getTime())) {
        lastMod = new Date();
      }
    } catch (e) {
      lastMod = new Date();
    }

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: lastMod,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    };
  });

  // Department routes
  const departmentRoutes = departments.map((dept) => ({
    url: `${baseUrl}/departments/${dept.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes, ...departmentRoutes];
}
